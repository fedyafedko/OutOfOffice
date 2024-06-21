import { ApiRequestBase } from "./ApiRequestBase";

interface AddProjectRequestRequest extends ApiRequestBase{
    projectType: string;
    startDate: Date;
    endDate: Date;
    comment: string;
    employeeId: number;
}

export default AddProjectRequestRequest;