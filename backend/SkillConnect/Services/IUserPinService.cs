namespace SkillConnect.Services
{
    public interface IUserPinService
    {
        Task<bool> SetUserPin(string userId, string pin);
        Task<bool> ValidatePin(string pin);
    }
}