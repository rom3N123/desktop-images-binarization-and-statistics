import { Paper, Typography } from '@mui/material';
import React, { FC, ReactElement, useState } from 'react';
import DropzoneComponent, { DropzoneOptions } from 'react-dropzone';
import { getStyles } from './Dropzone.styles';
import useAppContext from '../../contexts/AppContext/useAppContext';
import { useNavigate } from 'react-router-dom';
import { Image } from '../../contexts/AppContext/AppContext';

const Dropzone: FC = (): ReactElement => {
	const { setImages } = useAppContext();
	const navigate = useNavigate();

	const onDrop: DropzoneOptions['onDrop'] = files => {
		const images: Image[] = files.map(file => ({
			name: file.name,
			src: URL.createObjectURL(file),
		}));

		setImages(images);
		navigate('/images');
	};

	return (
		<>
			<DropzoneComponent accept={{ 'image/*': [] }} onDrop={onDrop}>
				{({
					getRootProps,
					getInputProps,
					isFocused,
					isDragAccept,
					isDragReject,
				}) => (
					<Paper>
						<div
							{...getRootProps({
								style: getStyles({
									isFocused,
									isDragAccept,
									isDragReject,
								}),
							})}
						>
							<input {...getInputProps()} />

							<Typography sx={{ cursor: 'pointer' }}>
								Перетащи файлы, или кликни, чтобы загрузить изображения
							</Typography>
						</div>
					</Paper>
				)}
			</DropzoneComponent>
		</>
	);
};

export default Dropzone;
