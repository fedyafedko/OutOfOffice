import AddProjectRequest from "./models/request/AddProjectRequest";
import AddToProjectRequest from "./models/request/AddToProjectRequest";
import UpdateProjectRequest from "./models/request/UpdateProjectRequest";
import ProjectResponse from "./models/response/ProjectResponse";
import Api from "./repository/Api";

const Project = {
    getAll: async (): Promise<ProjectResponse[]> => {
        const response = await Api.get<ProjectResponse[]>('/Project');

        if (response.success) {
            return response.data as ProjectResponse[];
        }

        return response.error;
    },
    getById: async (id: string): Promise<ProjectResponse> => {
        const response = await Api.get<ProjectResponse>(`/Project/${id}`);

        if (response.success) {
            return response.data as ProjectResponse;
        }

        return response.error;
    },
    update: async (request: UpdateProjectRequest): Promise<ProjectResponse> => {
        const response = await Api.put<UpdateProjectRequest, ProjectResponse>('/Project/UpdateProject', request);

        if (response.success) {
            return response.data as ProjectResponse;
        }

        return response.error;
    },
    addToProject: async (request: AddToProjectRequest): Promise<any> => {
        const response = await Api.post<AddToProjectRequest, boolean>(`/Project/AddToProject`, request);

        if (response.success) {
            return undefined;
        }

        return response.error;
    },
    add: async (request: AddProjectRequest): Promise<any> => {
        const response = await Api.post<AddProjectRequest, ProjectResponse>(`/Project/AddProject`, request);

        if (response.success) {
            return undefined;
        }

        return response.error;
    }
};

export default Project;