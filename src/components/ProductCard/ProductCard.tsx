import {AlignRightOutlined, NumberOutlined, WalletOutlined} from '@ant-design/icons'
import {Card, Flex, Typography} from 'antd'
import {FC} from 'react'
import {useMediaQuery} from 'react-responsive'
import {RESPONSIVE} from '../../constants/constants.ts'
import {IProduct} from '../../types/interfaces/product.interface.ts'

export const ProductCard: FC<IProduct> = ({brand, id, price, product}) => {
	const isMobile = useMediaQuery({query: RESPONSIVE.TABLET})
	const formattedPrice = Intl.NumberFormat('ru', {notation: 'standard', style: 'currency', currency: 'rub'}).format(price)

	return (
		<Card title={brand ?? 'Unknown'} style={{width: isMobile ? '100%' : '400px'}} hoverable>
			<Flex vertical>
				<Flex vertical gap='5px'>
					<Flex gap='10px'>
						<AlignRightOutlined /><Typography style={{color: 'black'}}>{product}</Typography>
					</Flex>
					<Flex gap='10px' justify='end'>
						<WalletOutlined style={{color: 'grey'}} /><Typography style={{textAlign: 'right', color: 'grey'}}>{formattedPrice}</Typography>
					</Flex>
				</Flex>
				<Flex align='center' justify='start' gap='3px'>
					<NumberOutlined style={{width: '8px', color: 'lightgrey'}} />
					<Typography style={{textAlign: 'left', fontSize: '6px', color: 'lightgrey', paddingTop: '2px'}}>{id}</Typography>
				</Flex>
			</Flex>
		</Card>
	)
}