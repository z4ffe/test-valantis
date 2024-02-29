import {useQuery} from '@tanstack/react-query'
import {useState} from 'react'
import {CONSTANTS} from '../constants/CONSTANTS.ts'
import {productService} from '../services/productsService.ts'
import {removeDuplicateProducts} from '../utils/removeDuplicateProducts.ts'

export const useQueryProducts = () => {
	const [offset, setOffset] = useState<number>(CONSTANTS.DEFAULT_OFFSET)
	const [limit, setLimit] = useState<number>(CONSTANTS.DEFAULT_LIMIT)
	const [total, setTotal] = useState<number>(0)

	const fetchProducts = async () => {
		window.scrollTo(0, 0)
		const productTotalAmount = await productService.getAllProducts()
		setTotal(productTotalAmount.length)
		const productsIdsList = await productService.getProductsIds(offset, limit)
		return removeDuplicateProducts(await productService.getProductsByIds(productsIdsList))
	}

	const {data, isError, isLoading} = useQuery({
		queryKey: ['products', offset, limit],
		queryFn: fetchProducts,
		retry: 1,
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