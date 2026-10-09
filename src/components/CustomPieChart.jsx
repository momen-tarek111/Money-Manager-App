import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

function CustomPieChart({
  data = [],
  label = "Total Balance",
  totalAmount = "$0",
  colors = ["#591688", "#a0090e", "#016630"],
  showTextAnchor = true,
}) {
  // Check if all amounts are zero to prevent rendering empty slice glitches
  const hasData = data.some((item) => Number(item.amount) > 0);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Donut Chart Container with Centered Text Anchor */}
      <div className="relative w-full h-[260px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={hasData ? data : [{ name: "No Data", amount: 1 }]}
              dataKey="amount"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={75}
              outerRadius={95}
              paddingAngle={2}
              startAngle={90}
              endAngle={-270}
              isAnimationActive={true}
              animationDuration={800}
            >
              {hasData
                ? data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                      stroke="none"
                    />
                  ))
                : [
                    <Cell key="cell-empty" fill="#e5e7eb" stroke="none" />,
                  ]}
            </Pie>
            {hasData && (
              <Tooltip
                formatter={(value) => [`$${value.toLocaleString()}`, "Amount"]}
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  border: "1px solid #f3f4f6",
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                  fontSize: "12px",
                }}
              />
            )}
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text Anchor */}
        {showTextAnchor && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
            <span className="text-xs font-medium text-gray-500 mb-0.5">
              {label}
            </span>
            <span className="text-2xl font-bold text-gray-900 tracking-tight">
              {totalAmount}
            </span>
          </div>
        )}
      </div>

      {/* Bottom Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 text-xs font-medium text-gray-600 flex-wrap">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full inline-block"
              style={{ backgroundColor: colors[index % colors.length] }}
            />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomPieChart;