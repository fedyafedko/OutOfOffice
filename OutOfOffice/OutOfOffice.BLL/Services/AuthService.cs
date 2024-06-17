using AutoMapper;
using Microsoft.AspNetCore.Identity;
using OutOfOffice.BLL.Interfaces;
using OutOfOffice.Common.DTOs;
using OutOfOffice.Common.Exceptions;
using OutOfOffice.Entities;

namespace OutOfOffice.BLL.Services;

public class AuthService : IAuthService
{
    private readonly UserManager<Employee> _userManager;
    private readonly ITokenService _tokenService;
    private readonly IMapper _mapper;

    public AuthService(
        UserManager<Employee> userManager,
        ITokenService tokenService,
        IMapper mapper)
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _mapper = mapper;
    }

    public async Task<AuthSuccessDTO> LoginAsync(LoginUserDTO dto)
    {
        var user = await _userManager.FindByEmailAsync(dto.Email)
           ?? throw new NotFoundException($"Unable to find user by specified email. Email: {dto.Email}");

        var isPasswordValid = await _userManager.CheckPasswordAsync(user, dto.Password);

        if (!isPasswordValid)
            throw new InvalidCredentialsException($"User input incorrect password. Password: {dto.Password}");

        var result = new AuthSuccessDTO
        {
            AccessToken = await _tokenService.GenerateJwtTokenAsync(user)
        };

        return result;
    }

    public async Task<AuthSuccessDTO> RegisterAsync(RegisterUserDTO dto)
    {
        var user = await _userManager.FindByEmailAsync(dto.Email);

        if (user != null)
            throw new AlreadyExistsException($"User with specified email already exists. Email: {dto.Email}");

        user = _mapper.Map<Employee>(dto);
        user.UserName = dto.Email;

        var result = await _userManager.CreateAsync(user, dto.Password);

        if (!result.Succeeded)
            throw new UserManagerException($"User manager operation failed:\n", result.Errors);

        var role = dto.Role;

        var currentUser = await _userManager.FindByIdAsync(user.Id.ToString());

        var roleResult = await _userManager.AddToRoleAsync(user, role);

        if (!roleResult.Succeeded)
            throw new UserManagerException($"User manager operation failed:\n", roleResult.Errors);

        var token = new AuthSuccessDTO
        {
            AccessToken = await _tokenService.GenerateJwtTokenAsync(user)
        };

        return token;
    }
}
