using AutoMapper;
using SkillConnect.Models;
using SkillConnect.Repositories.Interfaces;
using SkillConnect.Services.Interfaces;

namespace SkillConnect.Services
{
    public class JobApplicationService : IJobApplicationService
    {
        private readonly IJobApplicationRepository _repository;
        private readonly IMapper _mapper;

        public JobApplicationService(IJobApplicationRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<JobApplicationDto>> GetAllAsync()
        {
            var apps = await _repository.GetAllAsync();
            return _mapper.Map<IEnumerable<JobApplicationDto>>(apps);
        }

        public async Task<JobApplicationDto?> GetByIdAsync(string id)
        {
            var app = await _repository.GetByIdAsync(id);
            return app == null ? null : _mapper.Map<JobApplicationDto>(app);
        }

        public async Task<IEnumerable<JobApplicationDto>> GetByCandidateIdAsync(string candidateId)
        {
            var apps = await _repository.GetByCandidateIdAsync(candidateId);
            return _mapper.Map<IEnumerable<JobApplicationDto>>(apps);
        }

        public async Task<IEnumerable<JobApplicationDto>> GetByJobPostIdAsync(string jobPostId)
        {
            var apps = await _repository.GetByJobPostIdAsync(jobPostId);
            return _mapper.Map<IEnumerable<JobApplicationDto>>(apps);
        }

        public async Task ApplyAsync(JobApplicationDto dto)
        {
            var entity = _mapper.Map<JobApplication>(dto);
            entity.AppliedAtUnix = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds();
            await _repository.AddAsync(entity);
        }

        public async Task UpdateAsync(JobApplicationDto dto)
        {
            var entity = _mapper.Map<JobApplication>(dto);
            await _repository.UpdateAsync(entity);
        }
    }
}
