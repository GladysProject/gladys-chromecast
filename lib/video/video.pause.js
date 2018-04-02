const shared = require('../shared');
const Promise = require('bluebird');

module.exports = function pause(){
   return new Promise(function(resolve, reject){
        if(shared.player === null){
            sails.log.error('Chromecast : Chromecast is not ready yet, or not connected.');
            return reject('CHROMECAST_UNAVAILABLE');
        }
        shared.player.pause(function(err, status){
            if(err) {
                sails.log.error('Chromecast : Error while pausing');
                return reject(err);
            }

            sails.log.info('Chromecast : media paused playerState=%s', status.playerState);
            resolve(status);
        });
   });
}