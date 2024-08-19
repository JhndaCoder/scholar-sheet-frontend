import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import styles from './PieChart.module.scss';

const PieChart = ({ title, data }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const labels = data.map(item => item.label);
    const values = data.map(item => item.value);
    const backgroundColors = data.map(() => `hsl(${Math.random() * 360}, 100%, 50%)`);

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstanceRef.current = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            data: values,
            backgroundColor: backgroundColors,
            borderColor: '#fff',
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
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
          datalabels: {
            color: '#fff',
            formatter: (value, context) => {
              return context.chart.data.labels[context.dataIndex];
            },
            font: {
              weight: 'bold',
              size: 14,
            },
          },
        },
      },
      // plugins: [ChartDataLabels],
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

export default PieChart;
