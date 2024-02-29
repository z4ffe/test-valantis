import {Flex} from 'antd'
import Link from 'antd/es/typography/Link'
import Title from 'antd/es/typography/Title'
import {CONSTANTS} from '../../constants/CONSTANTS.ts'
import styles from './header.module.scss'

export const Header = () => {
	return (
		<Flex justify='center' align='center'>
			<Link href='/'>
				<Title style={{textAlign: 'center', fontSize: '25px', letterSpacing: '.5rem'}} className={styles.logo}>{CONSTANTS.TITLE.toUpperCase()}</Title>
			</Link>
		</Flex>
	)
}