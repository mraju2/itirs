using Microsoft.EntityFrameworkCore;
using SkillConnect.Data;
using SkillConnect.Models;
using SkillConnect.Repositories.Interfaces;
using SkillConnect.Dtos;

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

        public async Task<PaginatedResult<Company>> GetPaginatedAsync(
    int pageNumber,
    int pageSize,
    string? searchTerm,
    Dictionary<string, string>? filters,
    string? sortBy,
    bool isDescending)
        {
            var query = _context.Companies.AsQueryable();

            // SearchTerm on Name field
            if (!string.IsNullOrEmpty(searchTerm))
            {
                Console.WriteLine($"🔍 Applying basic search for: {searchTerm}");
                query = query.Where(c => c.Name.Contains(searchTerm));
            }

            // Get lowercase -> PascalCase property mapping
            var propertyMap = typeof(Company)
                .GetProperties()
                .ToDictionary(p => p.Name.ToLower(), p => p.Name);

            // Apply filters
            if (filters != null)
            {
                Console.WriteLine("🔧 Filters received:");
                foreach (var kv in filters)
                    Console.WriteLine($"    🔹 {kv.Key} = {kv.Value}");

                foreach (var filter in filters)
                {
                    var key = filter.Key.ToLower();
                    var value = filter.Value;

                    if (!string.IsNullOrWhiteSpace(value) && propertyMap.TryGetValue(key, out var actualProp))
                    {
                        try
                        {
                            Console.WriteLine($"🔄 Applying filter on '{actualProp}' with value '{value}'");

                            if (value.StartsWith("%") && value.EndsWith("%"))
                            {
                                Console.WriteLine($"🔄 Applying filter startwith end with '{actualProp}' with value '%{value}'");

                                var term = value.Trim('%');
                                query = query.Where(c => EF.Property<string>(c, actualProp) != null &&
                                    EF.Functions.Like(EF.Property<string>(c, actualProp), $"%{term}%"));
                            }
                            else if (value.StartsWith("%"))
                            {
                                Console.WriteLine($"🔄 Applying filter startwith '{actualProp}' with value '%{value}'");
                                var term = value.TrimStart('%');
                                query = query.Where(c => EF.Property<string>(c, actualProp) != null &&
                                    EF.Functions.Like(EF.Property<string>(c, actualProp), $"{term}%"));
                            }
                            else if (value.EndsWith("%"))
                            {
                                Console.WriteLine($"🔄 Applying filter endwith '{actualProp}' with value '%{value}'");

                                var term = value.TrimEnd('%');
                                query = query.Where(c => EF.Property<string>(c, actualProp) != null &&
                                    EF.Functions.Like(EF.Property<string>(c, actualProp), $"%{term}"));
                            }
                            else
                            {
                                Console.WriteLine($"🔄 Applying no filter '{actualProp}' with value '%{value}'");

                                query = query.Where(c => EF.Functions.Like(EF.Property<string>(c, actualProp), $"{value}%"));
                            }
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine($"❌ Error applying filter on '{actualProp}': {ex.Message}");
                        }
                    }
                    else
                    {
                        Console.WriteLine($"❌ Skipping unknown or null filter: {filter.Key}");
                    }
                }
            }

            // Apply sorting
            if (!string.IsNullOrEmpty(sortBy) && propertyMap.TryGetValue(sortBy.ToLower(), out var sortProperty))
            {
                Console.WriteLine($"📊 Sorting by: {sortProperty} {(isDescending ? "DESC" : "ASC")}");
                query = isDescending
                    ? query.OrderByDescending(c => EF.Property<object>(c, sortProperty))
                    : query.OrderBy(c => EF.Property<object>(c, sortProperty));
            }

            // Log final SQL (optional for EF Core)
            Console.WriteLine($"📥 Final query to execute: {query.ToQueryString()}");

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

        public async Task<List<CompanySummaryDto>> SearchAsync(string query)
        {
            return await _context.Companies
                .Where(c => c.Name.ToLower().Contains(query.ToLower()))
                .OrderBy(c => c.Name)
                .Select(c => new CompanySummaryDto
                {
                    Id = c.Id.ToString(),
                    Name = c.Name
                })
                .Take(20)
                .ToListAsync();
        }

    }
}
