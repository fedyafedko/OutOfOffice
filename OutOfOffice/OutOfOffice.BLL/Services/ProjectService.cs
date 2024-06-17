using AutoMapper;
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
    private readonly IMapper _mapper;
    public ProjectService(IRepository<Project> projectRepository, IMapper mapper)
    {
        _projectRepository = projectRepository;
        _mapper = mapper;
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

    public async Task<List<ProjectDTO>> GetProjectsAsync(SortRequest request)
    {
        var projects = await _projectRepository.Include(x => x.Employee).ToListAsync();

        if (!string.IsNullOrEmpty(request.SortBy))
        {
            var sortBy = request.SortBy.ToLower();

            var sortingDictionary = new Dictionary<string, Func<IQueryable<Project>, IOrderedQueryable<Project>>>
            {
                { nameof(Project.ProjectType).ToLower(), query => query.OrderBy(e => e.ProjectType) },
                { nameof(Project.StartDate).ToLower(), query => query.OrderBy(e => e.StartDate) },
                { nameof(Project.EndDate).ToLower(), query => query.OrderBy(e => e.EndDate) },
                { nameof(Project.Comment).ToLower(), query => query.OrderBy(e => e.Comment) },
            };

            if (sortingDictionary.TryGetValue(sortBy, out var orderBy))
            {
                projects = orderBy(projects.AsQueryable()).ToList();
            }
        }

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
