using Microsoft.AspNetCore.Mvc;
using SkillConnect.Models;
using SkillConnect.Services.Interfaces;
using SkillConnect.Dtos;

namespace SkillConnect.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CompaniesController : ControllerBase
    {
        private readonly ICompanyService _companyService;

        public CompaniesController(ICompanyService companyService)
        {
            _companyService = companyService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var companies = await _companyService.GetAllAsync();
                return Ok(companies);
            }
            catch (Exception ex)
            {
                // Log the error (optional)
                // _logger.LogError(ex, "Error occurred while fetching all companies.");
                return StatusCode(500, new { title = "Internal Server Error", message = "An unexpected error occurred." });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            try
            {
                CompanyDto company = await _companyService.GetByIdAsync(id);
                return company is not null ? Ok(company) : NotFound(new { title = "Not Found", message = "Company not found." });
            }
            catch (Exception ex)
            {
                // Log the error (optional)
                // _logger.LogError(ex, "Error occurred while fetching company by ID.");
                return StatusCode(500, new { title = "Internal Server Error", message = "An unexpected error occurred." });
            }
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchCompanies([FromQuery] string query)
        {
            try
            {
                var results = await _companyService.SearchAsync(query); // returns List<CompanySummaryDto>
                return Ok(results);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { title = "Internal Server Error", message = "Failed to search companies." });
            }
        }


        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromBody] CompanyCreateDto dto)
        {
            try
            {
                var created = await _companyService.CreateAsync(dto);
                return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
            }
            catch (CustomException ex)
            {
                return StatusCode(ex.StatusCode, new { title = ex.Title, message = ex.Message });
            }
            catch (Exception ex)
            {
                // Log the error (optional)
                // _logger.LogError(ex, "Error occurred while creating a company.");
                return StatusCode(500, new { title = "Internal Server Error", message = "An unexpected error occurred." });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] CompanyUpdateDto dto)
        {
            try
            {
                if (id != dto.Id.ToString())
                    return BadRequest(new { title = "Bad Request", message = "Company ID mismatch." });

                await _companyService.UpdateAsync(dto);
                return NoContent();
            }
            catch (CustomException ex)
            {
                return StatusCode(ex.StatusCode, new { title = ex.Title, message = ex.Message });
            }
            catch (Exception ex)
            {
                // Log the error (optional)
                // _logger.LogError(ex, "Error occurred while updating a company.");
                return StatusCode(500, new { title = "Internal Server Error", message = "An unexpected error occurred." });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            try
            {
                await _companyService.DeleteAsync(id);
                return Ok(new { message = "Company deleted successfully." });
            }
            catch (CustomException ex)
            {
                return StatusCode(ex.StatusCode, new { title = ex.Title, message = ex.Message });
            }
            catch (Exception ex)
            {
                // Log the error (optional)
                // _logger.LogError(ex, "Error occurred while deleting a company.");
                return StatusCode(500, new { title = "Internal Server Error", message = "An unexpected error occurred." });
            }
        }

        [HttpGet("paginated")]
        public async Task<IActionResult> GetPaginatedAsync([FromQuery] PaginatedQueryParams query)
        {
            try
            {
                var result = await _companyService.GetPaginatedAsync(
                    query.PageNumber,
                    query.PageSize,
                    query.SearchTerm,
                    query.Filters,
                    query.SortBy,
                    query.IsDescending
                );
                return Ok(result);
            }
            catch (Exception ex)
            {
                // Log the error (optional)
                // _logger.LogError(ex, "Error occurred while fetching paginated companies.");
                return StatusCode(500, new { title = "Internal Server Error", message = "An unexpected error occurred." });
            }
        }
    }
}
