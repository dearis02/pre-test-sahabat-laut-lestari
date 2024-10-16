import { clearToken, getAccessToken, rotateToken, setLoginSession, setToken } from "@/services/auth";
import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse, AxiosRequestConfig } from "axios";
import { redirect } from "next/navigation"

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL
const instance = axios.create({
	baseURL: baseURL,
});

interface CustomAxiosReqConfig extends AxiosRequestConfig {
	retry: boolean
}

interface CustomError extends Omit<AxiosError, 'config'> {
	config: CustomAxiosReqConfig
}

function onRequest(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
	const accessToken = getAccessToken()

	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config;
}

function onResponse(response: AxiosResponse): AxiosResponse {
	return response.data;
}

async function onError(error: CustomError): Promise<CustomError> {
	const { config, response } = error

	if (config.retry || (config?.url?.includes('/auth/refresh-token') ?? false)) {
		try {
			//TODO logout
			setLoginSession(false)
			clearToken()
			window.location.href = '/'
		} catch (e) {
			window.location.href = '/'
		}

		return Promise.reject(error)
	}

	if (response?.status === 401 && !(config?.url?.includes('/auth/refresh-token') ?? false)) {
		config.retry = true

		const refreshToken = localStorage.getItem('refreshToken')
		const res = await rotateToken(refreshToken!)

		setToken(res.accessToken, res.refreshToken)
		setLoginSession(true)
	}

	if (response?.status === 404) {
		redirect('/404')
	}

	const responseStatus = response?.status

	if (responseStatus! >= 500) window.location.href = '/500'

	return Promise.reject(error)
}

instance.interceptors.request.use(onRequest, onError);
instance.interceptors.response.use(onResponse, onError);

export default instance;