import {Card, Skeleton} from 'antd'

export const ProductCardSkeleton = () => {
	return (
		<Card style={{width: '400px'}}>
			<Skeleton />
		</Card>
	)
}