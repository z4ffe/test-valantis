import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {Divider, FloatButton} from 'antd'
import {Header} from './components/Header/Header.tsx'
import {Home} from './pages/Home/Home.tsx'

const queryClient = new QueryClient()

export const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<Header />
			<Divider style={{margin: 0}} />
			<Home />
			<FloatButton.BackTop visibilityHeight={0} />
		</QueryClientProvider>
	)
}