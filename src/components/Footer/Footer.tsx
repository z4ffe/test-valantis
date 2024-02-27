import {Flex, Typography} from 'antd'
import Link from 'antd/es/typography/Link'
import {CONSTANTS} from '../../constants/CONSTANTS.ts'

export const Footer = () => {
	return (
		<Flex justify='center' align='center' style={{marginTop: '5px'}}>
			<Link href={CONSTANTS.GITHUB_LINK} target='_blank'>
				<Typography.Text style={{textAlign: 'center', fontSize: '10px', color: 'lightgrey'}}>{CONSTANTS.FOOTER_AUTHOR} \ {new Date().getFullYear()}</Typography.Text>
			</Link>
		</Flex>
	)
}