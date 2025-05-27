using Microsoft.AspNetCore.Mvc;
using SkillConnect.Models;
using SkillConnect.Services.Interfaces;
using SkillConnect.Dtos;

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
        public async Task<IActionResult> ApplyToJob([FromBody] JobApplicationCreateDto dto)
        {
            if (!ModelState.IsValid)
            {
                // Debug why it's invalid
                foreach (var error in ModelState)
                {
                    Console.WriteLine($"Key: {error.Key}");
                    foreach (var err in error.Value.Errors)
                    {
                        Console.WriteLine($"  Error: {err.ErrorMessage}");
                    }
                }
                return BadRequest(ModelState);
            }

            try
            {
                Console.WriteLine("✅ Model binding successful. Proceeding...");
                await _applicationService.ApplyAsync(dto);
                return Ok(new { message = "Application submitted successfully." });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while processing your application." });
            }
        }


        [HttpGet("job/{jobPostId}")]
        public async Task<IActionResult> GetByJobPostId(Guid jobPostId)
        {
            try
            {
                var applications = await _applicationService.GetByJobPostIdAsync(jobPostId);
                return Ok(applications);
            }
            catch (Exception)
            {
                return StatusCode(500, new { title = "Internal Server Error", message = "An unexpected error occurred." });
            }
        }
    }
}
