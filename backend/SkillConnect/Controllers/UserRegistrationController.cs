using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;
using SkillConnect.Models;
using SkillConnect.Services.Interfaces;


[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IUserRegistrationService _registrationService;
    private readonly ILogger<UserController> _logger;

    public UserController(IUserRegistrationService registrationService, ILogger<UserController> logger)
    {
        _registrationService = registrationService;
        _logger = logger;
    }

    // GET: api/users
    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserDTO>>> GetAllUsers()
    {
        var users = await _registrationService.GetAllRegistrationsAsync();
        return Ok(users);
    }

    // GET: api/users/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<UserDTO>> GetUserById(string id)
    {
        var user = await _registrationService.GetRegistrationByIdAsync(id);
        if (user == null)
        {
            _logger.LogWarning("User with ID {UserId} not found", id);
            return NotFound(new { Message = "User not found" });
        }

        return Ok(user);
    }

    // POST: api/users
    [HttpPost]
    public async Task<ActionResult<UserDTO>> RegisterUser([FromBody] UserDTO registrationDTO)
    {
        _logger.LogInformation("Registering new user: {@UserDTO}", registrationDTO);

        try
        {
            var createdUser = await _registrationService.CreateRegistrationAsync(registrationDTO);
            return CreatedAtAction(nameof(GetUserById), new { id = createdUser.Id }, createdUser);
        }
        catch (System.Exception ex)
        {
            _logger.LogError(ex, "Error registering user");
            return BadRequest(new { Message = ex.Message });
        }
    }

    // PUT: api/users/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(string id, [FromBody] UserDTO registrationDTO)
    {
        _logger.LogInformation("Updating user with ID {UserId}", id);

        try
        {
            var isUpdated = await _registrationService.UpdateRegistrationAsync(id, registrationDTO);
            if (!isUpdated)
            {
                _logger.LogWarning("User with ID {UserId} not found for update", id);
                return NotFound(new { Message = "User not found" });
            }

            return Ok(new { Message = "User updated successfully" });
        }
        catch (System.Exception ex)
        {
            _logger.LogError(ex, "Error updating user with ID {UserId}", id);
            return BadRequest(new { Message = ex.Message });
        }
    }

    // DELETE: api/users/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(string id)
    {
        _logger.LogInformation("Deleting user with ID {UserId}", id);

        try
        {
            var isDeleted = await _registrationService.DeleteRegistrationAsync(id);
            if (!isDeleted)
            {
                _logger.LogWarning("User with ID {UserId} not found for deletion", id);
                return NotFound(new { Message = "User not found" });
            }

            return Ok(new { Message = "User deleted successfully" });
        }
        catch (System.Exception ex)
        {
            _logger.LogError(ex, "Error deleting user with ID {UserId}", id);
            return BadRequest(new { Message = ex.Message });
        }
    }

    // GET: api/users/trade/{trade}
    [HttpGet("trade/{trade}")]
    public async Task<ActionResult<IEnumerable<UserDTO>>> GetUsersByTrade(string trade)
    {
        var users = await _registrationService.GetRegistrationsByTradeAsync(trade);
        return Ok(users);
    }

    // GET: api/users/district/{district}
    [HttpGet("district/{district}")]
    public async Task<ActionResult<IEnumerable<UserDTO>>> GetUsersByDistrict(string district)
    {
        var users = await _registrationService.GetRegistrationsByDistrictAsync(district);
        return Ok(users);
    }

    // GET: api/users/location/{location}
    [HttpGet("location/{location}")]
    public async Task<ActionResult<IEnumerable<UserDTO>>> GetUsersByWorkLocation(string location)
    {
        var users = await _registrationService.GetRegistrationsByWorkLocationAsync(location);
        return Ok(users);
    }
}
