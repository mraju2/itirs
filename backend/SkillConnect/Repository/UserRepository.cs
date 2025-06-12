using Microsoft.EntityFrameworkCore;
using SkillConnect.Data;
using SkillConnect.Models;
using SkillConnect.Repositories.Interfaces;

namespace SkillConnect.Repositories
{
    public class UserRegistrationRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRegistrationRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> GetAllRegistrationsAsync()
        {
            return await _context.Users
                    .Include(u => u.Trade)
                    .Include(u => u.State)
                    .Include(u => u.District)
                    .ToListAsync();
        }

        public async Task<User?> GetRegistrationByIdAsync(string id)
        {
            if (!Guid.TryParse(id, out var guid)) return null;
            return await _context.Users.Include(u => u.Trade).FirstOrDefaultAsync(u => u.Id == guid);
        }

        public async Task<User?> GetRegistrationByEmailAsync(string email)
        {
            return await _context.Users.Include(u => u.Trade).FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User?> GetRegistrationByPhoneAsync(string phone)
        {
            return await _context.Users.Include(u => u.Trade).FirstOrDefaultAsync(u => u.PhoneNumber == phone);
        }

        public async Task<User> CreateRegistrationAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<bool> UpdateRegistrationAsync(User user)
        {
            _context.Users.Update(user);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteRegistrationAsync(string id)
        {
            if (!Guid.TryParse(id, out var guid)) return false;

            var user = await _context.Users.FindAsync(guid);
            if (user == null) return false;

            _context.Users.Remove(user);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> EmailExistsAsync(string email)
        {
            return await _context.Users.AnyAsync(u => u.Email == email);
        }

        public async Task<bool> PhoneNumberExistsAsync(string phone)
        {
            return await _context.Users.AnyAsync(u => u.PhoneNumber == phone);
        }

        public async Task<IEnumerable<User>> GetRegistrationsByTradeIdAsync(int tradeId)
        {
            return await _context.Users
                .Include(u => u.Trade)
                .Where(u => u.TradeId == tradeId)
                .ToListAsync();
        }

        public async Task<IEnumerable<User>> GetRegistrationsByDistrictAsync(string district)
        {
            return await _context.Users
                .Include(u => u.Trade)
                .Where(u => u.DistrictId == Convert.ToInt16(district))
                .ToListAsync();
        }

        public async Task<IEnumerable<User>> GetRegistrationsByWorkLocationAsync(string location)
        {
            return await _context.Users
                .Include(u => u.Trade)
                .Where(u => u.WorkLocation.ToLower() == location.ToLower())
                .ToListAsync();
        }

        public async Task<PaginatedResult<User>> GetPaginatedAsync(
            int pageNumber,
            int pageSize,
            string? searchTerm,
            Dictionary<string, string>? filters,
            string? sortBy,
            bool isDescending)
        {
            var query = _context.Users
                .Include(u => u.Trade)
                .Include(u => u.State)
                .Include(u => u.District)
                .AsQueryable();

            // Apply search
            if (!string.IsNullOrEmpty(searchTerm))
            {
                var lower = searchTerm.ToLower();
                query = query.Where(u =>
                    u.FirstName.ToLower().Contains(lower) ||
                    u.LastName.ToLower().Contains(lower) ||
                    u.Email.ToLower().Contains(lower) ||
                    u.PhoneNumber.Contains(lower)
                );
            }

            // Apply filters
            if (filters != null)
            {
                foreach (var filter in filters)
                {
                    switch (filter.Key.ToLower())
                    {
                        case "district":
                            query = query.Where(u => u.DistrictId == Convert.ToInt16(filter.Value));
                            break;
                        case "tradeid":
                            if (int.TryParse(filter.Value, out var tradeId))
                                query = query.Where(u => u.TradeId == tradeId);
                            break;
                        case "worklocation":
                            query = query.Where(u => u.WorkLocation.ToLower() == filter.Value.ToLower());
                            break;
                    }
                }
            }

            // Sorting
            if (!string.IsNullOrWhiteSpace(sortBy))
            {
                query = sortBy.ToLower() switch
                {
                    "firstname" => isDescending ? query.OrderByDescending(u => u.FirstName) : query.OrderBy(u => u.FirstName),
                    "dateofbirth" => isDescending ? query.OrderByDescending(u => u.DateOfBirth) : query.OrderBy(u => u.DateOfBirth),
                    "registrationdate" => isDescending ? query.OrderByDescending(u => u.RegistrationDate) : query.OrderBy(u => u.RegistrationDate),
                    _ => query.OrderByDescending(u => u.RegistrationDate) // Default sort
                };
            }
            else
            {
                // Default sorting by registration date (newest first)
                query = query.OrderByDescending(u => u.RegistrationDate);
            }

            var total = await query.CountAsync();
            var items = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PaginatedResult<User>
            {
                Items = items,
                TotalCount = total
            };
        }
    }
}
