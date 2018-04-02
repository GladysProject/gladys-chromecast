
module.exports = function (sails) {

    const init = require('./lib/init');
    const video = require('./lib/video/video');

    gladys.on('ready', function(){
        init();
    });
      
    return {
        init, 
        video,
        music: video // so it works with the music API
    };
};