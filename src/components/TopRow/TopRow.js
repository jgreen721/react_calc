import React, { useState } from "react";
import "./TopRow.css";

const TopRow = ({ changeTheme }) => {
  const [toggleState, setToggleState] = useState(1);

  const handleChangeMode = (number) => {
    setToggleState(number);
    changeTheme(number);
  };
  return (
    <div className="top-row">
      <h2>calc</h2>
      <div className="theme-toggle-row">
        <div className="theme-toggle-col">
          <h4 className="mr-5">THEME</h4>
        </div>
        <div className="theme-toggle-col">
          <div className="theme-toggle-div">
            <ul className="theme-levels">
              <li onClick={() => handleChangeMode(1)} className="theme-level">
                1
              </li>
              <li onClick={() => handleChangeMode(2)} className="theme-level">
                2
              </li>
              <li onClick={() => handleChangeMode(3)} className="theme-level">
                3
              </li>
            </ul>
            <div
              className={
                toggleState === 1
                  ? "toggle-switch-div start"
                  : toggleState === 2
                  ? "toggle-switch-div center"
                  : "toggle-switch-div end"
              }
            >
              <div className="toggle"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopRow;
