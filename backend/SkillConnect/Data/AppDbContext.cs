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
        public DbSet<User> Users { get; set; }
        public DbSet<JobPost> JobPosts { get; set; }
        public DbSet<JobApplication> JobApplications { get; set; }
        public DbSet<Company> Companies { get; set; }

        public DbSet<District> District { get; set; }

        public DbSet<State> State { get; set; }

        public DbSet<Trade> Trade { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Unique constraints
            modelBuilder.Entity<Company>()
                .HasIndex(c => c.ContactEmail)
                .IsUnique();

            modelBuilder.Entity<Company>()
                .HasIndex(c => c.PrimaryContactPhone)
                .IsUnique();

            // Company → State & District
            modelBuilder.Entity<Company>()
                .HasOne(c => c.State)
                .WithMany(s => s.Companies)
                .HasForeignKey(c => c.StateId);

            modelBuilder.Entity<Company>()
                .HasOne(c => c.District)
                .WithMany(d => d.Companies)
                .HasForeignKey(c => c.DistrictId);

            // District → State
            modelBuilder.Entity<District>()
                .HasOne(d => d.State)
                .WithMany(s => s.Districts)
                .HasForeignKey(d => d.StateId);

            // JobPost → Company
            modelBuilder.Entity<JobPost>()
                .HasOne(j => j.Company)
                .WithMany(c => c.JobPosts)
                .HasForeignKey(j => j.CompanyId);

            modelBuilder.Entity<JobPost>()
.HasOne(j => j.State)
.WithMany()
.HasForeignKey(j => j.StateId)
.OnDelete(DeleteBehavior.Restrict);

            // JobPost → District
            modelBuilder.Entity<JobPost>()
                .HasOne(j => j.District)
                .WithMany()
                .HasForeignKey(j => j.DistrictId)
                .OnDelete(DeleteBehavior.Restrict);

            /// JobPost → JobApplication (One-to-Many)
            modelBuilder.Entity<JobApplication>()
                .HasOne(a => a.JobPost)
                .WithMany(j => j.Applications)
                .HasForeignKey(a => a.JobPostId);

            // JobApplication → User (Many-to-One)
            modelBuilder.Entity<JobApplication>()
                .HasOne(a => a.User)
                .WithMany(u => u.JobApplications)
                .HasForeignKey(a => a.UserId);

            // Enforce 1 application per user per job
            modelBuilder.Entity<JobApplication>()
                .HasIndex(a => new { a.UserId, a.JobPostId })
                .IsUnique();
            // JobPost ↔ Trade (Many-to-Many)
            modelBuilder.Entity<JobPostTrade>()
                .HasKey(jt => new { jt.JobPostId, jt.TradeId });

            modelBuilder.Entity<JobPostTrade>()
                .HasOne(jt => jt.JobPost)
                .WithMany(j => j.JobPostTrades)
                .HasForeignKey(jt => jt.JobPostId);

            modelBuilder.Entity<JobPostTrade>()
                .HasOne(jt => jt.Trade)
                .WithMany(t => t.JobPostTrades)
                .HasForeignKey(jt => jt.TradeId);

            // Optional: Seed states, districts, trades
            modelBuilder.Seed();
        }


    }
}
