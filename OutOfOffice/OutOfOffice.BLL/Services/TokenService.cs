using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using OutOfOffice.BLL.Interfaces;
using OutOfOffice.Common.Configs;
using OutOfOffice.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace OutOfOffice.BLL.Services;

public class TokenService : ITokenService
{
    private readonly JwtConfig _jwtConfig;
    private readonly UserManager<Employee> _userManager;

    public TokenService(
        JwtConfig jwtConfig,
        UserManager<Employee> userManager)
    {
        _jwtConfig = jwtConfig;
        _userManager = userManager;
    }

    public async Task<string> GenerateJwtTokenAsync(Employee employee)
    {
        var jwtTokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(_jwtConfig.Secret);

        var claims = new List<Claim>
        {
            new Claim("id", employee.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Sub, employee.Email!),
            new Claim(JwtRegisteredClaimNames.Email, employee.Email!),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var roles = await _userManager.GetRolesAsync(employee);

        claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.Add(_jwtConfig.AccessTokenLifeTime),
            SigningCredentials =
                new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            Issuer = _jwtConfig.Issuer,
            Audience = _jwtConfig.Audience
        };

        var token = jwtTokenHandler.CreateToken(tokenDescriptor);
        var jwtToken = jwtTokenHandler.WriteToken(token);
        return jwtToken;
    }
}
