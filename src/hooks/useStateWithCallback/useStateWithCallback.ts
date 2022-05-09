import { useState, useRef, useEffect, SetStateAction } from 'react';

type NewState<T> = SetStateAction<T>;
type Callback = (...args: any[]) => any;

type useStateWithCallbackReturn<T> = [
	state: T,
	updateState: (state: SetStateAction<T>, cb?: Callback) => void
];

const useStateWithCallback = <T>(
	initialValue: T
): useStateWithCallbackReturn<T> => {
	const [state, setState] = useState<T>(initialValue);

	const cbRef = useRef<Callback>();

	const updateState = (newState: NewState<T>, cb?: Callback) => {
		setState(prev =>
			// @ts-ignore
			typeof newState === 'function' ? newState(prev) : newState
		);

		cbRef.current = cb;
	};

	useEffect(() => {
		cbRef.current?.();
		cbRef.current = undefined;
	}, [state]);

	return [state, updateState];
};

export default useStateWithCallback;
