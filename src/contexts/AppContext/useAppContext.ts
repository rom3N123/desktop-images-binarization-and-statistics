import { useContext } from 'react';
import { Context } from './AppContext';

const useAppContext = () => {
	return useContext(Context);
};

export default useAppContext;
