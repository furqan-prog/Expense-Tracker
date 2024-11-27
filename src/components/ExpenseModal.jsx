import React, { useState } from "react";

function ExpenseModal({ expenseModalIsOpen, closedExpenseModal, addYourExpenses}) {
  const [spent, setSpent] = useState({});
  if (expenseModalIsOpen == false) {
    return null;
  }

  const handleInput = (event) => {
       const finalExp = { ...spent, [event.target.name] : event.target.value }
       setSpent(finalExp)
  }

  const trackSubmit = () => {
    addYourExpenses(spent)
  }

  return (
    <div className="mdl-overlay" >
      <div className="mdl-container" onClick={(e) => e.stopPropagation()}>
        <div className="mdl-header">
          <button onClick={closedExpenseModal} className="close-button">
            X
          </button>
        </div>
        <div className="mdl-body">
          <h5>Add Expense</h5>
          <div className="form-group">
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="number"
                onChange={handleInput}
                className="form-control mb-3"
                name="spent"
                placeholder="write spent amount"
              />
              <input
                type="date"
                onChange={handleInput}
                className="form-control mb-3"
                name="date"
                placeholder="select date"
              />
              <select
                className="form-select mb-3"
                name="category"
                onChange={handleInput}
              >
                <option value="-">Select Category</option>
                <option value="Grocery">Grocery</option>
                <option value="Personal">Personal</option>
                <option value="Rent">Rent</option>
                <option value="Medical">Medical</option>
                <option value="Fee">Fee</option>
              </select>
              <textarea
                onChange={handleInput}
                className="form-control mb-3"
                placeholder="description"
                name="detail"
              ></textarea>
              <button
                onClick={trackSubmit} closeYourModal className="btn btn-sm w-100 btn-warning py-2"
                
              >
                Add Expense
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpenseModal;
