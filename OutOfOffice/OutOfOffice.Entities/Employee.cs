using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
using OutOfOffice.Entities.Enums;

namespace OutOfOffice.Entities;

public class Employee : IdentityUser<int>
{
    public string FullName { get; set; } = string.Empty;
    public Subdivision Subdivision { get; set; }
    public Position Position { get; set; }
    public Status Status { get; set; } = Status.Active;
    [ForeignKey(nameof(Employee))]
    public int? PeoplePartnerId { get; set; } 
    public decimal OutOfOfficeBalance { get; set; }
    public string? Photo { get; set; } = string.Empty;

    public Employee PeoplePartner { get; set; } = null!;
    public List<LeaveRequest> LeaveRequests { get; set; } = new();
    public List<Project> Projects { get; set; } = new();
}

