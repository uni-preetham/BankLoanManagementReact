import "./App.css";
import { Routes, Route } from "react-router-dom";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Login from "./customer/Login";
import Register from "./customer/Register";
import ManagerDashboard from "./manager/ManagerDashboard";
import BankDashboard from "./bank/BankDashboard";
import RegisterManager from "./manager/RegisterManager";
import AddLoanType from "./bank/AddLoanType";
import BankDetails from "./bank/BankDetails";
import EditProfile from "./customer/EditProfile";
import CustomerDashboard from "./customer/CustomerDashboard";
import LoanRequestForm from "./loan/LoanRequestForm";
import ManagerLoanRequests from "./manager/ManagerLoanRequests";
import BankLoanRequests from "./bank/BankLoanRequests";
import EditManagerProfile from "./manager/EditManagerProfile";
import Timeout from "./pages/Timeout";
import LoanList from "./customer/LoanList";
import LoanTypeDetails from "./pages/LoanTypeDetails";
import AccountDetails from "./customer/AccountDetails";
import EMIDetails from "./customer/EMIDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registeruser" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bank/dashboard" element={<BankDashboard />} />
        <Route path="/manager/dashboard" element={<ManagerDashboard />} />
        <Route path="/user/dashboard" element={<CustomerDashboard />} />
        <Route path="/bank/registermanager" element={<RegisterManager />} />
        <Route path="/bank/addloantype" element={<AddLoanType />} />
        <Route path="/bank/details" element={<BankDetails />} />
        <Route path="/user/editprofile" element={<EditProfile />} />
        <Route path="/user/loanrequestform" element={<LoanRequestForm />} />
        <Route path="/manager/approvals" element={<ManagerLoanRequests/>} />
        <Route path="/bank/approvals" element={<BankLoanRequests/>} />
        <Route path="/manager/editprofile" element={<EditManagerProfile/>} />
        <Route path="/bank/loanrequest" element={<BankLoanRequests/>} />
        <Route path="/user/loanlist" element={<LoanList/>} />
        <Route path="/loanlist" element={<LoanTypeDetails/>} />
        <Route path="/timeout" element={<Timeout/>} />
        <Route path="*" element={<Error />} />
        <Route path="/accounts" element={<AccountDetails />} />
        <Route path="/emi-details/:accountId" element={<EMIDetails />} />
      </Routes>
    </>
  );
}

export default App;
