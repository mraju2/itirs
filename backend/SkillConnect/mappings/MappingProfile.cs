using AutoMapper;
using SkillConnect.Models;
using SkillConnect.Dtos;

namespace SkillConnect.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Company
            CreateMap<Company, CompanyDto>()
    .ForMember(dest => dest.StateName, opt => opt.MapFrom(src => src.State.Name))
    .ForMember(dest => dest.DistrictName, opt => opt.MapFrom(src => src.District.Name))
    .ForMember(dest => dest.StateId, opt => opt.MapFrom(src => src.StateId))
    .ForMember(dest => dest.DistrictId, opt => opt.MapFrom(src => src.DistrictId));


            CreateMap<CompanyCreateDto, Company>();
            CreateMap<CompanyUpdateDto, Company>();

            CreateMap<JobPostCreateDto, JobPost>()
    .ForMember(dest => dest.Id, opt => opt.MapFrom(_ => Guid.NewGuid()))
    .ForMember(dest => dest.CreatedAtUnix, opt => opt.MapFrom(_ => DateTimeOffset.UtcNow.ToUnixTimeSeconds()))
    .ForMember(dest => dest.JobPostTrades, opt => opt.Ignore()) // Will be set manually after mapping
    .ForMember(dest => dest.Company, opt => opt.Ignore())       // Navigation property
    .ForMember(dest => dest.Applications, opt => opt.Ignore())  // Navigation property
    .ForMember(dest => dest.StatusHistory, opt => opt.Ignore()) // Optional: if used
    .ForMember(dest => dest.State, opt => opt.Ignore())         // Navigation property
    .ForMember(dest => dest.District, opt => opt.Ignore())      // Navigation property
    .ForMember(dest => dest.Location, opt => opt.MapFrom(src => src.JobLocation))
    .ForMember(dest => dest.MinimumQualifications,
               opt => opt.MapFrom(src => Util.ToCsv(src.MinimumQualifications)));


            // JobPost
            CreateMap<JobPost, JobPostDto>()
    .ForMember(dest => dest.Trades, opt => opt.MapFrom(src => src.JobPostTrades.Select(jt => jt.Trade)))
    .ForMember(dest => dest.StateId, opt => opt.MapFrom(src => src.StateId))
    .ForMember(dest => dest.StateName, opt => opt.MapFrom(src => src.State.Name))
    .ForMember(dest => dest.DistrictId, opt => opt.MapFrom(src => src.DistrictId))
    .ForMember(dest => dest.DistrictName, opt => opt.MapFrom(src => src.District.Name))
    .ForMember(dest => dest.JobLocation, opt => opt.MapFrom(src => src.Location))
    .ForMember(dest => dest.MinimumQualifications,
               opt => opt.MapFrom(src => Util.FromCsv(src.MinimumQualifications)));




            CreateMap<JobPostDto, JobPost>()
    .ForMember(dest => dest.Location, opt => opt.MapFrom(src => src.JobLocation))
    .ForMember(dest => dest.MinimumQualifications,
               opt => opt.MapFrom(src => Util.ToCsv(src.MinimumQualifications)));

            CreateMap<JobPostUpdateDto, JobPost>()
    .ForMember(dest => dest.Id, opt => opt.MapFrom(src => Guid.Parse(src.Id.ToString())))
    .ForMember(dest => dest.JobPostTrades, opt => opt.Ignore())
    .ForMember(dest => dest.Location, opt => opt.MapFrom(src => src.JobLocation))
    .ForMember(dest => dest.MinimumQualifications,
               opt => opt.MapFrom(src => Util.ToCsv(src.MinimumQualifications)));


            // JobApplication
            CreateMap<JobApplication, JobApplicationDto>();
            CreateMap<JobApplicationCreateDto, JobApplication>();

            // Trade
            CreateMap<Trade, TradeDto>();

            // State & District
            CreateMap<State, StateDto>();
            CreateMap<District, DistrictDto>();

            // User
            CreateMap<User, UserDto>()
    .ForMember(dest => dest.TradeName, opt => opt.MapFrom(src => src.Trade.TradeName))
    .ForMember(dest => dest.StateName, opt => opt.MapFrom(src => src.State.Name))
    .ForMember(dest => dest.DistrictName, opt => opt.MapFrom(src => src.District.Name))
    .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id.ToString()));


            CreateMap<CreateUserDto, User>();
            CreateMap<UpdateUserDto, User>();
            CreateMap<PatchUserDto, User>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null)); // Only map non-null values

            CreateMap<User, UserDto>()
    .ForMember(dest => dest.TradeName, opt => opt.MapFrom(src => src.Trade.TradeName))
    .ForMember(dest => dest.StateName, opt => opt.MapFrom(src => src.State.Name))
    .ForMember(dest => dest.DistrictName, opt => opt.MapFrom(src => src.District.Name))
    .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id.ToString()));

            CreateMap<UserDto, User>(); // For reverse mapping if needed


        }
    }
}