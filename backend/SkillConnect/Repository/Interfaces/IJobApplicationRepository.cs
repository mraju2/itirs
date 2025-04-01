using SkillConnect.Models;

namespace SkillConnect.Repositories.Interfaces
{
    public interface IJobApplicationRepository
    {
        Task<IEnumerable<JobApplication>> GetAllAsync();
        Task<JobApplication?> GetByIdAsync(string id);
        Task<IEnumerable<JobApplication>> GetByCandidateIdAsync(string candidateId);
        Task<IEnumerable<JobApplication>> GetByJobPostIdAsync(string jobPostId);
        Task AddAsync(JobApplication application);
        Task UpdateAsync(JobApplication application);
        Task DeleteAsync(string id);
    }
}
