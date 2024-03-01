import {useQuery} from '@tanstack/react-query'
import {useState} from 'react'
import {CONSTANTS} from '../constants/CONSTANTS.ts'
import {productService} from '../services/productsService.ts'
import {FieldTypes} from '../types/fieldTypes.ts'
import {removeDuplicateProducts} from '../utils/removeDuplicateProducts.ts'

export const useQueryProducts = (field?: FieldTypes | null, fieldValue?: string | number) => {
	const [offset, setOffset] = useState<number>(CONSTANTS.DEFAULT_OFFSET)
	const [limit, setLimit] = useState<number>(CONSTANTS.DEFAULT_LIMIT)
	const [total, setTotal] = useState<number>(0)

	const fetchProducts = async () => {
		window.scrollTo(0, 0)
		if (field && fieldValue) {
			const productsIdsList = await productService.getAllProductsByFilter(field, fieldValue)
			setTotal(productsIdsList.length)
			return removeDuplicateProducts(await productService.getProductsByIds(productsIdsList))
		}
		const productTotalAmount = await productService.getAllProducts()
		setTotal(productTotalAmount.length)
		const productsIdsList = await productService.getProductsIds(offset, limit)
		return removeDuplicateProducts(await productService.getProductsByIds(productsIdsList))
	}

	const {data, isError, isLoading} = useQuery({
		queryKey: ['products', offset, limit, field, fieldValue],
		queryFn: fetchProducts,
		retry: 5,
	})

	const changePage = (page: number) => {
		setOffset(page * limit)
	}

	const changeLimit = (_page: number, limit: number) => {
		setOffset(0)
		setLimit(limit)
	}

	return {offset, total, data, isError, isLoading, changePage, limit, changeLimit}
}