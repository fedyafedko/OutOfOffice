using System.ComponentModel.DataAnnotations.Schema;
using OutOfOffice.Entities.Enums;

namespace OutOfOffice.Entities;

public class ApprovalRequest : EntityBase
{
    [ForeignKey(nameof(LeaveRequest))]
    public int LeaveRequestId { get; set; }
    public StatusApprovalRequest Status { get; set; } = StatusApprovalRequest.New;
    public string? Comment { get; set; } = string.Empty;
    public LeaveRequest LeaveRequest { get; set; } = null!;
}

