using OutOfOffice.Common.DTOs;
using OutOfOffice.Common.Requests;

namespace OutOfOffice.BLL.Interfaces;

public interface ILeaveRequestService
{
    Task<List<LeaveRequestDTO>> GetLeaveRequestsAsync();
    Task<LeaveRequestDTO> GetLeaveRequestByIdAsync(int id);
    Task<bool> IsApprovedAsync(IsApprovedRequest request);
    Task<LeaveRequestDTO> AddLeaveRequestAsync(int id, CreateLeaveRequestDTO request);
    Task<bool> CanceledLeaveRequestAsync(int id);
}
