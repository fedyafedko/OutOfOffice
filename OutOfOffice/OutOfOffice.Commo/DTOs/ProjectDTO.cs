using OutOfOffice.Common.DTOs.Employee;
using OutOfOffice.Entities.Enums;

namespace OutOfOffice.Common.DTOs;

public class ProjectDTO
{
    public int Id { get; set; }
    public ProjectType ProjectType { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string? Comment { get; set; } = string.Empty;
    public EmployeeDTO Employee { get; set; } = null!;
}
