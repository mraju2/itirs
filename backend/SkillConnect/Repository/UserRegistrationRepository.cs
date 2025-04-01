using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SkillConnect.Data;
using SkillConnect.Models;
using SkillConnect.Repositories.Interfaces;

namespace SkillConnect.Repositories
{
    public class UserRegistrationRepository : IUserRegistrationRepository
    {
        private readonly AppDbContext _context;
        private readonly ILogger<UserRegistrationRepository> _logger;

        public UserRegistrationRepository(AppDbContext context, ILogger<UserRegistrationRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IEnumerable<UserModel>> GetAllRegistrationsAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<UserModel> GetRegistrationByIdAsync(string id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<UserModel> GetRegistrationByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<UserModel> GetRegistrationByPhoneAsync(string phone)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.PhoneNumber == phone);
        }

        public async Task<UserModel> CreateRegistrationAsync(UserModel registration)
        {
            await _context.Users.AddAsync(registration);
            await _context.SaveChangesAsync();
            return registration;
        }

        public async Task<bool> UpdateRegistrationAsync(UserModel registration)
        {
            _context.Users.Update(registration);
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }

        public async Task<bool> DeleteRegistrationAsync(string id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return false;

            _context.Users.Remove(user);
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }

        public async Task<bool> PhoneNumberExistsAsync(string phoneNumber)
        {
            return await _context.Users.AnyAsync(u => u.PhoneNumber == phoneNumber);
        }

        public async Task<bool> EmailExistsAsync(string email)
        {
            return await _context.Users.AnyAsync(u => u.Email == email);
        }

        public async Task<IEnumerable<UserModel>> GetRegistrationsByTradeAsync(string trade)
        {
            return await _context.Users.Where(u => u.Trade == trade).ToListAsync();
        }

        public async Task<IEnumerable<UserModel>> GetRegistrationsByDistrictAsync(string district)
        {
            return await _context.Users.Where(u => u.District == district).ToListAsync();
        }

        public async Task<IEnumerable<UserModel>> GetRegistrationsByWorkLocationAsync(string location)
        {
            return await _context.Users.Where(u => u.WorkLocation == location).ToListAsync();
        }
    }
}
