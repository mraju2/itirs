using AutoMapper;
using SkillConnect.Dtos;
using SkillConnect.Models;
using SkillConnect.Repositories.Interfaces;
using SkillConnect.Services.Interfaces;
using SkillConnect.Exceptions;

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

        public async Task<CompanyDto> CreateAsync(CompanyCreateDto dto)
        {
            try
            {
                var errors = new List<string>();

                // Required field validations
                if (string.IsNullOrWhiteSpace(dto.Name))
                    errors.Add("Company name is required.");
                if (string.IsNullOrWhiteSpace(dto.Address))
                    errors.Add("Address is required.");
                if (string.IsNullOrWhiteSpace(dto.ContactEmail))
                    errors.Add("Contact email is required.");
                if (string.IsNullOrWhiteSpace(dto.PrimaryContactPhone))
                    errors.Add("Primary contact phone is required.");
                if (dto.StateId <= 0)
                    errors.Add("State is required.");
                if (dto.DistrictId <= 0)
                    errors.Add("District is required.");
                if (string.IsNullOrWhiteSpace(dto.Pincode))
                    errors.Add("Pincode is required.");

                // Email validation
                if (!string.IsNullOrWhiteSpace(dto.ContactEmail))
                {
                    try
                    {
                        var addr = new System.Net.Mail.MailAddress(dto.ContactEmail);
                        if (addr.Address != dto.ContactEmail)
                            errors.Add("Invalid email format.");
                    }
                    catch
                    {
                        errors.Add("Invalid email format.");
                    }
                }

                // Phone number validation
                if (!string.IsNullOrWhiteSpace(dto.PrimaryContactPhone))
                {
                    if (!System.Text.RegularExpressions.Regex.IsMatch(dto.PrimaryContactPhone, @"^\d{10}$"))
                        errors.Add("Primary contact phone must be a valid 10-digit number.");
                }

                if (!string.IsNullOrWhiteSpace(dto.SecondaryContactPhone))
                {
                    if (!System.Text.RegularExpressions.Regex.IsMatch(dto.SecondaryContactPhone, @"^\d{10}$"))
                        errors.Add("Secondary contact phone must be a valid 10-digit number.");
                }

                // Pincode validation
                if (!string.IsNullOrWhiteSpace(dto.Pincode))
                {
                    if (!System.Text.RegularExpressions.Regex.IsMatch(dto.Pincode, @"^\d{6}$"))
                        errors.Add("Pincode must be a valid 6-digit number.");
                }

                // Website URL validation (if provided)
                if (!string.IsNullOrWhiteSpace(dto.WebsiteUrl))
                {
                    if (!Uri.TryCreate(dto.WebsiteUrl, UriKind.Absolute, out _))
                        errors.Add("Invalid website URL format.");
                }

                // Check for duplicate email or phone
                var exists = await _repository.ExistsByEmailOrPhoneAsync(dto.ContactEmail, dto.PrimaryContactPhone);
                if (exists)
                {
                    errors.Add("A company with the same email or phone number already exists.");
                }

                if (errors.Any())
                {
                    throw new ValidationException(string.Join("\n", errors));
                }

                var entity = _mapper.Map<Company>(dto);
                await _repository.AddAsync(entity);

                return _mapper.Map<CompanyDto>(entity);
            }
            catch (ValidationException ex)
            {
                throw new CustomException("Validation Error", ex.Message, 400);
            }
            catch (InvalidOperationException ex)
            {
                throw new CustomException("Validation Error", ex.Message, 400);
            }
            catch (Exception ex)
            {
                throw new CustomException("Internal Server Error", "An unexpected error occurred.", 500);
            }
        }

        public async Task UpdateAsync(CompanyUpdateDto dto)
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
