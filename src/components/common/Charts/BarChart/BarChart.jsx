import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import styles from './BarChart.module.scss';

const BarChart = ({ title, data }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const labels = data.map(item => item.year);
    const values = data.map(item => item.publications);

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            data: values,
            backgroundColor: 'hsl(200, 100%, 50%)',
            borderColor: '#fff',
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: title,
            font: {
              size: 18,
            },
            padding: {
              top: 10,
              bottom: 30,
            },
          },
          tooltip: {
            enabled: true,
            callbacks: {
              label: function(tooltipItem) {
                return `${tooltipItem.label}: ${tooltipItem.raw}`;
              },
            },
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data, title]);

  return (
    <div className={styles.chartContainer}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default BarChart;

