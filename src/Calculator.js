import './App.css';
import { useState } from 'react';
import { flushSync } from 'react-dom';
import Footer from "./components/Footer/Footer.js"

function App() {
    const [input, setInput] = useState("0");
    const [firstInput, setFirstInput] = useState(true);
    const [output, setOutput] = useState();
    function validateNewInput(oldInput, newInput) {
        if (newInput === "-" && oldInput.charAt(oldInput.length - 2) === "-" && oldInput.charAt(oldInput.length - 1) === "-") {
            return oldInput;
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
            //console.log("input recv: " + input);
            let subtractTerms = input.split("-");
            //console.log("subtractTerms: " + subtractTerms);
            //console.log("subtractTerms.length: " + subtractTerms.length);
            let firstTerm = subtractTerms.shift();
            //console.log("subtractTerms after shift: " + subtractTerms);
            //console.log(subtractTerms.includes("")); 
            //console.log("firstTerm: " + firstTerm);
            if (subtractTerms.length === 2 && subtractTerms.includes("")) {
                subtractTerms.shift();
                let element = subtractTerms[0];
                subtractTerms = ["-" + element];
                //console.log("subtractTerms: " + subtractTerms);
            }
            if (firstTerm.length !== 0) {
                if (firstTerm.at(-1) === "x" || firstTerm.at(-1) === "/") {
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
                if (!((filteredinput.charAt(i+1) === "-") && ((filteredinput.charAt(i+1) === filteredinput.charAt(Number(filteredinput.length) - 3) && (filteredinput.charAt(filteredinput.length - 2) === ".")) || (filteredinput.charAt(i+1) === filteredinput.charAt(Number(filteredinput.length) - 2))))) {
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
        //console.log("filteredinput: " + filteredinput);
        let result = parseFloat(performOperationsRecursively(filteredinput).toFixed(12)).toString();
        flushSync(() => {
            setInput(result);
            //setOutput(filteredinput);
            if (result === "0") {
                setFirstInput(true);
            }
        });
    }
    return (
        <div className="App">
            <div id="display" className='Display'>
                <h3 className='Output'>{output}</h3>
                <h3 className='Input'>{input}</h3>
            </div>
            <button id="clear" className="AC" onClick={clearDisplay}>AC</button>
            <button id="divide" className="Number-button" onClick={inputValue}>/</button>
            <button id="multiply" className="Number-button" onClick={inputValue}>x</button>
            <div className="Number-buttons-div">
                <button id="seven" className="Number-button" onClick={inputValue}>7</button>
                <button id="eight" className="Number-button" onClick={inputValue}>8</button>
                <button id="nine" className="Number-button" onClick={inputValue}>9</button>
                <button id="subtract" className="Number-button" onClick={inputValue}>-</button>
                <button id="four" className="Number-button" onClick={inputValue}>4</button>
                <button id="five" className="Number-button" onClick={inputValue}>5</button>
                <button id="six" className="Number-button" onClick={inputValue}>6</button>
                <button id="add" className="Number-button" onClick={inputValue}>+</button>
                <button id="one" className="Number-button" onClick={inputValue}>1</button>
                <button id="two" className="Number-button" onClick={inputValue}>2</button>
                <button id="three" className="Number-button" onClick={inputValue}>3</button>
                <button id="equals" className="Equals-button" onClick={calculateOutputValue}>=</button>
                <button id="zero" className="Number-zero-button" onClick={inputValue}>0</button>
                <button id="decimal" className="Number-button" onClick={inputValue}>.</button>
            </div>
            <Footer/>
        </div>
    );
  }
  
  export default App;