const suits = ["♥", "♦", "♠", "♣"];
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A",];

const playerName = prompt("Enter your name"); 
document.querySelector(".player1-name").innerHTML = playerName; 

let player1SuitUI = document.querySelector(".player-1-suit").innerHTML; 
let player1ValueUI = document.querySelector(".player-1-value").innerHTML; 
let player2SuitUI = document.querySelector(".player-2-suit").innerHTML;
let player2ValueUI =document.querySelector(".player-2-value").innerHTML; 


function Card({value, suit} = {}) {
    this.value = value; 
    this.suit = suit; 
} 

function Deck() {
    this.cards = []; 
    for(let i = 0; i < suits.length; i++) {
        for(j= 0; j < values.length; j++) {
            this.cards.push(new Card({suit: suits[i], value: values[j]}));
        }
    }
} 

function Player({name} = {}) {
    this.name = name; 
}

function Game() {
    this.player1 = new Player({name: 'Player 1'})
    this.player2 = new Player({name: 'Player 2'})
    this.deck = new Deck(); 
}


Game.prototype.shuffle = function () {
    // target the deck with this.deck
    let i = this.deck.cards.length;

    while(i) {
        i--;
        j = Math.floor(Math.random() * (i + 1));
        let temp = this.deck.cards[i];        
        this.deck.cards[i] = this.deck.cards[j];
        this.deck.cards[j] = temp;
    }
}

Game.prototype.deal = function() {
    // shuffle 
    // give each player 26 cards

    document.getElementById("start").disabled = true;
    this.shuffle();
    this.player1.hand = this.deck.cards.filter(function(item, index){
        return !(index % 2);

    });
    
    this.player2.hand = this.deck.cards.filter(function(item, index){
        return index % 2;
    });

    player1SuitUI = this.player1.hand[0].suit;
    player1ValueUI = this.player1.hand[0].value;
    player2SuitUI = this.player2.hand[0].suit;
    player2ValueUI = this.player2.hand[0].value;

}

Game.prototype.compare = function() {
    document.querySelector(".player-1-suit").innerHTML = this.player1.hand[0].suit;
    document.querySelector(".player-1-value").innerHTML = this.player1.hand[0].value;

    document.querySelector(".player-2-suit").innerHTML = this.player2.hand[0].suit;
    document.querySelector(".player-2-value").innerHTML = this.player2.hand[0].value;

    const playerOneCard = values.indexOf(this.player1.hand[0].value); 
    const playerTwoCard = values.indexOf(this.player2.hand[0].value); 

    if (playerOneCard > playerTwoCard) {
        document.querySelector(".winner").innerHTML = "Player 1 wins";
        const winningCard = this.player1.hand.shift();
        const losingCard = this.player2.hand.shift();   
        this.player1.hand.push(winningCard); 
        this.player1.hand.push(losingCard);   
    }
    if (playerTwoCard > playerOneCard) {
        document.querySelector(".winner").innerHTML = "Player 2 wins";
        const winningCard = this.player2.hand.shift();
        const losingCard = this.player1.hand.shift();   
        this.player2.hand.push(winningCard); 
        this.player2.hand.push(losingCard);
    }
    if (playerOneCard === playerTwoCard) {
        document.querySelector(".winner").innerHTML = "Issa Tie"
    }

    document.querySelector(".deck1").innerHTML = `Deck: ${this.player1.hand.length}`;
    document.querySelector(".deck2").innerHTML = `Deck: ${this.player2.hand.length}`;

}

Game.prototype.start = function() {
    this.deal()
    this.compare();
    document.getElementById("play").addEventListener("click", () => this.compare())

}



const game = new Game(); 
    document.getElementById("start").addEventListener("click", () => game.start())






