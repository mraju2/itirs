using AutoMapper;
using SkillConnect.Models;
using SkillConnect.Repositories.Interfaces;
using SkillConnect.Services.Interfaces;

namespace SkillConnect.Services
{
    public class CompanyService : ICompanyService
    {
        private readonly ICompanyRepository _repository;
        private readonly IMapper _mapper;

        public CompanyService(ICompanyRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<CompanyDto>> GetAllAsync()
        {
            var companies = await _repository.GetAllAsync();
            return _mapper.Map<IEnumerable<CompanyDto>>(companies);
        }

        public async Task<CompanyDto?> GetByIdAsync(string id)
        {
            var company = await _repository.GetByIdAsync(id);
            return company == null ? null : _mapper.Map<CompanyDto>(company);
        }

        public async Task<CompanyDto> CreateAsync(CompanyDto dto)
        {
            try
            {
                // Check for duplicate email or phone
                var exists = await _repository.ExistsByEmailOrPhoneAsync(dto.ContactEmail, dto.ContactPhone);
                if (exists)
                {
                    throw new InvalidOperationException("A company with the same email or phone number already exists.");
                }

                var entity = _mapper.Map<Company>(dto);

                await _repository.AddAsync(entity); // This should include SaveChangesAsync()

                // Return the newly created company (with generated Id)
                return _mapper.Map<CompanyDto>(entity);
            }
            catch (InvalidOperationException ex)
            {
                // Can optionally log: _logger.LogWarning(ex, "Validation failed while creating company");
                throw new CustomException("Validation Error", ex.Message, 400);
            }
            catch (Exception ex)
            {
                // Can optionally log: _logger.LogError(ex, "Unexpected error during company creation");
                throw new CustomException("Internal Server Error", "An unexpected error occurred.", 500);
            }
        }

        public async Task UpdateAsync(CompanyDto dto)
        {
            var entity = _mapper.Map<Company>(dto);
            await _repository.UpdateAsync(entity);
        }

        public async Task DeleteAsync(string id)
        {
            await _repository.DeleteAsync(id);
        }

        public async Task<PaginatedResult<CompanyDto>> GetPaginatedAsync(
            int pageNumber,
            int pageSize,
            string? searchTerm,
            Dictionary<string, string>? filters,
            string? sortBy,
            bool isDescending)
        {
            var paginatedCompanies = await _repository.GetPaginatedAsync(pageNumber, pageSize, searchTerm, filters, sortBy, isDescending);
            return new PaginatedResult<CompanyDto>
            {
                Items = _mapper.Map<IEnumerable<CompanyDto>>(paginatedCompanies.Items),
                TotalCount = paginatedCompanies.TotalCount
            };
        }

        public async Task<List<CompanySummaryDto>> SearchAsync(string query)
        {
            return await _repository.SearchAsync(query);
        }
    }
}
