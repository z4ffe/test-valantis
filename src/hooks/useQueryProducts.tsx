import {useQuery} from '@tanstack/react-query'
import {useState} from 'react'
import {productService} from '../services/productsService.ts'

export const useQueryProducts = () => {
	const [offset, setOffset] = useState<number>(0)
	const [total, setTotal] = useState<number>(0)
	const [limit] = useState<number>(50)

	const fetchProducts = async () => {
		const productTotalAmount = await productService.getAllProducts()
		setTotal(productTotalAmount.length)
		const productsIdsList = await productService.getProductsIds(offset, limit)
		return await productService.getProductsByIds(productsIdsList)
	}

	const {data, isError, isLoading} = useQuery({
		queryKey: ['products', offset],
		queryFn: fetchProducts,
		retry: 3,
	})

	const changePage = (page: number) => {
		setOffset(page * limit)
	}

	return {offset, total, data, isError, isLoading, changePage}
}