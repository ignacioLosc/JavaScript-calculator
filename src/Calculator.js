import './App.css';
import { useState } from 'react';

function App() {
    const [input, setInput] = useState("0");
    const [firstInput, setFirstInput] = useState(true);
    const [output, setOutput] = useState();
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
            setInput(input + event.target.innerHTML);
        }
    }
    return (
        <div className="App">
            <div id="display" className='Display'>
                <h3 className='Output'>{output}</h3>
                <h3 className='Input'>{input}</h3>
            </div>
            <button id="equals">=</button>
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
            <button id="clear" onClick={clearDisplay}>AC</button>
        </div>
    );
  }
  
  export default App;