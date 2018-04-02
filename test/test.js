const init = require('../lib/init');
const video = require('../lib/video/video');

global.sails = {
    log: {
        info: console.log,
        warn: console.log,
        error: console.log
    }
};

init();

setTimeout(function(){
    var media = {
      uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/big_buck_bunny_1080p.mp4',
    };
    
    video.load(media);
    setTimeout(function(){
        video.seek(2*60);
    }, 6000);
    setTimeout(function(){
        video.pause();
    }, 10000);
    setTimeout(function(){
        video.play();
    }, 12000);
    setTimeout(function(){
        video.stop();
    }, 18000);
}, 8000);