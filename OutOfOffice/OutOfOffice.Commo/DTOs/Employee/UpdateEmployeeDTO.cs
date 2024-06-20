using OutOfOffice.Entities.Enums;

namespace OutOfOffice.Common.DTOs.Employee;

public class UpdateEmployeeDTO
{
    public int Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public Subdivision Subdivision { get; set; }
    public Position Position { get; set; }
}