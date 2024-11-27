import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IncomeModal from "./components/IncomeModal";
import ExpenseModal from "./components/ExpenseModal";

function App() {
  const [yourIncome, setyourIncome] = useState(() => {
    const storedIncome = JSON.parse(localStorage.getItem("yourIncome"));
    return storedIncome ? storedIncome : 0;
  });

  const [yourBalance, setYourBalance] = useState(0);

  const [yourExpenses, setYourExpenses] = useState(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("yourExpenses"));
    return storedExpenses ? storedExpenses : [];
  });

  const [totalExpense, setTotalExpense] = useState(0);
  const [incomeModalIsOpen, setIncomeModalIsOpen] = useState(false);
  const [expenseModalIsOpen, setExpenseModalIsOpen] = useState(false);

  const deleteNotify = () =>
    toast.success("Successfully deleted !", {
      transition: Slide,
      autoClose: 300,
      pauseOnHover: true,
    });

  const incomeAdded = () =>
    toast.success("Income Added Successfully !", {
      position: "top-left",
      transition: Slide,
      autoClose:800,
      pauseOnHover: true,
    });

  const expenseAdded = () =>
    toast.success("Expense Added Successfully !", {
      position: "top-center",
      transition: Slide,
      autoClose: 1000,
      pauseOnHover: true,
    });

  const openYourModal = () => {
    setIncomeModalIsOpen(true);
  };

  const closeYourModal = () => {
    setIncomeModalIsOpen(false);
  };
  const handleYourIncome = (payment) => {
    setyourIncome(yourIncome + +payment);
    closeYourModal();
    incomeAdded();
  };

  const openedExpenseModal = () => {
    setExpenseModalIsOpen(true);
  };

  const closedExpenseModal = () => {
    setExpenseModalIsOpen(false);
  };

  const addYourExpenses = (spent) => {
    const newExparr = [...yourExpenses, spent];
    setYourExpenses(newExparr);
    setExpenseModalIsOpen(false);
    expenseAdded();
  };

  const delteExpense = (index) => {
    const remainingExpenses = yourExpenses.filter((elem, i) => i != index);
    setYourExpenses(remainingExpenses);
    deleteNotify();
  };

  useEffect(() => {
    let sumOfExp = 0;

    yourExpenses.forEach((exp) => {
      sumOfExp += +exp.spent;
    });

    setYourBalance(yourIncome - sumOfExp);
    setTotalExpense(sumOfExp);

    localStorage.setItem("yourExpenses", JSON.stringify(yourExpenses));
    localStorage.setItem("yourIncome", JSON.stringify(yourIncome));
  }, [yourExpenses, yourIncome]);

  return (
    <>
      <div className="container">
        <div className="bg-dark text-white p-3">
          <h1 className="text-center mb-5">Track Your Expenses</h1>
          <div className="row">
            <div className="col-md-4 text-center">
              <h3>Amount In</h3>
              <h5 className="text-success">${yourIncome}</h5>
              <button className="btn btn-success" onClick={openYourModal}>
                Add Income
              </button>

              <IncomeModal
                incomeModalIsOpen={incomeModalIsOpen}
                closeYourModal={closeYourModal}
                handleYourIncome={handleYourIncome}
              />
            </div>

            <div className="col-md-4 text-center">
              <h3>Expenses</h3>
              <h5 className="text-warning">${totalExpense}</h5>
            </div>

            <div className="col-md-4 text-center">
              <h3>Balance</h3>
              <h5 className="text-danger">${yourBalance}</h5>
              <button className="btn btn-danger" onClick={openedExpenseModal}>
                Add Expense
              </button>
              <ExpenseModal
                expenseModalIsOpen={expenseModalIsOpen}
                closedExpenseModal={closedExpenseModal}
                addYourExpenses={addYourExpenses}
              />
            </div>
          </div>
        </div>
        <h1 className="text-center mt-3 fw-bold">Expenses List</h1>
        <div className="p-3 bg-white">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Edit List</th>
              </tr>
            </thead>
            <tbody>
              {yourExpenses.map((expList, i) => {
                return (
                  <tr key={i}>
                    <td>{expList.date}</td>
                    <td>{expList.category}</td>
                    <td>{expList.detail}</td>
                    <td>{expList.spent}</td>
                    <td>
                      <button
                        onClick={() => {
                          delteExpense(i);
                        }}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
