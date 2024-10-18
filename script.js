const cardImages = [
    'images/diamond.jpg',
    'images/gold.jpeg',
    'images/imarald.jpeg',
    'images/musgarive.jpeg',
    'images/purple.jpeg',
    'images/ruby.jpeg',
    'images/pearl.jpeg',
    'images/diamond.jpg',
    'images/gold.jpeg',
    'images/imarald.jpeg',
    'images/musgarive.jpeg',
    'images/purple.jpeg',
    'images/ruby.jpeg',
    'images/pearl.jpeg',
    'images/diamond.jpg',
    'images/gold.jpeg'
];

let cardArray = [...cardImages, ...cardImages]; 
let flippedCards = [];
let matchedCards = [];
let moves = 0;

const moveCounterElement = document.getElementById('moveCounter');

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    for (let i = 1; i < array.length; i++) {
        if (array[i] === array[i - 1]) {
            let swapIndex;
            do {
                swapIndex = Math.floor(Math.random() * array.length);
            } while (swapIndex === i || array[swapIndex] === array[i]);
            [array[i], array[swapIndex]] = [array[swapIndex], array[i]];
        }
    }

    return array;
}

function createShuffledDeck() {
    const shuffledImages = shuffle([...cardImages, ...cardImages]);
    return shuffledImages;
}

function createBoard() {
    const gameBoard = document.getElementById('gameBoard');
    shuffle(cardArray);
    cardArray.forEach((image, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = image;

        const inner = document.createElement('div');
        inner.classList.add('inner');

        const front = document.createElement('div');
        front.classList.add('front');
        const img = document.createElement('img');
        img.src = image;
        front.appendChild(img);

        const back = document.createElement('div');
        back.classList.add('back');
        back.textContent = '?';

        inner.appendChild(front);
        inner.appendChild(back);
        card.appendChild(inner);
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
        card.classList.add('flipped');
    });

    setTimeout(() => {
        document.querySelectorAll('.card').forEach(card => {
            card.classList.remove('flipped');
        });
    }, 2000);
}

function flipCard() {
    if (this.classList.contains('flipped') || flippedCards.length === 2) return;

    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        increaseMoves();
        checkMatch();
    }
}

function checkMatch() {
    const [firstCard, secondCard] = flippedCards;
    if (firstCard.dataset.image === secondCard.dataset.image) {
        matchedCards.push(firstCard, secondCard);
        flippedCards = [];

        if (matchedCards.length === cardArray.length) {
            const modal = document.getElementById('winnerModal');
            const winnerMessage = document.getElementById('winnerMessage');
            const replayButton = document.getElementById('replayButton');

            let message;
            if (moves <= 20) {
                message = `Amazing! You won in just ${moves} moves! ⚡`;
            } else if (moves <= 30) { 
                message = `Great job! You completed the game in ${moves} moves! 😎`;
            } else if (moves <= 40) {
                message = `Good effort! You finished in ${moves} moves. 👍 `;
            } else {
                message = `You did it! But it took you ${moves} moves. Better luck next time! 😊`;
            }

            winnerMessage.textContent = message;
            modal.style.display = 'block';
            document.querySelectorAll('.card').forEach(card => {
                card.removeEventListener('click', flipCard);
            });

            replayButton.addEventListener('click', startNewGame);
        }
        
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

function increaseMoves() {
    moves++;
    moveCounterElement.textContent = moves;
}

function startNewGame() {
    location.reload();
}

createBoard();
