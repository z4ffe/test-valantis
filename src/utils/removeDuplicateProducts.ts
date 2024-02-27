import {IProduct} from '../types/interfaces/product.interface.ts'

export const removeDuplicateProducts = (products: IProduct[]): IProduct[] => {
	const listOfUniqueIds = new Set(products.map(product => product.id))
	return Array.from(listOfUniqueIds, id => products.find(product => product.id === id)) as IProduct[]
}