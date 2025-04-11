using Microsoft.EntityFrameworkCore;
using SkillConnect.Data;
using SkillConnect.Dtos;
using SkillConnect.Repositories.Interfaces;

namespace SkillConnect.Repositories
{
    public class DistrictRepository : IDistrictRepository
    {
        private readonly AppDbContext _context;
        public DistrictRepository(AppDbContext context) => _context = context;

        public async Task<List<DistrictDto>> GetByStateIdAsync(int stateId) =>
            await _context.District
                .Where(d => d.StateId == stateId)
                .Select(d => new DistrictDto
                {
                    Id = d.Id,
                    Name = d.Name,
                    NameTelugu = d.NameTelugu,
                    StateId = d.StateId
                }).ToListAsync();

        public async Task<DistrictDto?> GetByIdAsync(int id) =>
            await _context.District
                .Where(d => d.Id == id)
                .Select(d => new DistrictDto { Id = d.Id, Name = d.Name, NameTelugu = d.NameTelugu, StateId = d.StateId })
                .FirstOrDefaultAsync();
    }
}
