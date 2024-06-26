const HUNDRED = 100;
const MAX_VALUE = 1000;

let TIME_LIMIT = 60;

let quotes_array = [
    "Push yourself, because no one else is going to do it for you.",
    "Failure is the condiment that gives success its flavor.",
    "Wake up with determination. Go to bed with satisfaction.",
    "It's going to be hard, but hard does not mean impossible.",
    "Learning never exhausts the mind.",
    "The only way to do great work is to love what you do."
];

let timer_text = document.querySelector(".curr_time");
let correct_text = document.querySelector(".curr_correct");
let cpm_text = document.querySelector(".curr_cpm");
let wpm_text = document.querySelector(".curr_wpm");
let quote_text = document.querySelector(".quote");
let input_area = document.querySelector(".input_area");
let restart_btn = document.querySelector(".restart_btn");
let cpm_group = document.querySelector(".cpm");
let wpm_group = document.querySelector(".wpm");
let correct_group = document.querySelector(".correct");

let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let total_correct = 0;
let correct = 0;
let characterTyped = 0;
let current_quote = "";
let quoteNo = 0;
let timer = null;

function updateQuote() {
    quote_text.textContent = null;
    current_quote = quotes_array[quoteNo];

    current_quote.split('').forEach(char => {
        const charSpan = document.createElement('span');
        charSpan.innerText = char;
        quote_text.appendChild(charSpan);
    })

    if (quoteNo < quotes_array.length - 1) {
        ++quoteNo;
    } else {
        quoteNo = 0;
    }
}

function processCurrentText() {
    curr_input = input_area.value;
    curr_input_array = curr_input.split('');
    ++characterTyped;
    correct = 0;

    quoteSpanArray = quote_text.querySelectorAll('span');
    quoteSpanArray.forEach((char, index) => {
        let typedChar = curr_input_array[index];

        if (typedChar == null) {
            char.classList.remove('correct_char');
            char.classList.remove('incorrect_char');

        } else if (typedChar === char.innerText) {
            char.classList.add('correct_char');
            char.classList.remove('incorrect_char');
            ++correct;

        } else {
            char.classList.add('incorrect_char');
            char.classList.remove('correct_char');
        }
    });

    correct_text.textContent = total_correct + correct;

    let correctCharacters = (characterTyped - (total_correct + correct));

    if (curr_input.length == current_quote.length) {
        updateQuote();
        total_correct += correct;
        input_area.value = "";
    }
}

function startGame() {
    resetValues();
    updateQuote();
    clearInterval(timer);
    timer = setInterval(updateTimer, MAX_VALUE);
}

function resetValues() {
    timeLeft = TIME_LIMIT;
    timeElapsed = 0;
    correct = 0;
    total_correct = 0;
    characterTyped = 0;
    quoteNo = 0;
    input_area.disabled = false;

    input_area.value = "";
    quote_text.textContent = 'Click on the area below to start the game.';
    timer_text.textContent = timeLeft + 's';
    correct_text.textContent = 0;
    restart_btn.style.display = "none";
    cpm_group.style.display = "none";
    wpm_group.style.display = "none";
}

function updateTimer() {
    if (timeLeft > 0) {
        --timeLeft;
        ++timeElapsed;
        timer_text.textContent = timeLeft + "s";
    } else {
        finishGame();
    }
}

function finishGame() {
    clearInterval(timer);
    input_area.disabled = true;
    quote_text.textContent = "Click on restart to start a new game.";
    restart_btn.style.display = "block";
    cpm = Math.round(((characterTyped / timeElapsed) * TIME_LIMIT));
    wpm = Math.round((((characterTyped / 5) / timeElapsed) * TIME_LIMIT));
    cpm_text.textContent = cpm;
    wpm_text.textContent = wpm;
    cpm_group.style.display = "block";
    wpm_group.style.display = "block";
}
