import { ApiRequestBase } from "./ApiRequestBase";

interface UpdateEmployeeRequest extends ApiRequestBase {
    id: number;
    fullName: string;
    subdivision: string;
    position: string;
    email: string;
}

export default UpdateEmployeeRequest;