using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OutOfOffice.BLL.Interfaces;
using OutOfOffice.Common.DTOs;
using OutOfOffice.Common.Requests;

namespace OutOfOffice.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class ProjectController : ControllerBase
{
    private readonly IProjectService _projectService;

    public ProjectController(IProjectService projectService)
    {
        _projectService = projectService;
    }

    [HttpGet]
    public async Task<IActionResult> GetProjects()
    {
        var result = await _projectService.GetProjectsAsync();

        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetProjectById(int id)
    {
        var result = await _projectService.GetProjectByIdAsync(id);

        return Ok(result);
    }

    [HttpPut("[action]")]
    [Authorize(Roles = "Project manager")]
    public async Task<IActionResult> UpdateProject(UpdateProjectDTO dto)
    {
        var result = await _projectService.UpdateProjectAsync(dto);

        return Ok(result);
    }


    [HttpPost("[action]")]
    [Authorize(Roles = "Project manager")]
    public async Task<IActionResult> AddProject(CreateProjectDTO dto)
    {
        var result = await _projectService.AddProjectAsync(dto);

        return Ok(result);
    }

    [HttpPost("[action]")]
    [Authorize(Roles = "Project manager")]
    public async Task<IActionResult> AddToProject(AddToProjectRequest request)
    {
        var result = await _projectService.AddToProjectAsync(request);

        return Ok(result);
    }
}
