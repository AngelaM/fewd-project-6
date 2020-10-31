const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const ul = document.querySelector('#phrase ul');
const start = document.querySelector('.btn__reset');

let missed = 0;

const phrases = [
    "the quick",
    "brown fox",
    "jumped over",
    "the lazy",
    "dog"
]

//Hide start overlay on 'Start Game' button click
start.addEventListener('click', () => {
    document.querySelector('#overlay').style.display = "none";
});

//Creates an array of char from a randomly chosen string in an array of strings
function getRandomPhraseAsArray(array) {
    let random = Math.floor(Math.random() * (array.length));
    let phraseArray = Array.from(array[random]);
    return phraseArray;
}

//Loops through an array of characters and add them to display of game
function addPhraseToDisplay(array) {
    for (let i=0; i<array.length; i++) {
        let newLi = document.createElement('li')
        newLi.innerText = array[i];
        if (array[i] != " ") {
            newLi.className = "letter";
        }
        ul.appendChild(newLi);
    }
}

//Checks letter entered to see if it matches any letters in displayed phrase
function checkLetter(button) {
    let match = null;
    let letters = ul.children;
    for (let i=0; i<letters.length; i++) {
        let letter = letters[i].textContent.charAt(0);
        if (button === letter) {
            match = letter;
            letters[i].className = "letter show";
        }
    }
    return match;
}

//Check for win or loss and display corresponding screen
function checkWin() {
    let letters = document.querySelectorAll('.letter');
    let shows = document.querySelectorAll('.show');
    let overlay = document.querySelector('#overlay');
    if (letters.length === shows.length) {
        overlay.firstElementChild.innerHTML = "Winner!!!";
        overlay.className = "win";
        setTimeout(function() {overlay.style.display = "flex"}, 2000);
    }
    if (missed === 5) {
        overlay.firstElementChild.innerHTML = "Loser!!!";
        overlay.className = "lose";
        overlay.style.display = "flex";
    }
}

//Display randomly chosen phrase's letters
let x = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(x);

//Get selected letter and check for match in phrase, win, and loss
qwerty.addEventListener('click', (e) => {
    let letter = e.target.innerHTML;
    e.target.disabled = "true";
    let letterFound = checkLetter(letter);
    if (!letterFound) {
        missed++;
        let nextHeart = document.querySelector('.tries');
        nextHeart.className = 'fail';
        nextHeart.firstElementChild.setAttribute('src', 'images/lostHeart.png');
    }
    checkWin();
});
