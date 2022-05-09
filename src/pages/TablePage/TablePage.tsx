import { Box } from '@mui/material';
import { FC } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { observer } from 'mobx-react-lite';
import appStore from '../../stores/appStore';

const TablePage: FC = observer(() => {
	return (
		<Box sx={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell align='center'>Имя изображения</TableCell>
							<TableCell align='center'>Ширина изображения&nbsp;(px)</TableCell>
							<TableCell align='center'>
								Высота изображения &nbsp;(px)
							</TableCell>
							<TableCell align='center'>Количество пикселей</TableCell>{' '}
							<TableCell align='center'>Время работы</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{appStore.rows.map(
							({ name, width, height, binarizedTime, pixels }) => (
								<TableRow
									key={name}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell>{name}</TableCell>
									<TableCell align='center'>{width}</TableCell>
									<TableCell align='center'>{height}</TableCell>
									<TableCell align='center'>{pixels}</TableCell>
									<TableCell align='center'>{binarizedTime}</TableCell>
								</TableRow>
							)
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
});

export default TablePage;
