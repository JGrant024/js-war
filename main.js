// gloobal declatration
const suits = ["♥", "♦", "♠", "♣"];
const values = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

// const playerName = prompt("Enter your name");
// document.querySelector(".player1-name").innerHTML = playerName;

let player1SuitUI = document.querySelector(".player-1-suit").innerHTML;
let player1ValueUI = document.querySelector(".player-1-value").innerHTML;
let player2SuitUI = document.querySelector(".player-2-suit").innerHTML;
let player2ValueUI = document.querySelector(".player-2-value").innerHTML;

function Card({ value, suit } = {}) {
  this.value = value;
  this.suit = suit;
}

function Deck() {
  this.cards = [];
  for (let i = 0; i < suits.length; i++) {
    for (j = 0; j < values.length; j++) {
      this.cards.push(new Card({ suit: suits[i], value: values[j] }));
    }
  }
}

function Player({ name } = {}) {
  this.name = name;
}
// created players
function Game() {
  this.player1 = new Player({ name: "Player 1" });
  this.player2 = new Player({ name: "Player 2" });
  this.deck = new Deck();
}

// created shuffel method
Game.prototype.shuffle = function () {
  // target the deck with this.deck
  let i = this.deck.cards.length;

  while (i) {
    i--;
    j = Math.floor(Math.random() * (i + 1));
    let temp = this.deck.cards[i];
    this.deck.cards[i] = this.deck.cards[j];
    this.deck.cards[j] = temp;
  }
};

Game.prototype.deal = function () {
  // shuffle
  // give each player 26 cards
  document.getElementById("start").disabled = true;
  this.shuffle();
  //Follow up on this - using modulo
  this.player1.hand = this.deck.cards.filter(function (item, index) {
    return !(index % 2);
  });

  this.player2.hand = this.deck.cards.filter(function (item, index) {
    return index % 2;
  });

  player1SuitUI = this.player1.hand[0].suit;
  player1ValueUI = this.player1.hand[0].value;
  player2SuitUI = this.player2.hand[0].suit;
  player2ValueUI = this.player2.hand[0].value;
};

Game.prototype.compare = function () {
  document.querySelector(".player-1-suit").innerHTML =
    this.player1.hand[0].suit;
  document.querySelector(".player-1-value").innerHTML =
    this.player1.hand[0].value;

  document.querySelector(".player-2-suit").innerHTML =
    this.player2.hand[0].suit;
  document.querySelector(".player-2-value").innerHTML =
    this.player2.hand[0].value;

  console.log("player1 before draw", this.player1.hand.length);
  console.log("player2 before draw", this.player2.hand.length);

  //Find index of player's card in the values array
  const playerOneCard = values.indexOf(this.player1.hand[0].value);
  const playerTwoCard = values.indexOf(this.player2.hand[0].value);

  if (playerOneCard > playerTwoCard) {
    document.querySelector(".winner").innerHTML = "Player 1 wins";

    //Remove first card from player's deck
    const winningCard = this.player1.hand.shift();
    const losingCard = this.player2.hand.shift();
    //Push losing and winning cards to the end of the player's deck
    this.player1.hand.push(winningCard);
    this.player1.hand.push(losingCard);
    console.log("after draw, player 1", this.player1.hand.length);
  }
  if (playerTwoCard > playerOneCard) {
    document.querySelector(".winner").innerHTML = "Player 2 wins";
    const winningCard = this.player2.hand.shift();
    const losingCard = this.player1.hand.shift();
    this.player2.hand.push(winningCard);
    this.player2.hand.push(losingCard);
    console.log("after draw, player 2", this.player2.hand.length);
  }
  if (playerOneCard === playerTwoCard) {
    if (this.player1.hand.length >= 5 && this.player2.hand.length >= 5) {
      const player1WarCards = this.player1.hand.splice(0, 5);
      const player2WarCards = this.player2.hand.splice(0, 5);
      //Find index of player's card in the values array
      console.log(player1WarCards)
      console.log(player2WarCards)
      const warCard1 = values.indexOf(player1WarCards[4].value);
      const warCard2 = values.indexOf(player2WarCards[4].value);

      console.log(player1WarCards.length + player1WarCards.length);

      if (warCard1 > warCard2) {
        //Merge the two arrays (war cards to player's deck)
        this.player1.hand = this.player1.hand.concat(player1WarCards);
        this.player1.hand = this.player1.hand.concat(player2WarCards);
        console.log("player 1 wins tie");
      }
      if (warCard2 > warCard1) {
        this.player2.hand = this.player2.hand.concat(player1WarCards);
        this.player2.hand = this.player2.hand.concat(player2WarCards);
        console.log("player 2 wins tie");
      } else {
        if (this.player1.hand.length >= 5 && this.player2.hand.length >= 5) {
          Game.prototype.tie = function () {
            const player1WarCards = this.player1.hand.splice(0, 4);
            const player2WarCards = this.player2.hand.splice(0, 4);
            const warCard1 = values.indexOf(player1WarCards[3].value);
            const warCard2 = values.indexOf(player2WarCards[3].value);

            if (warCard1 > warCard2) {
              //Merge the two arrays (war cards to player's deck)
              this.player1.hand = this.player1.hand.concat(player1WarCards);
              this.player1.hand = this.player1.hand.concat(player2WarCards);
              console.log("player 1 wins tie");
            }
            if (warCard2 > warCard1) {
              this.player2.hand = this.player2.hand.concat(player1WarCards);
              this.player2.hand = this.player2.hand.concat(player2WarCards);
              console.log("player 2 wins tie");
            } else {
              this.game.tie();
            }
          };
        } else {
          if (this.player1.hand.length < 5) {
            this.player2.hand = this.player2.hand.concat(player1WarCards);
            this.player2.hand = this.player2.hand.concat(player2WarCards);
            document.querySelector(
                ".deck1"
              ).innerHTML = `Deck: ${this.player1.hand.length}`;
              document.querySelector(
                ".deck2"
              ).innerHTML = `Deck: ${this.player2.hand.length}`;
              document.getElementById("play").disabled = true;
          }
          if (this.player2.hand.length < 5) {
            this.player1.hand = this.player1.hand.concat(player1WarCards);
            this.player1.hand = this.player1.hand.concat(player2WarCards);
            
          }

        }
      }

      document.querySelector(".winner").innerHTML = "Issa Tie";
    }
  }

  document.querySelector(
    ".deck1"
  ).innerHTML = `Deck: ${this.player1.hand.length}`;
  document.querySelector(
    ".deck2"
  ).innerHTML = `Deck: ${this.player2.hand.length}`;

  if (this.player1.hand.length === 0 || this.player2.hand.length === 0) {
    document.getElementById("play").disabled = true;
  }
};

Game.prototype.start = function () {
  this.deal();
  this.compare();
  document
    .getElementById("play")
    .addEventListener("click", () => this.compare());
};

const game = new Game();
document.getElementById("start").addEventListener("click", () => game.start());
