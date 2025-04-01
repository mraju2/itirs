using SkillConnect.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;
using SkillConnect.Models;
namespace SkillConnect.Services.Interfaces;

[ApiController]
[Route("api/[controller]")]
public class JobPostsController : ControllerBase
{
    private readonly IJobPostService _jobPostService;

    public JobPostsController(IJobPostService jobPostService)
    {
        _jobPostService = jobPostService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _jobPostService.GetAllAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(string id)
    {
        var job = await _jobPostService.GetByIdAsync(id);
        return job is null ? NotFound() : Ok(job);
    }

    [HttpPost]
    public async Task<IActionResult> Create(JobPostDto dto)
    {
        await _jobPostService.CreateAsync(dto);
        return Ok();
    }

    [HttpPut]
    public async Task<IActionResult> Update(JobPostDto dto)
    {
        await _jobPostService.UpdateAsync(dto);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        await _jobPostService.DeleteAsync(id);
        return NoContent();
    }
}
