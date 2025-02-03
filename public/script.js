const quoteDisplay = document.getElementById('quoteDisplay');
const quoteInput = document.getElementById('quoteInput');
const timer = document.getElementById('timer');
const speed = document.getElementById('speed');
const resetButton = document.getElementById('resetButton');
const keyboardButtons = document.querySelectorAll('.keyboard button');

let startTime;
let interval;


const quotes = [
  "The quick brown fox jumps over the lazy dog.",
  "Practice makes perfect.",
  "Coding is fun and challenging.",
  "Keep calm and code on.",
  "JavaScript is the language of the web."
];


function startTimer() {
  startTime = new Date();
  interval = setInterval(() => {
    timer.textContent = Math.floor((new Date() - startTime) / 1000);
  }, 1000);
}


function calculateSpeed() {
  const words = quoteInput.value.trim().split(/\s+/).length;
  const timeInMinutes = (new Date() - startTime) / 60000;
  const wpm = Math.floor(words / timeInMinutes);
  speed.textContent = wpm;
}


function resetGame() {
  clearInterval(interval);
  timer.textContent = 0;
  speed.textContent = 0;
  quoteInput.value = '';
  quoteInput.disabled = false;
  loadRandomQuote();
}


function loadRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteDisplay.textContent = quotes[randomIndex];
}


keyboardButtons.forEach(button => {
  button.addEventListener('click', () => {
    const key = button.getAttribute('data-key');
    if (key === 'Backspace') {
      quoteInput.value = quoteInput.value.slice(0, -1); // Remove last character
    } else if (key === ' ') {
      quoteInput.value += ' '; // Add space
    } else {
      quoteInput.value += key; 
    }


    const inputEvent = new Event('input', { bubbles: true });
    quoteInput.dispatchEvent(inputEvent);
  });
});


quoteInput.addEventListener('input', () => {
  if (!startTime) {
    startTimer();
  }
  if (quoteInput.value === quoteDisplay.textContent) {
    clearInterval(interval);
    quoteInput.disabled = true;
    calculateSpeed();
  }
});

resetButton.addEventListener('click', resetGame);


loadRandomQuote();