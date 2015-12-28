'use strict'

var game = function () {

    var self = this;

    self.hands = [];
    self.players = [];

    self.addPlayer = function (player) {
        self.players.push(player);
    };
}

module.exports = game;
