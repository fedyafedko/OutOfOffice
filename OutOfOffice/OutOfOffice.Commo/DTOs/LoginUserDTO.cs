namespace OutOfOffice.Common.DTOs;

public class LoginUserDTO
{
    public int Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}
