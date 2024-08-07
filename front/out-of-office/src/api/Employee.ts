import UpdateEmployeeRequest from "./models/request/UpdateEmployeeRequest";
import EmployeeResponse from "./models/response/EmployeeResponse";
import Api from "./repository/Api";
import IsActiveRequest from "./models/request/IsActiveRequest";

const Employee = {
    getAll: async (): Promise<EmployeeResponse[]> => {
        const response = await Api.get<EmployeeResponse[]>('/Employee');

        if (response.success) {
            return response.data as EmployeeResponse[];
        }

        return response.error;
    },
    getById: async (id: string): Promise<EmployeeResponse> => {
        const response = await Api.get<EmployeeResponse>(`/Employee/${id}`);

        if (response.success) {
            return response.data as EmployeeResponse;
        }

        return response.error;
    },
    update: async (employee: UpdateEmployeeRequest): Promise<EmployeeResponse> => {
        const response = await Api.put<UpdateEmployeeRequest, EmployeeResponse>('/Employee/UpdateEmployee', employee);

        if (response.success) {
            return response.data as EmployeeResponse;
        }

        return response.error;
    },
    addToHR: async (employeeId: number): Promise<any> => {
        const response = await Api.put<number, boolean>(`/Employee/AddEmployeeToHR?employeeId=${employeeId}`, employeeId);

        if (response.success) {
            return undefined;
        }

        return response.error;
    },
    getRoles: async (): Promise<string> => {
        const response = await Api.get<string>('/Employee/GetRole');

        if (response.success) {
            return response.data as string;
        }

        return response.error;
    },
    isActive: async (request: IsActiveRequest): Promise<boolean> => {
        const response = await Api.put<IsActiveRequest,boolean>(`/Employee/DisactiveEmployee?employeeId=${request.employeeId}&status=${request.status}`, request);

        if (response.success) {
            return response.data as boolean;
        }

        return response.error;
    }
}

export default Employee;