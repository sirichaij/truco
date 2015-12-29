'use strict';

var _ = require('lodash');
var ordinal = require('ordinal-number-suffix')

var Hand = function (opt) {

    if (!(this instanceof Hand))
        return new Hand(opt);

    opt = opt || {};

    var self = this;

    var init = function () {

        self.number = opt.number;
        self.deck = _.clone(opt.deck);
        self.players = opt.players;
        self.startIndex = opt.startIndex || 0;

        self.totalPlayers = self.players.length;
        self.dealtCards = self.totalPlayers * 3;

        self.log = opt.log || _.noop;

        self.name = ordinal(self.number) + ' Hand:';
        self.messageLog = [];
    };

    self.start = function (callback) {

        callback = callback || _.noop;

        self.log(self.name);

        self.players.forEach(function (player) {
            player.cards = [];
        });

        for (var i = 0; i < self.dealtCards; i++) {

            var player = self.players[(self.startIndex + i) % self.totalPlayers];
            var card = self.deck.cards[i];

            player.addCard(card);
        }

        self.players.forEach(function (player) {
            player.logCards();
        });

        // Get Announcement from 1st player
        var firstPlayer = self.players[self.startIndex];
        var message = 'GET_ANNOUNCEMENT'
        self.log('Player %s starts', firstPlayer.name);
        self.messageLog.push({
            direction: 'OUT',
            player: firstPlayer.name,
            message: message
        });
        firstPlayer.onMessageReceived(message, function (message) {

            self.messageLog.push({
                direction: 'IN',
                player: firstPlayer.name,
                message: message
            });

            if (message == 'PASSES') {

                self.log('Player %s passes', firstPlayer.name);
                // If player 1 passed, get Announcement from player 2
                var secondPlayer = self.players[(self.startIndex + 1) % self.totalPlayers];
                var message = 'GET_ANNOUNCEMENT';
                self.messageLog.push({
                    direction: 'OUT',
                    player: secondPlayer.name,
                    message: message
                });
                secondPlayer.onMessageReceived(message, function (message) {

                    self.messageLog.push({
                        direction: 'IN',
                        player: secondPlayer.name,
                        message: message
                    });

                    if (message == 'PASSES') {

                        self.log('Player %s passes', secondPlayer.name);

                    } else if (message == 'CALLS_ENVIDO') {

                        self.log('Player %s calls Envido', secondPlayer.name);
                        // If player 2 called envido, get answer from player 1
                        var thirdPlayer = self.players[(self.startIndex + 2) % self.totalPlayers];
                        var message = 'CALLS_ENVIDO';
                        self.messageLog.push({
                            direction: 'OUT',
                            player: thirdPlayer.name,
                            message: message
                        });
                        thirdPlayer.onMessageReceived(message, function (message) {

                            self.messageLog.push({
                                direction: 'IN',
                                player: thirdPlayer.name,
                                message: message
                            });

                            if (message == 'WANTS') {

                                self.log('Player %s answers I want', thirdPlayer.name);

                                var secondPlayerPoints = secondPlayer.getCardPoints();
                                var thirdPlayerPoints = thirdPlayer.getCardPoints();

                                // Player 2 show cards
                                self.log('Player %s Announces Score of: %s', secondPlayer.name, secondPlayerPoints);

                                if (secondPlayerPoints > thirdPlayerPoints) {

                                    self.log('Player %s announces that he has been defeated ', thirdPlayerPoints.name);
                                    self.winner = secondPlayer;
                                    self.winPoint = 2;
                                    secondPlayer.addScore(2);

                                } else if (secondPlayerPoints <= thirdPlayerPoints) {

                                    self.log('Player %s Announces Score of: %s', thirdPlayer.name, thirdPlayerPoints);
                                    self.winner = thirdPlayer;
                                    self.winPoint = 2;
                                    thirdPlayer.addScore(2);
                                }

                            } else if (message == 'NOT_WANTS') {

                                self.log('Player %s doesn\'t want', thirdPlayer.name);
                                // Player 2 wins
                                self.winner = secondPlayer;
                                self.winPoint = 1;
                                secondPlayer.addScore(1);
                            }
                        });
                    }
                });

            } else if (message == 'CALLS_ENVIDO') {

                self.log('Player %s calls Envido', firstPlayer.name);
                // If player 1 called envido, get answer from player 2
                var secondPlayer = self.players[(self.startIndex + 1) % self.totalPlayers];
                var message = 'CALLS_ENVIDO';
                self.messageLog.push({
                    direction: 'OUT',
                    player: secondPlayer.name,
                    message: message
                });
                secondPlayer.onMessageReceived(message, function (message) {

                    self.messageLog.push({
                        direction: 'IN',
                        player: secondPlayer.name,
                        message: message
                    });

                    if (message == 'WANTS') {

                        self.log('Player %s Answers I want', secondPlayer.name);

                        var firstPlayerPoints = firstPlayer.getCardPoints();
                        var secondPlayerPoints = secondPlayer.getCardPoints();

                        // Player 1 show cards
                        self.log('Player %s Announces Score of: %s', firstPlayer.name, firstPlayerPoints);

                        if (firstPlayerPoints >= secondPlayerPoints) {

                            self.log('Player %s announces that he has been defeated ', secondPlayer.name);
                            self.winner = firstPlayer;
                            self.winPoint = 2;
                            firstPlayer.addScore(2);

                        } else if (firstPlayerPoints < secondPlayerPoints) {

                            self.log('Player %s Announces Score of: %s', secondPlayer.name, secondPlayerPoints);
                            self.winner = secondPlayer;
                            self.winPoint = 2;
                            secondPlayer.addScore(2);
                        }

                    } else if (message == 'NOT_WANTS') {

                        self.log('Player %s doesn\'t want', secondPlayer.name);
                        self.winner = firstPlayer;
                        self.winPoint = 1;
                        firstPlayer.addScore(1);
                        // Player 1 wins
                    }
                });
            }
        });

        callback(self);
    };

    init();
};

module.exports = Hand;
