import { Button, Paper } from '@mui/material';
import React, { FC, ReactElement } from 'react';
import useAppContext from '../../contexts/AppContext/useAppContext';

const ActionsPanel: FC = (): ReactElement => {
	const { images, startBinarize, isBinarizing } = useAppContext();

	const areImagesLoaded = Boolean(images.length);

	return (
		<Paper
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100%',
			}}
			elevation={12}
		>
			<Button
				onClick={startBinarize}
				disabled={!areImagesLoaded || isBinarizing}
			>
				{areImagesLoaded ? 'Анализировать' : 'Загрузите изображения'}
			</Button>
		</Paper>
	);
};

export default ActionsPanel;
