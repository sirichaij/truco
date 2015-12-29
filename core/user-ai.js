'use strict';

var AIUser = function () {

    if (!(this instanceof AIUser))
        return new AIUser();

    var self = this;
    var TARGET_POINT = 27;

    self.handleMessage = function (player, message, callback) {
        //console.log(message);
        if (message == 'GET_ANNOUNCEMENT') {
            if (player.getCardPoints() >= TARGET_POINT) {
                callback('CALLS_ENVIDO');
            } else {
                callback('PASSES')
            }
        } else if (message == 'CALLS_ENVIDO') {
            if (player.getCardPoints() >= TARGET_POINT) {
                callback('WANTS');
            } else {
                callback('NOT_WANTS');
            }
        }
    }
};

module.exports = AIUser;
