import { useEffect, useState } from "react";
import CustomLineChart from "./CustomLineChart";
import { Plus } from "lucide-react";
import { prepareIncomeLineChartData } from "../util/util";

function ExpenseOverview({transactions,onAddExpense}) {
    const [chartData, setChartData] = useState([]);
    
    useEffect(() => {
        const result = prepareIncomeLineChartData(transactions);
        console.log(result);
        setChartData(result);

        return () => {};
    }, [transactions]);
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <div>
                <h5 className="text-xl">
                    Expense Overview
                </h5>
                <p className="text-xs text-gray-400 mt-0.5">
                    Track your earnings over time and analyze your expense trends.
                </p>
                </div>
                <button onClick={onAddExpense} className="add-btn flex items-center gap-1">
                    <Plus size={15}/> Add Expense
                </button>
            </div>
            <div className="mt-10">
                <CustomLineChart data={chartData}/>
            </div>
        </div>
    )
}

export default ExpenseOverview