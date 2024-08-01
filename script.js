const quotes = {
    easy: "Real keep change come see man you right order own look high large she number never part during year general public as leave since he possible life still change another new since form point not should interest both and way even stand long begin line system still so",
    medium: "Success is not final, failure is not fatal: It is the courage to continue that counts. The only limit to our realization of tomorrow is our doubts of today.",
    hard: "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How razorback-jumping frogs can level six piqued gymnasts!"
};

let selectedQuote = quotes.easy;
let selectedTime = 30;
let startTime;
let timerInterval;

const quoteEl = document.getElementById('quote');
const inputEl = document.getElementById('input');
const timerEl = document.getElementById('timer');
const wpmEl = document.getElementById('wpm');
const errorsEl = document.getElementById('errors');
const accuracyEl = document.getElementById('accuracy');
const messageEl = document.getElementById('message');

document.getElementById('easy').addEventListener('click', () => setLevel('easy'));
document.getElementById('medium').addEventListener('click', () => setLevel('medium'));
document.getElementById('hard').addEventListener('click', () => setLevel('hard'));

document.getElementById('time30').addEventListener('click', () => setTime(30));
document.getElementById('time60').addEventListener('click', () => setTime(60));
document.getElementById('time120').addEventListener('click', () => setTime(120));

inputEl.addEventListener('input', onTyping);

function setLevel(level) {
    selectedQuote = quotes[level];
    quoteEl.innerText = selectedQuote;
    inputEl.value = '';
    inputEl.disabled = false;
    inputEl.focus();
    messageEl.classList.add('hidden');
    startTime = null;
    timerEl.innerText = 'Time: 0s';
    wpmEl.innerText = 'WPM: 0';
    errorsEl.innerText = 'Errors: 0';
    accuracyEl.innerText = 'Accuracy: 0%';
    clearInterval(timerInterval);

    document.getElementById('easy').classList.remove('selected');
    document.getElementById('medium').classList.remove('selected');
    document.getElementById('hard').classList.remove('selected');
    document.getElementById(level).classList.add('selected');
}

function setTime(seconds) {
    selectedTime = seconds;
    document.getElementById('time30').classList.remove('selected');
    document.getElementById('time60').classList.remove('selected');
    document.getElementById('time120').classList.remove('selected');
    document.getElementById(`time${seconds}`).classList.add('selected');
 setLevel('easy');
}

function onTyping() {
    const textArray = selectedQuote.split('');
    const inputArray = inputEl.value.split('');

    quoteEl.innerHTML = textArray.map((char, index) => {
        if (index < inputArray.length) {
            return inputArray[index] === char ? `<span class="correct">${char}</span>` : `<span class="incorrect">${char}</span>`;
        } else {
            return char;
        }
    }).join('');

    if (!startTime) {
        startTime = new Date();
        timerInterval = setInterval(updateTimer, 1000);
    }

    const correctChars = inputArray.filter((char, index) => char === textArray[index]).length;
    const wrongChars = inputArray.filter((char, index) => char !== textArray[index]).length;
    const elapsedTime = (new Date() - startTime) / 1000 / 60;
    const wpm = Math.floor(correctChars / 5 / elapsedTime);
    const accuracy = Math.floor((correctChars / inputArray.length) * 100) || 0;

    wpmEl.innerText = `WPM: ${wpm}`;
    errorsEl.innerText = `Errors: ${wrongChars}`;
    accuracyEl.innerText = `Accuracy: ${accuracy}%`;

    if (elapsedTime * 60 >= selectedTime || inputArray.length >= textArray.length) {
        clearInterval(timerInterval);
        inputEl.disabled = true;
        showCompletionMessage(wpm, accuracy);
    }
}

function updateTimer() {
    const elapsedTime = Math.floor((new Date() - startTime) / 1000);
    timerEl.innerText = `Time: ${elapsedTime}s`;

    if (elapsedTime >= selectedTime) {
        clearInterval(timerInterval);
        inputEl.disabled = true;
        const correctChars = inputEl.value.split('').filter((char, index) => char === selectedQuote[index]).length;
        const elapsedTimeMinutes = elapsedTime / 60;
        const wpm = Math.floor(correctChars / 5 / elapsedTimeMinutes);
        const accuracy = Math.floor((correctChars / inputEl.value.length) * 100) || 0;
        showCompletionMessage(wpm, accuracy);
    }
}

function showCompletionMessage(wpm, accuracy) {
    messageEl.innerText = `Congratulations! Your typing speed is ${wpm} WPM with ${accuracy}% accuracy.`;
    messageEl.classList.remove('hidden');
}


// _----------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('#buttons-container button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('bg-gray-300', 'text-white'));
            button.classList.add('bg-blue-500', 'text-white');
        });
    });
});