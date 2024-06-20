import { ApiRequestBase } from "./ApiRequestBase";

interface IsActiveRequest extends ApiRequestBase{
    employeeId: number;
    status: number;
}

export default IsActiveRequest;