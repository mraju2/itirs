using BCrypt.Net;
using Supabase;

namespace SkillConnect.Services
{
    public class UserPinService : IUserPinService
    {
        private readonly Client _supabaseClient;
        private readonly ILogger<UserPinService> _logger;

        public UserPinService(Client supabaseClient, ILogger<UserPinService> logger)
        {
            _supabaseClient = supabaseClient;
            _logger = logger;
        }

        public async Task<bool> SetUserPin(string userId, string pin)
        {
            try
            {
                if (!await ValidatePin(pin))
                {
                    return false;
                }

                string hashedPin = BCrypt.Net.BCrypt.HashPassword(pin);
                
                // Update user metadata in Supabase
                var response = await _supabaseClient.Rpc("update_user_metadata", new Dictionary<string, object> {
                    { "user_id", userId },
                    { "metadata", new Dictionary<string, object> { 
                        { "hashedPin", hashedPin } 
                    }}
                });

                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error setting PIN for user {UserId}", userId);
                return false;
            }
        }

        public Task<bool> ValidatePin(string pin)
        {
            // PIN validation rules
            if (string.IsNullOrEmpty(pin)) return Task.FromResult(false);
            if (pin.Length != 4) return Task.FromResult(false);
            if (!pin.All(char.IsDigit)) return Task.FromResult(false);

            // Check for common patterns
            var commonPins = new[] { "0000", "1111", "1234", "4321" };
            if (commonPins.Contains(pin)) return Task.FromResult(false);

            return Task.FromResult(true);
        }
    }
}