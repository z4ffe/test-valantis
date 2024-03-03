import {AutoComplete} from 'antd'
import {FC} from 'react'
import {useMediaQuery} from 'react-responsive'
import {RESPONSIVE} from '../../../constants/constants.ts'
import {FieldTypes} from '../../../types/fieldTypes.ts'

interface Props {
	isLoading: boolean
	names: string[]
	handleProductFilter: (type: FieldTypes | null, value: string | number) => void
}

export const NameInput: FC<Props> = ({isLoading, names, handleProductFilter}) => {
	const isTablet = useMediaQuery({query: RESPONSIVE.TABLET})

	return (
		<AutoComplete
			allowClear
			disabled={isLoading}
			virtual={false}
			placeholder='Search by name'
			style={{width: isTablet ? '100%' : '15%'}}
			options={names.map(name => ({value: name}))}
			onClear={() => handleProductFilter(null, '')}
			onSelect={(value) => handleProductFilter(FieldTypes.Name, value)}
			filterOption={(inputValue, option) =>
				option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
			}
		/>
	)
}