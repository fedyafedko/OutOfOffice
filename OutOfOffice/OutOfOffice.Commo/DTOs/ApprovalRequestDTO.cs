using OutOfOffice.Entities.Enums;

namespace OutOfOffice.Common.DTOs;

public class ApprovalRequestDTO
{
    public int Id { get; set; }
    public StatusApprovalRequest Status { get; set; } = StatusApprovalRequest.New;
    public string? Comment { get; set; } = string.Empty;
}
