(function () {

    var Deck = require('../core/deck');
    var SpanishCard = require('../core/card-spanish');

    var Game = require('../core/game');
    var Player = require('../core/player');

    var assert = require('assert');

    describe('Deck', function () {

        describe('New Spanish Deck', function () {

            var spanishDeck;

            before(function () {
                spanishDeck = new Deck({
                    cardType: new SpanishCard()
                });
            });


            it('should have 40 cards', function () {
                assert.equal(spanishDeck.cards.length, 40);
            });

            it('first card should be Ace of Swords', function () {
                assert.equal(spanishDeck.cards[0].getName(), 'Ace of Swords');
            });

            it('last card should be King of Coins', function () {
                assert.equal(spanishDeck.cards[39].getName(), 'King of Coins');
            });
        });

        describe('Deck after Shuffled', function () {

            var spanishDeck;

            before(function () {
                spanishDeck = new Deck({
                    cardType: new SpanishCard()
                });
                spanishDeck.shuffle();
            });

            it('should have 40 cards as before', function () {
                assert.equal(spanishDeck.cards.length, 40);
            });

            it('first card shoud not be Ace of Swords', function () {
                assert.notEqual(spanishDeck.cards[0].getName(), 'Ace of Swords');
            });

            it('last card should not be King of Coins', function () {
                assert.notEqual(spanishDeck.cards[39].getName(), 'King of Coins');
            });
        });
    });

    describe('Game', function () {

        describe('New Game', function () {

            var game;

            before(function () {
                game = new Game({});
            });

            it('should have no player', function () {
                assert.equal(game.players.length, 0);
            });
        });

        describe('Game with 2 players', function () {

            var game;

            before(function () {
                game = new Game({});
                game.addPlayer(new Player({}));
                game.addPlayer(new Player({}));
            });

            it('should have 2 players', function () {
                assert.equal(game.players.length, 2);
            });
        })
    });


}).call(this);
