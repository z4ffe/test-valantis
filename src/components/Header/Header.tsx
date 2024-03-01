import {Flex} from 'antd'
import Link from 'antd/es/typography/Link'
import Title from 'antd/es/typography/Title'
import {Constants} from '../../constants/constants.ts'
import styles from './header.module.scss'

export const Header = () => {
	return (
		<Flex justify='center' align='center'>
			<Link href='/'>
				<Title style={{textAlign: 'center', fontSize: '25px', letterSpacing: '.5rem'}} className={styles.logo}>{Constants.TITLE.toUpperCase()}</Title>
			</Link>
		</Flex>
	)
}