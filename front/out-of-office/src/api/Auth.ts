import SignInRequest from "./models/request/SignInRequest";
import SignUpRequest from "./models/request/SignUpRequest";
import AuthSuccessResponse from "./models/response/AuthSuccessResponse";
import Api from "./repository/Api";

const Auth = {
    signIn: async (request: SignInRequest): Promise<any> => {
        const response = await Api.post<SignInRequest, AuthSuccessResponse>('/Auth/Login', request);

        if (response.success) {
            const tokens = response.data as AuthSuccessResponse;
            localStorage.setItem('accessToken', tokens.accessToken ?? '');

            return undefined;
        }

        return response.error;
    },
    signUp: async (request: SignUpRequest): Promise<any> => {
        const response = await Api.post<SignUpRequest, AuthSuccessResponse>('/auth/register', request);

        if (response.success) {
            const tokens = response.data as AuthSuccessResponse;
            localStorage.setItem('accessToken', tokens.accessToken ?? '');

            return undefined;
        }

        return response.error;
    },
};

export default Auth;