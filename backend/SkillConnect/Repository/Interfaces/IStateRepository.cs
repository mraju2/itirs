using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SkillConnect.Models;
using SkillConnect.Dtos;


namespace SkillConnect.Repositories.Interfaces
{
    public interface IStateRepository
    {
        Task<List<StateDto>> GetAllStatesAsync();
        Task<StateDto?> GetByIdAsync(int id);
    }
}