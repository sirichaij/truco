(function () {

    var _ = require('lodash');

    var Deck = require('../core/deck');
    var SpanishCard = require('../core/card-spanish');

    var AIUser = require('../core/user-ai');
    var Card = require('../core/card');
    var Hand = require('../core/hand');

    var Game = require('../core/game');
    var Player = require('../core/player');

    var assert = require('assert');

    describe('Deck', function () {

        describe('New Spanish Deck', function () {

            var spanishDeck;

            before(function () {
                spanishDeck = Deck({
                    cardType: SpanishCard()
                });
            });

            it('should have 40 cards', function () {
                assert.equal(spanishDeck.cards.length, 40);
            });

            it('should first card be 1-S', function () {
                assert.equal(spanishDeck.cards[0].getName(), '1-S');
            });

            it('should last card be 12-CO', function () {
                assert.equal(spanishDeck.cards[39].getName(), '12-CO');
            });

            it('should card 1-S value be 1', function () {
                assert.equal(spanishDeck.cards[0].value, 1);
            });

            it('should card 12-CO value be 0', function () {
                assert.equal(spanishDeck.cards[39].value, 0);
            });
        });

        describe('Deck after Shuffled', function () {

            var spanishDeck;

            before(function () {
                spanishDeck = Deck({
                    cardType: SpanishCard()
                });
                spanishDeck.shuffle();
            });

            it('should have 40 cards as before', function () {
                assert.equal(spanishDeck.cards.length, 40);
            });

            it('first card shoud not be 1-S', function () {
                assert.notEqual(spanishDeck.cards[0].getName(), '1-S');
            });

            it('last card should not be King of Coins', function () {
                assert.notEqual(spanishDeck.cards[39].getName(), '12-CO');
            });
        });
    });

    describe('Player', function () {

        var spanishCard = SpanishCard();

        describe('New player', function () {

            var player;
            before(function () {
                player = Player('A');
            });

            it('should named "A"', function () {
                assert.equal(player.name, 'A');
            });

            it('should have score 0', function () {
                assert.equal(player.score, 0);
            });

            it('should have no card', function () {
                assert.equal(player.cards.length, 0);
            });

            it('should have 0 point', function () {
                assert.equal(player.getCardPoints(), 0);
            });
        });

        describe('Player with no suit pair cards (1-S, 2-B, 3-CU)', function () {

            var player;
            before(function () {

                player = Player('A');

                player.addCard(Card('S', '1', spanishCard));
                player.addCard(Card('B', '2', spanishCard));
                player.addCard(Card('CU', '3', spanishCard));
            });

            it('should have 3 cards', function () {
                assert.equal(player.cards.length, 3);
            });

            it('should have 5 points', function () {
                assert.equal(player.getCardPoints(), 5);
            });
        });

        describe('Player with no suit pair cards (1-S, 2-B, 10-CU)', function () {

            var player;
            before(function () {

                player = Player('A');

                player.addCard(Card('S', '1', spanishCard));
                player.addCard(Card('B', '2', spanishCard));
                player.addCard(Card('CU', '10', spanishCard));
            });

            it('should have 3 points', function () {
                assert.equal(player.getCardPoints(), 3);
            });
        });

        describe('Player with 2 cards of same suit (1-S, 2-S, 3-CU)', function () {

            var player;
            before(function () {

                player = Player('A');

                player.addCard(Card('S', '1', spanishCard));
                player.addCard(Card('S', '2', spanishCard));
                player.addCard(Card('CU', '3', spanishCard));
            });

            it('should have 23 points', function () {
                assert.equal(player.getCardPoints(), 23);
            });
        });

        describe('Player with a 3 cards of same suit (1-S, 2-S, 3-S)', function () {

            var player;
            before(function () {

                player = Player('A');

                player.addCard(Card('S', '1', spanishCard));
                player.addCard(Card('S', '2', spanishCard));
                player.addCard(Card('S', '3', spanishCard));
            });

            it('should have 25 points', function () {
                assert.equal(player.getCardPoints(), 25);
            });
        });

        describe('Player with a 3 cards of same suit (1-S, 2-S, 10-S)', function () {

            var player;
            before(function () {

                player = Player('A');

                player.addCard(Card('S', '1', spanishCard));
                player.addCard(Card('S', '2', spanishCard));
                player.addCard(Card('S', '10', spanishCard));
            });

            it('should have 23 points', function () {
                assert.equal(player.getCardPoints(), 23);
            });
        });
    });

    describe('Hand & AI User', function () {

        var spanishCard = SpanishCard();
        var hand;

        describe('New Hand with 2 players', function () {

            before(function () {

                var deck = Deck({
                    cardType: SpanishCard()
                });

                var playerA = Player('A', AIUser());
                var playerB = Player('B', AIUser());

                hand = new Hand({
                    number: 1,
                    deck: deck,
                    players: [playerA, playerB],
                    startPlayer: 0
                });

                hand.start();
            });

            it('should have 40 cards', function () {
                assert.equal(hand.deck.cards.length, 40);
            });

            it('should have 2 players', function () {
                assert.equal(hand.players.length, 2);
            });

            it('should have 3 cards for both players', function () {
                assert.equal(hand.players[0].cards.length, 3);
                assert.equal(hand.players[1].cards.length, 3);
            });

            it('should player A has 23 points', function () {
                assert.equal(hand.players[0].getCardPoints(), 28);
            });

            it('should player B has 30 points', function () {
                assert.equal(hand.players[1].getCardPoints(), 30);
            });
        });

        describe('Player A call Envito, Player B doesn\'t want', function () {

            var playerA;
            var playerB;

            before(function () {

                var deck = Deck({
                    cardType: SpanishCard()
                });

                deck.cards = [
                    Card('S', '3', spanishCard),
                    Card('S', '1', spanishCard),
                    Card('S', '4', spanishCard),
                    Card('S', '2', spanishCard),
                    Card('B', '1', spanishCard),
                    Card('B', '2', spanishCard)
                ];

                playerA = Player('A', AIUser());

                playerB = Player('B', AIUser());

                hand = Hand({
                    number: 1,
                    deck: deck,
                    players: [playerA, playerB],
                    startPlayer: 0
                });

                hand.start();
                //console.log(hand.messageLog);
            });

            it('should Player A has 27 card points', function () {
                assert.equal(playerA.getCardPoints(), 27);
            });

            it('should Player B has 23 card points', function () {
                assert.equal(playerB.getCardPoints(), 23);
            });

            it('should Step 1 get announcement from Player A', function () {
                var log = hand.messageLog[0];
                assert.equal(log.direction, 'OUT');
                assert.equal(log.player, 'A');
                assert.equal(log.message, 'GET_ANNOUNCEMENT');
            });

            it('should Step 2 player A call Envito', function () {
                var log = hand.messageLog[1];
                assert.equal(log.direction, 'IN');
                assert.equal(log.player, 'A');
                assert.equal(log.message, 'CALLS_ENVIDO');
            });

            it('should Step 3 call Envito to Player B', function () {
                var log = hand.messageLog[2];
                assert.equal(log.direction, 'OUT');
                assert.equal(log.player, 'B');
                assert.equal(log.message, 'CALLS_ENVIDO');
            });

            it('should Step 4 player B doesn\' want', function () {
                var log = hand.messageLog[3];
                assert.equal(log.direction, 'IN');
                assert.equal(log.player, 'B');
                assert.equal(log.message, 'NOT_WANTS');
            });

            it('should Player A score be 1 and Player B score be 0', function () {
                assert.equal(playerA.score, 1);
                assert.equal(playerB.score, 0);
            });
        });

        describe('Player A call Envito, Player B wants', function () {

            var playerA;
            var playerB;

            before(function () {

                var deck = Deck({
                    cardType: SpanishCard()
                });

                deck.cards = [
                    Card('S', '3', spanishCard),
                    Card('CU', '3', spanishCard),
                    Card('S', '4', spanishCard),
                    Card('CU', '4', spanishCard),
                    Card('B', '1', spanishCard),
                    Card('B', '2', spanishCard)
                ];

                playerA = Player('A', AIUser());

                playerB = Player('B', AIUser());

                hand = Hand({
                    number: 1,
                    deck: deck,
                    players: [playerA, playerB],
                    startPlayer: 0
                });

                hand.start();
                //console.log(hand.messageLog);
            });

            it('should Player A has 27 card points', function () {
                assert.equal(playerA.getCardPoints(), 27);
            });

            it('should Player B has 27 card points', function () {
                assert.equal(playerB.getCardPoints(), 27);
            });

            it('should Step 1 get announcement from Player A', function () {
                var log = hand.messageLog[0];
                assert.equal(log.direction, 'OUT');
                assert.equal(log.player, 'A');
                assert.equal(log.message, 'GET_ANNOUNCEMENT');
            });

            it('should Step 2 player A call Envito', function () {
                var log = hand.messageLog[1];
                assert.equal(log.direction, 'IN');
                assert.equal(log.player, 'A');
                assert.equal(log.message, 'CALLS_ENVIDO');
            });

            it('should Step 3 call Envito to Player B', function () {
                var log = hand.messageLog[2];
                assert.equal(log.direction, 'OUT');
                assert.equal(log.player, 'B');
                assert.equal(log.message, 'CALLS_ENVIDO');
            });

            it('should Step 4 player B wants', function () {
                var log = hand.messageLog[3];
                assert.equal(log.direction, 'IN');
                assert.equal(log.player, 'B');
                assert.equal(log.message, 'WANTS');
            });

            it('should Player A score be 2 and Player B score be 0', function () {
                assert.equal(playerA.score, 2);
                assert.equal(playerB.score, 0);
            });
        });

        describe('Player A passes, Player B calls Envito', function () {

            var playerA;
            var playerB;

            before(function () {

                var deck = Deck({
                    cardType: SpanishCard()
                });

                deck.cards = [
                    Card('S', '1', spanishCard),
                    Card('S', '2', spanishCard),
                    Card('B', '2', spanishCard),
                    Card('B', '5', spanishCard),
                    Card('CU', '3', spanishCard),
                    Card('B', '6', spanishCard)
                ];

                playerA = Player('A', AIUser());

                playerB = Player('B', AIUser());

                hand = Hand({
                    number: 1,
                    deck: deck,
                    players: [playerA, playerB],
                    startPlayer: 0
                });

                hand.start();
                //console.log(hand.messageLog);
            });

            it('should Player A has 5 card points', function () {
                assert.equal(playerA.getCardPoints(), 5);
            });

            it('should Player B has 31 card points', function () {
                assert.equal(playerB.getCardPoints(), 31);
            });

            it('should Step 1 get announcement from Player A', function () {
                var log = hand.messageLog[0];
                assert.equal(log.direction, 'OUT');
                assert.equal(log.player, 'A');
                assert.equal(log.message, 'GET_ANNOUNCEMENT');
            });

            it('should Step 2 player A passes', function () {
                var log = hand.messageLog[1];
                assert.equal(log.direction, 'IN');
                assert.equal(log.player, 'A');
                assert.equal(log.message, 'PASSES');
            });

            it('should Step 3 get announcement from Player B', function () {
                var log = hand.messageLog[2];
                assert.equal(log.direction, 'OUT');
                assert.equal(log.player, 'B');
                assert.equal(log.message, 'GET_ANNOUNCEMENT');
            });

            it('should Step 4 player B call Envito', function () {
                var log = hand.messageLog[3];
                assert.equal(log.direction, 'IN');
                assert.equal(log.player, 'B');
                assert.equal(log.message, 'CALLS_ENVIDO');
            });

            it('should Step 5 call Envito to Player A', function () {
                var log = hand.messageLog[4];
                assert.equal(log.direction, 'OUT');
                assert.equal(log.player, 'A');
                assert.equal(log.message, 'CALLS_ENVIDO');
            });

            it('should Step 6 player A doesn\' want', function () {
                var log = hand.messageLog[5];
                assert.equal(log.direction, 'IN');
                assert.equal(log.player, 'A');
                assert.equal(log.message, 'NOT_WANTS');
            });

            it('should Player A score be 0 and Player B score be 1', function () {
                assert.equal(playerA.score, 0);
                assert.equal(playerB.score, 1);
            });
        });
    });

    /*
                describe('Game', function () {

                    describe('New Game', function () {

                        var game;

                        before(function () {

                            var playerA = Player({
                                name: 'A',
                                user: new AIUser()
                            });

                            var playerB = Player({
                                name: 'B',
                                user: new AIUser()
                            });

                            game = new Game({
                                player: playerA
                            });
                        });

                        it('should have 1 player', function () {
                            assert.equal(game.players.length, 1);
                        });

                        it('should not be able to start', function () {
                            assert.equal(game.start(), false);
                        });

                    });

                    describe('Game with 2 players', function () {

                        var game;

                        before(function () {

                            var playerA = Player({
                                name: 'A',
                                user: new AIUser()
                            });

                            var playerB = Player({
                                name: 'B',
                                user: new AIUser()
                            });

                            var deck = Deck({
                                cardType: SpanishCard()
                            });

                            game = new Game({
                                player: playerA,
                                deck: deck
                            });

                            game.addPlayer(playerB);
                        });

                        it('should have 2 players', function () {
                            assert.equal(game.players.length, 2);
                        });

                        it('should sum all players\' score be 0', function () {
                            assert.equal(_.sum(game.players, function (player) {
                                return player.score;
                            }), 0);
                        });

                        it('should be able to start', function () {
                            assert.equal(game.start(), true);
                        });
                    });

                    describe('Game started with 2 players', function () {

                        var game;

                        before(function () {

                            var deck = Deck({
                                cardType: SpanishCard()
                            });

                            game = new Game({
                                player: playerA,
                                deck: deck
                            });

                            game.addPlayer(playerB);
                        });
                    });
                });

            */

}).call(this);
