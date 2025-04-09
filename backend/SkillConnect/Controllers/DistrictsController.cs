
using Microsoft.AspNetCore.Mvc;
using SkillConnect.Services.Interfaces;
using SkillConnect.Dtos;

namespace SkillConnect.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DistrictsController : ControllerBase
    {
        private readonly IDistrictService _service;
        public DistrictsController(IDistrictService service) => _service = service;

        [HttpGet("state/{stateId}")]
        public async Task<IActionResult> GetByState(int stateId) => Ok(await _service.GetByStateIdAsync(stateId));

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var district = await _service.GetByIdAsync(id);
            return district == null ? NotFound() : Ok(district);
        }
    }
}