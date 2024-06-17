using Microsoft.AspNetCore.Mvc;
using OutOfOffice.BLL.Interfaces;
using OutOfOffice.Common.DTOs;

namespace OutOfOffice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Login(LoginUserDTO dto)
        {
            var result = await _authService.LoginAsync(dto);

            return Ok(result);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Register(RegisterUserDTO dto)
        {
            var result = await _authService.RegisterAsync(dto);

            return Ok(result);
        }
    }
}
