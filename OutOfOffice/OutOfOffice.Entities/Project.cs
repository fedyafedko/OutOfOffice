using System.ComponentModel.DataAnnotations.Schema;
using OutOfOffice.Entities.Enums;

namespace OutOfOffice.Entities;

public class Project : EntityBase
{
    public ProjectType ProjectType { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    [ForeignKey(nameof(Employee))]
    public int EmployeeId { get; set; }
    public string? Comment { get; set; } = string.Empty;

    public Employee Employee { get; set; } = null!;
}

