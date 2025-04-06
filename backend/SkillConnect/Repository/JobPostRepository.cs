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
            return await _context.JobPosts.Include(j => j.Company).ToListAsync();
        }

        public async Task<JobPost?> GetByIdAsync(string id)
        {
            return await _context.JobPosts
                .Include(j => j.Company)
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
            // Start with the base query
            var query = _context.JobPosts
                .AsQueryable();

            // Apply search
            if (!string.IsNullOrEmpty(searchTerm))
            {
                query = query.Where(j =>
                    j.JobTitle.Contains(searchTerm));
            }

            // Apply filters
            if (filters != null)
            {
                foreach (var filter in filters)
                {
                    if (filter.Key == "Location" && !string.IsNullOrEmpty(filter.Value))
                    {
                        query = query.Where(j => j.Location == filter.Value);
                    }
                    // Add more filters as needed
                }
            }

            // Apply sorting
            // Apply sorting
            if (!string.IsNullOrEmpty(sortBy))
            {
                // Normalize casing (handle from frontend safely)
                sortBy = sortBy.Trim().ToLower() switch
                {
                    "createddate" => "CreatedAt",
                    "title" => "Title",
                    "location" => "Location",
                    "salaryfrom" => "SalaryFrom",
                    "salaryto" => "SalaryTo",
                    _ => "CreatedAt"
                };

                query = isDescending
                    ? query.OrderByDescending(e => EF.Property<object>(e, sortBy))
                    : query.OrderBy(e => EF.Property<object>(e, sortBy));
            }
            else
            {
                // Default sort if nothing is provided
                query = query.OrderByDescending(j => j.ApplicationDeadlineUnix);
            }


            // Get total count before pagination
            var totalCount = await query.CountAsync();

            // Apply pagination
            var items = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            // Return paginated result
            return new PaginatedResult<JobPost>
            {
                Items = items,
                TotalCount = totalCount
            };
        }
    }
}
