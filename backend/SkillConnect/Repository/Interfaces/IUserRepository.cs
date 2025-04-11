using SkillConnect.Models;


namespace SkillConnect.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllRegistrationsAsync();
        Task<User?> GetRegistrationByIdAsync(string id);
        Task<User?> GetRegistrationByEmailAsync(string email);
        Task<User?> GetRegistrationByPhoneAsync(string phone);
        Task<User> CreateRegistrationAsync(User user);
        Task<bool> UpdateRegistrationAsync(User user);
        Task<bool> DeleteRegistrationAsync(string id);
        Task<bool> EmailExistsAsync(string email);
        Task<bool> PhoneNumberExistsAsync(string phone);
        Task<IEnumerable<User>> GetRegistrationsByTradeIdAsync(int tradeId);
        Task<IEnumerable<User>> GetRegistrationsByDistrictAsync(string district);
        Task<IEnumerable<User>> GetRegistrationsByWorkLocationAsync(string location);

        Task<PaginatedResult<User>> GetPaginatedAsync(
            int pageNumber,
            int pageSize,
            string? searchTerm,
            Dictionary<string, string>? filters,
            string? sortBy,
            bool isDescending);
    }
}


