using OutOfOffice.Entities.Enums;

namespace OutOfOffice.Common.DTOs;

public class CreateLeaveRequestDTO
{
    public AbsenceReason AbsenceReason { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string? Comment { get; set; } = string.Empty;
    public StatusLeaveRequest Status { get; set; } = StatusLeaveRequest.New;
}