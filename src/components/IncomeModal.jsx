import React, { useState } from "react";

function IncomeModal({ incomeModalIsOpen, closeYourModal, handleYourIncome }) {
  const [payment, setPayment] = useState(0);
  if (incomeModalIsOpen == false) {
    return null;
  }
  const addingIncome = () => {
    handleYourIncome(payment);
    setPayment(0);
  };

  return (
    <div className="mdl-overlay">
      <div className="mdl-container" onClick={(e) => e.stopPropagation()}>
        <div className="mdl-header">
          <button onClick={closeYourModal} className="close-button">
            X
          </button>
        </div>
        <div className="mdl-body">
          <h5>Add Income</h5>
          <div className="form-group d-flex gap-2">
            <input
              onChange={(e) => setPayment(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Enter Income"
            />
            <button className="btn btn-primary btn-sm" onClick={addingIncome}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IncomeModal;
