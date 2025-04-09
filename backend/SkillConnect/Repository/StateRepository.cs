using Microsoft.EntityFrameworkCore;
using SkillConnect.Data;
using SkillConnect.Dtos;
using SkillConnect.Repositories.Interfaces;

namespace SkillConnect.Repositories
{
    public class StateRepository : IStateRepository
    {
        private readonly AppDbContext _context;
        public StateRepository(AppDbContext context) => _context = context;

        public async Task<List<StateDto>> GetAllStatesAsync() =>
            await _context.State.Select(s => new StateDto
            {
                Id = s.Id,
                Name = s.Name,
                NameTelugu = s.NameTelugu
            }).ToListAsync();

        public async Task<StateDto?> GetByIdAsync(int id) =>
            await _context.State
                .Where(s => s.Id == id)
                .Select(s => new StateDto { Id = s.Id, Name = s.Name, NameTelugu = s.NameTelugu })
                .FirstOrDefaultAsync();
    }
}