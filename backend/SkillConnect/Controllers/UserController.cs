    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using SkillConnect.Dtos; // ✅ Updated DTO namespace
    using SkillConnect.Services.Interfaces;

    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _registrationService;
        private readonly ILogger<UserController> _logger;

        public UserController(IUserService registrationService, ILogger<UserController> logger)
        {
            _registrationService = registrationService;
            _logger = logger;
        }

        // GET: api/users
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _registrationService.GetAllRegistrationsAsync();
            return Ok(users);
        }

        // GET: api/users/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(string id)
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
        public async Task<IActionResult> RegisterUser([FromBody] CreateUserDto dto)
        {
            _logger.LogInformation("Registering new user: {@CreateUserDto}", dto);

            try
            {
                // Validate required fields
                if (string.IsNullOrEmpty(dto.Email))
                    return BadRequest(new { Message = "Email is required" });
                if (string.IsNullOrEmpty(dto.PhoneNumber))
                    return BadRequest(new { Message = "Phone number is required" });
                if (dto.TradeId <= 0)
                    return BadRequest(new { Message = "Valid trade selection is required" });
                if (dto.StateId <= 0)
                    return BadRequest(new { Message = "State selection is required" });
                if (dto.DistrictId <= 0)
                    return BadRequest(new { Message = "District selection is required" });

                var createdUser = await _registrationService.CreateRegistrationAsync(dto);
                return CreatedAtAction(nameof(GetUserById), new { id = createdUser.Id }, createdUser);
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "Error registering user");
                
                // Handle specific error cases
                if (ex.Message.Contains("Email already exists"))
                    return Conflict(new { Message = "This email is already registered" });
                if (ex.Message.Contains("Phone number already exists"))
                    return Conflict(new { Message = "This phone number is already registered" });
                
                return BadRequest(new { 
                    Message = "Registration failed",
                    Details = ex.Message,
                    ErrorType = ex.GetType().Name
                });
            }
        }

        // PUT: api/users/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(string id, [FromBody] UpdateUserDto dto)
        {
            _logger.LogInformation("Updating user with ID {UserId}", id);

            if (id != dto.Id.ToString())
                return BadRequest(new { Message = "ID in route and body do not match" });

            try
            {
                var isUpdated = await _registrationService.UpdateRegistrationAsync(dto);
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

        // PATCH: api/users/{id}
        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchUser(string id, [FromBody] PatchUserDto dto)
        {
            _logger.LogInformation("Patching user with ID {UserId}", id);

            try
            {
                var isPatched = await _registrationService.PatchRegistrationAsync(id, dto);
                if (!isPatched)
                {
                    _logger.LogWarning("User with ID {UserId} not found for patch", id);
                    return NotFound(new { Message = "User not found" });
                }

                return Ok(new { Message = "User patched successfully" });
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "Error patching user with ID {UserId}", id);
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

        // GET: api/users/trade/{tradeId}
        [HttpGet("trade/{tradeId:int}")]
        public async Task<IActionResult> GetUsersByTrade(int tradeId)
        {
            var users = await _registrationService.GetRegistrationsByTradeIdAsync(tradeId);
            return Ok(users);
        }

        // GET: api/users/district/{district}
        [HttpGet("district/{district}")]
        public async Task<IActionResult> GetUsersByDistrict(string district)
        {
            var users = await _registrationService.GetRegistrationsByDistrictAsync(district);
            return Ok(users);
        }

        // GET: api/users/location/{location}
        [HttpGet("location/{location}")]
        public async Task<IActionResult> GetUsersByWorkLocation(string location)
        {
            var users = await _registrationService.GetRegistrationsByWorkLocationAsync(location);
            return Ok(users);
        }

        // GET: api/users/paginated
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
                var result = await _registrationService.GetPaginatedAsync(
                    pageNumber,
                    pageSize,
                    searchTerm,
                    filters,
                    sortBy,
                    isDescending
                );
                return Ok(result);
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, new { title = "Internal Server Error", message = ex.Message });
            }
        }
    }
