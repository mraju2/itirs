using Microsoft.AspNetCore.Mvc;
using SkillConnect.Services.Interfaces;
using SkillConnect.Dtos;

namespace SkillConnect.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TradesController : ControllerBase
    {
        private readonly ITradeService _service;
        public TradesController(ITradeService service) => _service = service;

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _service.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var trade = await _service.GetByIdAsync(id);
            return trade == null ? NotFound() : Ok(trade);
        }
    }
}
