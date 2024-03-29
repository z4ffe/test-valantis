import {Button, Flex, Result} from 'antd'
import {Constants} from '../../constants/constants.ts'

export const Error = () => {
	return (
		<Flex align='center' justify='center' style={{width: '100%', height: '100%'}}>
			<Result
				status='500'
				title='500'
				subTitle={Constants.ERROR_TEXT}
				extra={<a href='/'><Button>Try again</Button></a>}
			/>
		</Flex>
	)
}