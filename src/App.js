import "./App.css";
import React, { useState } from "react";
import { Wrapper, TopRow, Screen, Grid, CalcBtn } from "./components";

var btns = [
  { id: 1, val: 7, isNum: true, color: "primary" },
  { id: 2, val: 8, isNum: true, color: "primary" },
  { id: 3, val: 9, isNum: true, color: "primary" },
  { id: 4, val: "DEL", isNum: false, color: "secondary" },
  { id: 5, val: 4, isNum: true, color: "primary" },
  { id: 6, val: 5, isNum: true, color: "primary" },
  { id: 7, val: 6, isNum: true, color: "primary" },
  { id: 8, val: "+", isNum: false, color: "primary" },
  { id: 9, val: 1, isNum: true, color: "primary" },
  { id: 10, val: 2, isNum: true, color: "primary" },
  { id: 11, val: 3, isNum: true, color: "primary" },
  { id: 12, val: "-", isNum: false, color: "primary" },
  { id: 13, val: ".", isNum: false, color: "primary" },
  { id: 14, val: 0, isNum: true, color: "primary" },
  { id: 15, val: "/", isNum: false, color: "primary" },
  { id: 16, val: "x", isNum: false, color: "primary" },
];

var btmBtns = [
  { id: 1, val: "Reset", isNum: false, color: "secondary", fx: "handleReset" },
  { id: 2, val: "=", isNum: false, color: "red", fx: "handleResults" },
];

function App() {
  const [themes, setTheme] = useState([
    { id: 1, title: "primary" },
    { id: 2, title: "secondary" },
    { id: 3, title: "tertiary" },
  ]);
  const [counter, setCounter] = useState(0);

  const [operand, setOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [currentTotal, setCurrentTotal] = useState(null);
  const [screenText, setScreenText] = useState("0");
  const [screenShowsTotal, setScreenShowsTotal] = useState(false);
  const [canDel, setCanDel] = useState(false);
  const [startedCal, setStartedCalc] = useState(false);

  const changeTheme = (number) => {
    console.log("Number", number);
    setCounter(number - 1);
  };

  const handleBtnPress = (val) => {
    console.log(val);
    if (val !== "DEL") setCanDel(true);
    if (val == ".") return handleDecimal();
    if (val == "DEL") return handleDel();
    if (val == "+" || val == "x" || val == "-" || val == "/") {
      return handleOperator(val);
    } else {
      return handleOperand(val);
    }
  };

  function handleDecimal() {
    if (screenText == "0") {
      setScreenText("0.");
    } else {
      setScreenText(screenText + ".");
    }
  }

  // function handleDelete() {
  //   console.log("handleDelete fired!");
  //   //EDGE CASE -- total is shown, can only delete from operator/operand
  //   if (!canDel) return;

  //   // EDGE CASE -- no inputs been entered yet(nothing to delete)
  //   if (screenText == "0") return;

  //   // check if user is deleting an operator -- Dont reset to zero down below!
  //   let valueIsNaN = isNaN(screenText);
  //   // if (valueIsNaN) setOperator(null);

  //   // ELSE pop last element off stringText
  //   let temp = screenText;
  //   temp = temp.split("");
  //   temp.pop();
  //   temp = temp.join("");
  //   // EDGE CASE -- only 1 input, delete puts stringTotal back to initial state
  //   if (!valueIsNaN && !temp.length) {
  //     setScreenText("0");
  //   } else {
  //     setScreenText(temp || "");
  //     setOperator(null);
  //   }
  // }

  function handleDel() {
    if (!canDel || screenText == "" || screenText == "0") {
      console.log("nothing to del, exiting function");
      return;
    }
    //handle number deletes
    if (!isNaN(screenText)) {
      let temp = screenText;
      temp = temp.split("");
      temp.pop();
      temp = temp.join("");
      if (!temp.length) {
        setScreenText("0");
      } else {
        setScreenText(temp);
      }
    }

    //handle operations;
    else {
      console.log("too fn stupid to figure it out!");
      setOperator(null);
      setScreenText("");
    }
  }

  function handleOperand(val) {
    console.log("handle Operand!", val);
    let temp = screenText;
    //EDGE CASE -- screenText is still initial state OR operator
    if (temp == "0" || isNaN(temp)) temp = JSON.stringify(val);
    else if (screenShowsTotal) {
      temp = JSON.stringify(val);
      setScreenShowsTotal(false);
      setScreenText(temp);
      // setOperand(temp);
    } else temp += JSON.stringify(val);
    setScreenText(temp);
    setOperand(temp);
  }

  function handleOperator(val) {
    console.log("handle Operator", val);
    //EDGE CASE -- operand is still null -- invalid
    if (!operand) return;
    val = val == "x" ? "*" : val;
    // check for prev operator -- run expression
    if (operator) {
      let tempTotal = currentTotal | 0;
      tempTotal = eval(`${tempTotal} ${operator} ${screenText}`);
      console.log("Expesssion", `${tempTotal} ${operator} ${screenText}`);
      // console.log("newTotal:", tempTotal);
      setCurrentTotal(tempTotal % 1 == 0 ? tempTotal : tempTotal.toFixed(5));
      setScreenText(tempTotal % 1 == 0 ? tempTotal : tempTotal.toFixed(5));
      setOperator(val);
      setScreenShowsTotal(true);
      return;
    }
    // console.log("THIS IS FUCKING ME UP");
    if (!isNaN(screenText)) setCurrentTotal(parseFloat(screenText).toFixed(2));
    // console.log("CURRENT TOTAL BUG", currentTotal);
    setOperator(val);
    setScreenText(val);

    console.log("TEMPT TOTAL", currentTotal);
  }

  const handleResults = () => {
    setCanDel(false);
    console.log("handleResults fired!", currentTotal);
    if (
      screenText == "+" ||
      screenText == "x" ||
      screenText == "-" ||
      screenText == "/"
    ) {
      setScreenText(currentTotal);
    } else {
      let finalTotal = eval(
        `${currentTotal}  ${operator}  ${parseFloat(screenText)}`
      );
      // finalTotal = finalTotal.toFixed(2);
      setScreenText(finalTotal % 1 == 0 ? finalTotal : finalTotal.toFixed(5));
      setCurrentTotal(finalTotal % 1 == 0 ? finalTotal : finalTotal.toFixed(5));
      console.log(
        "EXPRESSION",
        `${currentTotal}  ${operator}  ${parseFloat(screenText).toFixed(2)}`
      );
    }
    // setOperand(null);
    setOperator(null);
    setScreenShowsTotal(false);
  };

  const handleReset = () => {
    setCanDel(false);
    setOperand(null);
    setOperator(null);
    setScreenText("0");
    setCurrentTotal(null);
  };
  return (
    <div className="app" data-theme={themes[counter].title}>
      <Wrapper>
        <TopRow changeTheme={changeTheme} />
        <Screen total={screenText} />
        <Grid>
          <div className="grid-parent">
            {btns.map((b, idx) => (
              <CalcBtn handleBtnPress={handleBtnPress} key={idx} btn={b} />
            ))}
          </div>
          <div className="flex-row">
            {btmBtns.map((b) => (
              <button
                onClick={eval(b.fx)}
                key={b.id}
                className={
                  b.color === "secondary"
                    ? "flex-btn secondary"
                    : "flex-btn red"
                }
              >
                {b.val}
              </button>
            ))}
          </div>
        </Grid>
      </Wrapper>
    </div>
  );
}

export default App;
