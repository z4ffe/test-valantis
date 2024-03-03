import {Select} from 'antd'
import {FC} from 'react'
import {useMediaQuery} from 'react-responsive'
import {RESPONSIVE} from '../../../constants/constants.ts'
import {FieldTypes} from '../../../types/fieldTypes.ts'

interface Props {
	isLoading: boolean
	handleProductFilter: (type: FieldTypes | null, value: string | number) => void
	brands: string[]
}

export const BrandInput: FC<Props> = ({isLoading, handleProductFilter, brands}) => {
	const isTablet = useMediaQuery({query: RESPONSIVE.TABLET})

	return (
		<Select disabled={isLoading}
				  allowClear
				  virtual={false}
				  onChange={(value) => handleProductFilter(FieldTypes.Brand, value)}
				  style={{width: isTablet ? '100%' : '15%'}}
				  placeholder='Find by brand'
				  options={brands.map(brand => {
					  return {
						  value: brand,
						  label: <span key={brand}>{brand}</span>,
					  }
				  })} />
	)
}