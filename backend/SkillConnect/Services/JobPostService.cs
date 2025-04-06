using SkillConnect.Repositories.Interfaces;
using AutoMapper;
using SkillConnect.Models;
using SkillConnect.Services.Interfaces;
using SkillConnect.Dtos;

public class JobPostService : IJobPostService
{
    private readonly IJobPostRepository _repository;
    private readonly IMapper _mapper;

    public JobPostService(IJobPostRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
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
            var entity = _mapper.Map<JobPost>(dto);
            entity.CreatedAtUnix = DateTimeOffset.UtcNow.ToUnixTimeSeconds(); // set created time
            await _repository.AddAsync(entity);

            return _mapper.Map<JobPostDto>(entity);
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

        var updated = _mapper.Map(dto, existing);
        await _repository.UpdateAsync(updated);
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
}
