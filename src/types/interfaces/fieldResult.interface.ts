import {FieldTypes} from '../enums/fieldTypes.ts'

export interface FieldResult<T> {
	field: FieldTypes
	result: T
}