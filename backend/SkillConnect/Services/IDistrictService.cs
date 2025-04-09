using SkillConnect.Dtos;

namespace SkillConnect.Services.Interfaces
{
    public interface IDistrictService
    {
        Task<List<DistrictDto>> GetByStateIdAsync(int stateId);
        Task<DistrictDto?> GetByIdAsync(int id);
    }
}