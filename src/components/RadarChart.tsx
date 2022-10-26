import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);


const data = {
  labels: [
    'KG 1', 'KG 2', 'KG 3',
    'Nusery 1', 'Nusery 2', 'Nusery 3',
    'Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6',
    'JSS 1', 'JSS 2', 'JSS 3', 'SSS 1', 'SSS 2', 'SSS 3',
  ],
  datasets: [{
    label: 'Suspension',
    data: [0, 0, 0, 2, 0, 1, 2, 5, 7, 5, 8, 2, 2, 9, 7, 5, 4, 3],
    fill: true,
    backgroundColor: 'rgba(195, 60, 0, 0.2)',
    borderColor: 'rgb(195, 60, 0)',
    pointBackgroundColor: 'rgb(195, 60, 0)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(195, 60, 0)'
  }, {
    label: 'Fees Default',
    data: [0, 0, 2, 0, 4, 5, 6, 0, 5, 8, 7, 4, 0, 0, 5, 5, 3, 4],
    fill: true,
    backgroundColor: 'rgba(195, 0, 0, 0.2)',
    borderColor: 'rgb(195, 0, 0)',
    pointBackgroundColor: 'rgb(195, 0, 0)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(195, 0, 0)'
  },
  {
    label: 'Expulsion',
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 5, 3, 0, 0, 6, 5, 0],
    fill: true,
    backgroundColor: 'rgba(129, 129, 129, 0.2)',
    borderColor: 'rgb(129, 129, 129)',
    pointBackgroundColor: 'rgb(129, 129, 129)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(129, 129, 129)'
  }]
};

export function RadarChart() {
  return <Radar data={data} />;
}
