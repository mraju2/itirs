using Microsoft.AspNetCore.Mvc;
using SkillConnect.Models;
using SkillConnect.Services.Interfaces;

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
            var companies = await _companyService.GetAllAsync();
            return Ok(companies);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(string id)
        {
            var company = await _companyService.GetByIdAsync(id);
            return company is not null ? Ok(company) : NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CompanyDto dto)
        {
            await _companyService.CreateAsync(dto);
            return Ok(new { message = "Company created successfully" });
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] CompanyDto dto)
        {
            if (id != dto.Id)
                return BadRequest("Company ID mismatch");

            await _companyService.UpdateAsync(dto);
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(string id)
        {
            await _companyService.DeleteAsync(id);
            return Ok(new { message = "Company deleted successfully" });
        }
    }
}
