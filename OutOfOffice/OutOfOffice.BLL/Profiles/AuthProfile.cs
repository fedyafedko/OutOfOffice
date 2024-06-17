using AutoMapper;
using OutOfOffice.Common.DTOs;
using OutOfOffice.Entities;

namespace OutOfOffice.BLL.Profiles;

public class AuthProfile : Profile
{
    public AuthProfile()
    {
        CreateMap<RegisterUserDTO, Employee>();
        CreateMap<LoginUserDTO, Employee>();
    }
}