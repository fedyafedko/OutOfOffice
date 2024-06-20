using OutOfOffice.Common.DTOs.Employee;
using OutOfOffice.Common.Requests;
using OutOfOffice.Entities.Enums;

namespace OutOfOffice.BLL.Interfaces;

public interface IEmployeeService
{
    Task<bool> AddEmployeeToHRAsync(int hrId, int employeeId);
    Task<bool> DisactiveEmployeeAsync(int employeeId, Status status);
    Task<EmployeeDTO> GetEmployeeById(int employeeId);
    Task<List<EmployeeDTO>> GetEmployeesAsync();
    Task<string> GetRole(int employeeId);
    Task<EmployeeDTO> UpdateEmployeeAsync(UpdateEmployeeDTO dto);
}
