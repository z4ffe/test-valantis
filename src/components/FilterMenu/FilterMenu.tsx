import {ReloadOutlined} from '@ant-design/icons'
import {useQuery} from '@tanstack/react-query'
import {AutoComplete, Button, Flex, Input, Select, Tooltip} from 'antd'
import {FC, FocusEvent, useEffect, useState} from 'react'
import {CONSTANTS} from '../../constants/CONSTANTS.ts'
import {productService} from '../../services/productsService.ts'
import {FieldTypes} from '../../types/fieldTypes.ts'

interface Props {
	handleProductFilter: (type: FieldTypes | null, value: string | number) => void
	resetFilters: () => void
}

export const FilterMenu: FC<Props> = ({handleProductFilter, resetFilters}) => {
	const [brands, setBrands] = useState<string[]>([])
	const [names, setNames] = useState<string[]>([])

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

	const handlePrice = (event: FocusEvent<HTMLInputElement>) => {
		const price = Number(event.target.value)
		if (!price) {
			return handleProductFilter(null, '')
		}
		handleProductFilter(FieldTypes.Price, price)
	}

	useEffect(() => {
		void sortFields()
	}, [data])

	return (
		<Flex gap='20px' align='center' justify='center' style={{height: '60px', backgroundColor: 'white'}}>
			<Input
				type='number'
				allowClear
				addonAfter={CONSTANTS.CURRENCY_SYMBOL}
				disabled={isLoading}
				placeholder='Find by price' style={{width: '10%'}}
				onBlur={handlePrice}
				onChange={handlePrice}
			/>
			<AutoComplete
				allowClear
				disabled={isLoading}
				virtual={false}
				placeholder='Search by name' style={{width: '20%'}}
				options={names.map(name => ({value: name}))}
				onClear={() => handleProductFilter(null, '')}
				onSelect={(value) => handleProductFilter(FieldTypes.Name, value)}
				filterOption={(inputValue, option) =>
					option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
				}
			/>
			<Select disabled={isLoading}
					  allowClear
					  virtual={false}
					  onChange={(value) => handleProductFilter(FieldTypes.Brand, value)} style={{width: '10%'}} placeholder='Find by brand'
					  options={brands.map(brand => {
						  return {
							  value: brand,
							  label: <span key={brand}>{brand}</span>,
						  }
					  })} />
			<Tooltip title='Reset filters'>
				<Button onClick={resetFilters} icon={<ReloadOutlined />} />
			</Tooltip>
		</Flex>
	)
}