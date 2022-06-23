import {useMemo, useState} from 'react';
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
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

// https://react-chartjs-2.netlify.app/examples/line-chart/
// link powyżej dokumentacja biblioteki z wykresami


export function Chart({data}) { 
    const [boundaries, setBoundaries] = useState({start:0, end:3000});
    const filteredRecords = useMemo(() => data.records.filter(rec =>  boundaries.end > Number(rec.date.slice(0,4)) && Number(rec.date.slice(0,4)) > boundaries.start), [boundaries, data.records])
    const labels = filteredRecords.map(record => record.date);
    const chartData = {
                labels,
                datasets: [
                        {
                        label: data.name,
                        data: filteredRecords.map(record => record.priceIndex),
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        },
                    ],
                };
    return <div>
        <div>
            <input type="number" placeholder="start year" onChange={(e) => setBoundaries(previousVal => ({...previousVal, start: Number(e.target.value)}))}/>
            <input type="number" placeholder='finish year' onChange={(e) => setBoundaries(previousVal => ({...previousVal, end: Number(e.target.value)}))}/>
        </div>
        <Line options={options} data={chartData} />
        </div>;
}
