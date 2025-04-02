using AutoMapper;
using SkillConnect.Models;

namespace SkillConnect.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<CompanyDto, Company>()
             .ForMember(dest => dest.Id, opt => opt.MapFrom(src =>
                 !string.IsNullOrEmpty(src.Id) ? Guid.Parse(src.Id) : Guid.NewGuid()
             ));

            CreateMap<Company, CompanyDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id.ToString()));
        }
    }
}