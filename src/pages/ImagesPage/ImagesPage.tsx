import { ImageList, Typography } from '@mui/material';
import { FC, ReactElement } from 'react';
import useAppContext from '../../contexts/AppContext/useAppContext';
import { Box } from '@mui/system';
import AppImage from '../../components/AppImage';
import { Image } from '../../contexts/AppContext/AppContext';

const ImagesPage: FC = (): ReactElement => {
	const { images, setImages } = useAppContext();

	if (!images.length) {
		return (
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					width: '100%',
					height: '100%',
				}}
			>
				<Typography color='error'>
					Отсутствуют загруженние изображения
				</Typography>
			</Box>
		);
	}

	const filterImage = (image: Image) => () => {
		setImages(images => {
			URL.revokeObjectURL(image.src);
			return images.filter(img => img.src !== image.src);
		});
	};

	return (
		<>
			<div
				style={{
					display: 'flex',
					gap: '8px',
					flexWrap: 'wrap',
					overflow: 'auto',
				}}
			>
				{images.map(image => (
					<AppImage image={image} onDelete={filterImage} />
				))}
			</div>
		</>
	);
};

export default ImagesPage;
