using AutoMapper;
using OutOfOffice.Common.DTOs;
using OutOfOffice.Entities;

namespace OutOfOffice.BLL.Profiles;

public class ApprovalRequestProfile : Profile
{
    public ApprovalRequestProfile()
    {
        CreateMap<ApprovalRequest, ApprovalRequestDTO>();
    }
}