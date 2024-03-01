import {Flex, Typography} from 'antd'
import Link from 'antd/es/typography/Link'
import {Constants} from '../../constants/constants.ts'

export const Footer = () => {
	return (
		<Flex justify='center' align='center' style={{marginTop: '5px'}}>
			<Link href={Constants.GITHUB_LINK} target='_blank'>
				<Typography.Text style={{textAlign: 'center', fontSize: '10px', color: 'lightgrey'}}>{Constants.FOOTER_AUTHOR} \ {new Date().getFullYear()}</Typography.Text>
			</Link>
		</Flex>
	)
}