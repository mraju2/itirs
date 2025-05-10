using Microsoft.AspNetCore.Mvc;
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
                return Ok(jobPosts); // List<JobPostDto>
            }
            catch (Exception)
            {
                return StatusCode(500, new { title = "Internal Server Error", message = "An unexpected error occurred." });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            try
            {
                var job = await _jobPostService.GetByIdAsync(id);
                return job is not null
                    ? Ok(job) // JobPostDto
                    : NotFound(new { title = "Not Found", message = "Job post not found." });
            }
            catch (Exception)
            {
                return StatusCode(500, new { title = "Internal Server Error", message = "An unexpected error occurred." });
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] JobPostCreateDto dto)
        {
            try
            {
                Console.WriteLine("Received DTO:");
                Console.WriteLine(System.Text.Json.JsonSerializer.Serialize(dto));
                var created = await _jobPostService.CreateAsync(dto);
                return CreatedAtAction(nameof(Get), new { id = created.Id }, created); // returns JobPostDto
            }
            catch (CustomException ex)
            {
                return StatusCode(ex.StatusCode, new { title = ex.Title, message = ex.Message });
            }
            catch (Exception)
            {
                return StatusCode(500, new { title = "Internal Server Error", message = "An unexpected error occurred." });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] JobPostUpdateDto dto)
        {
            try
            {
                if (id != dto.Id.ToString())
                    return BadRequest(new { title = "Bad Request", message = "Company ID mismatch." });

                await _jobPostService.UpdateAsync(dto);
                return NoContent();
            }
            catch (CustomException ex)
            {
                return StatusCode(ex.StatusCode, new { title = ex.Title, message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { title = "Internal Server Error", message = ex.Message });
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
            catch (Exception)
            {
                return StatusCode(500, new { title = "Internal Server Error", message = "An unexpected error occurred." });
            }
        }

        [HttpGet("company/{companyId}")]
        public async Task<IActionResult> GetByCompanyId(Guid companyId)
        {
            try
            {
                var jobs = await _jobPostService.GetByCompanyIdAsync(companyId);
                return Ok(jobs);
            }
            catch (Exception)
            {
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
                return Ok(result); // PaginatedResult<JobPostDto>
            }
            catch (Exception)
            {
                return StatusCode(500, new { title = "Internal Server Error", message = "An unexpected error occurred." });
            }
        }

        [HttpPatch("status")]
        public async Task<IActionResult> UpdateStatus([FromBody] JobPostStatusUpdateDto statusUpdateDto)
        {
            try
            {
                await _jobPostService.UpdateJobPostStatusAsync(statusUpdateDto);
                return Ok(new { message = "Job post status updated successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }
}
