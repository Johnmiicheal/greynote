import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { fakeclass, fakecase } from '../../fakedata';
import { RiDatabase2Fill } from 'react-icons/ri';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Defaults Analysis',
    },
  },
};

const data1 = [];
const data2 = [];
const data3 = [];

for (let i = 0; i < 18; i++) {
  const randomInteger = Math.floor(Math.random() * 10) + 1;
  data1.push(randomInteger);
  const randomInteger2 = Math.floor(Math.random() * 10) + 1;
  data2.push(randomInteger2);
  const randomInteger3 = Math.floor(Math.random() * 10) + 1;
  data3.push(randomInteger3);
  
}

export const data = {
    labels: [
        'KG 1', 'KG 2', 'KG 3',
        'Nusery 1', 'Nusery 2', 'Nusery 3',
        'Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6',
        'JSS 1', 'JSS 2', 'JSS 3', 'SSS 1', 'SSS 2', 'SSS 3',
      ],
  datasets: [
    {
      label: 'Expulsion',
      data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      borderColor: 'rgb(128, 128, 132)',
      backgroundColor: 'rgba(128, 128, 132, 0.5)',
    },
    {
      label: 'Suspension',
      data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      borderColor: 'rgb(210, 105, 20)',
      backgroundColor: 'rgba(210, 105, 20, 0.5)',
    },
    {
        label: 'Fees Default',
        data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        borderColor: 'rgb(255, 10, 20)',
        backgroundColor: 'rgba(255, 10, 20, 0.5)',
      },
  ],
};

export function HomeChart() {
  return <Line options={options} data={data} />;
}

