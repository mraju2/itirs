using SkillConnect.Repositories.Interfaces;
using AutoMapper;
using SkillConnect.Models;
using SkillConnect.Services.Interfaces;
using SkillConnect.Dtos;

public class JobPostService : IJobPostService
{
    private readonly IJobPostRepository _repository;
    private readonly IMapper _mapper; // AutoMapper (optional but recommended)

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

    public async Task<JobPostDto> CreateAsync(JobPostDto dto)
    {
        try
        {

            var entity = _mapper.Map<JobPost>(dto);
            await _repository.AddAsync(entity); // Make sure this includes SaveChangesAsync

            return _mapper.Map<JobPostDto>(entity);
        }
        catch (InvalidOperationException ex)
        {
            Console.WriteLine(ex.Message);
            // Optional: _logger.LogWarning(ex, "Validation failed while creating job post");
            throw new CustomException("Validation Error", ex.Message, 400);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);

            // Optional: _logger.LogError(ex, "Unexpected error during job post creation");
            throw new CustomException("Internal Server Error", "An unexpected error occurred.", 500);
        }
    }


    public async Task UpdateAsync(JobPostDto dto)
    {
        var entity = _mapper.Map<JobPost>(dto);
        await _repository.UpdateAsync(entity);
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
        // Fetch paginated data from the repository
        var paginatedJobs = await _repository.GetPaginatedAsync(
            pageNumber,
            pageSize,
            searchTerm,
            filters,
            sortBy,
            isDescending
        );

        // Map the result to DTOs
        return new PaginatedResult<JobPostDto>
        {
            Items = _mapper.Map<IEnumerable<JobPostDto>>(paginatedJobs.Items),
            TotalCount = paginatedJobs.TotalCount
        };
    }
}
