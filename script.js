

//Calculator object
const calculator = {
    displayValue: "0",
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
    on: true,
};

//function that updates the display
function updateDisplay(){
    const display = document.getElementById("display");
    display.value = calculator.displayValue;
}

function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;

    if (waitingForSecondOperand ===true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;

    }
    else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
    
}

function inputDecimal (dot){

    if(calculator.waitingForSecondOperand === true) {
        calculator.displayValue = "0."
        calculator.waitingForSecondOperand =false;
    }

    if (!calculator.displayValue.includes(dot)) {

        calculator.displayValue +=dot;
    }
}

function handleOperator (nextOperator) {
    const {firstOperand, displayValue, operator} = calculator;

    const inputValue = parseFloat(displayValue);

    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        
    }

    if (firstOperand === null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        console.log(calculator)
        const result = calculate(firstOperand, inputValue,operator);

        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    
}

function calculate (firstOperand, secondOperand, operator) {
    if (operator === "+"){
        return firstOperand + secondOperand;
    } else if (operator === "-") {
        return firstOperand - secondOperand;
    } else if (operator === "*"){
        return firstOperand * secondOperand;
    } else if (operator === "/") {
        return firstOperand / secondOperand;
    }

    return secondOperand;
}

function resetCalculator() {
    
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    updateDisplay();
    
}

function offState() {

    const {on} = calculator;
    
    const array = document.querySelectorAll(".button")
    
    
    array.forEach(element => {
        element.disabled = true;
    });    
    document.getElementById("ON").disabled = false;
    resetCalculator();
    calculator.displayValue = "";
    calculator.on = false;
}

function onState() {
    const {on} = calculator;
    if (!on) {
        document.querySelectorAll("button").forEach(element => {
            element.disabled = false;
        });
        resetCalculator();
        calculator.on = true;
    }

}





//handling key presses
const keys = document.querySelector(".calculator-keys");
keys.addEventListener("click", (event) => {
    const { target } = event;
    const { value  } = target;
    if (!target.matches("button")){
        return;
    }
    console.log(value)
    switch (value){
        case "+":
        case "-":
        case "*":
        case "/":
        case "=":
            handleOperator(value);
            break;
        case ".":
            inputDecimal(value);
            break;
        case "AC":
            resetCalculator();
            break;
        case "OFF":
            offState();
            break;
        case "ON":
            onState();
            break;
        default:
            if (Number.isInteger(parseFloat(value))){
                inputDigit(value);
            }
    }
    updateDisplay();

});



/*


var number1 = "";
var number2 = "";
var number3 = "";
var opperand = "";


var on = false;

document.querySelectorAll(".number").forEach(element => {
    element.addEventListener("click", () => display.value += element.innerText);
});

document.querySelectorAll(".operator").forEach(element => {
    element.addEventListener("click", () => operate(element));
});



buttonOFF.addEventListener("click", () => offState());
buttonON.addEventListener("click", () => onState());

offState();

function offState() {

    document.querySelectorAll("button").forEach(element => {
        element.disabled = true;
    });
    buttonON.disabled = false;
    display.value = ""
    on = false;
}

async function onState() {
    if (!on) {
        var s = "LOADING"
        for (var i = 0; i < s.length; i++) {
            display.value += s[i];
            await new Promise(r => setTimeout(r, 100));
        }
        document.querySelectorAll("button").forEach(element => {
            element.disabled = false;
        });
        display.value = ""
        on = true;
    }

}


*/