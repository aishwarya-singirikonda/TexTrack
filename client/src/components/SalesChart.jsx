import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function SalesChart() {
  const data = [
    { month: "Jan", revenue: 12000 },
    { month: "Feb", revenue: 18000 },
    { month: "Mar", revenue: 15000 },
    { month: "Apr", revenue: 22000 },
    { month: "May", revenue: 30000 },
  ];

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-2xl font-bold mb-6">
        Sales Trend
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#2563eb"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalesChart;