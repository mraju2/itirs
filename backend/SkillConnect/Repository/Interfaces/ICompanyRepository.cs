using SkillConnect.Models;

namespace SkillConnect.Repositories.Interfaces
{
    public interface ICompanyRepository
    {
        Task<IEnumerable<Company>> GetAllAsync();
        Task<Company?> GetByIdAsync(string id);
        Task<Company?> GetByNameAsync(string name);
        Task AddAsync(Company company);
        Task UpdateAsync(Company company);
        Task DeleteAsync(string id);
        Task<bool> ExistsByEmailOrPhoneAsync(string email, string contactPhone);


        Task<PaginatedResult<Company>> GetPaginatedAsync(
            int pageNumber,
            int pageSize,
            string? searchTerm,
            Dictionary<string, string>? filters,
            string? sortBy,
            bool isDescending);
    }
}
