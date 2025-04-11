using SkillConnect.Models;

namespace SkillConnect.Repositories.Interfaces
{
    public interface ITradeRepository
    {
        Task<IEnumerable<Trade>> GetAllAsync();
        Task<Trade?> GetByIdAsync(int id);
    }
}
