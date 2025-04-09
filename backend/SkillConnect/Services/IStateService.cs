using SkillConnect.Dtos;

namespace SkillConnect.Services.Interfaces
{
    public interface IStateService
    {
        Task<List<StateDto>> GetAllAsync();
        Task<StateDto?> GetByIdAsync(int id);
    }
}