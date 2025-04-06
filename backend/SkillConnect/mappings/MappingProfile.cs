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
                .ForMember(dest => dest.State, opt => opt.MapFrom(src => src.State.Name))
                .ForMember(dest => dest.District, opt => opt.MapFrom(src => src.District.Name));

            CreateMap<CompanyCreateDto, Company>();
            CreateMap<CompanyUpdateDto, Company>();

            // JobPost
            CreateMap<JobPost, JobPostDto>()
                .ForMember(dest => dest.Trades, opt => opt.MapFrom(src => src.JobPostTrades.Select(jt => jt.Trade)));

            CreateMap<JobPostDto, JobPost>(); // for returning data, not creating directly

            // JobApplication
            CreateMap<JobApplication, JobApplicationDto>();
            CreateMap<JobApplicationCreateDto, JobApplication>();

            // Trade
            CreateMap<Trade, TradeDto>();

            // State & District
            CreateMap<State, StateDto>();
            CreateMap<District, DistrictDto>();
        }
    }
}