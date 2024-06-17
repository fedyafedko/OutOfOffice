using OutOfOffice.Entities.Enums;

namespace OutOfOffice.Common.DTOs
{
    public class CreateProjectDTO
    {
        public ProjectType ProjectType { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? Comment { get; set; } = string.Empty;
        public int EmployeeId { get; set; }
    }
}
