using SkillConnect.Repositories.Interfaces;
using AutoMapper;
using SkillConnect.Models;
using SkillConnect.Services.Interfaces;
using SkillConnect.Dtos;
namespace SkillConnect.Services
{
    public class StateService : IStateService
    {
        private readonly IStateRepository _repo;
        public StateService(IStateRepository repo) => _repo = repo;

        public Task<List<StateDto>> GetAllAsync() => _repo.GetAllStatesAsync();
        public Task<StateDto?> GetByIdAsync(int id) => _repo.GetByIdAsync(id);
    }
}