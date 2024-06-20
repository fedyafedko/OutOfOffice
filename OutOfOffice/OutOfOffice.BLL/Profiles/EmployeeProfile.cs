using AutoMapper;
using OutOfOffice.Common.DTOs.Employee;
using OutOfOffice.Entities;

namespace OutOfOffice.BLL.Profiles;

public class EmployeeProfile : Profile
{
    public EmployeeProfile()
    {
        CreateMap<Employee, EmployeeDTO>()
            .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.FullName))
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
            .ForMember(dest => dest.Subdivision, opt => opt.MapFrom(src => src.Subdivision))
            .ForMember(dest => dest.Position, opt => opt.MapFrom(src => src.Position))
            .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status))
            .ForMember(dest => dest.PeoplePartner, opt => opt.MapFrom(src => src.PeoplePartner))
            .ForMember(dest => dest.OutOfOfficeBalance, opt => opt.MapFrom(src => src.OutOfOfficeBalance))
            .ForMember(dest => dest.Photo, opt => opt.MapFrom(src => src.Photo));

        CreateMap<UpdateEmployeeDTO, Employee>();
    }
}