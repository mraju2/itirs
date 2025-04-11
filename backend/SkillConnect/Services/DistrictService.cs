using SkillConnect.Repositories.Interfaces;
using AutoMapper;
using SkillConnect.Models;
using SkillConnect.Services.Interfaces;
using SkillConnect.Dtos;
namespace SkillConnect.Services
{
    public class DistrictService : IDistrictService
    {
        private readonly IDistrictRepository _repo;
        public DistrictService(IDistrictRepository repo) => _repo = repo;

        public Task<List<DistrictDto>> GetByStateIdAsync(int stateId) => _repo.GetByStateIdAsync(stateId);
        public Task<DistrictDto?> GetByIdAsync(int id) => _repo.GetByIdAsync(id);
    }

}