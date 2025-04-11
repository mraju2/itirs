
using SkillConnect.Dtos;

namespace SkillConnect.Services.Interfaces
{
    public interface IJobApplicationService
    {
        Task<IEnumerable<JobApplicationDto>> GetAllAsync();
        Task<JobApplicationDto?> GetByIdAsync(string id);
        Task<IEnumerable<JobApplicationDto>> GetByCandidateIdAsync(string candidateId);
        Task<IEnumerable<JobApplicationDto>> GetByJobPostIdAsync(string jobPostId);
        Task ApplyAsync(JobApplicationCreateDto dto);
        Task<List<JobApplicationDto>> GetByJobPostIdAsync(Guid jobPostId);

    }
}
