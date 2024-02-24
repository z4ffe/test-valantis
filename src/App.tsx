import {useEffect, useState} from 'react'
import {apiInstance} from './api/apiInstance.ts'


export const App = () => {
	const [items, setItems] = useState([])

	const auth = async () => {
		const DATA = {
			'action': 'get_ids',
			'params': {'offset': 0, 'limit': 50},
		}
		const response = await apiInstance.post('http://api.valantis.store:40000/', DATA)
		const itemsList = await apiInstance.post('http://api.valantis.store:40000/', {
			'action': 'get_items',
			'params': {
				'ids': response.data.result,
			},
		})
		setItems(itemsList.data.result as [])
	}

	useEffect(() => {
		void auth()
	}, [])


	return (
		<div>
			<h1>App</h1>
			{items.length ? items.map((el: any) => (
				<div key={el.id}>
					<div>{el.product}</div>
					<div>{el.price}</div>
				</div>
			)) : <div>Loading</div>}
		</div>
	)
}