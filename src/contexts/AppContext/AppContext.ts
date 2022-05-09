import { createContext } from 'react';

export type Image = {
	name: string;
	src: string;
};

export type AppContextValue = {
	images: Image[];
	setImages: React.Dispatch<React.SetStateAction<Image[]>>;
	isBinarizing: boolean;
	setIsBinarizing: React.Dispatch<React.SetStateAction<boolean>>;
};

export const initialValue: AppContextValue = {
	images: [],
	setImages: () => {},
	isBinarizing: false,
	setIsBinarizing: () => {},
};

export const Context = createContext<AppContextValue>(initialValue);
