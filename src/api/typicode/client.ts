import { createAxiosClient } from '@/api/client/axiosClient';

const typicodeClient = createAxiosClient({
	baseURL: 'https://jsonplaceholder.typicode.com',
	withAuth: true,
});

export default typicodeClient;
