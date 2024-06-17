using OutOfOffice.Entities.Enums;

namespace OutOfOffice.Common.DTOs;

public class RegisterUserDTO
{
    public string FullName { get; set; } = string.Empty;
    public Subdivision? Subdivision { get; set; }
    public Position? Position { get; set; }
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
}