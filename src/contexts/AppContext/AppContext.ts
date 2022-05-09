import { createContext, MutableRefObject } from 'react';
import { ArrayRef } from '../../hooks/useArrayRefs/useArrayRefs';

export type Image = {
	name: string;
	src: string;
};

export type AppContextValue = {
	images: Image[];
	setImages: React.Dispatch<React.SetStateAction<Image[]>>;
	isBinarizing: boolean;
	setIsBinarizing: React.Dispatch<React.SetStateAction<boolean>>;
	imagesRefs: MutableRefObject<ArrayRef>;
	startBinarize: () => void;
};

const emptyFunc = () => {};

export const initialValue: AppContextValue = {
	images: [],
	setImages: emptyFunc,
	isBinarizing: false,
	setIsBinarizing: emptyFunc,
	imagesRefs: { current: [] },
	startBinarize: emptyFunc,
};

export const Context = createContext<AppContextValue>(initialValue);
