using OutOfOffice.Common.DTOs;
using OutOfOffice.Common.Requests;

namespace OutOfOffice.BLL.Interfaces;

public interface IProjectService
{
    Task<List<ProjectDTO>> GetProjectsAsync();
    Task<ProjectDTO> GetProjectByIdAsync(int id);
    Task<ProjectDTO> AddProjectAsync(CreateProjectDTO projectDTO);
    Task<ProjectDTO> UpdateProjectAsync(UpdateProjectDTO projectDTO);
    Task<bool> AddToProjectAsync(AddToProjectRequest request);
}
