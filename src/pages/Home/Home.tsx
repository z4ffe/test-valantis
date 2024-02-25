import {LoadingOutlined} from '@ant-design/icons'
import {Divider, Flex, Pagination, Spin} from 'antd'
import {Error} from '../../components/Error/Error.tsx'
import {ProductCard} from '../../components/ProductCard/ProductCard.tsx'
import {useQueryProducts} from '../../hooks/useQueryProducts.tsx'

export const Home = () => {
	const {changePage, isLoading, isError, data, total} = useQueryProducts()

	if (isError) {
		return <Error />
	}

	return (
		<div style={{height: '100%'}}>
			<Flex justify='space-around' align='center' wrap='wrap' style={{margin: '20px 0'}} gap='10px'>
				{!isLoading && total ?
					data?.map((product) => <ProductCard key={product.id} brand={product.brand} id={product.id} price={product.price} product={product.product} />)
					: <Spin indicator={<LoadingOutlined style={{fontSize: 24}} spin />} />
				}
			</Flex>
			<Divider />
			<Flex justify='center' style={{margin: '20px 0'}}>
				<Pagination defaultCurrent={1} total={total - 50} showSizeChanger={false} defaultPageSize={50} onChange={changePage} />
			</Flex>
		</div>
	)
}