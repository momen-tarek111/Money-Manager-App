import {  useEffect, useState } from "react";
import Dashboard from "../components/Dashboard"
import { useUser } from "../hooks/useUser"
import { API_ENDPOINTS } from "../util/apiEndpoints";
import axiosConfig from "../util/axiosConfig";
import toast from "react-hot-toast";
import Modal from "../components/Modal"
import DeleteAlert from "../components/DeleteAlert";
import { toLocalISOString } from "../util/util";
import ExpenseOverview from "../components/ExpenseOverview";
import ExpenseList from "../components/ExpenseList";
import AddExpenseForm from "../components/AddExpenseForm";
function Expense() {
  useUser()
  const [expenseData, setExpenseData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const fetchExpenseCategories = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("expense"));
      if (response.status === 200) {
        console.log('expense categories', response.data);
        setCategories(response.data);
      }
    } catch (error) {
      console.log('Failed to fetch expense categories:', error);
      toast.error(error.response?.data?.message || "Failed to fetch expense categories");
    }
  };
  const fetchExpenseDetails = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSE);
      if (response.status === 200) {
        console.log('Expense list', response.data);
        setExpenseData(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch expense details:', error);
      toast.error(error.response?.data?.message || "Failed to fetch expense details");
    } finally {
      setLoading(false);
    }
  }
  const handleAddExpense = async (expense) => {
    const { name, amount, date, icon, categoryId } = expense;
    // Validation
    if (!name.trim()) {
      toast.error("Please enter a name");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0");
      return;
    }

    if (!date) {
      toast.error("Please select a date");
      return;
    }
    const today = toLocalISOString();
    if (date > today) {
      toast.error('Date cannot be in the future');
      return;
    }

    if (!categoryId) {
      toast.error("Please select a category");
      return;
    }
    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
        name,
        amount: Number(amount),
        date,
        icon,
        categoryId,
      });

      if (response.status === 201) {
        setOpenAddExpenseModal(false);
        toast.success("Expense added successfully");
        fetchExpenseDetails();
        fetchExpenseCategories();
      }
    } catch (error) {
      console.log('Error adding expense', error);
      toast.error(error.response?.data?.message || "Failed to add expense");
    }
  };
  const deleteExpense = async (id) => {
    try {
      await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense deleted successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.log('Error deleting expense', error);
      toast.error(error.response?.data?.message || "Failed to delete expense");
    }
  };

  const handleDownloadExpenseDetails=async()=>{
    
    try {
      const response=await axiosConfig.get(API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD,{responseType:'blob'})
      const filename="expense_details.xlsx"
      const url=window.URL.createObjectURL(new Blob([response.data]))
      const link=document.createElement('a')
      link.href=url
      link.setAttribute("download",filename)
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)
      toast.success("Download expense details successfully")
    } catch (error) {
      toast.error(error.response?.data?.message|| "Failed to download expense")
    }
  }
  const handleEmailExpenseDetails = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_EXPENSE);
      if (response.status === 200) {
        toast.success("Expense details emailed successfully");
      }
    } catch (error) {
      console.error('Error emailing expense details:', error);
      toast.error(error.response?.data?.message || "Failed to email expense details");
    }
  };
  useEffect(()=>{
      fetchExpenseCategories()
      fetchExpenseDetails()
  },[])
  return (
    <Dashboard activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <ExpenseOverview transactions={expenseData} onAddExpense={()=>setOpenAddExpenseModal(true)} />
          </div>
          <ExpenseList transactions={expenseData} onDelete={(id)=>setOpenDeleteAlert({show:true,data:id})} onDownload={handleDownloadExpenseDetails} onEmail={handleEmailExpenseDetails} />
          <Modal isOpen={openAddExpenseModal} onClose={()=>setOpenAddExpenseModal(false)} title="Add Expense">
            <AddExpenseForm categories={categories} onAddExpense={(expense)=>handleAddExpense(expense)}/>
          </Modal>
          <Modal isOpen={openDeleteAlert.show} onClose={()=>setOpenDeleteAlert({show:false,data:null})} title="Delete Expense">
            <DeleteAlert 
              content="Are you sure want to delete this expense details?"
              onDelete={()=>deleteExpense(openDeleteAlert.data)}
            />
          </Modal>
        </div>
      </div>
    </Dashboard>
  )
}

export default Expense