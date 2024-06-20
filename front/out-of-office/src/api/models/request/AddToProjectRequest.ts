import { ApiRequestBase } from "./ApiRequestBase";

interface AddToProjectRequest extends ApiRequestBase{
    employeeId: string;
    projectId: string;
}

export default AddToProjectRequest;