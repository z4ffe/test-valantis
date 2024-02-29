import {Flex, Input, Select} from 'antd'
import {FC, useEffect} from 'react'
import {productService} from '../../services/productsService.ts'
import {IProduct} from '../../types/interfaces/product.interface.ts'

interface Props {
	products: IProduct[] | undefined
}

export const FilterMenu: FC<Props> = ({products}) => {
	const brands = Array.from(new Set(products?.map(product => product.brand)))

	const asd = async () => {
		const res = await productService.getAllProductsByFilter(150, 'Piaget')
		const result = await productService.getProductsByIds(res)
		console.log(result)
	}

	useEffect(() => {
		void asd()
	}, [])

	return (
		<Flex gap='20px' align='center' justify='center' style={{height: '60px'}}>
			<Input placeholder='Sort by name' style={{width: '10%'}} />
			<Input placeholder='Find by price' style={{width: '10%'}} />
			<Select style={{width: '10%'}} placeholder='Select brand' onChange={(e) => console.log(e)} options={brands.map(brand => {
				return {value: brand, label: <span>{brand || 'Unknown'}</span>}
			})} />
		</Flex>
	)
}