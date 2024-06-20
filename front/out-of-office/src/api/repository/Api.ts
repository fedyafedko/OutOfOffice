import axios from "axios";
import { ApiRequestBase } from "../models/request/ApiRequestBase";
import ApiResponse from "../models/response/ApiResponse";

const API_URL = 'https://localhost:7051/api';

const Api = {
    get: async <TResponse>(url: string, params?: any): Promise<ApiResponse<TResponse>> => {
        try {
            const response = await axios.get<TResponse>(API_URL + url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                },
                params
            });
            return { success: true, data: response.data, statusCode: response.status };
        } catch (error: any) {
            return { success: false, error: error.response?.data, statusCode: error.response?.status };
        }
    },

    post: async <TRequest extends ApiRequestBase, TResponse>(
        url: string,
        data?: TRequest,
        headers?: { [key: string]: string }
    ): Promise<ApiResponse<TResponse>> => {
        try {
            const response = await axios.post<TResponse>(API_URL + url, data, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                    ...headers
                }
            });
            return { success: true, data: response.data, statusCode: response.status };
        } catch (error: any) {
            return { success: false, error: error.response?.data, statusCode: error.response?.status };
        }
    },

    put: async <TRequest extends ApiRequestBase, TResponse>(
        url: string,
        data: TRequest
    ): Promise<ApiResponse<TResponse>> => {
        try {
            const response = await axios.put<TResponse>(API_URL + url, data, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                }
            });
            return { success: true, data: response.data, statusCode: response.status };
        } catch (error: any) {
            return { success: false, error: error.response?.data, statusCode: error.response?.status };
        }
    },

    delete: async <TResponse>(url: string): Promise<ApiResponse<TResponse>> => {
        try {
            const response = await axios.delete<TResponse>(API_URL + url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                }
            });
            return { success: true, data: response.data, statusCode: response.status };
        } catch (error: any) {
            return { success: false, error: error.response?.data, statusCode: error.response?.status };
        }
    },
};

export default Api;