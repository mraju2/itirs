using Microsoft.AspNetCore.Mvc;
using SkillConnect.Models;
using SkillConnect.Services.Interfaces;

namespace SkillConnect.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JobApplicationsController : ControllerBase
    {
        private readonly IJobApplicationService _applicationService;

        public JobApplicationsController(IJobApplicationService applicationService)
        {
            _applicationService = applicationService;
        }

        [HttpGet("by-job/{jobId:int}")]
        public async Task<IActionResult> GetByJobPost(string jobId)
        {
            var apps = await _applicationService.GetByJobPostIdAsync(jobId);
            return Ok(apps);
        }

        [HttpGet("by-user/{candidateId:guid}")]
        public async Task<IActionResult> GetByCandidate(string candidateId)
        {
            var apps = await _applicationService.GetByCandidateIdAsync(candidateId);
            return Ok(apps);
        }

        [HttpPost]
        public async Task<IActionResult> ApplyToJob([FromBody] JobApplicationDto dto)
        {
            await _applicationService.ApplyAsync(dto);
            return Ok(new { message = "Application submitted successfully." });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] JobApplicationDto dto)
        {
            if (dto.Id != id)
                return BadRequest("ID mismatch.");

            await _applicationService.UpdateAsync(dto);
            return NoContent();
        }
    }
}
