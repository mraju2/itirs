using System.Collections.Generic;
using System.Threading.Tasks;
using SkillConnect.Models;

namespace SkillConnect.Services.Interfaces
{
    public interface IUserRegistrationService
    {
        Task<IEnumerable<UserDTO>> GetAllRegistrationsAsync();
        Task<UserDTO> GetRegistrationByIdAsync(string id);
        Task<UserDTO> GetRegistrationByEmailAsync(string email);
        Task<UserDTO> GetRegistrationByPhoneAsync(string phone);
        Task<UserDTO> CreateRegistrationAsync(UserDTO registration);
        Task<bool> UpdateRegistrationAsync(string id, UserDTO registration);
        Task<bool> DeleteRegistrationAsync(string id);
        Task<bool> PhoneNumberExistsAsync(string phoneNumber);
        Task<bool> EmailExistsAsync(string email);
        Task<IEnumerable<UserDTO>> GetRegistrationsByTradeAsync(string trade);
        Task<IEnumerable<UserDTO>> GetRegistrationsByDistrictAsync(string district);
        Task<IEnumerable<UserDTO>> GetRegistrationsByWorkLocationAsync(string location);

        // New method for paginated, sorted, filtered, and searchable user registrations
        Task<PaginatedResult<UserDTO>> GetPaginatedAsync(
            int pageNumber,
            int pageSize,
            string? searchTerm,
            Dictionary<string, string>? filters,
            string? sortBy,
            bool isDescending);
    }
}
