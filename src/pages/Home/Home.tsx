import {Divider, Flex, Pagination} from 'antd'
import {Error} from '../../components/Error/Error.tsx'
import {FilterMenu} from '../../components/FilterMenu/FilterMenu.tsx'
import {ProductCard} from '../../components/ProductCard/ProductCard.tsx'
import {ProductCardSkeleton} from '../../components/ProductCardSkeleton/ProductCardSkeleton.tsx'
import {useQueryProducts} from '../../hooks/useQueryProducts.tsx'

export const Home = () => {
	const {changePage, isLoading, isError, data, total, limit} = useQueryProducts()

	if (isError) {
		return <Error />
	}

	const productsList = () => {
		if (!isLoading && data) {
			return data.map((product) => <ProductCard key={product.id} {...product} />)
		}
		return Array.from(Array(limit)).map(() => <ProductCardSkeleton key={Math.random()} />)
	}

	return (
		<div style={{height: '100%'}}>
			<FilterMenu products={data} />
			<Divider style={{margin: 0}} />
			<Flex justify='space-around' align='center' wrap='wrap' gap='10px' style={{margin: '10px 0'}}>
				{productsList()}
			</Flex>
			<Divider />
			<Flex justify='center' style={{margin: '20px 0'}}>
				<Pagination defaultCurrent={1} total={total} showSizeChanger={false} defaultPageSize={limit} onChange={changePage} />
			</Flex>
		</div>
	)
}