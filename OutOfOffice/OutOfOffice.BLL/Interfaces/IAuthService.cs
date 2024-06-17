using OutOfOffice.Common.DTOs;

namespace OutOfOffice.BLL.Interfaces;

public interface IAuthService
{
    Task<AuthSuccessDTO> LoginAsync(LoginUserDTO dto);

    Task<AuthSuccessDTO> RegisterAsync(RegisterUserDTO dto);

}
