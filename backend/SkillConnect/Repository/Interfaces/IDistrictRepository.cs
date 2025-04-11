using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SkillConnect.Models;
using SkillConnect.Dtos;


namespace SkillConnect.Repositories.Interfaces
{
    public interface IDistrictRepository
    {
        Task<List<DistrictDto>> GetByStateIdAsync(int stateId);
        Task<DistrictDto?> GetByIdAsync(int id);
    }
}