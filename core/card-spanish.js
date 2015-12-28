'use restrick'

var Card = require('./card');

var cardType = function () {

    var self = this;

    this.name = 'Spanish';

    var suits = [{
        code: 'S',
        name: 'Swords'
            }, {
        code: 'B',
        name: 'Batons'
            }, {
        code: 'CU',
        name: 'Cups'
            }, {
        code: 'CO',
        name: 'Coins'
            }];

    var numbers = [{
        code: '1',
        name: 'Ace',
        value: 1
            }, {
        code: '2',
        name: '2',
        value: 2
            }, {
        code: '3',
        name: '3',
        value: 3
            }, {
        code: '4',
        name: '4',
        value: 4
            }, {
        code: '5',
        name: '5',
        value: 5
            }, {
        code: '6',
        name: '6',
        value: 6
            }, {
        code: '7',
        name: '7',
        value: 7
            }, {
        code: '10',
        name: 'Valet',
        value: 0
            }, {
        code: '11',
        name: 'Horse',
        value: 0
            }, {
        code: '12',
        name: 'King',
        value: 0
            }];

    this.getDeck = function () {

        return [
            new Card(suits[0], numbers[0], 1),
            new Card(suits[0], numbers[1], 1),
            new Card(suits[0], numbers[2], 1),
            new Card(suits[0], numbers[3], 1),
            new Card(suits[0], numbers[4], 1),
            new Card(suits[0], numbers[5], 1),
            new Card(suits[0], numbers[6], 1),
            new Card(suits[0], numbers[7], 1),
            new Card(suits[0], numbers[8], 1),
            new Card(suits[0], numbers[9], 1),
            new Card(suits[1], numbers[0], 1),
            new Card(suits[1], numbers[1], 1),
            new Card(suits[1], numbers[2], 1),
            new Card(suits[1], numbers[3], 1),
            new Card(suits[1], numbers[4], 1),
            new Card(suits[1], numbers[5], 1),
            new Card(suits[1], numbers[6], 1),
            new Card(suits[1], numbers[7], 1),
            new Card(suits[1], numbers[8], 1),
            new Card(suits[1], numbers[9], 1),
            new Card(suits[2], numbers[0], 1),
            new Card(suits[2], numbers[1], 1),
            new Card(suits[2], numbers[2], 1),
            new Card(suits[2], numbers[3], 1),
            new Card(suits[2], numbers[4], 1),
            new Card(suits[2], numbers[5], 1),
            new Card(suits[2], numbers[6], 1),
            new Card(suits[2], numbers[7], 1),
            new Card(suits[2], numbers[8], 1),
            new Card(suits[2], numbers[9], 1),
            new Card(suits[3], numbers[0], 1),
            new Card(suits[3], numbers[1], 1),
            new Card(suits[3], numbers[2], 1),
            new Card(suits[3], numbers[3], 1),
            new Card(suits[3], numbers[4], 1),
            new Card(suits[3], numbers[5], 1),
            new Card(suits[3], numbers[6], 1),
            new Card(suits[3], numbers[7], 1),
            new Card(suits[3], numbers[8], 1),
            new Card(suits[3], numbers[9], 1)
        ];
    }
}

module.exports = cardType;
