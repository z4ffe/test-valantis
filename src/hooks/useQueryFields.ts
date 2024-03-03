import {useQuery} from '@tanstack/react-query'
import {useEffect, useState} from 'react'
import {productService} from '../services/productsService.ts'
import {FieldTypes} from '../types/enums/fieldTypes.ts'
import {FieldResult} from '../types/interfaces/fieldResult.interface.ts'

export const useQueryFields = () => {
	const [brands, setBrands] = useState<string[]>([])
	const [names, setNames] = useState<string[]>([])

	const fetchAllFields = async () => {
		return await Promise.allSettled(Object.values(FieldTypes).map(async field => {
			const response = await productService.getFields(field)
			const result: FieldResult<typeof response> = {field, result: response}
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

	return {brands, names, isLoading, data}
}