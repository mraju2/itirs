using Microsoft.EntityFrameworkCore;
using SkillConnect.Data;
using SkillConnect.Models;
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
                .Include(j => j.JobPostTrades)
                .ToListAsync();
        }

        public async Task<JobPost?> GetByIdAsync(string id)
        {
            return await _context.JobPosts
                .Include(j => j.Company)
                .Include(j => j.JobPostTrades)
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
            _context.JobPosts.Update(jobPost);
            await _context.SaveChangesAsync();
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
                .Include(j => j.JobPostTrades)
                .AsQueryable();

            // Search
            if (!string.IsNullOrWhiteSpace(searchTerm))
            {
                query = query.Where(j =>
                    j.JobTitle.Contains(searchTerm) ||
                    j.Company.Name.Contains(searchTerm));
            }

            // Filters
            if (filters != null)
            {
                foreach (var filter in filters)
                {
                    var key = filter.Key.ToLower();
                    var value = filter.Value;

                    if (key == "district" && !string.IsNullOrWhiteSpace(value))
                        query = query.Where(j => j.District == value);

                    if (key == "company" && !string.IsNullOrWhiteSpace(value))
                        query = query.Where(j => j.Company.Name.Contains(value));

                    if (key == "urgent" && bool.TryParse(value, out var urgent))
                        query = query.Where(j => j.Urgent == urgent);
                }
            }

            // Sorting
            if (!string.IsNullOrWhiteSpace(sortBy))
            {
                sortBy = sortBy.Trim().ToLower() switch
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

            var items = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

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
