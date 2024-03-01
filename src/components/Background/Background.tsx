import {useEffect, useState} from 'react'
import styles from './background.module.scss'

export const Background = () => {
	const [scrollYPos, setScrollYPos] = useState(window.scrollY)

	const handleScrollPosition = () => {
		setScrollYPos(window.scrollY)
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScrollPosition)
		return () => {
			window.removeEventListener('scroll', handleScrollPosition)
		}
	}, [])

	return (
		<>
			<div className={styles.backgroundOne} style={{transform: `rotate(40deg) translateY(-${scrollYPos}px)`}} />
			<div className={styles.backgroundTwo} style={{transform: `translateY(-${scrollYPos}px)`}} />
		</>
	)
}