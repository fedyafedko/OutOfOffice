import { ApiRequestBase } from "./ApiRequestBase";

interface AddLeaveRequestRequest extends ApiRequestBase{
    absenceReason: string;
    startDate: Date;
    endDate: Date;
    comment: string;
}

export default AddLeaveRequestRequest;