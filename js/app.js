const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const ul = document.querySelector('#phrase ul');
let start = document.querySelector('.btn__reset');
let chosenPhrase = "";

let missed = 0;

const phrases = [
    "blue bird",
    "green frog",
    "yellow lizard",
    "tan lion",
    "brown horse"
]

//Creates an array of char from a randomly chosen string in an array of strings
function getRandomPhraseAsArray(array) {
    let random = Math.floor(Math.random() * (array.length));
    chosenPhrase = array[random];
    let phraseArray = Array.from(chosenPhrase);
    console.log(phraseArray);
    return phraseArray;
}

//Loops through an array of characters and adds them to display of game
function addPhraseToDisplay(array) {
    for (let i=0; i<array.length; i++) {
        let newLi = document.createElement('li')
        newLi.innerText = array[i];
        if (array[i] != " ") {
            newLi.className = "letter";
        } else {
            newLi.className = "space";
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

//Checks for win or loss and displays corresponding overlay screen
function checkWin() {
    let letters = document.querySelectorAll('.letter');
    let shows = document.querySelectorAll('.show');
    let overlay = document.querySelector('#overlay');
    if (letters.length === shows.length || missed === 5) {
        let status = (letters.length === shows.length) ? 'win' : 'lose';
        overlay.firstElementChild.innerHTML = `The phrase was '${chosenPhrase}'. You ${status}!`;
        overlay.className = status;
        overlay.style.display = "flex";
        return true;
    }
}

//Set misses to zero and refresh hearts, changes button, enables all letters, and sets a new phrase
function resetGame() {
    start.innerHTML = "New Game";
    let letters = document.querySelectorAll('.keyrow button');
    for (let i=0; i<letters.length; i++) {
        letters[i].removeAttribute("disabled");
    }
    ul.innerHTML = "";
    missed = 0;
    console.log(missed);
    let hearts = document.querySelector('#scoreboard ol').children;
    start.addEventListener('click', () => {
        document.querySelector('#overlay').style.display = "none";
    });;
    for (let i=0; i<hearts.length; i++) {
        hearts[i].className = "tries";
        hearts[i].firstElementChild.setAttribute('src', 'images/liveHeart.png');
    }
}

// Checks chosen letter for match, keeps score, and checks for game end
let playGame = function(e) {
    let letter = e.target.innerHTML;
    console.log(letter);
    if (letter.length === 1) {
        e.target.disabled = "true";
        let letterFound = checkLetter(letter);
        if (!letterFound) {
            missed++;
            console.log(missed);
            let nextHeart = document.querySelector('.tries');
            nextHeart.className = 'fail';
            nextHeart.firstElementChild.setAttribute('src', 'images/lostHeart.png');
        }
        let gameOver = checkWin();
        if (gameOver) {
            qwerty.removeEventListener('click', playGame);
            resetGame();
            start.onclick = wheelOfSuccess();

        }
    }
}

//Starts and runs game
function wheelOfSuccess() {
    //Hide start overlay on 'Start Game' button click
    start.addEventListener('click', () => {
        document.querySelector('#overlay').style.display = "none";
    });

    //Display randomly chosen phrase's letters
    let x = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(x);

    //Get selected letter and check for match in phrase, win, and loss
    qwerty.addEventListener('click', playGame);
}

wheelOfSuccess();

