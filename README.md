Gladys Chromecast
=======================

This module allows you to control your Chromecast in Gladys.

### Installation

To install this module :

- Install the module in Gladys 
- Reboot Gladys 


### Usage

You can use this module in Gladys directly using the music API.

#### load

You can load any MP4/MP3/JPG file, for example : 

```javascript
gladys.modules.chromecast.video.load({
      uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/big_buck_bunny_1080p.mp4'
})
.then(() => {
    console.log('Success !');
});
```

It event works with files on your local network (ex: On your Raspberry Pi!)

#### play

```javascript
gladys.modules.chromecast.video.play()
.then(() => {
    console.log('Success !');
});
```

#### pause

```javascript
gladys.modules.chromecast.video.pause()
.then(() => {
    console.log('Success !');
});
```

#### stop

```javascript
gladys.modules.chromecast.video.stop()
.then(() => {
    console.log('Success !');
});
```

#### seek

To go at second 10 of a video, you can use the seek function

```javascript
gladys.modules.chromecast.video.seek(10)
.then(() => {
    console.log('Success !');
});
```