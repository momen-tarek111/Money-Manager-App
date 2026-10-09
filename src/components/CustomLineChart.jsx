import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

// Custom Tooltip matching the design image
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-100 min-w-[160px] text-xs transition-all duration-200">
        <p className="font-semibold text-gray-800 mb-1">{data.date}</p>
        <p className="font-bold text-purple-600 mb-2 text-sm">
          Total: ${data.totalAmount?.toLocaleString()}
        </p>

        {data.details && Object.keys(data.details).length > 0 && (
          <div className="border-t border-gray-100 pt-1.5 space-y-1">
            <p className="text-gray-400 font-medium text-[11px]">Details:</p>
            {Object.entries(data.details).map(([category, amount]) => (
              <div key={category} className="flex justify-between items-center text-gray-600">
                <span>{category}:</span>
                <span className="font-medium text-gray-800">
                  ${amount?.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  return null;
};

function CustomLineChart({ data = [] }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-gray-400 text-sm">
        No income data available to display chart.
      </div>
    );
  }

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            {/* Smooth purple vertical gradient matching design */}
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
            </linearGradient>
          </defs>

          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />

          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
            dy={10}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
            tickFormatter={(val) => (val >= 1000 ? `${val / 1000}k` : val)}
          />

          <Tooltip content={<CustomTooltip />} />

          <Area
            type="monotone"
            dataKey="totalAmount"
            stroke="#8b5cf6"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#incomeGradient)"
            dot={{ r: 4, fill: "#8b5cf6", strokeWidth: 2, stroke: "#fff" }}
            activeDot={{ r: 6, fill: "#7c3aed", strokeWidth: 2, stroke: "#fff" }}
            isAnimationActive={true}
            animationDuration={800}
            animationEasing="ease-in-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CustomLineChart;