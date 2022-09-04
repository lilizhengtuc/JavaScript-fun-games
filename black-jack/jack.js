var dealerSum = 0;
var playerSum = 0;

var dealerAceCount = 0;
var playerAceCount = 0;

var hidden;
var deck;

var canHit = true;


window.onload = function () {
    buildDeck();
    shuffleDeck();
    startGame();

}

function buildDeck() {
    var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    var types = ["C", "D", "H", "S"];
    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]);
        }
    }
    // console.log(deck)
}


function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;

    }
    console.log(deck);
}


function startGame() {
    hidden = deck.pop();
    dealerSum = dealerSum + getValue(hidden);
    dealerAceCount = dealerAceCount + checkAce(hidden);
    // console.log(hidden);
    // console.log(dealerSum);
    while (dealerSum < 17) {
        let card = deck.pop();
        let cardImg = document.createElement("img");
        cardImg.src = "./cards/" + card + '.png';
        dealerSum = dealerSum + getValue(card);
        dealerAceCount = dealerAceCount + checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }
    console.log(dealerSum)

    for (let i = 0; i < 2; i++) {
        let card = deck.pop();
        let cardImg = document.createElement("img");
        cardImg.src = "./cards/" + card + '.png';
        playerSum = playerSum + getValue(card);
        playerAceCount = playerAceCount + checkAce(card);
        document.getElementById("player-cards").append(cardImg);
    }
    console.log(playerSum)

    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
    document.getElementById("new").addEventListener("click", round);

}

function round() {
    location.reload();
}

function stay() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    playerSum = reduceAce(playerSum, playerAceCount);

    canHit = false;
    document.getElementById("hidden").src = "./cards/" + hidden + '.png';

    let message = "";
    if (playerSum > 21) {
        message = "You lose!";
    }
    else if (dealerSum > 21) {
        message = "You win!";
    }
    else if (playerSum == dealerSum) {
        message = "It is a tie!";
    }
    else if (playerSum > dealerSum) {
        message = "You win!";
    }
    else if (playerSum < dealerSum) {
        message = "You lose!";
    }
    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("player-sum").innerText = playerSum;
    document.getElementById("results").innerText = message;



}
function hit() {
    if (!canHit) {
        return;
    }
    let card = deck.pop();
    let cardImg = document.createElement("img");
    cardImg.src = "./cards/" + card + '.png';
    playerSum = playerSum + getValue(card);
    playerAceCount = playerAceCount + checkAce(card);
    document.getElementById("player-cards").append(cardImg);

    if (reduceAce(playerSum, playerAceCount) > 21) {
        canHit = false;
    }
}

function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum = playerSum - 10;
        playerAceCount = playerAceCount - 1;
    }
    return playerSum;
}


function getValue(card) {
    let data = card.split('-');
    let value = data[0];

    if (isNaN(value)) {
        if (value == "A") {
            return 11;
        }
        return 10;
    }

    return parseInt(value);


}


function checkAce(card) {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}