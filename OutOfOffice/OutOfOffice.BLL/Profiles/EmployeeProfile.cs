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
            .ForMember(dest => dest.PeoplePartnerId, opt => opt.MapFrom(src => src.PeoplePartnerId))
            .ForMember(dest => dest.OutOfOfficeBalance, opt => opt.MapFrom(src => src.OutOfOfficeBalance))
            .ForMember(dest => dest.Photo, opt => opt.MapFrom(src => src.Photo));
    }
}