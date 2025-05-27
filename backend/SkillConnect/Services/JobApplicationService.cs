using AutoMapper;
using SkillConnect.Dtos;
using SkillConnect.Models;
using SkillConnect.Repositories.Interfaces;
using SkillConnect.Services.Interfaces;
using SkillConnect.Data;
using Microsoft.EntityFrameworkCore;

namespace SkillConnect.Services
{
    public class JobApplicationService : IJobApplicationService
    {
        private readonly IJobApplicationRepository _repository;
        private readonly IMapper _mapper;
        private readonly ILogger<JobApplicationService> _logger;
        private readonly AppDbContext _context;

        public JobApplicationService(
            IJobApplicationRepository repository, 
            IMapper mapper, 
            ILogger<JobApplicationService> logger,
            AppDbContext context)
        {
            _repository = repository;
            _mapper = mapper;
            _logger = logger;
            _context = context;
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

        public async Task ApplyAsync(JobApplicationCreateDto dto)
        {
            try
            {
                // Log the incoming DTO with detailed information
                _logger.LogInformation("Attempting to create job application with JobPostId: {JobPostId}", dto.JobPostId);
                _logger.LogInformation("JobPostId type: {Type}", dto.JobPostId.GetType().Name);
                
                // Try to find the job post directly using the context
                var jobPost = await _context.JobPosts
                    .AsNoTracking()
                    .FirstOrDefaultAsync(j => j.Id == dto.JobPostId);
                
                if (jobPost == null)
                {
                    _logger.LogError("Job post with ID {JobPostId} not found in database", dto.JobPostId);
                    // Log all job post IDs for debugging
                    var allJobPostIds = await _context.JobPosts.Select(j => j.Id).ToListAsync();
                    _logger.LogError("Available job post IDs: {JobPostIds}", string.Join(", ", allJobPostIds));
                    throw new KeyNotFoundException($"Job post with ID {dto.JobPostId} not found");
                }

                _logger.LogInformation("Found job post: {JobPostId}", jobPost.Id);

                var entity = _mapper.Map<JobApplication>(dto);
                entity.AppliedAtUnix = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
                await _repository.AddAsync(entity);
            }
            catch (AutoMapperMappingException ex)
            {
                _logger.LogError(ex, "❌ AutoMapper failed while mapping JobApplicationCreateDto.");
                throw;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "❌ Failed to create job application");
                throw;
            }
        }

        public async Task<List<JobApplicationDto>> GetByJobPostIdAsync(Guid jobPostId)
        {
            var applications = await _repository.GetByJobPostIdAsync(jobPostId);
            return _mapper.Map<List<JobApplicationDto>>(applications);
        }

    }
}
