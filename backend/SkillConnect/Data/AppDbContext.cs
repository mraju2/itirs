using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using SkillConnect.Configuration;
using SkillConnect.Models;

namespace SkillConnect.Data
{
    public class AppDbContext : DbContext
    {
        private readonly MySqlSettings _settings;

        public AppDbContext(DbContextOptions<AppDbContext> options, IOptions<AppSettings> settings)
            : base(options)
        {
            _settings = settings.Value.MySqlSettings;
        }

        // DbSets for your models
        public DbSet<UserModel> Users { get; set; }
        public DbSet<JobPost> JobPosts { get; set; }
        public DbSet<JobApplication> JobApplications { get; set; }
        public DbSet<Company> Companies { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Optional: Fluent API configurations
            modelBuilder.Entity<JobPost>()
                .HasOne(j => j.Company)
                .WithMany(c => c.JobPosts)
                .HasForeignKey(j => j.Id);

            modelBuilder.Entity<JobPost>()
                .HasMany(j => j.Applications)
                .WithOne(a => a.JobPost)
                .HasForeignKey(a => a.JobPostId);

            modelBuilder.Entity<JobApplication>()
                .HasOne(a => a.Candidate)
                .WithMany(u => u.Applications)
                .HasForeignKey(a => a.CandidateId);

            modelBuilder.Entity<JobPost>()
                .HasOne(j => j.Recruiter)
                .WithMany(u => u.PostedJobs)
                .HasForeignKey(j => j.RecruiterId);
        }
    }
}
