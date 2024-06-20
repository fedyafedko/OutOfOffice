import { ApiRequestBase } from "./ApiRequestBase";

interface UpdateProjectRequestRequest extends ApiRequestBase{
    id: number;
    projectType: string;
    startDate: Date;
    endDate: Date;
    comment: string;
}

export default UpdateProjectRequestRequest;