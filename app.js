'use strict';

(function () {
    var Deck = require('./core/deck');
    var SpanishCard = require('./core/card-spanish');

    var AIUser = require('./core/user-ai');
    var Card = require('./core/card');
    var Hand = require('./core/hand');

    var Game = require('./core/game');
    var Player = require('./core/player');

    var playerA = new Player('A', AIUser(), {
        log: console.log
    });
    var playerB = new Player('B', AIUser(), {
        log: console.log
    });

    var spanishDeck = Deck({
        cardType: SpanishCard()
    });

    var game = Game({
        deck: spanishDeck,
        player: playerA,
        log: console.log
    });

    game.addPlayer(playerB);

    game.start();

})();
