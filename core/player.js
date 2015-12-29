'use strict';

var _ = require('lodash');

var Player = function (name, user, opt) {

    if (!(this instanceof Player))
        return new Player(name, user, opt);

    opt = opt || {};

    var self = this;

    var init = function () {
        self.score = 0;
        self.cards = [];
        self.name = name;
        self.user = user;

        self.log = opt.log || _.noop;
    };

    self.addCard = function (card) {
        self.cards.push(card);
    };

    self.getCardPoints = function () {

        if (self.cards.length != 3) {
            return 0;
        } else {

            //self.log(self.cards);

            var groups = _.groupBy(self.cards, function (card) {
                return card.suit;
            });

            //self.log(groups);

            var pairGroup = _.find(groups, function (group) {
                //self.log(group);
                return group.length > 1;
            });

            if (pairGroup) {

                var sortedCard = _.sortBy(pairGroup, function (card) {
                    return -card.value;
                });

                return sortedCard[0].value + sortedCard[1].value + 20;

            } else {

                var sortedCard = _.sortBy(self.cards, function (card) {
                    return -card.value;
                });

                //self.log(sortedCard);

                return sortedCard[0].value + sortedCard[1].value;
            }
        }
    };

    self.onMessageReceived = function (message, callback) {
        self.user.handleMessage(self, message, callback);
    };

    self.addScore = function (score) {
        self.log('Player %s Wins hand and gets %s on global score.', self.name, score > 1 ? score + ' points' : score + ' point')
        self.score += score;
    };

    self.logCards = function () {
        self.log(self.getCardsLog());
    };

    self.getCardsLog = function () {
        return 'Player' + self.name + ': ' +
            self.cards.map(function (card) {
                return card.number + '-' + card.suit;
            }).join(' ') +
            ' = ' + self.getCardPoints();
    };

    init();
}

module.exports = Player;
