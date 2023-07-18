import './App.css';
import { useState } from 'react';
import { flushSync } from 'react-dom';

function App() {
    const [input, setInput] = useState("0");
    const [firstInput, setFirstInput] = useState(true);
    const [output, setOutput] = useState();
    function validateNewInput(oldInput, newInput) {
        if (newInput === "-") {

        }else {
            let lastChar = oldInput.charAt(oldInput.length - 1);
            // prevent same operation twice in a row
            if (((lastChar === "/") || (lastChar === "x") || (lastChar === ".") || (lastChar === "+")) && (lastChar === newInput)) {
                return oldInput;
            }
        }
        let lastTerm = oldInput.split(" ").at(-1);
        if (lastTerm.includes(".") && !lastTerm.includes("-") && !lastTerm.includes("+") && !lastTerm.includes("x") && !lastTerm.includes("/") && newInput.includes(".")) {
            return oldInput; 
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
                return Number(partialSum);
            } else {
                return Number(input);
            }
        } else if (input.includes("-")) {
            let subtractTerms = input.split("-");
            //console.log("subtractTerms: " + subtractTerms);
            let firstTerm = subtractTerms.shift();
            //console.log("firstTerm: " + firstTerm);
            if (firstTerm.length !== 0) {
                if (firstTerm.at(-1) === "x") {
                    return performOperationsRecursively(firstTerm+input.split("-")[1])*-1;
                }
                let calculatedFirstTerm = performOperationsRecursively(firstTerm);
                //console.log("calculatedFirstTerm:"+calculatedFirstTerm);
                if (subtractTerms.length >= 1) {
                    //console.log("calculatedFirstTerm: " + calculatedFirstTerm);
                    subtractTerms.forEach(term => {
                        calculatedFirstTerm -= performOperationsRecursively(term);
                    });
                    return calculatedFirstTerm;
                } else {
                    return calculatedFirstTerm - Number(subtractTerms);
                }
            } else {
                return performOperationsRecursively(subtractTerms.at(-1))*-1;
            }
        } else if (input.includes("x")) {
            let multiplyTerms = input.split("x");
            //console.log("multiplyTerms: " + multiplyTerms);
            let firstTerm = multiplyTerms.shift();
            let calculatedFirstTerm = performOperationsRecursively(firstTerm);
            //console.log("calculatedFirstTerm: " + calculatedFirstTerm);
            if (multiplyTerms.length >= 1) {
                multiplyTerms.forEach(term => {
                    calculatedFirstTerm *= performOperationsRecursively(term);
                });
                return calculatedFirstTerm;
            } else {
                return calculatedFirstTerm * performOperationsRecursively(multiplyTerms);
            }
        } else if (input.includes("/")) {
            let divisionTerms = input.split("/");
            let firstTerm = divisionTerms.shift();
            //console.log("firstTerm: " + firstTerm);
            let calculatedFirstTerm = performOperationsRecursively(firstTerm);
            if (divisionTerms.length >= 1) {
                divisionTerms.forEach(term => {
                    calculatedFirstTerm /= performOperationsRecursively(term);
                });
                return calculatedFirstTerm;
            } else {
                return calculatedFirstTerm / performOperationsRecursively(divisionTerms);
            }
        } else {
            return Number(input);
        }
    }
    function calculateOutputValue() {
        var operators = ["+", "-", "x", "/"];
        var filteredinput = input.trim();
        for (var i = 0; i < filteredinput.length; i++) {
            if (operators.includes(filteredinput.charAt(i)) && operators.includes(filteredinput.charAt(i+1))) {
                //console.log("filteredinput.charAt(i+1): " + filteredinput.charAt(i+1));
                if (!((filteredinput.charAt(i+1) === "-") && (filteredinput.charAt(i+1) === filteredinput.charAt(Number(filteredinput.length) - 2)))) {
                    filteredinput = filteredinput.split('');
                    filteredinput.splice(i, 1);
                    filteredinput = filteredinput.join('');
                    //console.log("filteredinput.charAt(filteredinput.length -1): " + filteredinput.charAt(Number(filteredinput.length) - 2));
                    //console.log("original input: " + input);
                    //console.log("filteredinput: " + filteredinput);
                    i = 0;
                }
            }
        }
        //console.log(filteredinput);
        let result = performOperationsRecursively(filteredinput).toString();
        flushSync(() => {
            setInput(result);
            //setOutput(input.trim());
        });
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