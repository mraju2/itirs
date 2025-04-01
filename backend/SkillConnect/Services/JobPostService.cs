using SkillConnect.Repositories.Interfaces;
using AutoMapper;
using SkillConnect.Models;
using SkillConnect.Services.Interfaces;

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

    public async Task CreateAsync(JobPostDto dto)
    {
        var entity = _mapper.Map<JobPost>(dto);
        await _repository.AddAsync(entity);
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
}
