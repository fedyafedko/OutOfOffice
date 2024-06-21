import { ApiRequestBase } from "./ApiRequestBase";

interface UpdateProjectRequest extends ApiRequestBase{
    id: number;
    projectType: string;
    startDate: Date;
    endDate: Date;
    comment: string;
}

export default UpdateProjectRequest;