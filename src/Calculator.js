import './App.css';
import { useState } from 'react';

function App() {
    const [input, setInput] = useState("0");
    const [firstInput, setFirstInput] = useState(true);
    const [output, setOutput] = useState();
    function validateNewInput(oldInput, newInput) {
        if (newInput === "-") {

        } else if (oldInput.includes(".") && newInput.includes(".")) {
            return oldInput; 
        }else {
            let lastChar = oldInput.charAt(oldInput.length - 1);
            //console.log("oldInput: " + oldInput);
            //console.log("oldInput.length: " + oldInput.length);
            //console.log(lastChar);
            //console.log(newInput);
            // prevent same operation twice in a row
            if (((lastChar === "/") || (lastChar === "x") || (lastChar === ".") || (lastChar === "+")) && (lastChar === newInput)) {
                return oldInput;
            }
        }
        return oldInput + newInput;
    }
    function clearDisplay() {
        setInput("0");
        setOutput();
        setFirstInput(true);
    }
    function inputValue(event) {
        if (firstInput) {
            setInput(event.target.innerHTML);
            if (event.target.innerHTML !== "0") {
                setFirstInput(false);
            }
        } else {
            let newInput = validateNewInput(input, event.target.innerHTML);
            setInput(newInput);
        }
    }
    function performOperationsRecursively(input) {
        if (input.includes("+")) {
            let sumTerms = input.split("+");
            //console.log("sumTerms: " + sumTerms);
            if (sumTerms.length > 1) {
                //console.log(firstSumTerm[1]);
                var partialSum = 0;
                sumTerms.forEach(term => {
                    //console.log("subtractTerms: " + term.split("-"));
                    partialSum += performOperationsRecursively(term);
                });
                return partialSum;
            } else {
                return Number(input);
            }
        } else if (input.includes("-")) {
            let subtractTerms = input.split("-");
            //console.log("subtractTerms: " + subtractTerms);
            let firstTerm = subtractTerms.shift();
            //console.log("firstTerm: " + firstTerm);
            if (subtractTerms.length > 1) {
                subtractTerms.forEach(term => {
                    firstTerm -= performOperationsRecursively(term);
                });
                return firstTerm;
            } else {
                return firstTerm - Number(subtractTerms);
            }
        } else if (input.includes("x")) {
            let multiplyTerms = input.split("x");
            let firstTerm = multiplyTerms.shift();
            if (multiplyTerms.length > 1) {
                multiplyTerms.forEach(term => {
                    firstTerm *= performOperationsRecursively(term);
                });
                return firstTerm;
            } else {
                return firstTerm * Number(multiplyTerms);
            }
        } else if (input.includes("/")) {
            let divisionTerms = input.split("/");
            let firstTerm = divisionTerms.shift();
            if (divisionTerms.length > 1) {
                divisionTerms.forEach(term => {
                    firstTerm /= performOperationsRecursively(term);
                });
                return firstTerm;
            } else {
                return firstTerm / Number(divisionTerms);
            }
        } else {
            return Number(input);
        }
    }
    function calculateOutputValue() {
        setOutput(input);
        setInput(performOperationsRecursively(input).toString());
    }
    return (
        <div className="App">
            <div id="display" className='Display'>
                <h3 className='Output'>{output}</h3>
                <h3 className='Input'>{input}</h3>
            </div>
            <button id="clear" onClick={clearDisplay}>AC</button>
            <button id="zero" onClick={inputValue}>0</button>
            <button id="one" onClick={inputValue}>1</button>
            <button id="two" onClick={inputValue}>2</button>
            <button id="three" onClick={inputValue}>3</button>
            <button id="four" onClick={inputValue}>4</button>
            <button id="five" onClick={inputValue}>5</button>
            <button id="six" onClick={inputValue}>6</button>
            <button id="seven" onClick={inputValue}>7</button>
            <button id="eight" onClick={inputValue}>8</button>
            <button id="nine" onClick={inputValue}>9</button>
            <button id="add" onClick={inputValue}>+</button>
            <button id="subtract" onClick={inputValue}>-</button>
            <button id="multiply" onClick={inputValue}>x</button>
            <button id="divide" onClick={inputValue}>/</button>
            <button id="decimal" onClick={inputValue}>.</button>
            <button id="equals" onClick={calculateOutputValue}>=</button>
        </div>
    );
  }
  
  export default App;