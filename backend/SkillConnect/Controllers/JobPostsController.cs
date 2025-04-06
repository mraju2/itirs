using Microsoft.AspNetCore.Mvc;
using SkillConnect.Models;
using SkillConnect.Services.Interfaces;
using SkillConnect.Dtos;

namespace SkillConnect.Controllers
{
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
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var jobPosts = await _jobPostService.GetAllAsync();
                return Ok(jobPosts);
            }
            catch (Exception ex)
            {
                // Log the error (optional)
                // _logger.LogError(ex, "Error occurred while fetching all job posts.");
                return StatusCode(500, new { title = "Internal Server Error", message = "An unexpected error occurred." });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            try
            {
                var job = await _jobPostService.GetByIdAsync(id);
                return job is not null ? Ok(job) : NotFound(new { title = "Not Found", message = "Job post not found." });
            }
            catch (Exception ex)
            {
                // Log the error (optional)
                // _logger.LogError(ex, "Error occurred while fetching job post by ID.");
                return StatusCode(500, new { title = "Internal Server Error", message = "An unexpected error occurred." });
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] JobPostDto dto)
        {
            try
            {
                var created = await _jobPostService.CreateAsync(dto);
                return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
            }
            catch (CustomException ex)
            {
                return StatusCode(ex.StatusCode, new { title = ex.Title, message = ex.Message });
            }
            catch (Exception ex)
            {
                // Log the error (optional)
                // _logger.LogError(ex, "Error occurred while creating a job post.");
                return StatusCode(500, new { title = "Internal Server Error", message = "An unexpected error occurred." });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] JobPostDto dto)
        {
            try
            {
                if (id != dto.Id.ToString())
                    return BadRequest(new { title = "Bad Request", message = "Job post ID mismatch." });

                await _jobPostService.UpdateAsync(dto);
                return NoContent();
            }
            catch (CustomException ex)
            {
                return StatusCode(ex.StatusCode, new { title = ex.Title, message = ex.Message });
            }
            catch (Exception ex)
            {
                // Log the error (optional)
                // _logger.LogError(ex, "Error occurred while updating a job post.");
                return StatusCode(500, new { title = "Internal Server Error", message = "An unexpected error occurred." });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            try
            {
                await _jobPostService.DeleteAsync(id);
                return Ok(new { message = "Job post deleted successfully." });
            }
            catch (CustomException ex)
            {
                return StatusCode(ex.StatusCode, new { title = ex.Title, message = ex.Message });
            }
            catch (Exception ex)
            {
                // Log the error (optional)
                // _logger.LogError(ex, "Error occurred while deleting a job post.");
                return StatusCode(500, new { title = "Internal Server Error", message = "An unexpected error occurred." });
            }
        }

        [HttpGet("paginated")]
        public async Task<IActionResult> GetPaginatedAsync(
            [FromQuery] int pageNumber,
            [FromQuery] int pageSize,
            [FromQuery] string? searchTerm,
            [FromQuery] Dictionary<string, string>? filters,
            [FromQuery] string? sortBy,
            [FromQuery] bool isDescending)
        {
            try
            {
                var result = await _jobPostService.GetPaginatedAsync(
                    pageNumber,
                    pageSize,
                    searchTerm,
                    filters,
                    sortBy,
                    isDescending
                );
                return Ok(result);
            }
            catch (Exception ex)
            {
                // Log the error (optional)
                //_logger.LogError(ex, "Error occurred while fetching paginated job posts.");
                return StatusCode(500, new { title = "Internal Server Error", message = "An unexpected error occurred." });
            }
        }
    }
}
