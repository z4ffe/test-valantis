import {AxiosResponse} from 'axios'
import {apiInstance} from '../api/apiInstance.ts'
import {IResponse} from '../types/apiResponse.ts'
import {IProduct} from '../types/product.ts'

class ProductsService {
	async getAllProducts() {
		const response: AxiosResponse<IResponse<string[]>> = await apiInstance.post('', {
			'action': 'get_ids',
		})
		return response.data.result
	}

	async getProductsIds(offset: number = 0, limit: number = 50) {
		const response: AxiosResponse<IResponse<string[]>> = await apiInstance.post('', {
			'action': 'get_ids',
			'params': {
				offset,
				limit,
			},
		})
		return response.data.result
	}

	async getProductsByIds(products: string[]) {
		const response: AxiosResponse<IResponse<IProduct[]>> = await apiInstance.post('http://api.valantis.store:40000/', {
			'action': 'get_items',
			'params': {
				'ids': products,
			},
		})
		return response.data.result
	}
}

export const productService = new ProductsService()