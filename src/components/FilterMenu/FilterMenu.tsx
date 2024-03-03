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

export const FilterMenu: FC<Props> = ({handleProductFilter}) => {
	const [brands, setBrands] = useState<string[]>([])
	const [names, setNames] = useState<string[]>([])
	const isTablet = useMediaQuery({query: RESPONSIVE.TABLET})

	const fetchAllFields = async () => {
		return await Promise.allSettled(Object.values(FieldTypes).map(async field => {
			const result = await productService.getFields(field)
			return {field, result}
		}))
	}

	const {data, isLoading} = useQuery({
		queryKey: ['fields'],
		queryFn: fetchAllFields,
		retry: 5,
	})

	const sortFields = () => {
		!isLoading && data?.length && data?.map((field: any) => {
			switch (field?.value?.field) {
				case (FieldTypes.Brand):
					const allBrands = Array.from(new Set(field.value.result)).filter(brand => !!brand) as string[]
					return setBrands(allBrands)
				case (FieldTypes.Name):
					const allNames = Array.from(new Set(field.value.result)) as string[]
					return setNames(allNames)
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