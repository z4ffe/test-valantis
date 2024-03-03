import {Input} from 'antd'
import {FC, FocusEvent} from 'react'
import {useMediaQuery} from 'react-responsive'
import {Constants, RESPONSIVE} from '../../../constants/constants.ts'
import {FieldTypes} from '../../../types/fieldTypes.ts'

interface Props {
	isLoading: boolean
	handleProductFilter: (type: FieldTypes | null, value: string | number) => void
}

export const PriceInput: FC<Props> = ({isLoading, handleProductFilter}) => {
	const isTablet = useMediaQuery({query: RESPONSIVE.TABLET})

	const handlePrice = (event: FocusEvent<HTMLInputElement>) => {
		const price = Number(event.target.value)
		if (!price) {
			return handleProductFilter(null, '')
		}
		handleProductFilter(FieldTypes.Price, price)
	}

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