
namespace SkillConnect.Services.Interfaces
{
    public interface IJobPostService
    {
        Task<IEnumerable<JobPostDto>> GetAllAsync();
        Task<JobPostDto?> GetByIdAsync(string id);
        Task CreateAsync(JobPostDto dto);
        Task UpdateAsync(JobPostDto dto);
        Task DeleteAsync(string id);
    }
}
