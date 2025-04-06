using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SkillConnect.Models;
using SkillConnect.Repositories.Interfaces;
using SkillConnect.Services.Interfaces;

namespace SkillConnect.Services
{
    public class UserRegistrationService : IUserRegistrationService
    {
        private readonly IUserRegistrationRepository _repository;

        public UserRegistrationService(IUserRegistrationRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<UserDTO>> GetAllRegistrationsAsync()
        {
            var users = await _repository.GetAllRegistrationsAsync();
            return users.Select(user => ConvertToDTO(user)); // Convert `UserModel` → `UserDTO`
        }

        public async Task<UserDTO> GetRegistrationByIdAsync(string id)
        {
            var user = await _repository.GetRegistrationByIdAsync(id);
            return user == null ? null : ConvertToDTO(user);
        }

        public async Task<UserDTO> GetRegistrationByEmailAsync(string email)
        {
            var user = await _repository.GetRegistrationByEmailAsync(email);
            return user == null ? null : ConvertToDTO(user);
        }

        public async Task<UserDTO> GetRegistrationByPhoneAsync(string phone)
        {
            var user = await _repository.GetRegistrationByPhoneAsync(phone);
            return user == null ? null : ConvertToDTO(user);
        }

        public async Task<UserDTO> CreateRegistrationAsync(UserDTO registrationDTO)
        {
            // ✅ Check if phone/email already exists
            if (await _repository.EmailExistsAsync(registrationDTO.Email))
                throw new Exception("Email already exists.");

            if (await _repository.PhoneNumberExistsAsync(registrationDTO.PhoneNumber))
                throw new Exception("Phone number already exists.");

            // ✅ Convert DTO to Model for MongoDB storage
            var user = new UserModel
            {
                FirstName = registrationDTO.FirstName,
                LastName = registrationDTO.LastName,
                FatherName = registrationDTO.FatherName,
                DateOfBirth = registrationDTO.DateOfBirth,
                Trade = registrationDTO.Trade,
                OtherTrade = registrationDTO.OtherTrade,
                Address = registrationDTO.Address,
                Mandal = registrationDTO.Mandal,
                District = registrationDTO.District,
                PassYear = registrationDTO.PassYear,
                Percentage = registrationDTO.Percentage,
                Experience = registrationDTO.Experience,
                SalaryExpectation = registrationDTO.SalaryExpectation,
                WorkLocation = registrationDTO.WorkLocation,
                PhoneNumber = registrationDTO.PhoneNumber,
                Email = registrationDTO.Email,
                ITIName = registrationDTO.ITIName,
                About = registrationDTO.About,
                RegistrationDate = ((DateTimeOffset)DateTime.UtcNow).ToUnixTimeSeconds()
            };

            var result = await _repository.CreateRegistrationAsync(user);
            return ConvertToDTO(result); // ✅ Convert `UserModel` → `UserDTO`
        }

        public async Task<bool> UpdateRegistrationAsync(string id, UserDTO registrationDTO)
        {
            var user = await _repository.GetRegistrationByIdAsync(id);
            if (user == null) return false;

            // ✅ Update values
            user.FirstName = registrationDTO.FirstName;
            user.LastName = registrationDTO.LastName;
            user.FatherName = registrationDTO.FatherName;
            user.DateOfBirth = registrationDTO.DateOfBirth;
            user.Trade = registrationDTO.Trade;
            user.OtherTrade = registrationDTO.OtherTrade;
            user.Address = registrationDTO.Address;
            user.Mandal = registrationDTO.Mandal;
            user.District = registrationDTO.District;
            user.PassYear = registrationDTO.PassYear;
            user.Percentage = registrationDTO.Percentage;
            user.Experience = registrationDTO.Experience;
            user.SalaryExpectation = registrationDTO.SalaryExpectation;
            user.WorkLocation = registrationDTO.WorkLocation;
            user.PhoneNumber = registrationDTO.PhoneNumber;
            user.Email = registrationDTO.Email;
            user.ITIName = registrationDTO.ITIName;
            user.About = registrationDTO.About;

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

        public async Task<IEnumerable<UserDTO>> GetRegistrationsByTradeAsync(string trade)
        {
            var users = await _repository.GetRegistrationsByTradeAsync(trade);
            return users.Select(user => ConvertToDTO(user));
        }

        public async Task<IEnumerable<UserDTO>> GetRegistrationsByDistrictAsync(string district)
        {
            var users = await _repository.GetRegistrationsByDistrictAsync(district);
            return users.Select(user => ConvertToDTO(user));
        }

        public async Task<IEnumerable<UserDTO>> GetRegistrationsByWorkLocationAsync(string location)
        {
            var users = await _repository.GetRegistrationsByWorkLocationAsync(location);
            return users.Select(user => ConvertToDTO(user));
        }

        public async Task<PaginatedResult<UserDTO>> GetPaginatedAsync(
            int pageNumber,
            int pageSize,
            string? searchTerm,
            Dictionary<string, string>? filters,
            string? sortBy,
            bool isDescending)
        {
            // Fetch paginated data from the repository
            var paginatedUsers = await _repository.GetPaginatedAsync(
                pageNumber,
                pageSize,
                searchTerm,
                filters,
                sortBy,
                isDescending
            );

            // Map the result to DTOs
            return new PaginatedResult<UserDTO>
            {
                Items = paginatedUsers.Items.Select(user => ConvertToDTO(user)),
                TotalCount = paginatedUsers.TotalCount
            };
        }

        // ✅ Converts `UserModel` to `UserDTO`
        private UserDTO ConvertToDTO(UserModel user)
        {
            return new UserDTO
            {
                Id = user.Id.ToString(), // ✅ Assign `Id`
                FirstName = user.FirstName,
                LastName = user.LastName,
                FatherName = user.FatherName,
                DateOfBirth = user.DateOfBirth,
                Trade = user.Trade,
                OtherTrade = user.OtherTrade,
                Address = user.Address,
                Mandal = user.Mandal,
                District = user.District,
                PassYear = user.PassYear,
                Percentage = user.Percentage,
                Experience = user.Experience,
                SalaryExpectation = user.SalaryExpectation,
                WorkLocation = user.WorkLocation,
                PhoneNumber = user.PhoneNumber,
                Email = user.Email,
                ITIName = user.ITIName,
                About = user.About
            };
        }
    }
}
