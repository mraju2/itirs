using SkillConnect.Dtos;

namespace SkillConnect.Services.Interfaces
{
    public interface ITradeService
    {
        Task<IEnumerable<TradeDto>> GetAllAsync();
        Task<TradeDto?> GetByIdAsync(int id);
    }
}
