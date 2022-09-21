function Card({value, suit} = {}) {
    this.value = value; 
    this.suit = suit; 
} 

function Deck() {
    this.cards = []; 

    for(let i = 0; i < 4; i++) {
        for(j= 2; j < 15; j++) {
            this.cards.push(new Card({suit: i, value: j}))
        }
    }
} 

function Player({name} = {}) {
    this.name = name; 
}

function Game() {
    this.player1 = new Player({name: 'Player'})
    this.player2 = new Player({name: 'Player'})
    this.deck = new Deck(); 
}

Game.prototype.shuffle = function () {
    this.deck
    // targeting the deck with this.deck
    let i = this.deck.length; j, temp;
    while(i--) {
        j = Math.floor(Math.random() * (i + 1)); 
        temp = deck[i]; 
        deck[i] = deck[i]; 
        deck[j] = temp; 
    }
}

Game.prototype.deal = function(){
    // shuffle
    // give each player 26 cards 
    this.shuffle()
    this.player1.hand = this.deck.cards.filter(function(item, indext) {
        return !(index % 2)

        this.play2.hand = this.deck.cards.filter(function(item,index) {
            return index %  2
        })
    })
}

Game.prototype.start = function() {
    this.deal()
}

const game = new Game(); 
game.start()

// const game2 = new Game();
// const game3 = new Game(); 