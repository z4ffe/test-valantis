import {Card, Flex, Typography} from 'antd'
import {FC} from 'react'
import {IProduct} from '../../types/product.ts'

export const ProductCard: FC<IProduct> = ({brand, id, price, product}) => {
	const formattedPrice = Intl.NumberFormat('ru', {notation: 'standard', style: 'currency', currency: 'rub'}).format(price)

	return (
		<Card title={brand ?? 'Unknown'} style={{width: '400px'}} hoverable>
			<Flex vertical>
				<Flex vertical gap='5px'>
					<Typography style={{color: 'black'}}>{product}</Typography>
					<Typography style={{textAlign: 'right', color: 'grey'}}>{formattedPrice}</Typography>
				</Flex>
				<Typography style={{textAlign: 'left', fontSize: '6px', color: 'lightgrey'}}>{id}</Typography>
			</Flex>
		</Card>
	)
}