const Client = require('castv2-client').Client;
const DefaultMediaReceiver = require('castv2-client').DefaultMediaReceiver;
const mdns = require('mdns');
const shared = require('./shared');

module.exports = function init() {
    const browser = mdns.createBrowser(mdns.tcp('googlecast'));

    browser.on('serviceUp', function(service) {
        console.log('found device "%s" at %s:%d', service.name, service.addresses[0], service.port);
        onDeviceUp(service);
        browser.stop();
    });  

    browser.start();
}

function onDeviceUp(service) {

  var host = service.addresses[0];

  var newDevice = {
      device: {
          name: `Chromecast`,
          protocol: `wifi`,
          service: `chromecast`,
          identifier: service.name
      },
      types: [{
          name: 'Music',
          type: 'music',
          identifier: 'music',
          sensor: false,
          min: 0,
          max: 0
      },
      {
        name: 'Video',
        type: 'music',
        identifier: 'music',
        sensor: false,
        min: 0,
        max: 0
      }]
  };

  gladys.device.create(newDevice)
    .then(() => {

      var client = new Client();
    
      client.connect(host, function() {
          
        sails.log.info('Chromecast : connected : launching app ...');
    
        client.launch(DefaultMediaReceiver, function(err, player) {
          if(err) return sails.log.error('Chromecast : unable to launch app');
          
          shared.player = player;
          
          player.on('status', function(status) {
              sails.log.info('Chromecast : status broadcast playerState=%s', status.playerState);
          });

          sails.log.info('Chromecast : App launched with success');
        });   
      });
    
      client.on('error', function(err) {
        sails.log.error('Chromecast : Error: %s', err.message);
        client.close();
      });
    });
  }