import AddLeaveRequestRequest from "./models/request/AddLeaveRequestRequest";
import IsApprovedRequest from "./models/request/IsApprovedRequest";
import LeaveRequestResponse from "./models/response/LeaveRequestResponse";
import Api from "./repository/Api";

const LeaveRequest = {
    getAll: async (): Promise<LeaveRequestResponse[]> => {
        const response = await Api.get<LeaveRequestResponse[]>('/LeaveRequest');

        if (response.success) {
            return response.data as LeaveRequestResponse[];
        }

        return response.error;
    },
    getById: async (id: string): Promise<LeaveRequestResponse> => {
        const response = await Api.get<LeaveRequestResponse>(`/LeaveRequest/${id}`);

        if (response.success) {
            return response.data as LeaveRequestResponse;
        }

        return response.error;
    },
    isApproved: async (request: IsApprovedRequest): Promise<boolean> => {
        const response = await Api.put<IsApprovedRequest, boolean>('/LeaveRequest/IsApproved', request);

        if (response.success) {
            return true;
        }

        return response.error;
    },
    canceledLeaveRequest: async (id: number): Promise<any> => {
        const response = await Api.put<number, boolean>(`/LeaveRequest/CanceledLeaveRequest?id=${id}`, id);

        if (response.success) {
            return undefined;
        }

        return response.error;
    },
    add: async (request: AddLeaveRequestRequest): Promise<LeaveRequestResponse> => {
        const response = await Api.post<AddLeaveRequestRequest, LeaveRequestResponse>(`/LeaveRequest/AddLeaveRequest`, request);

        if (response.success) {
            return response.data as LeaveRequestResponse;
        }

        return response.error;
    }
};

export default LeaveRequest;