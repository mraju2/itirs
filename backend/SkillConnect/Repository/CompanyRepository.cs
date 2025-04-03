using Microsoft.EntityFrameworkCore;
using SkillConnect.Data;
using SkillConnect.Models;
using SkillConnect.Repositories.Interfaces;

namespace SkillConnect.Repositories
{
    public class CompanyRepository : ICompanyRepository
    {
        private readonly AppDbContext _context;

        public CompanyRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Company>> GetAllAsync()
        {
            return await _context.Companies
                .Include(c => c.JobPosts)
                .ToListAsync();
        }

        public async Task<Company?> GetByIdAsync(string id)
        {
            return await _context.Companies
                .Include(c => c.JobPosts)
                .FirstOrDefaultAsync(c => c.Id.ToString() == id);
        }

        public async Task<Company?> GetByNameAsync(string name)
        {
            return await _context.Companies
                .FirstOrDefaultAsync(c => c.Name == name);
        }

        public async Task AddAsync(Company company)
        {
            await _context.Companies.AddAsync(company);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Company company)
        {
            _context.Companies.Update(company);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(string id)
        {
            var company = await _context.Companies.FindAsync(id);
            if (company != null)
            {
                _context.Companies.Remove(company);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> ExistsByEmailOrPhoneAsync(string email, string contactPhone)
        {
            return await _context.Companies.AnyAsync(c =>
                c.ContactEmail == email || c.ContactPhone == contactPhone);
        }


        public async Task<PaginatedResult<Company>> GetPaginatedAsync(int pageNumber, int pageSize, string? searchTerm, Dictionary<string, string>? filters, string? sortBy, bool isDescending)
        {
            var query = _context.Companies.AsQueryable();    // Apply search    if (!string.IsNullOrEmpty(searchTerm))    {        query = query.Where(c => c.Name.Contains(searchTerm) || c.Description.Contains(searchTerm));    }

            // Apply filters
            if (filters != null)
            {
                Console.WriteLine("Filters received:");
                foreach (var kv in filters)
                {
                    Console.WriteLine($"Key: {kv.Key}, Value: {kv.Value}");
                }

                var propertyMap = typeof(Company)
                    .GetProperties()
                    .ToDictionary(p => p.Name.ToLower(), p => p.Name); // maps "name" → "Name"

                foreach (var filter in filters)
                {
                    var key = filter.Key.ToLower();
                    var value = filter.Value;

                    if (propertyMap.TryGetValue(key, out var actualProperty))
                    {
                        query = query.Where(c => EF.Property<string>(c, actualProperty) == value);
                    }
                    else
                    {
                        Console.WriteLine($"❌ Skipping invalid filter: {filter.Key}");
                    }
                }
            }


            // Apply sorting
            if (!string.IsNullOrEmpty(sortBy))
            {
                query = isDescending
                    ? query.OrderByDescending(e => EF.Property<object>(e, sortBy))
                    : query.OrderBy(e => EF.Property<object>(e, sortBy));
            }

            // Apply pagination
            var totalCount = await query.CountAsync();
            var items = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PaginatedResult<Company>
            {
                Items = items,
                TotalCount = totalCount
            };
        }

        // Maps user keys → real C# property names
        private static readonly Dictionary<string, string> SearchablePropertyMap =
            new(StringComparer.OrdinalIgnoreCase)
            {
        { "name", "Name" },
        { "email", "ContactEmail" },
        { "city", "City" },
        { "state", "State" },
        { "pincode", "Pincode" },
        { "country", "Country" },
        { "contactphone", "ContactPhone" },
        { "contact phone", "ContactPhone" } // support space for quoted key
            };

    }
}
