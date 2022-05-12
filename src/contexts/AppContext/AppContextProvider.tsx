import React, { FC, ReactElement, ReactNode, useEffect, useState } from 'react';
import { AppImageRefMethods } from '../../components/AppImage/AppImage';
import useArrayRefs from '../../hooks/useArrayRefs';
import appStore from '../../stores/appStore';
import { Context, AppContextValue, Image } from './AppContext';

const AppContextProvider: FC<{ children: ReactNode }> = ({
	children,
}): ReactElement => {
	const [images, setImages] = useState<Image[]>([]);
	const [isBinarizing, setIsBinarizing] = useState<boolean>(false);
	const imagesRefs = useArrayRefs<AppImageRefMethods>(images.length);
	const [shouldSetImagesInfo, setShouldSetImagesInfo] =
		useState<boolean>(false);

	useEffect(() => {
		if (shouldSetImagesInfo) {
			console.log(imagesRefs.current);
			const imagesInfos = imagesRefs.current.map(ref => ref.current!.imageInfo);

			appStore.setImagesInfos(imagesInfos);

			setShouldSetImagesInfo(false);
		}
	}, [shouldSetImagesInfo]);

	const startBinarize = async () => {
		setIsBinarizing(true);

		for (const ref of imagesRefs.current) {
			await ref.current!.binarize();
		}

		setIsBinarizing(false);

		setTimeout(() => {
			setShouldSetImagesInfo(true);
		}, 0);
	};

	const value: AppContextValue = {
		images,
		setImages,
		isBinarizing,
		setIsBinarizing,
		imagesRefs,
		startBinarize,
	};

	return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default AppContextProvider;
