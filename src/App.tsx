import { Paper } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import ActionsPanel from './components/ActionsPanel';
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
			<Routes>
				<Route index element={<MainPage />} />

				<Route path='/images' element={<ImagesPage />} />
			</Routes>

			<ActionsPanel />
		</Paper>
	);
}

export default App;
