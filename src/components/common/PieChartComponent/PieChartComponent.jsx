import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import './PieChartComponent.scss';
import getColorPalette from '../../../utils/colorPalette';

const PieChartComponent = ({ data, title, subtitle }) => {
  if (!data || data.length === 0) {
    console.log('No data available for the PieChartComponent');
    return <p>No data available</p>;
  }

  const COLORS = getColorPalette(data.length);

  console.log('Data passed to PieChartComponent:', data);

  return (
    <div className="pie-chart-container">
      <h3>{title}</h3>
      <p className="subtitle">{`${subtitle}`}</p>
      <div className="chart-and-legend">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={150}
            startAngle={0}
            paddingAngle={0}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        <div className="legend">
          {data.map((entry, index) => (
            <div key={index} className="legend-item">
              <div
                className="legend-color"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></div>
              <span>{entry.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PieChartComponent;
