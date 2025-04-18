using SkillConnect.Dtos;
using System.Collections.Generic;
namespace SkillConnect.Services.Interfaces
{
    public interface ICompanyService
    {
        Task<IEnumerable<CompanyDto>> GetAllAsync();
        Task<CompanyDto?> GetByIdAsync(string id);
        Task<CompanyDto> CreateAsync(CompanyCreateDto dto);
        Task UpdateAsync(CompanyUpdateDto dto);
        Task DeleteAsync(string id);
        Task<PaginatedResult<CompanyDto>> GetPaginatedAsync(
                   int pageNumber,
                   int pageSize,
                   string? searchTerm,
                   Dictionary<string, string>? filters,
                   string? sortBy,
                   bool isDescending);
        Task<List<CompanySummaryDto>> SearchAsync(string query);

    }
}
