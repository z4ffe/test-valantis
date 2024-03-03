import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ConfigProvider, Divider, FloatButton} from 'antd'
import {Footer} from './components/Footer/Footer.tsx'
import {Header} from './components/Header/Header.tsx'
import {Main} from './pages/Main/Main.tsx'

const queryClient = new QueryClient()

export const App = () => {
	return (
		<ConfigProvider theme={{token: {fontFamily: 'Mulish'}}}>
			<QueryClientProvider client={queryClient}>
				<Header />
				<Divider style={{margin: 0}} />
				<Main />
				<FloatButton.BackTop visibilityHeight={0} />
				<Divider style={{margin: 0}} />
				<Footer />
			</QueryClientProvider>
		</ConfigProvider>
	)
}