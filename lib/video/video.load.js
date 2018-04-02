const shared = require('../shared');
const Promise = require('bluebird');

module.exports = function load(params){
   return new Promise(function(resolve, reject){
        if(shared.player === null){
            sails.log.error('Chromecast : Chromecast is not ready yet, or not connected.');
            return reject('CHROMECAST_UNAVAILABLE');
        }
        if(!params.hasOwnProperty('uri')){
            sails.log.error('Chromecast : load : Wrong parameters. You must pass an "uri" attribute.');
            return reject('MISSING_PARAMETERS');
        }
        
        var media = {
            contentId: params.uri
        };
        
        shared.player.load(media, { autoplay: true }, function(err, status){
            if(err) {
                sails.log.error('Chromecast : Error while loading');
                return reject(err);
            }

            sails.log.info('Chromecast : media loaded playerState=%s', status.playerState);
            resolve(status);
        });
   });
}