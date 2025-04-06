using SkillConnect.Dtos;

namespace SkillConnect.Services.Interfaces
{
    public interface IJobPostService
    {
        Task<IEnumerable<JobPostDto>> GetAllAsync();
        Task<JobPostDto?> GetByIdAsync(string id);

        Task<JobPostDto> CreateAsync(JobPostCreateDto jobPostCreateDto);
        Task UpdateAsync(JobPostUpdateDto jobPostUpdateDto);
        Task DeleteAsync(string id);

        Task<PaginatedResult<JobPostDto>> GetPaginatedAsync(
            int pageNumber,
            int pageSize,
            string? searchTerm,
            Dictionary<string, string>? filters,
            string? sortBy,
            bool isDescending);

        Task<List<JobPostDto>> GetByCompanyIdAsync(Guid companyId);

    }
}
