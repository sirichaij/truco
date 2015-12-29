'use strict';

var Card = function (suit, number, type) {

    if (!(this instanceof Card))
        return new Card(suit, number, type);

    var self = this;

    var getValue = function () {
        if (!type) {
            return 0;
        } else {
            return type.numbers[number].value;
        }
    }

    self.suit = suit;
    self.number = number;
    self.type = type;
    self.value = getValue();

    self.getName = function (card) {
        return self.number + '-' + self.suit;
    };


};

module.exports = Card;
