using OutOfOffice.Common.DTOs;
using OutOfOffice.Common.Requests;

namespace OutOfOffice.BLL.Interfaces;

public interface IProjectService
{
    Task<List<ProjectDTO>> GetProjectsAsync(SortRequest request);
    Task<ProjectDTO> GetProjectByIdAsync(int id);
    Task<ProjectDTO> AddProjectAsync(CreateProjectDTO projectDTO);
    Task<ProjectDTO> UpdateProjectAsync(UpdateProjectDTO projectDTO);
}
