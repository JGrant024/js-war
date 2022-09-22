function Card({value, suit} = {}) {
    this.value = value; 
    this.suit = suit; 
} 

function Deck() {
    this.cards = []; 
    for(let i = 0; i < suits.length; i++) {
        for(j= 0; j < values.length; j++) {
            this.cards.push(new Card({suit: i, value: j}));
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
    console.log(this.deck.cards)
}
const suits = ["♥", "♦", "♠", "♣"];
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

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
    

    this.shuffle();
    this.player1.hand = this.deck.cards.filter(function(item, index){
        return !(index % 2);

    });
    
    this.player2.hand = this.deck.cards.filter(function(item, index){
        return index % 2;
    });

    console.log(this.player1.hand[0].suit)


    document.querySelector(".player-1-suit").innerHTML = suits[this.player1.hand[0].suit];
    document.querySelector(".player-1-value").innerHTML = values[this.player1.hand[0].value];

    document.querySelector(".player-2-suit").innerHTML = suits[this.player2.hand[0].suit];
    document.querySelector(".player-2-value").innerHTML = values[this.player1.hand[0].value];

}

Game.prototype.compare = function() {
    const playerOneCard = this.player1.hand[0]; 
    const playerTwoCard = this.player2.hand[0]; 

    console.log(playerOneCard)

    if (playerOneCard > playerTwoCard) {
        console.log(playerOneCard, "player1 wins")
    }
    if (playerTwoCard > playerOneCard) {
        console.timeLog((playerTwoCard, "player 2 wins"))
    }
}

Game.prototype.start = function() {
    this.deal()
    this.compare()
}



const game = new Game(); 

game.start()

// const game2 = new Game();
// const game3 = new Game(); 





