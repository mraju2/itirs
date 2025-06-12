using Microsoft.EntityFrameworkCore;
using SkillConnect.Data;
using SkillConnect.Models;
using SkillConnect.Repositories.Interfaces;

namespace SkillConnect.Repositories
{
    public class JobApplicationRepository : IJobApplicationRepository
    {
        private readonly AppDbContext _context;

        public JobApplicationRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<JobApplication>> GetAllAsync()
        {
            return await _context.JobApplications
                .Include(a => a.JobPost)
                .Include(a => a.User)
                .ToListAsync();
        }

        public async Task<JobApplication?> GetByIdAsync(string id)
        {
            return await _context.JobApplications
                .Include(a => a.JobPost)
                .Include(a => a.User)
                .FirstOrDefaultAsync(a => a.Id.ToString() == id);
        }

        public async Task<IEnumerable<JobApplication>> GetByCandidateIdAsync(string candidateId)
        {
            return await _context.JobApplications
                .Where(a => a.UserId.ToString() == candidateId)
                .Include(a => a.JobPost)
                .Include(a => a.User)
                .ToListAsync();
        }

        public async Task<IEnumerable<JobApplication>> GetByJobPostIdAsync(string jobPostId)
        {
            return await _context.JobApplications
                .Where(a => a.JobPostId.ToString() == jobPostId)
                .Include(a => a.JobPost)
                .Include(a => a.User)
                .ToListAsync();
        }

        public async Task AddAsync(JobApplication application)
        {
            await _context.JobApplications.AddAsync(application);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(JobApplication application)
        {
            _context.JobApplications.Update(application);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(string id)
        {
            var app = await _context.JobApplications.FindAsync(id);
            if (app != null)
            {
                _context.JobApplications.Remove(app);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<JobApplication>> GetByJobPostIdAsync(Guid jobPostId)
        {
            return await _context.JobApplications
                .Include(a => a.JobPost)
                .Include(a => a.User)
                .Where(a => a.JobPostId == jobPostId)
                .ToListAsync();
        }

    }
}
