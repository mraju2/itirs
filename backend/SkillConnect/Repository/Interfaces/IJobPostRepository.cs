using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SkillConnect.Models;
using SkillConnect.Models.Enums;

namespace SkillConnect.Repositories.Interfaces
{
    public interface IJobPostRepository
    {
        /// <summary>
        /// Get all job posts.
        /// </summary>
        Task<IEnumerable<JobPost>> GetAllAsync();

        /// <summary>
        /// Get a job post by its ID.
        /// </summary>
        Task<JobPost?> GetByIdAsync(string id);

        /// <summary>
        /// Add a new job post.
        /// </summary>
        Task AddAsync(JobPost jobPost);

        /// <summary>
        /// Update an existing job post.
        /// </summary>
        Task UpdateAsync(JobPost jobPost);

        /// <summary>
        /// Delete a job post by its ID.
        /// </summary>
        Task DeleteAsync(string id);

        Task<List<JobPost>> GetJobPostsByCompanyIdAsync(Guid companyId);


        /// <summary>
        /// Get a paginated, searchable, sortable, and filterable list of job posts.
        /// </summary>
        Task<PaginatedResult<JobPost>> GetPaginatedAsync(
            int pageNumber,
            int pageSize,
            string? searchTerm,
            Dictionary<string, string>? filters,
            string? sortBy,
            bool isDescending);

        Task UpdateStatusAsync(Guid jobPostId, JobPostStatus newStatus, string? changedBy);
    }
}
