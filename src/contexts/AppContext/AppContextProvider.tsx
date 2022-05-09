import React, { FC, ReactElement, ReactNode, useState } from 'react';
import { AppImageRefMethods } from '../../components/AppImage/AppImage';
import useArrayRefs from '../../hooks/useArrayRefs';
import { Context, AppContextValue, Image } from './AppContext';

const AppContextProvider: FC<{ children: ReactNode }> = ({
	children,
}): ReactElement => {
	const [images, setImages] = useState<Image[]>([]);
	const [isBinarizing, setIsBinarizing] = useState<boolean>(false);
	const imagesRefs = useArrayRefs<AppImageRefMethods>(images.length);

	const startBinarize = async () => {
		setIsBinarizing(true);

		for (const ref of imagesRefs.current) {
			await ref.current!.binarize();
		}

		setIsBinarizing(false);
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
