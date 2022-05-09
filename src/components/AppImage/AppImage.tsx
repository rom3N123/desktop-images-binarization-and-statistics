import {
	forwardRef,
	ReactElement,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from 'react';
import AppImageDeleteButton from './components/AppImageDeleteButton';
import AppImageInfo from './components/AppImageInfo';
import { Image } from '../../contexts/AppContext/AppContext';
import { Box } from '@mui/system';
import useStateWithCallback from '../../hooks/useStateWithCallback';

type AppImageProps = {
	image: Image;
	onDelete: (image: Image) => () => any;
};

export type ImageInfo = {
	width: number;
	height: number;
	binarizedTime?: number;
};

export type AppImageRefMethods = {
	binarize: () => Promise<any>;
};

const AppImage = forwardRef<AppImageRefMethods, AppImageProps>(
	({ image, onDelete }, ref): ReactElement => {
		const imageRef = useRef<HTMLImageElement>(null);
		const [isLoadingImageInfo, setIsLoadingImageInfo] = useState<boolean>(true);
		const [imageInfo, setImageInfo] = useState<ImageInfo>({
			width: 0,
			height: 0,
		});
		const [binarizeMode, setBinarizeMode] =
			useStateWithCallback<boolean>(false);
		const [isBinarized, setIsBinarized] = useState<boolean>(false);

		const canvasRef = useRef<HTMLCanvasElement>(null);

		useImperativeHandle(
			ref,
			(): AppImageRefMethods => ({
				binarize: async () => {
					setBinarizeMode(true, () => {
						const timeStart = Date.now();

						const canvas = canvasRef.current;
						const c = canvas?.getContext('2d');
						const image = imageRef.current;
						const { width, height } = imageInfo;
						c?.drawImage(image!, 0, 0);
						const imageData = c!.getImageData(0, 0, width, height);

						for (let y = 0; y < height; y++) {
							// *4 for 4 ints per pixel.
							// This is an input index.
							let inpos = y * width * 4;
							// This is an output index.
							let outpos = inpos;
							// The width of the image.
							for (let x = 0; x < width; x++) {
								// Get the pixel of the red channel.
								let r = imageData.data[inpos++];
								// Get the pixel of the green channel.
								let g = imageData.data[inpos++];
								// Get the pixel of the blue channel.
								let b = imageData.data[inpos++];
								// Get the pixel of the alpha channel.
								let a = imageData.data[inpos++];
								// Transform RGB color space to gray scale.
								let gray = 0.299 * r + 0.587 * g + 0.114 * b;
								// This is our threshold. You can change it.
								if (gray > 120) {
									// Set the pixel is white.
									imageData.data[outpos++] = 255;
									imageData.data[outpos++] = 255;
									imageData.data[outpos++] = 255;
									imageData.data[outpos++] = a;
								} else {
									// Set the pixel is black.
									imageData.data[outpos++] = 0;
									imageData.data[outpos++] = 0;
									imageData.data[outpos++] = 0;
									imageData.data[outpos++] = a;
								}
							} // The closing "The width of the image".

							const timeEnd = Date.now();

							const binarizedTime = timeEnd - timeStart;

							const seconds = (binarizedTime % 60000) / 1000;

							setImageInfo(prevInfo => ({
								...prevInfo,
								binarizedTime: seconds,
							}));
							setIsBinarized(true);

							c!.putImageData(imageData, 0, 0);
						}
					});
				},
			})
		);

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
			<Box
				sx={{
					position: 'relative',
					overflow: 'hidden',
					display: 'fllex',
					justifyContent: 'center',
				}}
				key={image.src}
			>
				{!isBinarized && (
					<>
						<img style={{ width: '100%' }} ref={imageRef} src={image.src} />

						<AppImageDeleteButton image={image} onDelete={onDelete} />
					</>
				)}

				<AppImageInfo
					{...imageInfo}
					isLoadingInfo={isLoadingImageInfo}
					name={image.name}
				/>

				{binarizeMode && (
					<canvas
						ref={canvasRef}
						width={imageInfo.width}
						height={imageInfo.height}
						style={{ height: '100%', width: '100%' }}
					></canvas>
				)}
			</Box>
		);
	}
);

export default AppImage;
