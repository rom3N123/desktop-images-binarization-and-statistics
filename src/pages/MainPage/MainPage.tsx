import { Box } from '@mui/material';
import React, { FC, ReactElement } from 'react';
import Dropzone from '../../components/Dropzone';

const MainPage: FC = (): ReactElement => {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				flexGrow: '1',
				justifyContent: 'center',
			}}
		>
			<Dropzone />
		</Box>
	);
};

export default MainPage;
