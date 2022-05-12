import { observer } from 'mobx-react-lite';
import React, { FC, ReactElement } from 'react';
import appStore from '../../stores/appStore';
import { Line } from 'react-chartjs-2';
import {
	Chart,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import chartTrendline from 'chartjs-plugin-trendline';
import { Box } from '@mui/system';

Chart.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	chartTrendline
);
const ChartPage: FC = observer((): ReactElement => {
	const time = appStore.rows.map(({ binarizedTime }) => binarizedTime);
	const pixels = appStore.rows.map(({ pixels }) => pixels);

	return (
		<Box sx={{ height: '100%' }}>
			<Line
				options={{
					plugins: {
						legend: {
							display: false,
						},
						title: {
							display: true,
							text: 'Зависимость времени обработки от кол-во пикселей',
						},
					},
					scales: {
						x: {
							beginAtZero: true,
						},
						y: {
							beginAtZero: true,
						},
					},
				}}
				data={{
					labels: [0, ...pixels.sort((a, b) => (a as number) - (b as number))],
					datasets: [
						{
							data: [0, ...time],
							backgroundColor: 'rgba(75,192,192,0.2)',
							borderColor: 'rgba(75,192,192,1)',
							trendlineLinear: {
								style: 'rgba(255,105,180, .8)',
								lineStyle: 'dotted',
								width: 2,
								projection: true,
							},
						},
					],
				}}
			/>
		</Box>
	);
});

export default ChartPage;
