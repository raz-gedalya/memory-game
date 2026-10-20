const emojis = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍍'];
let cardsArray = [...emojis, ...emojis];

const board = document.getElementById('board');
const matchesDisplay = document.getElementById('matches');
const resetBtn = document.getElementById('reset-btn');

let flippedCards = [];
let matchedPairs = 0;
let lockBoard = false;

function shuffle() {
    cardsArray.sort(() => Math.random() - 0.5);
}

function createBoard() {
    board.innerHTML = '';
    shuffle();
    matchedPairs = 0;
    matchesDisplay.textContent = matchedPairs;

    cardsArray.forEach((emoji) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.emoji = emoji;

        card.innerHTML = `
            <div class="card-front">❓</div>
            <div class="card-back">${emoji}</div>
        `;

        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === flippedCards[0]) return;
    if (this.classList.contains('flip')) return;

    this.classList.add('flip');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    const isMatch = card1.dataset.emoji === card2.dataset.emoji;

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    flippedCards = [];
    matchedPairs++;
    matchesDisplay.textContent = matchedPairs;

    if (matchedPairs === emojis.length) {
        setTimeout(() => {
            alert("WELL DONE! You've found all matches!");
        }, 400);
    }
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        flippedCards[0].classList.remove('flip');
        flippedCards[1].classList.remove('flip');
        resetTurn();
    }, 800);
}

function resetTurn() {
    flippedCards = [];
    lockBoard = false;
}

resetBtn.addEventListener('click', createBoard);

createBoard();