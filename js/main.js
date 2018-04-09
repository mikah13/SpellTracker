class Card {
    constructor(atk) {
        this.atk = atk;
        this.spell = false;
    }

    boost() {
        ++this.atk;
    }
}

class Hand {
    constructor(size) {
        this.hand = new Array(9).fill(null);
    }
}

class Game {
    constructor() {
        this.hand = new Hand(9).hand;
        this.turn = 0;
    }
    addCard() {
        let i = 0;
        while (this.hand[i]) {
            i++;
        }
        if (i < 9) {
            this.hand[i] = new Card(0);
        }
    }
    nextTurn() {
        this.addCard();
        this.turn++;
    }
    firstTurn() {
        if (this.turn === 0) {
            ++this.turn;
            for (let i = 0; i < 4; i++) {
                this.hand[i] = new Card(0);
            }
        }
    }
    secondTurn() {
        if (this.turn === 0) {
            ++this.turn;
            for (let i = 0; i < 5; i++) {
                this.hand[i] = new Card(0);
            }
        }
    }
    removeCard(a) {
        if (this.hand[a]) {
            for (let i = a; i < this.hand.length - 1; i++) {
                this.hand[i] = this.hand[i + 1];
            }
            this.hand[this.hand.length - 1] = null;
        }
    }
    boost() {
        this.hand.forEach(e => {
            if (e) {
                e.boost();
            }
        })
    }
}

$(document).ready(function() {
    let game = new Game();
    $("#number").html(game.turn);
    $('#first').click(function(e) {
        game.firstTurn();
        $("#number").html(game.turn);
        display(game);
    });
    $('#second').click(function(e) {
        game.secondTurn();
        $("#number").html(game.turn);
        display(game);
    });
    $("#next").click(function(e) {
        game.nextTurn();
        $("#number").html(game.turn);
        display(game);
    })
    $("#add").click(function(e) {
        game.addCard();
        display(game);
    })
    $("#reset").click(function(e) {
        game = new Game();
        $("#number").html(game.turn);
        display(game);
    })
    function display(game) {
        $(".cards").empty();
        game.hand.forEach((e, i) => {
            if (e) {
                let bst = `<button class="bst btn btn-primary " style="display:inline">Boost</button>`;
                let rmv = `<button class="rmv btn btn-danger " style="display:inline">Remove</button>`;
                let data = `<div class="data col-xs-6" style="display:inline"><img src="images/sleeve.png"/>Card ${i + 1}: + ${e.atk}</div>`
                let content = `<div id="${i + 1}" class="row handcard">${data}${bst}${rmv}</div>`;
                $(".cards").append(content);
            }
        })
        $(".rmv").click(function(e) {
            game.removeCard($(this).parent().attr('id') - 1);
            display(game);
        });
        $(".bst").click(function(e) {

            game.boost();
            display(game);
        });
    }
});
