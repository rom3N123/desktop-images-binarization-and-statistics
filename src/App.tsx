import { Paper } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import ImagesPage from './pages/ImagesPage';
import MainPage from './pages/MainPage';

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
			</Routes>
		</Paper>
	);
}

export default App;
