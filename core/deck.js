'use strict';

var _ = require('lodash');

var Deck = function (opt) {

    if (!(this instanceof Deck))
        return new Deck(opt);

    opt = opt || {};

    var self = this;

    var init = function () {
        self.cardType = opt.cardType;
        self.cards = opt.cardType.getDeck();
    };

    self.shuffle = function () {
        self.cards = _.shuffle(self.cards);
    };

    self.getCardName = function (card) {
        return card.number.name + ' of ' + card.suit.name;
    };

    init();
};

module.exports = Deck;
