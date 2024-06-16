using System.ComponentModel.DataAnnotations.Schema;
using OutOfOffice.Entities.Enums;

namespace OutOfOffice.Entities;

public class LeaveRequest : EntityBase
{
    [ForeignKey(nameof(Employee))]
    public int EmployeeId { get; set; }
    public AbsenceReason AbsenceReason { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string? Comment { get; set; } = string.Empty;
    public StatusLeaveRequest Status { get; set; } = StatusLeaveRequest.New;
    public Employee Employee { get; set; } = null!;
    public ApprovalRequest ApprovalRequest { get; set; } = null!;
}

