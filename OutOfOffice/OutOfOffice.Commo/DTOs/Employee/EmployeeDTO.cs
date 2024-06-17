namespace OutOfOffice.Common.DTOs.Employee;

public class EmployeeDTO
{
    public int Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Subdivision { get; set; } = string.Empty;
    public string Position { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public EmployeeDTO PeoplePartnerId { get; set; } = null!;
    public decimal OutOfOfficeBalance { get; set; }
    public string? Photo { get; set; } = string.Empty;
}
