import { Cell, Pie, PieChart } from 'recharts';

export const GaugeChart = ({ value }: { value: number }) => {
  const data = [
    { name: 'score', value },
    { name: 'rest', value: 100 - value },
  ];
  return (
    <PieChart width={180} height={140}>
      <Pie
        data={data}
        startAngle={180}
        endAngle={0}
        innerRadius={50}
        outerRadius={70}
        paddingAngle={2}
        dataKey="value"
      >
        <Cell key="score" fill="#B87333" />
        <Cell key="rest" fill="#1D1F22" />
      </Pie>
      <text x={90} y={80} textAnchor="middle" fill="#E6E6E6" fontSize={22} fontFamily="IBM Plex Mono">
        {value}
      </text>
    </PieChart>
  );
};

