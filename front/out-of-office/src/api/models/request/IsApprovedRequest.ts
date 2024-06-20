import { ApiRequestBase } from "./ApiRequestBase";

interface IsApprovedRequest extends ApiRequestBase{
    leaveRequestId: number;
    isApproved: boolean;
    comment: string | null;
    outOfOfficeBalance: number | null;
}

export default IsApprovedRequest;