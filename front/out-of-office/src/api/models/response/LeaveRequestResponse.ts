import EmployeeResponse from "./EmployeeResponse";

interface LeaveRequestResponse{
    id: number;
    absenceReason: string;
    startDate: Date;
    endDate: Date;
    comment: string;
    status: string;
    employee: EmployeeResponse;
}

export default LeaveRequestResponse;