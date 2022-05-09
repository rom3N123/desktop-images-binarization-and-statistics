import { ImageListItem } from '@mui/material';
import { FC, ReactElement, useEffect, useRef, useState } from 'react';
import AppImageDeleteButton from './components/AppImageDeleteButton';
import AppImageInfo from './components/AppImageInfo';
import { Image } from '../../contexts/AppContext/AppContext';

type AppImageProps = {
	image: Image;
	onDelete: (image: Image) => () => any;
};

export type ImageInfo = {
	width: number;
	height: number;
};

const AppImage: FC<AppImageProps> = ({ image, onDelete }): ReactElement => {
	const imageRef = useRef<HTMLImageElement>(null);
	const [isLoadingImageInfo, setIsLoadingImageInfo] = useState<boolean>(true);
	const [imageInfo, setImageInfo] = useState<ImageInfo>({
		width: 0,
		height: 0,
	});

	useEffect(() => {
		imageRef.current!.onload = () => {
			const image = imageRef.current;

			setImageInfo({
				width: image!.width,
				height: image!.height,
			});

			setIsLoadingImageInfo(false);
		};
	}, []);

	return (
		<ImageListItem
			sx={{ position: 'relative', overflow: 'hidden' }}
			key={image.src}
		>
			<img ref={imageRef} src={image.src} />

			<AppImageDeleteButton image={image} onDelete={onDelete} />

			<AppImageInfo
				{...imageInfo}
				isLoadingInfo={isLoadingImageInfo}
				name={image.name}
			/>
		</ImageListItem>
	);
};

export default AppImage;
