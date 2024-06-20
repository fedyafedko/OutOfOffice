import { ApiRequestBase } from "./ApiRequestBase";

interface SignInRequest extends ApiRequestBase{
    email: string;
    password: string;
}

export default SignInRequest;