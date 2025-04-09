
using Microsoft.AspNetCore.Mvc;
using SkillConnect.Services.Interfaces;
using SkillConnect.Dtos;

namespace SkillConnect.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StatesController : ControllerBase
    {
        private readonly IStateService _service;
        public StatesController(IStateService service) => _service = service;

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _service.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var state = await _service.GetByIdAsync(id);
            return state == null ? NotFound() : Ok(state);
        }
    }
}