using OutOfOffice.Entities;

namespace OutOfOffice.BLL.Interfaces;

public interface ITokenService
{
    Task<string> GenerateJwtTokenAsync(Employee employee);

}
