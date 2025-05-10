using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkillConnect.Models;
using SkillConnect.Services;

namespace SkillConnect.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // Requires JWT authentication
    public class UserController : ControllerBase
    {
        private readonly IUserPinService _userPinService;
        private readonly ILogger<UserController> _logger;

        public UserController(IUserPinService userPinService, ILogger<UserController> logger)
        {
            _userPinService = userPinService;
            _logger = logger;
        }

        [HttpPost("set-pin")]
        public async Task<IActionResult> SetPin([FromBody] PinSetupRequest request)
        {
            try
            {
                // Verify the authenticated user matches the request
                var authenticatedUserId = User.FindFirst("sub")?.Value;
                if (authenticatedUserId != request.UserId)
                {
                    return Unauthorized();
                }

                var success = await _userPinService.SetUserPin(request.UserId, request.Pin);
                
                if (!success)
                {
                    return BadRequest(new { message = "Invalid PIN format" });
                }

                return Ok(new { message = "PIN set successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in SetPin endpoint");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }
    }
}