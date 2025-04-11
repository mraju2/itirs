using AutoMapper;
using SkillConnect.Dtos;
using SkillConnect.Models;
using SkillConnect.Repositories.Interfaces;
using SkillConnect.Services.Interfaces;

namespace SkillConnect.Services
{
    public class TradeService : ITradeService
    {
        private readonly ITradeRepository _repository;
        private readonly IMapper _mapper;

        public TradeService(ITradeRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<TradeDto>> GetAllAsync()
        {
            var trades = await _repository.GetAllAsync();
            return _mapper.Map<IEnumerable<TradeDto>>(trades);
        }

        public async Task<TradeDto?> GetByIdAsync(int id)
        {
            var trade = await _repository.GetByIdAsync(id);
            return trade == null ? null : _mapper.Map<TradeDto>(trade);
        }
    }
}
