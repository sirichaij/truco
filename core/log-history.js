'use strict';

var fs = require('fs');

var LOG_DIRECTORY = './history';

var logHistory = function (game, hand) {

    //console.log(game.id);

    if (!fs.existsSync(LOG_DIRECTORY)) {
        fs.mkdirSync(LOG_DIRECTORY);
    }

    var logFileName = LOG_DIRECTORY + '/' + game.id + '.log';

    var log = hand.name + '\n';
    hand.players.forEach(function (player) {
        log += player.getCardsLog() + '\n';
    });
    log += 'Winner: ' + (hand.winner ? hand.winner.name + ' -> ' + hand.winPoint + ' point(s)' : '-') + '\n';

    fs.appendFile(logFileName, log, function (err) {

    });
};

module.exports = logHistory;
