using SkillConnect.Repositories.Interfaces;
using AutoMapper;
using SkillConnect.Models;
using SkillConnect.Services.Interfaces;
using SkillConnect.Dtos;
using System.ComponentModel.DataAnnotations;
using SkillConnect.Data;

namespace SkillConnect.Services
{
    public class JobPostService : IJobPostService
    {
        private readonly IJobPostRepository _repository;
        private readonly IMapper _mapper;
        private readonly AppDbContext _context;


        public JobPostService(IJobPostRepository repository, IMapper mapper,AppDbContext context)
        {
            _repository = repository;
            _mapper = mapper;
            _context = context;
        }

        public async Task<IEnumerable<JobPostDto>> GetAllAsync()
        {
            var jobs = await _repository.GetAllAsync();
            return _mapper.Map<IEnumerable<JobPostDto>>(jobs);
        }

        public async Task<JobPostDto?> GetByIdAsync(string id)
        {
            var job = await _repository.GetByIdAsync(id);
            return job == null ? null : _mapper.Map<JobPostDto>(job);
        }

        public async Task<JobPostDto> CreateAsync(JobPostCreateDto dto)
        {
            try
            {
                ValidateJobPostDto(dto);
                var jobPost = MapToJobPostWithDefaults(dto);
                await _repository.AddAsync(jobPost);

                return _mapper.Map<JobPostDto>(jobPost);
            }
            catch (InvalidOperationException ex)
            {
                Console.WriteLine(ex.Message);
                throw new CustomException("Validation Error", ex.Message, 400);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new CustomException("Internal Server Error", "An unexpected error occurred.", 500);
            }
        }

        public async Task UpdateAsync(JobPostUpdateDto dto)
        {
            var existing = await _repository.GetByIdAsync(dto.Id.ToString());
            if (existing == null)
                throw new CustomException("Not Found", "Job post not found", 404);

            Console.WriteLine($"[🔎] JobPost ID: {dto.Id}");
            Console.WriteLine($"[📦] Existing TradeIds: {string.Join(", ", existing.JobPostTrades.Select(t => t.TradeId))}");
            Console.WriteLine($"[🛬] Incoming TradeIds: {string.Join(", ", dto.TradeIds)}");

            // ✅ Map scalar fields (in-place)
            _mapper.Map(dto, existing);

            // ✅ Update trades manually
            if (dto.TradeIds != null)
            {
                _context.JobPostTrade.RemoveRange(existing.JobPostTrades); // flush old
                existing.JobPostTrades = dto.TradeIds.Select(id => new JobPostTrade
                {
                    JobPostId = existing.Id,
                    TradeId = id
                }).ToList();
            }

            await _repository.UpdateAsync(existing); // let repo just call SaveChanges
        }


        public async Task<List<JobPostDto>> GetByCompanyIdAsync(Guid companyId)
        {
            var jobPosts = await _repository.GetJobPostsByCompanyIdAsync(companyId);
            return _mapper.Map<List<JobPostDto>>(jobPosts);
        }


        public async Task DeleteAsync(string id)
        {
            await _repository.DeleteAsync(id);
        }

        public async Task<PaginatedResult<JobPostDto>> GetPaginatedAsync(
            int pageNumber,
            int pageSize,
            string? searchTerm,
            Dictionary<string, string>? filters,
            string? sortBy,
            bool isDescending)
        {
            var paginatedJobs = await _repository.GetPaginatedAsync(
                pageNumber,
                pageSize,
                searchTerm,
                filters,
                sortBy,
                isDescending
            );

            return new PaginatedResult<JobPostDto>
            {
                Items = _mapper.Map<List<JobPostDto>>(paginatedJobs.Items),
                TotalCount = paginatedJobs.TotalCount,
                PageNumber = pageNumber,
                PageSize = pageSize
            };
        }

        private void ValidateJobPostDto(JobPostCreateDto dto)
        {
            if (dto.MaxAge.HasValue && dto.MaxAge < dto.MinAge)
                throw new ValidationException("MaxAge must be greater than or equal to MinAge.");

            if (dto.SalaryMax < dto.SalaryMin)
                throw new ValidationException("SalaryMax must be greater than or equal to SalaryMin.");

            if (dto.ExperienceMax.HasValue && dto.ExperienceMax < dto.ExperienceMin)
                throw new ValidationException("ExperienceMax must be greater than or equal to ExperienceMin.");
        }

        private JobPost MapToJobPostWithDefaults(JobPostCreateDto dto)
        {
            var nowUnix = DateTimeOffset.UtcNow.ToUnixTimeSeconds();

            return new JobPost
            {
                Id = Guid.NewGuid(),
                CompanyId = dto.CompanyId,
                StateId = dto.StateId,
                DistrictId = dto.DistrictId,
                JobTitle = dto.JobTitle,
                Location = dto.JobLocation,
                JobDescription = dto.JobDescription,
                EmploymentType = dto.EmploymentType,
                ApplicationProcess = dto.ApplicationProcess,
                ApplicationDeadlineUnix = dto.ApplicationDeadlineUnix,
                AdditionalBenefits = dto.AdditionalBenefits,
                GenderRequirement = dto.GenderRequirement,
                MinAge = dto.MinAge,
                MaxAge = dto.MaxAge,
                SalaryMin = dto.SalaryMin,
                SalaryMax = dto.SalaryMax,
                AccommodationProvided = dto.AccommodationProvided,
                Vacancies = dto.Vacancies,
                FacilitiesProvided = dto.FacilitiesProvided,
                WorkingHoursMin = dto.WorkingHoursMin,
                WorkingHoursMax = dto.WorkingHoursMax ?? dto.WorkingHoursMin,
                ExperienceMin = dto.ExperienceMin,
                ExperienceMax = dto.ExperienceMax,
                ApprenticesConsidered = dto.ApprenticesConsidered,
                Urgent = dto.Urgent,
                CreatedAtUnix = nowUnix,
                ModifiedAtUnix = null,
                JobPostTrades = dto.TradeIds.Select(id => new JobPostTrade { TradeId = id }).ToList()
            };
        }
    }
}
