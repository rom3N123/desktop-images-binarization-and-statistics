import React, { FC, ReactElement, ReactNode, useState } from 'react';
import { Context, AppContextValue } from './AppContext';

const AppContextProvider: FC<{ children: ReactNode }> = ({
	children,
}): ReactElement => {
	const [images, setImages] = useState<string[]>([]);
	const [isBinarizing, setIsBinarizing] = useState<boolean>(false);

	const value: AppContextValue = {
		images,
		setImages,
		isBinarizing,
		setIsBinarizing,
	};

	return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default AppContextProvider;
