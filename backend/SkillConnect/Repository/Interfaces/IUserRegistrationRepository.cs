using SkillConnect.Models;

namespace SkillConnect.Repositories.Interfaces
{
    public interface IUserRegistrationRepository
    {
        Task<IEnumerable<UserModel>> GetAllRegistrationsAsync();
        Task<UserModel> GetRegistrationByIdAsync(string id);
        Task<UserModel> GetRegistrationByEmailAsync(string email);
        Task<UserModel> GetRegistrationByPhoneAsync(string phone);
        Task<UserModel> CreateRegistrationAsync(UserModel registration);
        Task<bool> UpdateRegistrationAsync(UserModel registration);
        Task<bool> DeleteRegistrationAsync(string id);
        Task<bool> PhoneNumberExistsAsync(string phoneNumber);
        Task<bool> EmailExistsAsync(string email);
        Task<IEnumerable<UserModel>> GetRegistrationsByTradeAsync(string trade);
        Task<IEnumerable<UserModel>> GetRegistrationsByDistrictAsync(string district);
        Task<IEnumerable<UserModel>> GetRegistrationsByWorkLocationAsync(string location);

        // New method for paginated, sorted, filtered, and searchable user registrations
        Task<PaginatedResult<UserModel>> GetPaginatedAsync(
            int pageNumber,
            int pageSize,
            string? searchTerm,
            Dictionary<string, string>? filters,
            string? sortBy,
            bool isDescending);
    }
}
