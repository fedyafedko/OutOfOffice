using AutoMapper;
using OutOfOffice.Common.DTOs;

namespace OutOfOffice.BLL.Profiles;

public class ApprovalRequest : Profile
{
    public ApprovalRequest()
    {
        CreateMap<ApprovalRequest, ApprovalRequestDTO>();
    }
}