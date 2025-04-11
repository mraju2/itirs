using SkillConnect.Dtos;
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
        /// <summary>
        /// Searches companies by name (case-insensitive) and returns limited results for dropdowns.
        /// </summary>
        /// <param name="query">The partial or full name of the company to search.</param>
        /// <returns>List of CompanySummaryDto with matching companies.</returns>
        Task<List<CompanySummaryDto>> SearchAsync(string query);


        Task<PaginatedResult<Company>> GetPaginatedAsync(
            int pageNumber,
            int pageSize,
            string? searchTerm,
            Dictionary<string, string>? filters,
            string? sortBy,
            bool isDescending);
    }
}
