'use restrick';

var Card = require('./card');

var SpanishCard = function () {

    if (!(this instanceof SpanishCard))
        return new SpanishCard();

    var self = this;

    self.name = 'Spanish';

    self.suits = {
        S: {
            code: 'S',
            name: 'Swords'
        },
        B: {
            code: 'B',
            name: 'Batons'
        },
        CU: {
            code: 'CU',
            name: 'Cups'
        },
        CO: {
            code: 'CO',
            name: 'Coins'
        }
    };

    self.numbers = {
        '1': {
            code: '1',
            name: 'Ace',
            value: 1
        },
        '2': {
            code: '2',
            name: '2',
            value: 2
        },
        '3': {
            code: '3',
            name: '3',
            value: 3
        },
        '4': {
            code: '4',
            name: '4',
            value: 4
        },
        '5': {
            code: '5',
            name: '5',
            value: 5
        },
        '6': {
            code: '6',
            name: '6',
            value: 6
        },
        '7': {
            code: '7',
            name: '7',
            value: 7
        },
        '10': {
            code: '10',
            name: 'Valet',
            value: 0
        },
        '11': {
            code: '11',
            name: 'Horse',
            value: 0
        },
        '12': {
            code: '12',
            name: 'King',
            value: 0
        }
    };

    self.getDeck = function () {

        return [
            Card('S', '1', self),
            Card('S', '2', self),
            Card('S', '3', self),
            Card('S', '4', self),
            Card('S', '5', self),
            Card('S', '6', self),
            Card('S', '7', self),
            Card('S', '10', self),
            Card('S', '11', self),
            Card('S', '12', self),
            Card('B', '1', self),
            Card('B', '2', self),
            Card('B', '3', self),
            Card('B', '4', self),
            Card('B', '5', self),
            Card('B', '6', self),
            Card('B', '7', self),
            Card('B', '10', self),
            Card('B', '11', self),
            Card('B', '12', self),
            Card('CU', '1', self),
            Card('CU', '2', self),
            Card('CU', '3', self),
            Card('CU', '4', self),
            Card('CU', '5', self),
            Card('CU', '6', self),
            Card('CU', '7', self),
            Card('CU', '10', self),
            Card('CU', '11', self),
            Card('CU', '12', self),
            Card('CO', '1', self),
            Card('CO', '2', self),
            Card('CO', '3', self),
            Card('CO', '4', self),
            Card('CO', '5', self),
            Card('CO', '6', self),
            Card('CO', '7', self),
            Card('CO', '10', self),
            Card('CO', '11', self),
            Card('CO', '12', self)
        ];
    }
}

module.exports = SpanishCard;
