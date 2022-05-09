import { Tab, Tabs, TabsProps } from '@mui/material';
import { Box } from '@mui/system';
import React, { FC, ReactElement, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type Route = {
	path: string;
	name: string;
};

const ROUTES = {
	MAIN: '/',
	IMAGES: '/images',
	TABLE: '/table',
	CHART: '/chart',
};

const routeByIndex: Record<string, Route> = {
	0: {
		path: ROUTES.MAIN,
		name: 'Главная',
	},
	1: {
		path: ROUTES.IMAGES,
		name: 'Изображения',
	},
	2: {
		path: ROUTES.TABLE,
		name: 'Таблица',
	},
	3: {
		path: ROUTES.CHART,
		name: 'График',
	},
};

const getRouteIndexByPathName = (pathname: string): number => {
	let result = 0;

	for (const index in routeByIndex) {
		const route = routeByIndex[index];

		if (pathname.includes(route.path)) {
			result = Number(index);
		}
	}

	return result;
};

const routes: Route[] = Object.values(routeByIndex);

const Navigation: FC = (): ReactElement => {
	const [value, setValue] = useState<number>(0);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		setValue(getRouteIndexByPathName(location.pathname));
	}, [location]);

	const onTabChange: TabsProps['onChange'] = (_, value: number) => {
		const route = routeByIndex[value];
		navigate(route.path);
		setValue(value);
	};

	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				marginBottom: '10px',
			}}
		>
			<Tabs onChange={onTabChange} value={value}>
				{routes.map(({ name }) => (
					<Tab label={name} />
				))}
			</Tabs>
		</Box>
	);
};

export default Navigation;
