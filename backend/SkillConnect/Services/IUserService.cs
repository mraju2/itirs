using SkillConnect.Dtos;

namespace SkillConnect.Services.Interfaces
{

    public interface IUserService
    {
        Task<IEnumerable<UserDto>> GetAllRegistrationsAsync();
        Task<UserDto?> GetRegistrationByIdAsync(string id);
        Task<UserDto> CreateRegistrationAsync(CreateUserDto dto);
        Task<bool> UpdateRegistrationAsync(UpdateUserDto dto);
        Task<bool> PatchRegistrationAsync(string id, PatchUserDto dto);
        Task<bool> DeleteRegistrationAsync(string id);
        Task<IEnumerable<UserDto>> GetRegistrationsByTradeIdAsync(int tradeId);
        Task<IEnumerable<UserDto>> GetRegistrationsByDistrictAsync(string district);
        Task<IEnumerable<UserDto>> GetRegistrationsByWorkLocationAsync(string location);
        Task<PaginatedResult<UserDto>> GetPaginatedAsync(
            int pageNumber,
            int pageSize,
            string? searchTerm,
            Dictionary<string, string>? filters,
            string? sortBy,
            bool isDescending
        );
    }
}
