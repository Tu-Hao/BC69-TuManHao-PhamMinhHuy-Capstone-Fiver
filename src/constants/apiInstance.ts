import axios, { InternalAxiosRequestConfig } from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const apiInstance = {
    create: (setting?: Partial<InternalAxiosRequestConfig>) => {
        const axiosInstance = axios.create()
        axiosInstance.interceptors.request.use((config) => {
            return {
                ...config,
                ...setting,
                headers: {
                    ...(setting?.headers || {}),
                    TokenCybersoft:
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA2OSIsIkhldEhhblN0cmluZyI6IjMxLzAxLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTczODI4MTYwMDAwMCIsIm5iZiI6MTcxMDUyMjAwMCwiZXhwIjoxNzM4NDI5MjAwfQ.bsAaudu2iAsJe1QzbsWWy0HG7ofC_8rFKL-MG_jW1ig",
                },
            } as unknown as InternalAxiosRequestConfig
        })
        return axiosInstance
    }
}

export const apiInstanceToken = {
    create: (setting?: Partial<InternalAxiosRequestConfig>) => {
        const axiosInstanceBearer = axios.create()
        axiosInstanceBearer.interceptors.request.use((config) => {
            const token = useSelector((state: RootState) => state.auth.token);
            return {
                ...config,
                ...setting,
                headers: {
                    ...(setting?.headers || {}),
                    token: token,
                    TokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA2OSIsIkhldEhhblN0cmluZyI6IjAxLzAyLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTczODM2ODAwMDAwMCIsIm5iZiI6MTcxMDUyMjAwMCwiZXhwIjoxNzM4NTE1NjAwfQ.ap-iPzMpXDeCuXH0aJnbbSuR3vIW4upk1nOK3h9D-5g"
                }
            } as unknown as InternalAxiosRequestConfig
        })
        return axiosInstanceBearer
    }
}

