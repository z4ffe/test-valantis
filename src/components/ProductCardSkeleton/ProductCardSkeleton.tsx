import {Card, Skeleton} from 'antd'
import {useMediaQuery} from 'react-responsive'
import {RESPONSIVE} from '../../constants/constants.ts'

export const ProductCardSkeleton = () => {
	const isTablet = useMediaQuery({query: RESPONSIVE.TABLET})

	return (
		<Card style={{width: isTablet ? '100%' : '400px'}}>
			<Skeleton active />
		</Card>
	)
}