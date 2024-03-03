import {Divider, Empty, Flex, Pagination} from 'antd'
import {useState} from 'react'
import {Background} from '../../components/Background/Background.tsx'
import {Error} from '../../components/Error/Error.tsx'
import {FilterMenu} from '../../components/FilterMenu/FilterMenu.tsx'
import {ProductCard} from '../../components/ProductCard/ProductCard.tsx'
import {ProductCardSkeleton} from '../../components/ProductCardSkeleton/ProductCardSkeleton.tsx'
import {useQueryProducts} from '../../hooks/useQueryProducts.ts'
import {FieldTypes} from '../../types/fieldTypes.ts'

export const Home = () => {
	const [filter, setFilter] = useState<string | number>('')
	const [filterType, setFilterType] = useState<FieldTypes | null>(null)

	const {changePage, isLoading, isError, data, total, limit} = useQueryProducts(filterType, filter)

	const handleProductFilter = (type: FieldTypes | null, value: string | number) => {
		setFilter(value)
		setFilterType(type)
	}

	if (isError) {
		return <Error />
	}

	const productsList = () => {
		if (!isLoading && !data?.length) {
			return <Empty />
		}
		if (!isLoading && data) {
			return data.map((product) => <ProductCard key={product.id} {...product} />)
		}
		return Array.from(Array(limit)).map(() => <ProductCardSkeleton key={Math.random()} />)
	}

	return (
		<Flex vertical style={{height: '100%', position: 'relative'}}>
			<FilterMenu handleProductFilter={handleProductFilter} />
			<Divider style={{margin: 0}} />
			<Flex justify='space-around' align='center' wrap='wrap' gap='10px' style={{margin: '10px 0'}}>
				{productsList()}
			</Flex>
			<Divider />
			<Flex justify='center' style={{margin: '20px 0'}}>
				<Pagination defaultCurrent={1} total={total} showSizeChanger={false} defaultPageSize={limit} onChange={changePage} />
			</Flex>
			<Background />
		</Flex>
	)
}