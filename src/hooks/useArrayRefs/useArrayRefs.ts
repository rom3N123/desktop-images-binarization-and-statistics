import { useRef, createRef, RefObject } from 'react';

export type ArrayRef<T extends object = {}> = RefObject<T>[];

const useArrayRefs = <T extends object = {}>(length: number) => {
	const refs = useRef<ArrayRef<T>>([]);

	if (refs.current.length !== length) {
		refs.current = Array.from(
			{ length },
			(_, i) => refs.current[i] || createRef()
		);
	}

	return refs;
};

export default useArrayRefs;
