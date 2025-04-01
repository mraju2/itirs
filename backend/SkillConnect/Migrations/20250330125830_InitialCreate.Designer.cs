﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SkillConnect.Data;

#nullable disable

namespace SkillConnect.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20250330125830_InitialCreate")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.13")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            MySqlModelBuilderExtensions.AutoIncrementColumns(modelBuilder);

            modelBuilder.Entity("SkillConnect.Models.Company", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("ContactEmail")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("ContactPhone")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("LogoUrl")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Pincode")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("State")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("WebsiteUrl")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Companies");
                });

            modelBuilder.Entity("SkillConnect.Models.JobApplication", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<long>("AppliedAt")
                        .HasColumnType("bigint");

                    b.Property<Guid>("CandidateId")
                        .HasColumnType("char(36)");

                    b.Property<bool>("IsWithdrawn")
                        .HasColumnType("tinyint(1)");

                    b.Property<Guid>("JobPostId")
                        .HasColumnType("char(36)");

                    b.Property<string>("QuestionnaireAnswers")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<bool>("RequiresAccommodation")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CandidateId");

                    b.HasIndex("JobPostId");

                    b.ToTable("JobApplications");
                });

            modelBuilder.Entity("SkillConnect.Models.JobPost", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("AccommodationDetails")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<long>("ApplicationDeadline")
                        .HasColumnType("bigint");

                    b.Property<int>("CompanyId")
                        .HasColumnType("int");

                    b.Property<long>("CreatedAt")
                        .HasColumnType("bigint");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int?>("ExperienceRequired")
                        .HasColumnType("int");

                    b.Property<decimal?>("FixedSalary")
                        .HasColumnType("decimal(65,30)");

                    b.Property<int>("GenderRequirement")
                        .HasColumnType("int");

                    b.Property<string>("ITICertifications")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<bool>("IsUrgent")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<Guid>("RecruiterId")
                        .HasColumnType("char(36)");

                    b.Property<decimal?>("SalaryFrom")
                        .HasColumnType("decimal(65,30)");

                    b.Property<decimal?>("SalaryTo")
                        .HasColumnType("decimal(65,30)");

                    b.Property<int>("SalaryType")
                        .HasColumnType("int");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("Visibility")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CompanyId");

                    b.HasIndex("RecruiterId");

                    b.ToTable("JobPosts");
                });

            modelBuilder.Entity("SkillConnect.Models.UserModel", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("About")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<long>("DateOfBirth")
                        .HasColumnType("bigint");

                    b.Property<string>("District")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<string>("Experience")
                        .HasMaxLength(500)
                        .HasColumnType("varchar(500)");

                    b.Property<string>("FatherName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<string>("ITIName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<string>("Mandal")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("OtherTrade")
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<int>("PassYear")
                        .HasColumnType("int");

                    b.Property<decimal>("Percentage")
                        .HasColumnType("decimal(65,30)");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<long>("RegistrationDate")
                        .HasColumnType("bigint");

                    b.Property<decimal>("SalaryExpectation")
                        .HasColumnType("decimal(65,30)");

                    b.Property<string>("Trade")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("WorkLocation")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("SkillConnect.Models.JobApplication", b =>
                {
                    b.HasOne("SkillConnect.Models.UserModel", "Candidate")
                        .WithMany("Applications")
                        .HasForeignKey("CandidateId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SkillConnect.Models.JobPost", "JobPost")
                        .WithMany("Applications")
                        .HasForeignKey("JobPostId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Candidate");

                    b.Navigation("JobPost");
                });

            modelBuilder.Entity("SkillConnect.Models.JobPost", b =>
                {
                    b.HasOne("SkillConnect.Models.Company", "Company")
                        .WithMany("JobPosts")
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SkillConnect.Models.UserModel", "Recruiter")
                        .WithMany("PostedJobs")
                        .HasForeignKey("RecruiterId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Company");

                    b.Navigation("Recruiter");
                });

            modelBuilder.Entity("SkillConnect.Models.Company", b =>
                {
                    b.Navigation("JobPosts");
                });

            modelBuilder.Entity("SkillConnect.Models.JobPost", b =>
                {
                    b.Navigation("Applications");
                });

            modelBuilder.Entity("SkillConnect.Models.UserModel", b =>
                {
                    b.Navigation("Applications");

                    b.Navigation("PostedJobs");
                });
#pragma warning restore 612, 618
        }
    }
}
