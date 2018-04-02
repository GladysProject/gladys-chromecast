const shared = require('../shared');
const Promise = require('bluebird');
const load = require('./video.load');

module.exports = function play(params){
   
    // if the user is passing an uri, we need to call the function load
   if(params && params.uri) return load(params);

   return new Promise(function(resolve, reject){
        if(shared.player === null){
            sails.log.error('Chromecast : Chromecast is not ready yet, or not connected.');
            return reject('CHROMECAST_UNAVAILABLE');
        }
        shared.player.play(function(err, status){
            if(err) {
                sails.log.error('Chromecast : Error while playing');
                return reject(err);
            }

            sails.log.info('Chromecast : media playing playerState=%s', status.playerState);
            resolve(status);
        });
   });
}