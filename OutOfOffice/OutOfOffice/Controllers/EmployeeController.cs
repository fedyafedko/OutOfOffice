using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OutOfOffice.BLL.Interfaces;
using OutOfOffice.Common.Extensions;
using OutOfOffice.Common.Requests;
using OutOfOffice.Entities.Enums;

namespace OutOfOffice.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class EmployeeController : ControllerBase
{
    private readonly IEmployeeService _employeeService;

    public EmployeeController(IEmployeeService employeeService)
    {
        _employeeService = employeeService;
    }

    [HttpGet]
    public async Task<IActionResult> GetEmployees([FromQuery] SortRequest request)
    {
        var employees = await _employeeService.GetEmployeesAsync(request);

        return Ok(employees);
    }

    [HttpGet("{employeeId}")]
    public async Task<IActionResult> GetEmployeeById(int employeeId)
    {
        var employee = await _employeeService.GetEmployeeById(employeeId);

        return Ok(employee);
    }

    [HttpPut("[action]")]
    [Authorize(Roles = "HR Manager")]
    public async Task<IActionResult> AddEmployeeToHR(int employeeId)
    {
        var hrId = HttpContext.GetUserId();
        var result = await _employeeService.AddEmployeeToHRAsync(hrId, employeeId);

        return Ok(result);
    }

    [HttpPut("[action]")]
    [Authorize(Roles = "HR Manager")]
    public async Task<IActionResult> DisactiveEmployee(int employeeId, Status status)
    {
        var result = await _employeeService.DisactiveEmployeeAsync(employeeId, status);

        return Ok(result);
    }
}
