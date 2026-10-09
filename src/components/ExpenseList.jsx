import { Download, LoaderCircle, Mail, ReceiptText } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";
import { useState } from "react";

function ExpenseList({ transactions = [], onDelete, onDownload, onEmail }) {
    const [emailLoading, setEmailLoading] = useState(false);
    const [downloadLoading, setDownloadLoading] = useState(false);
    const handleEmail = async () => {
        setEmailLoading(true);
        try {
            await onEmail();
        } finally {
            setEmailLoading(false);
        }
    };

    const handleDownload = async () => {
        setDownloadLoading(true);
        try {
            await onDownload();
        } finally {
            setDownloadLoading(false);
        }
    };

    const hasTransactions = transactions && transactions.length > 0;
    
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Expense Sources</h5>
                {hasTransactions && (
                    <div className="flex items-center justify-end gap-2">
                        <button disabled={emailLoading || downloadLoading} onClick={handleEmail} className="card-btn">
                            {emailLoading ? (
                                <>
                                <LoaderCircle className="w-4 h-4 animate-spin text-purple-600"/>
                                <span>Emailing...</span>
                                </>
                            ) : (
                                <>
                                <Mail className="text-gray-500 text-base" size={15}/>
                                <span>Email</span>
                                </>
                            )}
                        </button>
                        <button
                            disabled={emailLoading || downloadLoading}
                            onClick={handleDownload}
                            className="card-btn"
                        >
                        {downloadLoading ? (
                            <>
                            <LoaderCircle className="w-4 h-4 animate-spin text-purple-600"/>
                            <span>Downloading...</span>
                            </>
                        ) : (
                            <>
                            <Download className="text-gray-500 text-base" size={15}/>
                            <span>Download</span>
                            </>
                        )}
                        </button>
                    </div>
                )}
            </div>

            {hasTransactions ? (
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {transactions.map((income) => (
                        <TransactionInfoCard

                            key={income.id}

                            title={income.name}

                            icon={income.icon}

                            date={moment(income.date).format('Do MMM YYYY')}

                            amount={income.amount}

                            type="expense"
                            onDelete={() => onDelete(income.id)}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center border border-dashed border-gray-200 rounded-xl bg-gray-50/50 my-2">
                    <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center mb-3">
                        <ReceiptText className="w-6 h-6 text-purple-600"/>
                    </div>
                    <p className="text-base font-semibold text-gray-700">
                        No Expense Recorded Yet
                    </p>
                    <p className="text-xs text-gray-400 mt-1 max-w-xs">
                        Start adding your expense sources to track and manage your financial statistics here.
                    </p>
                </div>
            )}
        </div>
    )
}

export default ExpenseList;
