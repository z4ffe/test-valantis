import {AxiosResponse} from 'axios'
import {apiInstance} from '../api/apiInstance.ts'
import {CONSTANTS} from '../constants/CONSTANTS.ts'
import {ActionTypes} from '../types/enums/actionTypes.ts'
import {FieldTypes} from '../types/fieldTypes.ts'
import {IResponse} from '../types/interfaces/apiResponse.interface.ts'
import {IProduct} from '../types/interfaces/product.interface.ts'

class ProductsService {
	async getAllProducts() {
		const response: AxiosResponse<IResponse<string[]>> = await apiInstance.post('', {
			action: ActionTypes.GetIDs,
		})
		return response.data.result
	}

	async getProductsIds(offset: number = CONSTANTS.DEFAULT_OFFSET, limit: number = CONSTANTS.DEFAULT_LIMIT) {
		const response: AxiosResponse<IResponse<string[]>> = await apiInstance.post('', {
			action: ActionTypes.GetIDs,
			params: {
				offset,
				limit,
			},
		})
		return response.data.result
	}

	async getAllProductsByFilter(field?: any, value?: string | number, offset: number = CONSTANTS.DEFAULT_OFFSET, limit: number = CONSTANTS.DEFAULT_LIMIT) {
		const response: AxiosResponse<IResponse<string[]>> = await apiInstance.post('', {
			action: ActionTypes.GetFilteredItems,
			params: {
				[field]: value,
				offset,
				limit,
			},
		})
		return response.data.result
	}

	async getFields(field: FieldTypes) {
		const response: AxiosResponse<IResponse<string[]>> = await apiInstance.post('', {
			action: ActionTypes.GetFields,
			params: {
				field,
			},
		})
		return response.data.result
	}

	async getProductsByIds(products: string[]) {
		const response: AxiosResponse<IResponse<IProduct[]>> = await apiInstance.post('', {
			action: ActionTypes.GetItems,
			params: {
				ids: products,
			},
		})
		return response.data.result
	}
}

export const productService = new ProductsService()