using Microsoft.EntityFrameworkCore;
using SkillConnect.Data;
using SkillConnect.Models;
using SkillConnect.Models.Enums;
using SkillConnect.Repositories.Interfaces;


namespace SkillConnect.Repositories
{
    public class JobPostRepository : IJobPostRepository
    {
        private readonly AppDbContext _context;

        public JobPostRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<JobPost>> GetAllAsync()
        {
            return await _context.JobPosts
        .Include(j => j.Company)
        .Include(j => j.State)
        .Include(j => j.District)
        .Include(j => j.JobPostTrades).ThenInclude(jt => jt.Trade)
        .ToListAsync();
        }

        public async Task<JobPost?> GetByIdAsync(string id)
        {
            return await _context.JobPosts
                .Include(j => j.Company)
                .Include(j => j.State)
                .Include(j => j.District)
                .Include(j => j.JobPostTrades).ThenInclude(jt => jt.Trade)
                .Include(j => j.Applications)
                .FirstOrDefaultAsync(j => j.Id.ToString() == id);
        }


        public async Task AddAsync(JobPost jobPost)
        {
            await _context.JobPosts.AddAsync(jobPost);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(JobPost jobPost)
        {
            _context.JobPosts.Update(jobPost); // optional — EF will already track it
            await _context.SaveChangesAsync();
        }

        public async Task UpdateStatusAsync(Guid jobPostId, JobPostStatus newStatus, string? changedBy)
        {
            // Fetch the job post with status history
            var jobPost = await _context.JobPosts
                .Include(j => j.StatusHistory) // optional, only needed if you use it here
                .FirstOrDefaultAsync(j => j.Id == jobPostId);

            if (jobPost == null)
                throw new Exception($"Job post with ID {jobPostId} not found");

            Console.WriteLine($"[DEBUG] Before Update: Status = {jobPost.Status}");

            // Update status and timestamp
            jobPost.Status = newStatus;
            jobPost.ModifiedAtUnix = DateTimeOffset.UtcNow.ToUnixTimeSeconds();

            _context.Entry(jobPost).Property(j => j.Status).IsModified = true;
            _context.Entry(jobPost).Property(j => j.ModifiedAtUnix).IsModified = true;

            Console.WriteLine($"[DEBUG] After Update: Status = {jobPost.Status}");

            // Inspect EF Core change tracker
            var entry = _context.Entry(jobPost);
            foreach (var prop in entry.Properties)
            {
                Console.WriteLine($"[DEBUG] {prop.Metadata.Name}: {prop.OriginalValue} → {prop.CurrentValue} | Modified: {prop.IsModified}");
            }

            // Add a record to status history
            var statusHistory = new JobPostStatusHistory
            {
                JobPostId = jobPostId,
                Status = newStatus,
                ChangedAtUnix = DateTimeOffset.UtcNow.ToUnixTimeSeconds(),
                ChangedBy = changedBy
            };

            _context.JobPostStatusHistory.Add(statusHistory);

            try
            {
                await _context.SaveChangesAsync();
                Console.WriteLine("[DEBUG] SaveChangesAsync completed successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[ERROR] SaveChangesAsync failed: {ex.Message}");
                throw;
            }

            // Re-fetch the updated job post to confirm (optional)
            var updated = await _context.JobPosts.FindAsync(jobPostId);
            Console.WriteLine($"[DEBUG] Fetched after save: Status = {updated?.Status}");
        }


        public async Task DeleteAsync(string id)
        {
            var job = await _context.JobPosts.FindAsync(id);
            if (job != null)
            {
                _context.JobPosts.Remove(job);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<PaginatedResult<JobPost>> GetPaginatedAsync(
                int pageNumber,
                int pageSize,
                string? searchTerm,
                Dictionary<string, string>? filters,
                string? sortBy,
                bool isDescending)
        {
            var query = _context.JobPosts
    .Include(j => j.Company)
    .Include(j => j.State)
    .Include(j => j.District)
    .Include(j => j.JobPostTrades).ThenInclude(jt => jt.Trade)
    .AsQueryable();



            // Search
            if (!string.IsNullOrWhiteSpace(searchTerm))
            {
                Console.WriteLine($"SearchTerm: {searchTerm}");
                query = query.Where(j =>
                    j.JobTitle.Contains(searchTerm) ||
                    j.Company.Name.Contains(searchTerm));
            }

            // Filters
            if (filters != null)
            {
                Console.WriteLine("Filters received:");
                foreach (var filter in filters)
                {
                    var key = filter.Key.ToLower();
                    var value = filter.Value;
                    Console.WriteLine($" - {key}: {value}");

                    if (key == "district" && !string.IsNullOrWhiteSpace(value))
                    {
                        query = query.Where(j => j.DistrictId == Convert.ToInt16(value));
                        Console.WriteLine(" → Applied district filter");
                    }

                    if (key == "company" && !string.IsNullOrWhiteSpace(value))
                    {
                        query = query.Where(j => j.Company.Name.Contains(value));
                        Console.WriteLine(" → Applied company name filter");
                    }

                    if (key == "companyid" && Guid.TryParse(value, out var companyId))
                    {
                        query = query.Where(j => j.CompanyId == companyId);
                        Console.WriteLine($" → Applied companyId filter: {companyId}");
                    }

                    if (key == "urgent" && bool.TryParse(value, out var urgent))
                    {
                        query = query.Where(j => j.Urgent == urgent);
                        Console.WriteLine($" → Applied urgent filter: {urgent}");
                    }
                }
            }

            // Sorting
            if (!string.IsNullOrWhiteSpace(sortBy))
            {
                var sortField = sortBy.Trim().ToLower();
                Console.WriteLine($"Sorting by: {sortField}");

                sortBy = sortField switch
                {
                    "jobtitle" => "JobTitle",
                    "salarymin" => "SalaryMin",
                    "salarymax" => "SalaryMax",
                    "createdat" => "CreatedAtUnix",
                    "deadline" => "ApplicationDeadlineUnix",
                    _ => "CreatedAtUnix"
                };

                query = isDescending
                    ? query.OrderByDescending(e => EF.Property<object>(e, sortBy))
                    : query.OrderBy(e => EF.Property<object>(e, sortBy));
            }
            else
            {
                query = query.OrderByDescending(j => j.ApplicationDeadlineUnix);
            }

            var totalCount = await query.CountAsync();
            Console.WriteLine($"Total matching jobs: {totalCount}");

            var items = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            Console.WriteLine($"Returning {items.Count} jobs for page {pageNumber}");

            return new PaginatedResult<JobPost>
            {
                Items = items,
                TotalCount = totalCount,
                PageNumber = pageNumber,
                PageSize = pageSize
            };
        }


        public async Task<List<JobPost>> GetJobPostsByCompanyIdAsync(Guid companyId)
        {
            return await _context.JobPosts
                .Include(j => j.JobPostTrades).ThenInclude(jpt => jpt.Trade)
                .Include(j => j.Company)
                .Where(j => j.CompanyId == companyId)
                .ToListAsync();
        }

    }
}
