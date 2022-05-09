import { IconButton, Tooltip } from '@mui/material';
import React, { FC, ReactElement } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Image } from '../../../../contexts/AppContext/AppContext';

type AppImageDeleteButtonProps = {
	image: Image;
	onDelete: (image: Image) => () => any;
};

const AppImageDeleteButton: FC<AppImageDeleteButtonProps> = ({
	onDelete,
	image,
}): ReactElement => {
	return (
		<Tooltip title='Удалить изображение'>
			<IconButton
				onClick={onDelete(image)}
				size='small'
				color='secondary'
				sx={{
					position: 'absolute',
					top: 0,
					right: 0,
					zIndex: 1000,
				}}
			>
				<CloseIcon />
			</IconButton>
		</Tooltip>
	);
};

export default AppImageDeleteButton;
