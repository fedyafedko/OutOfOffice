import { ApiRequestBase } from "./ApiRequestBase";

interface SignUpRequest extends ApiRequestBase{
    fullName: string;
    subdivision: string;
    position: string;
    email: string;
    password: string;
    role: string;
}

export default SignUpRequest;