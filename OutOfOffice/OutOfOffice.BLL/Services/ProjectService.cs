using AutoMapper;
using Azure.Core;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OutOfOffice.BLL.Interfaces;
using OutOfOffice.Common.DTOs;
using OutOfOffice.Common.Exceptions;
using OutOfOffice.Common.Requests;
using OutOfOffice.DAL.Repositories.Interfaces;
using OutOfOffice.Entities;

namespace OutOfOffice.BLL.Services;

public class ProjectService : IProjectService
{
    private readonly IRepository<Project> _projectRepository;
    private readonly UserManager<Employee> _userManager;
    private readonly IMapper _mapper;
    public ProjectService(IRepository<Project> projectRepository, IMapper mapper, UserManager<Employee> userManager)
    {
        _projectRepository = projectRepository;
        _mapper = mapper;
        _userManager = userManager;
    }

    public async Task<bool> AddToProjectAsync(AddToProjectRequest request)
    {
        var employee = await _userManager.FindByIdAsync(request.EmployeeId.ToString())
            ?? throw new NotFoundException("Project not found");    

        var project = await _projectRepository.FirstOrDefaultAsync(x => x.Id == request.ProjectId)
            ?? throw new NotFoundException("Project not found");

        project.EmployeeId = employee.Id;

        var result = _projectRepository.Update(project);

        return result;
    }

    public async Task<ProjectDTO> AddProjectAsync(CreateProjectDTO projectDTO)
    {
        var project = _mapper.Map<Project>(projectDTO);

        await _projectRepository.InsertAsync(project);

        return _mapper.Map<ProjectDTO>(project);
    }

    public async Task<ProjectDTO> GetProjectByIdAsync(int id)
    {
        var project = await _projectRepository.Include(x => x.Employee).FirstOrDefaultAsync(x => x.Id == id)
            ?? throw new NotFoundException("Project not found");

        return _mapper.Map<ProjectDTO>(project);
    }

    public async Task<List<ProjectDTO>> GetProjectsAsync()
    {
        var projects = await _projectRepository.Include(x => x.Employee).ToListAsync();

        return _mapper.Map<List<ProjectDTO>>(projects);
    }

    public async Task<ProjectDTO> UpdateProjectAsync(UpdateProjectDTO projectDTO)
    {
        var project = await _projectRepository.FirstOrDefaultAsync(x => x.Id == projectDTO.Id)
            ?? throw new NotFoundException("Project not found");

        project = _mapper.Map(projectDTO, project);

        await _projectRepository.UpdateAsync(project);

        return _mapper.Map<ProjectDTO>(project);
    }
}
