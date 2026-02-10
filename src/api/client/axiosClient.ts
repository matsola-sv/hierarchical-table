import axios, { AxiosError, type AxiosInstance, type AxiosResponse } from 'axios';

import * as ROUTES from '@/constants/routes';

interface ClientConfig {
	baseURL: string;
	timeout?: number;
	withCredentials?: boolean; // for HttpOnly cookie – JS doesn't have access
	withAuth?: boolean; // use Authorization header (e.g. JWT in localStorage)
	authTokenKey?: string;
}

export const createAxiosClient = (clientConfig: ClientConfig): AxiosInstance => {
	const {
		baseURL,
		timeout = 10000,
		withCredentials = true,
		withAuth = false,
		authTokenKey = 'authToken',
	} = clientConfig;

	const client: AxiosInstance = axios.create({
		baseURL,
		timeout,
		headers: {
			'Content-Type': 'application/json',
		},
		withCredentials, // for HttpOnly cookie
	});

	console.log('createAxiosClient');

	/** Processes the request before sending (save data in storage if you need) */
	client.interceptors.request.use(
		config => {
			// Send Authorization header if withAuth
			if (withAuth) {
				const token = localStorage.getItem(authTokenKey);
				if (token && config.headers) {
					config.headers.Authorization = `Bearer ${token}`;
				}
			}

			return config;
		},
		(error: AxiosError) => {
			return Promise.reject(error);
		},
	);

	/** Processes successful response and errors.  */
	client.interceptors.response.use(
		(response: AxiosResponse) => {
			return response;
		},
		(error: AxiosError) => {
			if (error.response?.status === 401) {
				// Unauthorized - clear token and redirect to login
				if (withAuth) {
					localStorage.removeItem(authTokenKey);
					window.location.href = ROUTES.SIGN_IN;
				}
			}

			if (error.response?.status === 403) {
				console.error('Access forbidden');
			}

			if (error.response?.status === 404) {
				console.error('Resource not found');
			}

			if (error.response?.status === 500) {
				console.error('Server error');
			}

			return Promise.reject(error);
		},
	);

	return client;
};
