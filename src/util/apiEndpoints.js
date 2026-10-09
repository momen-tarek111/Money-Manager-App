export const BASE_URL=import.meta.env.VITE_API_BASE_URL
const CLOUDINARY_CLOUD_NAME="drvtxsqkf";
export const API_ENDPOINTS={
    LOGIN:"/login",
    REGISTER:"/register",
    GET_USER_INFO:"/profile",
    GET_ALL_CATEGORIES:"/categories",
    ADD_CATEGORY:'/categories',
    UPDATE_CATEGORY:(categoryId)=>`/categories/${categoryId}`,
    GET_ALL_INCOMES:"/incomes",
    GET_ALL_EXPENSE:"/expenses",
    CATEGORY_BY_TYPE:(type)=> `/categories/${type}`,
    ADD_INCOME:'/incomes',
    ADD_EXPENSE:'/expenses',
    DELETE_INCOME:(incomeId)=>`/incomes/${incomeId}`,
    DELETE_EXPENSE:(expenseId)=>`/expenses/${expenseId}`,
    INCOME_EXCEL_DOWNLOAD:"excel/download/income",
    EXPENSE_EXCEL_DOWNLOAD:"excel/download/expense",
    EMAIL_INCOME:"/email/income-excel",
    EMAIL_EXPENSE:"/email/expense-excel",
    APPLY_FILTERS:"/filter",
    DASHBOARD_DATA:"/dashboard",
    UPLOAD_IMAGE:`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
}