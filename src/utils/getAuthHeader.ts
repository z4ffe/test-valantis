import {md5} from 'js-md5'

const PASSWORD = import.meta.env.VITE_API_PASSWORD

export const getAuthHeader = () => {
	const TIMESTAMP = new Date().toISOString().split('T')[0].replace(/-/g, '')
	return md5(`${PASSWORD}_${TIMESTAMP}`)
}