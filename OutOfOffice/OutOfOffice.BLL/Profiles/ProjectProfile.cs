using AutoMapper;
using OutOfOffice.Common.DTOs;
using OutOfOffice.Entities;

namespace OutOfOffice.BLL.Profiles;

public class ProjectProfile : Profile
{
    public ProjectProfile()
    {
        CreateMap<Project, ProjectDTO>();
        CreateMap<CreateProjectDTO, Project>();
        CreateMap<UpdateProjectDTO, Project>();
    }
}
