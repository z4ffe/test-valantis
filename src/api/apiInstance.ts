import axios from 'axios'
import {getAuthHeader} from '../utils/getAuthHeader.ts'

const API_URL = import.meta.env.VITE_API_URL

export const apiInstance = axios.create({
	baseURL: API_URL,
	headers: {
		'X-Auth': getAuthHeader(),
	},
})