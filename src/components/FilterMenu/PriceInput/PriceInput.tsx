import {Input} from 'antd'
import {FC, FocusEvent} from 'react'
import {useMediaQuery} from 'react-responsive'
import {Constants, RESPONSIVE} from '../../../constants/constants.ts'

interface Props {
	isLoading: boolean
	handlePrice: (event: FocusEvent<HTMLInputElement>) => void
}

export const PriceInput: FC<Props> = ({isLoading, handlePrice}) => {
	const isTablet = useMediaQuery({query: RESPONSIVE.TABLET})

	return (
		<Input
			type='number'
			allowClear
			addonAfter={Constants.CURRENCY_SYMBOL}
			disabled={isLoading}
			placeholder='Find by price' style={{width: isTablet ? '100%' : '15%'}}
			onBlur={handlePrice}
			onChange={handlePrice}
		/>
	)
}