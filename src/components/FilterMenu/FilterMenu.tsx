import {Flex} from 'antd'
import {FC} from 'react'
import {useMediaQuery} from 'react-responsive'
import {RESPONSIVE} from '../../constants/constants.ts'
import {useQueryFields} from '../../hooks/useQueryFields.ts'
import {FieldTypes} from '../../types/enums/fieldTypes.ts'
import {BrandInput} from './BrandInput/BrandInput.tsx'
import {NameInput} from './NameInput/NameInput.tsx'
import {PriceInput} from './PriceInput/PriceInput.tsx'

interface Props {
	handleProductFilter: (type: FieldTypes | null, value: string | number) => void
}

export const FilterMenu: FC<Props> = ({handleProductFilter}) => {
	const {isLoading, names, brands} = useQueryFields()
	const isTablet = useMediaQuery({query: RESPONSIVE.TABLET})

	return (
		<Flex gap='20px' align='center' justify='center' style={{padding: '10px 0', backgroundColor: 'white'}} vertical={isTablet}>
			<PriceInput isLoading={isLoading} handleProductFilter={handleProductFilter} />
			<NameInput isLoading={isLoading} handleProductFilter={handleProductFilter} names={names} />
			<BrandInput isLoading={isLoading} handleProductFilter={handleProductFilter} brands={brands} />
		</Flex>
	)
}