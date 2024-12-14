const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '';
let sequence = []; // Array to store numbers and operators
let readyForResult = false;

// Function to update the display
function updateDisplay() {
    display.value = sequence.join(' ') + ' ' + currentInput;
}

// Function to handle number and decimal input
function appendNumber(number) {
    if (readyForResult) {
        clearDisplay(); // Clear the display if ready for a new operation
        readyForResult = false;
    }
    currentInput += number;
    updateDisplay();
}

// Function to handle operator buttons (+, -, *, /, %)
function chooseOperation(op) {
    if (currentInput === '' && sequence.length > 0) {
        // If no current input, just change the last operator
        sequence[sequence.length - 1] = op;
        updateDisplay();
        return;
    }

    if (currentInput === '') return; // If there's no input, do nothing

    sequence.push(currentInput); // Add the current input to the sequence
    sequence.push(op); // Add the operator to the sequence
    currentInput = ''; // Reset current input
    updateDisplay(); // Update the display to show the full sequence
}

// Function to compute the result
function compute() {
    if (currentInput !== '') {
        sequence.push(currentInput); // Add the last input if any
    }

    const expression = sequence.join(' ');
    let result;

    try {
        result = eval(expression); // Evaluate the expression
    } catch (error) {
        console.error('Error evaluating expression:', error);
        result = 'Error';
    }

    console.log(`Expression: ${expression}`);
    console.log(`Result: ${result}`);

    currentInput = result.toString();
    sequence = []; // Clear the sequence after calculation
    readyForResult = true;
    updateDisplay();
}

// Function to clear display
function clearDisplay() {
    currentInput = '';
    sequence = [];
    readyForResult = false;
    updateDisplay();
}

// Function to handle backspace (remove the last digit)
function backspace() {
    currentInput = currentInput.slice(0, -1); // Remove the last character
    updateDisplay();
}

// Function to handle button clicks
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.innerText;

        if (button.id === 'clear') {
            clearDisplay();
        } else if (button.id === 'equals') {
            if (sequence.length > 0 || currentInput !== '') {
                compute(); // Compute the result of the entire sequence
            }
        } else if (button.id === 'square') {
            if (currentInput !== '') {
                currentInput = (parseFloat(currentInput) ** 2).toString();
                updateDisplay(); // Show the squared result immediately
            }
        } else if (button.id === 'backspace') {
            backspace(); // Handle backspace functionality
        } else if (button.classList.contains('btn-operator')) {
            chooseOperation(value);
        } else {
            appendNumber(value);
        }
    });
});

// Initial update of display
updateDisplay();
