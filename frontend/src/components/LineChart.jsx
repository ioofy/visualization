import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { socket } from '../lib/socket';

const LineChart = () => {
  const [dataTemperature, setDataTemperature] = useState([]);
  const [dataDescription, setDataDescription] = useState([]);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    socket.on('temperature', (value) => {
      setDataTemperature((data) => [...data, value]);
    });

    socket.on('description', (value) => {
      setDataDescription((data) => [...data, value]);
    });
  }, []);

  useEffect(() => {
    if (dataTemperature && dataDescription) {
      const chartDataArr = {
        labels: dataDescription,
        datasets: [
          {
            label: 'Temperature',
            data: dataTemperature,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      };

      setChartData(chartDataArr);
    }
  }, [dataDescription, dataTemperature]);

  const optionsConfig = {
    responsive: true,
    animation: {
      animateScale: true,
    },
  };
  return (
    <div>
      <Line data={chartData} height={500} width={500} options={optionsConfig} />
    </div>
  );
};

export default LineChart;
