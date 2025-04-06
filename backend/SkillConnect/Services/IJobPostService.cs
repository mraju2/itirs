using SkillConnect.Models;
using SkillConnect.Dtos;

namespace SkillConnect.Services.Interfaces
{
    public interface IJobPostService
    {
        Task<IEnumerable<JobPostDto>> GetAllAsync();
        Task<JobPostDto?> GetByIdAsync(string id);
        Task<JobPostDto> CreateAsync(JobPostDto jobPostDto); Task UpdateAsync(JobPostDto dto);
        Task DeleteAsync(string id);

        // New method for paginated, sorted, filtered, and searchable job posts
        Task<PaginatedResult<JobPostDto>> GetPaginatedAsync(
            int pageNumber,
            int pageSize,
            string? searchTerm,
            Dictionary<string, string>? filters,
            string? sortBy,
            bool isDescending);
    }
}
