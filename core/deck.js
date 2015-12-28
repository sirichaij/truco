'use strict'

var _ = require('lodash');

var deck = function (options) {

    var self = this;

    self.cards = [];
    self.cardType = options.cardType || new require('./card-spanish')();

    self.shuffle = function () {
        self.cards = _.shuffle(self.cards);
    };

    self.getCardName = function(card) {
        return card.number.name + ' of ' + card.suit.name;
    };

    var initCards = function () {
        self.cards = self.cardType.getDeck();
    };

    initCards();
};

module.exports = deck;
