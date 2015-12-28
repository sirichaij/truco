'use strict'

var card = function (suit, number, rank) {

    var self = this;

    self.suit = suit;
    self.number = number;
    self.rank = rank;

    self.getName = function (card) {
        return this.number.name + ' of ' + this.suit.name;
    };
};

module.exports = card;
