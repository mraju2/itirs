using SkillConnect.Repositories.Interfaces;
using AutoMapper;
using SkillConnect.Models;
using SkillConnect.Services.Interfaces;
using SkillConnect.Dtos;
using System.ComponentModel.DataAnnotations;
using SkillConnect.Data;
using SkillConnect.Exceptions;

namespace SkillConnect.Services
{
    public class JobPostService : IJobPostService
    {
        private readonly IJobPostRepository _repository;
        private readonly IMapper _mapper;
        private readonly AppDbContext _context;


        public JobPostService(IJobPostRepository repository, IMapper mapper, AppDbContext context)
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

            _mapper.Map(dto, existing);

            await _repository.UpdateAsync(existing); // let repo just call SaveChanges
        }

        public async Task UpdateJobPostStatusAsync(JobPostStatusUpdateDto statusUpdateDto)
        {
            await _repository.UpdateStatusAsync(
                statusUpdateDto.JobPostId,
                statusUpdateDto.Status,
                statusUpdateDto.ChangedBy
            );
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
            var errors = new List<string>();

            // Required field validations
            if (string.IsNullOrWhiteSpace(dto.JobTitle))
                errors.Add("Job title is required.");
            if (string.IsNullOrWhiteSpace(dto.JobLocation))
                errors.Add("Job location is required.");
            if (string.IsNullOrWhiteSpace(dto.JobDescription))
                errors.Add("Job description is required.");
            if (string.IsNullOrWhiteSpace(dto.EmploymentType))
                errors.Add("Employment type is required.");
            if (string.IsNullOrWhiteSpace(dto.ApplicationProcess))
                errors.Add("Application process is required.");
            if (string.IsNullOrWhiteSpace(dto.GenderRequirement))
                errors.Add("Gender requirement is required.");

            // Date validations
            var now = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
            if (dto.ApplicationDeadlineUnix <= now)
                errors.Add("Application deadline must be in the future.");

            // Age validations
            if (dto.MinAge < 14 || dto.MinAge > 60)
                errors.Add("Minimum age must be between 14 and 60 years.");
            if (dto.MaxAge.HasValue)
            {
                if (dto.MaxAge < 14 || dto.MaxAge > 65)
                    errors.Add("Maximum age must be between 14 and 65 years.");
                if (dto.MaxAge < dto.MinAge)
                    errors.Add("Maximum age must be greater than or equal to minimum age.");
            }

            // Salary validations
            if (dto.SalaryMin < 0)
                errors.Add("Minimum salary cannot be negative.");
            if (dto.SalaryMax < dto.SalaryMin)
                errors.Add("Maximum salary must be greater than or equal to minimum salary.");

            // Working hours validations
            if (dto.WorkingHoursMin < 1 || dto.WorkingHoursMin > 12)
                errors.Add("Minimum working hours must be between 1 and 12 hours.");
            if (dto.WorkingHoursMax.HasValue)
            {
                if (dto.WorkingHoursMax < 1 || dto.WorkingHoursMax > 16)
                    errors.Add("Maximum working hours must be between 1 and 16 hours.");
                if (dto.WorkingHoursMax < dto.WorkingHoursMin)
                    errors.Add("Maximum working hours must be greater than or equal to minimum working hours.");
            }

            // Experience validations
            if (dto.ExperienceMin < 0 || dto.ExperienceMin > 40)
                errors.Add("Minimum experience must be between 0 and 40 years.");
            if (dto.ExperienceMax.HasValue)
            {
                if (dto.ExperienceMax < 0 || dto.ExperienceMax > 50)
                    errors.Add("Maximum experience must be between 0 and 50 years.");
                if (dto.ExperienceMax < dto.ExperienceMin)
                    errors.Add("Maximum experience must be greater than or equal to minimum experience.");
            }

            // Trade validations
            if (dto.TradeIds == null || !dto.TradeIds.Any())
                errors.Add("At least one trade must be selected.");

            // Minimum qualifications validation
            if (dto.MinimumQualifications == null || !dto.MinimumQualifications.Any())
                errors.Add("At least one minimum qualification must be selected.");

            if (errors.Any())
            {
                throw new SkillConnect.Exceptions.ValidationException(string.Join("\n", errors));
            }
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
