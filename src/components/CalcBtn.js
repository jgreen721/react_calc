import React from "react";

const CalcBtn = ({ btn, handleBtnPress }) => {
  return (
    <div
      onClick={() => handleBtnPress(btn.val)}
      className={
        btn.color === "secondary" ? "calc-btn secondary" : "calc-btn primary"
      }
    >
      {btn.val}
    </div>
  );
};

export default CalcBtn;
