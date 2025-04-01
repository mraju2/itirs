
namespace SkillConnect.Services.Interfaces
{
    public interface ICompanyService
    {
        Task<IEnumerable<CompanyDto>> GetAllAsync();
        Task<CompanyDto?> GetByIdAsync(string id);
        Task CreateAsync(CompanyDto dto);
        Task UpdateAsync(CompanyDto dto);
        Task DeleteAsync(string id);
    }
}
