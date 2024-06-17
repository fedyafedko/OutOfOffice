namespace OutOfOffice.Common.Requests;

public class IsApprovedRequest
{
    public int LeaveRequestId { get; set; }
    public bool IsApproved { get; set; }
    public string? Comment { get; set; } = string.Empty;
    public decimal OutOfOfficeBalance { get; set; }
}
