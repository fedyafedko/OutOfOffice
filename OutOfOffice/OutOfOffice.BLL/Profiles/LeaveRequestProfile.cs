using AutoMapper;
using OutOfOffice.Common.DTOs;
using OutOfOffice.Entities;

namespace OutOfOffice.BLL.Profiles;

public class LeaveRequestProfile : Profile
{
    public LeaveRequestProfile()
    {
        CreateMap<LeaveRequest, LeaveRequestDTO>();
        CreateMap<CreateLeaveRequestDTO, LeaveRequest>();
    }
}
