import Paper from '@mui/material/Paper';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import ChartPage from './pages/ChartPage';
import ImagesPage from './pages/ImagesPage';
import MainPage from './pages/MainPage';
import TablePage from './pages/TablePage';

function App() {
	return (
		<Paper
			elevation={3}
			variant='elevation'
			sx={{
				height: '100vh',
				borderRadius: '0',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
			}}
		>
			<Navigation />

			<Routes>
				<Route index element={<MainPage />} />

				<Route path='/images' element={<ImagesPage />} />

				<Route path='/table' element={<TablePage />} />

				<Route path='/chart' element={<ChartPage />} />
			</Routes>
		</Paper>
	);
}

export default App;
