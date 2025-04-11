using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using SkillConnect.Models;
using SkillConnect.Repositories.Interfaces;
using SkillConnect.Services.Interfaces;
using SkillConnect.Dtos;

namespace SkillConnect.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;
        private readonly IMapper _mapper;

        public UserService(IUserRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<UserDto>> GetAllRegistrationsAsync()
        {
            var users = await _repository.GetAllRegistrationsAsync();
            return _mapper.Map<IEnumerable<UserDto>>(users);
        }

        public async Task<UserDto?> GetRegistrationByIdAsync(string id)
        {
            var user = await _repository.GetRegistrationByIdAsync(id);
            return user == null ? null : _mapper.Map<UserDto>(user);
        }

        public async Task<UserDto?> GetRegistrationByEmailAsync(string email)
        {
            var user = await _repository.GetRegistrationByEmailAsync(email);
            return user == null ? null : _mapper.Map<UserDto>(user);
        }

        public async Task<UserDto?> GetRegistrationByPhoneAsync(string phone)
        {
            var user = await _repository.GetRegistrationByPhoneAsync(phone);
            return user == null ? null : _mapper.Map<UserDto>(user);
        }

        public async Task<UserDto> CreateRegistrationAsync(CreateUserDto dto)
        {
            if (await _repository.EmailExistsAsync(dto.Email))
                throw new Exception("Email already exists.");

            if (await _repository.PhoneNumberExistsAsync(dto.PhoneNumber))
                throw new Exception("Phone number already exists.");

            var user = _mapper.Map<User>(dto);
            user.RegistrationDate = DateTimeOffset.UtcNow.ToUnixTimeSeconds();

            var created = await _repository.CreateRegistrationAsync(user);
            return _mapper.Map<UserDto>(created);
        }

        public async Task<bool> UpdateRegistrationAsync(UpdateUserDto dto)
        {
            var existingUser = await _repository.GetRegistrationByIdAsync(dto.Id.ToString());
            if (existingUser == null)
                return false;

            _mapper.Map(dto, existingUser); // Update fields
            return await _repository.UpdateRegistrationAsync(existingUser);
        }

        public async Task<bool> PatchRegistrationAsync(string id, PatchUserDto dto)
        {
            var user = await _repository.GetRegistrationByIdAsync(id);
            if (user == null)
                return false;

            _mapper.Map(dto, user); // Patch fields
            return await _repository.UpdateRegistrationAsync(user);
        }

        public async Task<bool> DeleteRegistrationAsync(string id)
        {
            return await _repository.DeleteRegistrationAsync(id);
        }

        public async Task<bool> PhoneNumberExistsAsync(string phoneNumber)
        {
            return await _repository.PhoneNumberExistsAsync(phoneNumber);
        }

        public async Task<bool> EmailExistsAsync(string email)
        {
            return await _repository.EmailExistsAsync(email);
        }

        public async Task<IEnumerable<UserDto>> GetRegistrationsByTradeIdAsync(int tradeId)
        {
            var users = await _repository.GetRegistrationsByTradeIdAsync(tradeId);
            return _mapper.Map<IEnumerable<UserDto>>(users);
        }

        public async Task<IEnumerable<UserDto>> GetRegistrationsByDistrictAsync(string district)
        {
            var users = await _repository.GetRegistrationsByDistrictAsync(district);
            return _mapper.Map<IEnumerable<UserDto>>(users);
        }

        public async Task<IEnumerable<UserDto>> GetRegistrationsByWorkLocationAsync(string location)
        {
            var users = await _repository.GetRegistrationsByWorkLocationAsync(location);
            return _mapper.Map<IEnumerable<UserDto>>(users);
        }

        public async Task<PaginatedResult<UserDto>> GetPaginatedAsync(
            int pageNumber,
            int pageSize,
            string? searchTerm,
            Dictionary<string, string>? filters,
            string? sortBy,
            bool isDescending)
        {
            var paginated = await _repository.GetPaginatedAsync(pageNumber, pageSize, searchTerm, filters, sortBy, isDescending);

            return new PaginatedResult<UserDto>
            {
                Items = _mapper.Map<IEnumerable<UserDto>>(paginated.Items),
                TotalCount = paginated.TotalCount
            };
        }
    }
}
