using OutOfOffice.Entities.Enums;
using OutOfOffice.Entities;
using OutOfOffice.Common.DTOs.Employee;

namespace OutOfOffice.Common.DTOs;

public class LeaveRequestDTO
{
    public int Id { get; set; }
    public AbsenceReason AbsenceReason { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string? Comment { get; set; } = string.Empty;
    public StatusLeaveRequest Status { get; set; } = StatusLeaveRequest.New;
    public EmployeeDTO Employee { get; set; } = null!;
    public ApprovalRequestDTO ApprovalRequest { get; set; } = null!;
}