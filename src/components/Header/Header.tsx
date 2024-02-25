import {Flex} from 'antd'
import Title from 'antd/es/typography/Title'

export const Header = () => {
	return (
		<Flex justify='center' align='center'>
			<Title style={{textAlign: 'center', margin: '10px 0', fontSize: '25px', letterSpacing: '.5rem'}}>{'Valantis'.toUpperCase()}</Title>
		</Flex>
	)
}