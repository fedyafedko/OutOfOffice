using AutoMapper;
using OutOfOffice.Common.DTOs;

namespace OutOfOffice.BLL.Profiles;

public class LeaveRequest : Profile
{
    public LeaveRequest()
    {
        CreateMap<LeaveRequest,LeaveRequestDTO>();
        CreateMap<CreateLeaveRequestDTO, LeaveRequest>();
    }
}
