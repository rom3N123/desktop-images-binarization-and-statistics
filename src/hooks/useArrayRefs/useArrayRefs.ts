import { useRef, createRef } from 'react';

const useArrayRefs = (length: number) => {
	const refs = useRef([]);

	if (refs.current.length !== length) {
		refs.current = Array.from(
			{ length },
			(_, i) => refs.current[i] || createRef()
		);
	}

	return refs;
};

export default useArrayRefs;
