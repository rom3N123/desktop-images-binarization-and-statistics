import {
	Box,
	CircularProgress,
	List,
	ListItem,
	ListItemText,
	Paper,
} from '@mui/material';
import { styled } from '@mui/system';
import { FC, ReactElement } from 'react';
import { ImageInfo } from '../../AppImage';

const SBox = styled(Box)({
	position: 'absolute',
	width: '100%',
	height: '100%',
	bottom: 0,
	left: 0,
	display: 'flex',
	alignItems: 'end',
	'& > *': {
		transform: 'translateY(100%)',
	},
	'&:hover': {
		'& > *': {
			transform: 'translateY(0)',
		},
	},
});

const SListItem = styled(ListItem)({
	fontSize: '12px',
});

type AppImageInfoProps = ImageInfo & {
	isLoadingInfo: boolean;
	name: string;
};

type InfoItem = { name: string; value: string | number };

const AppImageInfo: FC<AppImageInfoProps> = ({
	width,
	height,
	name,
	isLoadingInfo,
	binarizedTime,
}): ReactElement => {
	if (isLoadingInfo) {
		return <CircularProgress />;
	}

	const info = [
		{ name: 'Имя', value: name },
		{ name: 'Ширина', value: `${width}px` },
		{ name: 'Высота', value: `${height}px` },
		{ name: 'Кол-во пикселей', value: width * height },
		typeof binarizedTime !== 'undefined' && {
			name: 'Время бинаризации',
			value: `${binarizedTime} сек.`,
		},
	].filter(Boolean);

	return (
		<SBox>
			<Paper
				sx={{ borderRadius: '0', width: '100%', transition: 'all .2s ease' }}
			>
				<List>
					{(info as InfoItem[]).map(({ name, value }, index) => {
						const isLast = info.length - 1 === index;

						return (
							<SListItem key={name} dense divider={!isLast}>
								<ListItemText>
									{name}: {value}
								</ListItemText>
							</SListItem>
						);
					})}
				</List>
			</Paper>
		</SBox>
	);
};

export default AppImageInfo;
