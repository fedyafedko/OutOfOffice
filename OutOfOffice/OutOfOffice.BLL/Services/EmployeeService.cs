using AutoMapper;
using Microsoft.AspNetCore.Identity;
using OutOfOffice.BLL.Interfaces;
using OutOfOffice.Common.DTOs.Employee;
using OutOfOffice.Common.Exceptions;
using OutOfOffice.DAL.Repositories.Interfaces;
using OutOfOffice.Entities;
using OutOfOffice.Entities.Enums;

namespace OutOfOffice.BLL.Services;

public class EmployeeService : IEmployeeService
{
    private readonly UserManager<Employee> _userManager;
    private readonly IRepository<Employee> _employeeRepository;
    private readonly IMapper _mapper;

    public EmployeeService(
        UserManager<Employee> userManager,
        IMapper mapper,
        IRepository<Employee> employeeRepository)
    {
        _userManager = userManager;
        _mapper = mapper;
        _employeeRepository = employeeRepository;
    }

    public async Task<List<EmployeeDTO>> GetEmployeesAsync()
    {
        var employees = await _userManager.GetUsersInRoleAsync("Employee");

        return _mapper.Map<List<EmployeeDTO>>(employees);
    }

    public async Task<EmployeeDTO> GetEmployeeById(int employeeId)
    {
        var employee = await _userManager.FindByIdAsync(employeeId.ToString())
            ?? throw new NotFoundException($"Unable to find employee by specified id. Id: {employeeId}");

        return _mapper.Map<EmployeeDTO>(employee);
    }

    public async Task<string> GetRole(int employeeId)
    {
        var employee = await _userManager.FindByIdAsync(employeeId.ToString())
            ?? throw new NotFoundException($"Unable to find employee by specified id. Id: {employeeId}");

        var roles = await _userManager.GetRolesAsync(employee);

        return roles.First();
    }

    public async Task<EmployeeDTO> UpdateEmployeeAsync(UpdateEmployeeDTO dto)
    {
        var employee = await _userManager.FindByIdAsync(dto.Id.ToString())
            ?? throw new NotFoundException($"Unable to find employee by specified id. Id: {dto.Id}");

        employee = _mapper.Map(dto, employee);

        await _employeeRepository.UpdateAsync(employee);

        return _mapper.Map<EmployeeDTO>(employee);
    }

    public async Task<bool> AddEmployeeToHRAsync(int hrId, int employeeId)
    {
        var employee = await _userManager.FindByIdAsync(employeeId.ToString())
            ?? throw new NotFoundException($"Unable to find employee by specified id. Id: {employeeId}");

        var hr = await _userManager.FindByIdAsync(hrId.ToString())
            ?? throw new NotFoundException($"Unable to find HR by specified id. Id: {hrId}");

        employee.PeoplePartnerId = hr.Id;

        var result = await _employeeRepository.UpdateAsync(employee);

        return result;
    }

    public async Task<bool> DisactiveEmployeeAsync(int employeeId, Status status)
    {
        var employee = await _userManager.FindByIdAsync(employeeId.ToString())
        ?? throw new NotFoundException($"Unable to find employee by specified id. Id: {employeeId}");

        employee.Status = status;

        var result = await _employeeRepository.UpdateAsync(employee);

        return result;
    }
}