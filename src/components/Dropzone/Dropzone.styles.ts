import { CSSProperties } from 'react';

const baseStyle: CSSProperties = {
	flex: 1,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	padding: '20px',
	borderWidth: 2,
	borderRadius: 2,
	borderColor: '#eeeeee',
	borderStyle: 'dashed',
	color: '#bdbdbd',
	outline: 'none',
	transition: 'border .24s ease-in-out',
};

const focusedStyle: CSSProperties = {
	borderColor: '#931DB7',
};

const acceptStyle: CSSProperties = {
	borderColor: '#00e676',
};

const rejectStyle: CSSProperties = {
	borderColor: '#ff1744',
};

export const getStyles = ({
	isFocused,
	isDragAccept,
	isDragReject,
}: Record<string, boolean>): CSSProperties => {
	return {
		...baseStyle,
		...(isFocused ? focusedStyle : {}),
		...(isDragAccept ? acceptStyle : {}),
		...(isDragReject ? rejectStyle : {}),
	};
};
