import {useQuery} from '@tanstack/react-query'
import {Flex} from 'antd'
import {FC, useEffect, useState} from 'react'
import {useMediaQuery} from 'react-responsive'
import {RESPONSIVE} from '../../constants/constants.ts'
import {productService} from '../../services/productsService.ts'
import {FieldTypes} from '../../types/fieldTypes.ts'
import {BrandInput} from './BrandInput/BrandInput.tsx'
import {NameInput} from './NameInput/NameInput.tsx'
import {PriceInput} from './PriceInput/PriceInput.tsx'

interface Props {
	handleProductFilter: (type: FieldTypes | null, value: string | number) => void
}

interface FieldResult {
	field: FieldTypes
	result: string[]
}

export const FilterMenu: FC<Props> = ({handleProductFilter}) => {
	const [brands, setBrands] = useState<string[]>([])
	const [names, setNames] = useState<string[]>([])
	const isTablet = useMediaQuery({query: RESPONSIVE.TABLET})

	const fetchAllFields = async () => {
		return await Promise.allSettled(Object.values(FieldTypes).map(async field => {
			const response = await productService.getFields(field)
			const result: FieldResult = {field, result: response}
			return result
		}))
	}

	const {data, isLoading} = useQuery({
		queryKey: ['fields'],
		queryFn: fetchAllFields,
		retry: 5,
	})

	const sortFields = () => {
		!isLoading && data?.length && data?.map((field) => {
			if (field.status === 'fulfilled') {
				switch (field.value.field) {
					case (FieldTypes.Brand):
						return setBrands(Array.from(new Set(field.value.result)).filter(brand => !!brand))
					case (FieldTypes.Name):
						return setNames(Array.from(new Set(field.value.result)))
				}
			}
		})
	}


	useEffect(() => {
		sortFields()
	}, [data])

	return (
		<Flex gap='20px' align='center' justify='center' style={{padding: '10px 0', backgroundColor: 'white'}} vertical={isTablet}>
			<PriceInput isLoading={isLoading} handleProductFilter={handleProductFilter} />
			<NameInput isLoading={isLoading} handleProductFilter={handleProductFilter} names={names} />
			<BrandInput isLoading={isLoading} handleProductFilter={handleProductFilter} brands={brands} />
		</Flex>
	)
}