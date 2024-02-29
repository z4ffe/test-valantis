import {Flex, Result} from 'antd'

export const Error = () => {


	return (
		<Flex align='center' justify='center'>
			<Result
				status='500'
				title='500'
				subTitle='Sorry, something went wrong.'
				extra={<a href='/'>Try again</a>}
			/>
		</Flex>
	)
}