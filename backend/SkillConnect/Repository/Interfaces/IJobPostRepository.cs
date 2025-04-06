using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SkillConnect.Models;

namespace SkillConnect.Repositories.Interfaces
{
    public interface IJobPostRepository
    {
        Task<IEnumerable<JobPost>> GetAllAsync();
        Task<JobPost?> GetByIdAsync(string id);
        Task AddAsync(JobPost jobPost);
        Task UpdateAsync(JobPost jobPost);
        Task DeleteAsync(string id);

        // New method for paginated, sorted, filtered, and searchable job posts
        Task<PaginatedResult<JobPost>> GetPaginatedAsync(
            int pageNumber,
            int pageSize,
            string? searchTerm,
            Dictionary<string, string>? filters,
            string? sortBy,
            bool isDescending);
    }
}
