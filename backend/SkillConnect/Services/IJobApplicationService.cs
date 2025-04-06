
namespace SkillConnect.Services.Interfaces
{
    public interface IJobApplicationService
    {
        Task<IEnumerable<JobApplicationDto>> GetAllAsync();
        Task<JobApplicationDto?> GetByIdAsync(string id);
        Task<IEnumerable<JobApplicationDto>> GetByCandidateIdAsync(string candidateId);
        Task<IEnumerable<JobApplicationDto>> GetByJobPostIdAsync(string jobPostId);
        Task ApplyAsync(JobApplicationDto dto);
        Task UpdateAsync(JobApplicationDto dto);
    }
}
