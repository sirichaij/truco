'use strict';

var _ = require('lodash');
var dateFormat = require('dateformat');

var Hand = require('./hand');
var logHistory = require('./log-history');

var Game = function (opt) {

    if (!(this instanceof Game))
        return new Game(opt);

    opt = opt || {};

    var self = this;
    self.hands = [];
    self.players = [];

    var init = function () {
        var now = new Date();
        self.id = dateFormat(new Date(), 'yyyyMMdd-hhmmss');
        self.deck = opt.deck;
        self.addPlayer(opt.player);

        self.log = opt.log || function () {};
    };

    var handFinished = function (hand) {

        self.log('Global Score: %s', self.players.map(function (player) {
            return 'Player ' + player.name + ': ' + player.score;
        }).join(' '));

        logHistory(self, hand);

        var maxScorePlayer = _.max(self.players, function (player) {
            return player.score;
        });

        if (maxScorePlayer.score >= 30) {
            self.log('Game Closed: Player %s is a winner', maxScorePlayer.name);
        } else {
            self.createNewHand();
        }
    };

    self.createNewHand = function () {

        self.deck.shuffle();

        var startIndex = Math.floor(Math.random() * self.players.length);

        var hand = new Hand({
            number: self.hands.length + 1,
            players: self.players,
            deck: self.deck,
            startIndex: startIndex,
            log: self.log
        });

        self.hands.push(hand);

        hand.start(handFinished);
    };

    self.start = function () {

        if (self.players.length < 2) {
            return false;
        } else {

            self.log('New game starts!');

            process.nextTick(function () {
                self.createNewHand(0);
            });

            return true;
        }
    };

    self.addPlayer = function (player) {
        self.players.push(player);
    };

    init();
};

module.exports = Game;
