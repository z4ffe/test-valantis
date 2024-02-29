import {Flex, Input, Select} from 'antd'
import {FC} from 'react'
import {IProduct} from '../../types/interfaces/product.interface.ts'

interface Props {
	products: IProduct[] | undefined
}

export const FilterMenu: FC<Props> = ({products}) => {
	const brands = Array.from(new Set(products?.map(product => {
		if (product.brand) {
			return product.brand
		}
	})))

	return (
		<Flex gap='20px' align='center' justify='center' style={{height: '60px'}}>
			<Input placeholder='Find by name' style={{width: '10%'}} onChange={(e) => console.log(e.target.value)} />
			<Input placeholder='Find by price' style={{width: '10%'}} onChange={(e) => console.log(e.target.value)} />
			<Select style={{width: '10%'}} placeholder='Select by brand' onChange={(e) => console.log(e)} options={brands.map(brand => {
				console.log(brand)
				return {value: brand, label: <span>{brand}</span>}
			})} />
		</Flex>
	)
}