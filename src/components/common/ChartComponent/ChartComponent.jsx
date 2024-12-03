import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import './ChartComponent.scss';

const ChartComponent = ({ title, data, dataKeys, lineColors, chartType }) => {
  return (
    <div className="chart-container">
      <h3 className="chart-title">{title}</h3>
      <ResponsiveContainer width="100%" height={400}>
        {chartType === 'Line' ? (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            {dataKeys.map((key, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey={key}
                stroke={lineColors[index]}
                name={key}
              />
            ))}
          </LineChart>
        ) : chartType === 'Bar' ? (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            {dataKeys.map((key, index) => (
              <Bar
                key={index}
                dataKey={key}
                fill={lineColors[index]}
                name={key}
              />
            ))}
          </BarChart>
        ) : chartType === 'Area' ? (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            {dataKeys.map((key, index) => (
              <Area
                key={index}
                type="monotone"
                dataKey={key}
                stroke={lineColors[index]}
                fill={lineColors[index]}
                name={key}
              />
            ))}
          </AreaChart>
        ) : (
          <p>Invalid chart type</p>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;
