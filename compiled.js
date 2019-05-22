function linearMove(a,b,s) {
  if(Math.abs(a-b)<=s)return b;
  if(a>b)return a-s;
  if(a<b)return a+s;
}

function angleBetween(a, b, signed) {
  a = (a % (Math.PI*2)) + Math.PI*2;
  b = (b % (Math.PI*2)) + Math.PI*2;
  var negate = a < b;
  var dif = Math.abs(a-b);
  if(dif>Math.PI) {
    dif = Math.PI*2-dif;
    negate = !negate;
  }
  if(negate && signed) dif = -dif;
  return dif;
}

function fakeShaderTest(canvas, game) {
  var posX = game.player.x-game.camera.x-canvas.width/2;
  var posY = game.player.y-game.camera.y+canvas.height/2;
  canvas.drawImage(canvas.canvas, posX,posY,10,10,100,100,100,100);
  return;
  var imageData = canvas.getImageData(0,0,canvas.width,canvas.height);
  var data = imageData.data;
  var originalData = data.slice();
  // // Loop over each pixel and invert the color.
  // for (var i = 0, n = pix.length; i < n; i += 4) {
  //   pix[i  ] = 255 - pix[i  ]; // red
  //   pix[i+1] = 255 - pix[i+1]; // green
  //   pix[i+2] = 255 - pix[i+2]; // blue
  //   // i+3 is alpha (the fourth element)
  // }
  var circleRadius = 50+ Math.cos(game.driver.frameCount*Math.PI/15) * 50;
  var circleWidth = circleRadius*2;
  var circleHeight = circleRadius*2;
  var posX = game.player.x-game.camera.x-canvas.width/2-100;
  var posY = game.player.y-game.camera.y+canvas.height/2-100;
  var centerX = circleWidth/2;
  var centerY = circleHeight/2;
  var canvasWidth = canvas.width;
  var ra = Math.cos(game.driver.frameCount*Math.PI/20)/2+.5;
  for(var i=0;i<circleWidth;i++) {
    for(var j=0;j<circleHeight;j++) {
      var dx = i - centerX;
      var dy = j - centerY;
      var tx = Math.floor(i + centerX+posX);
      var ty = Math.floor(j + centerY+posY);
      var r = Math.sqrt(dx*dx+dy*dy);
      if(r>circleRadius||r<circleRadius/2)continue;
      var nx = Math.floor(dx * ra + centerX+posX);
      var ny = Math.floor(dy * ra + centerY+posY);
      var ti = (tx + ty * canvasWidth) * 4;
      var ni = (nx + ny * canvasWidth) * 4;
      data[ti] = originalData[ni];
      data[ti+1] = originalData[ni+1];
      data[ti+2] = originalData[ni+2];
      data[ti+3] = originalData[ni+3];
    }
  }

  // Draw the ImageData at the given (x,y) coordinates.
  canvas.putImageData(imageData, 0,0);
}


function connectControls(controls, obj) {
  var result = {};
  for(var i in controls) {
    result[i] = {};
    for(var j in controls[i]) {
      result[i][j] = controls[i][j].bind(obj);
    }
  }
  return result;
}

function psuedoRandom(x,y,ii,jj) {
  // var xi = x + ii;
  // var yi = y + jj;
  // xi = Math.floor(xi) % 100;
  // yi = Math.floor(yi) % 100;
  // return psuedoRandom.grid[yi][xi];
  var seed = x*8746295+y*2193857+ii*1933857+jj*3855716;
  seed += (x+1)*(y+1)*(ii+1)*(jj+1)*1231230;
  // seed += x*x*20+y*y*43+ii*ii*110+jj*jj*234;
  var r = seed * 16807 % 2147483647;
  // r = r * 16807 % 2147483647;
  // r = r * 16807 % 2147483647;
  return (r-1)/2147483647;
}
function setUpRandomGrid(w,h) {
  var randoms = [];
  for(var j=0;j<h;j++) {
    randoms[j]=[];
    for(var i=0;i<w;i++) {
      randoms[j][i] = Math.random();
    }
  }
  return randoms;
}
psuedoRandom.grid = setUpRandomGrid(100,100);

// Expecting rectangle object. Don't pass weird shit ok? ok
function rectangleCollision(rect1, rect2) {
  if(rect1.x <= rect2.x + rect2.w &&
    rect1.x + rect1.w >= rect2.x &&
    rect1.y <= rect2.y + rect2.h &&
    rect1.h + rect1.y >= rect2.y) {
      return true;
    } else {
      return false;
    }
}

function pointInRect(x,y, rect) {
  return x >= rect.x && x <= rect.x+rect.w && y >= rect.y && y <= rect.y+rect.h;
}

function rectangleCollisionAtTopOfEnemy(rect1, rect2) {
  if(rect1.y + rect1.h == 0) {
    return true;
  } else {
    return false;
  }
}

function distanceBetweenEntities(a,b) {
  var dx = a.x-b.x;
  var dy = a.y-b.y;
  var r = Math.sqrt(dx*dx+dy*dy);
  return r;
}
function circleMove(direction,distance){
  return [circleMoveX(direction,distance),circleMoveY(direction,distance)];
}
function circleMoveX(direction,distance){
  return Math.cos(direction)*distance;
}
function circleMoveY(direction,distance){
  return Math.sin(direction)*distance;
}
function toDegrees(rad){
  return rad * (180 / Math.PI);
}
function toRadians(deg){
  return deg * (Math.PI / 180);
}
function pointAdd(pointA,pointB){
  return [pointA[0]+pointB[0],pointA[1]+pointB[1]];
}
function constrain(value,min,max){
  value = (value > max) ? max : value;
  value = (value < min) ? min : value;
  return value;
}
// class Random {
//   constructor(seed) {
//     this.seed = seed % 2147483647;
//     if (this.seed <= 0) this.seed += 2147483646;
//     this.startSeed = this.seed;    
//   }
//   reset() {
//     this.seed = this.startSeed;
//   }
//   next() {
//     return this.seed = this.seed * 16807 % 2147483647;
//   }
//   random() {
//     return (this.next() - 1) / 2147483646;
//   }
// }

// var PSEUDORANDOMIZER = new Random(18923412384291);
class Animation2 {
  constructor(time, animate, callback) {
    this.time = time;
    this.animate = animate;
    this.callback = callback;
  }
  update(dt, frameCount) {
    this.time -= 1;
    if(this.time <=0) {
      this.callback(dt, frameCount);
    }
    else {
      this.animate(dt, frameCount);
    }
  }
}
var SOUNDMAP = {};
var LEVEL_CREATION_FUNCTIONS = [];
var PLAYER_ABILITIES = [function(player){},function(player) {player.wallJumps = true;}, function(player) {player.maxJumps = 2; player.jumpCount = 1;}];

var WORLDTYPE = 0;

function changeWorldType(worldType) {
  LEVEL_CREATION_FUNCTIONS[LEVEL_CREATION_FUNCTIONS.length-1].isFinalInWorld=true;
  WORLDTYPE = worldType;
}

function addLevel(func) {
  func.worldType = WORLDTYPE;
  LEVEL_CREATION_FUNCTIONS.push(func);
}

function createLevels() {
  var supportedChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var nameSpace = {};
  for(var i = 0; i < supportedChars.length; i += 1) {
    nameSpace[supportedChars[i]] = i + 10;
  }
  var levels = [
  ];
  for(var i = 0; i < LEVEL_CREATION_FUNCTIONS.length; i += 1) {
    var creator = LEVEL_CREATION_FUNCTIONS[i];
    var level = creator(nameSpace);
    level.worldType = creator.worldType;
    level.isFinalInWorld = creator.isFinalInWorld;
    levels.push(level);
  }
  return levels;
}


/*
********************************************************************************
**************************** BLANK LEVEL TEMPLATE ******************************
********************************************************************************

addLevel( function(nameSpace) {
  {

    retun {
        name: "title",
        grid: [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        ]
    };

  }
});

*/var BLOCKS = [];

function drawEntity(canvas, x,y,width,height, world,ii,jj) {
  canvas.fillStyle = 'rgba(50,0,50,.5)';
  canvas.fillRect(x,y,width,height);
  this.drawer.x=x+width/2;
  this.drawer.y=y+height;
  this.drawer.draw(canvas);
}

function addBlock(b) {
  b.id = BLOCKS.length;
  BLOCKS.push(b);
}

function createBlocks() {
  var map = [];
  for(var i=0;i<BLOCKS.length; i+= 1) {
    var block = BLOCKS[i]();
    block.id = i;
    map[i] = block;
  }
  return map;
}var AUDIOCONTEXT;
var DESTINATION;
var BUFFERBUFFER = [];
var VOLUME = 1;
function setVolume(val) {
  if(val < 0) val = 0;
  if(val > 1) val = 1;
  VOLUME = val;
  DESTINATION.gain.setValueAtTime(val, 0);  
}
function initializeSound() {
  if('webkitAudioContext' in window) {
    AUDIOCONTEXT = new webkitAudioContext();
  } else {
    AUDIOCONTEXT = new AudioContext();
  }
  AUDIOCONTEXT.resume();
  var GAIN = AUDIOCONTEXT.createGain();
  GAIN.connect(AUDIOCONTEXT.destination);
  DESTINATION = GAIN;
  setVolume(0.5);
  for(var i in BUFFERBUFFER) {
    BUFFERBUFFER[i].beginLoad();
  }
  BUFFERBUFFER = [];
}
// var DESTINATION = AUDIOCONTEXT.destination;
class SoundEffect {
  constructor(rate, frq, vol, len, inBetweens, type) {
    this.type = type||'triangle';
    this.sampleRate = rate;
    this.inBetweens = inBetweens || 0;
    this.frqData=frq;
    this.volData=vol;
    this.length = this.sampleRate*len;
  }
  play(entity) {
    // return;
    if(!DESTINATION)return;
    var volume = 1;
    if(entity&&!entity.player) {
      var d = distanceBetweenEntities(entity, entity.game.player);
      // console.log(d);
      // volume = 1/(d/50+1);
      volume = .1;
      // volume = 0;
      // console.log(volume);
    }
    var audioContext= AUDIOCONTEXT;
    var destination = DESTINATION;
    var oscillator = audioContext.createOscillator();
    var gain = audioContext.createGain();
    var time = audioContext.currentTime;
    oscillator.start(time);
    var stopTime = time+this.length;
    oscillator.stop(stopTime);
    oscillator.type=this.type;
    oscillator.frequency.setValueAtTime(this.frqData[0], time);
    gain.gain.setValueAtTime(this.volData[0]*volume, time);
    oscillator.connect(gain);
    gain.connect(destination);
    this.applyData(oscillator, gain, time, volume);
    oscillator.stopSound = function() {
      try {
        this.disconnect(gain);
      } catch(e) {
        console.log(e);
      }
    };
    return oscillator;
  }
  applyData(oscillator, gain, time, volume) {
    var last;
    for(var i=0;i<this.frqData.length;i++) {
      var frq = this.frqData[i];
      if(!frq) continue;
      oscillator.frequency.setValueAtTime(frq, time+i*this.sampleRate);
      if(last)
      for(var j=0;j<this.inBetweens;j++){
        if(frq) oscillator.frequency.setValueAtTime( last + (frq-last)*j/this.inBetweens, time+(i-1+j/this.inBetweens)*this.sampleRate);        
      }
      last = frq;
    }
    last = false;
    for(var i=0;i<this.volData.length;i++) {
      var amplitude = this.volData[i];
      if(!amplitude)continue;
      amplitude = amplitude;
      gain.gain.setValueAtTime(amplitude*volume, time+i*this.sampleRate);
      if(last)
      for(var j=0;j<this.inBetweens;j++){
        if(amplitude) gain.gain.setValueAtTime((last + (amplitude-last)*j/this.inBetweens)*volume, time+(i-1+j/this.inBetweens)*this.sampleRate);        
      }
      last = amplitude;
    }
  }
}
// var OnFile = (window.location.protocol == "file:");
// var webDomain = 'http://bmarcelus.github.io/JimothyPiggerton';
function loadBuffer(url, callback) {
  // Load buffer asynchronously
  var request = new XMLHttpRequest();
  // if(OnFile) url = webDomain + url;
  // else url = '.' + url;
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  var loader = this;

  request.onload = function() {
    // Asynchronously decode the audio file data in request.response
    AUDIOCONTEXT.decodeAudioData(
      request.response,
      function(buffer) {
        if (!buffer) {
          alert('error decoding file data: ' + url);
          return;
        }
        callback(buffer);
      },
      function(error) {
        console.error('decodeAudioData error', error);
      }
    );
  }

  request.onerror = function() {
    console.log("BufferLoader: XHR error");
    console.log("Cannot load sounds from File system");
  }

  request.send();
}

class SoundSource {
  constructor(url, playbackRate, volume) {
    url = SOUNDASSETS + url;    
    this.url = url;
    this.loaded = false;
    this.playbackRate = playbackRate || 1;
    this.volume = volume || 1;
    this.loops=false;
    BUFFERBUFFER.push(this);
    this.lastSound = null;
  }
  beginLoad() {
    loadBuffer(this.url, this.onloadBuffer.bind(this));
  }
  onloadBuffer(buffer) {
    this.buffer=buffer;
    this.loaded = true;
  }
  stopSound() {
    if(!this.lastSound) return;
    this.lastSound.stopSound();
    this.lastSound = null;
  }
  pause() {
    this.setVolume(0);
    // if(!this.lastSound)return;
    // this.pauseTime = this.lastSound.getTime();
    // this.stopSound();
  }
  resume() {
    this.setVolume(1);
    // if(!this.lastSound||!this.pauseTime)return;
    // this.lastSound.resume(this.pauseTime);
  }
  setVolume(v) {
    if(!this.lastSound)return;
    this.lastVolume = v;
    v = v*this.volume;
    if(v<0)v=0;
    if(v>1)v=1;
    this.lastSound.myGain.gain.setValueAtTime(v, AUDIOCONTEXT.currentTime);
  }
  play() {
    var audioContext= AUDIOCONTEXT;
    var destination = DESTINATION;
    if(!destination)return;
    var time = audioContext.currentTime;
    var source = audioContext.createBufferSource();
    source.buffer = this.buffer;
    // source.playbackRate = 0.5;
    // if(pitchShift != null) {
    //   source.playbackRate.setValueAtTime(pitchShift, time)
    //   // source.detune = pitchShift;
    //   // source.detune.setValueAtTime(pitchShift*100, time);
    // }
    var r = 1;// + (Math.random()-0.5)/10;
    source.playbackRate.setValueAtTime(this.playbackRate*r,time);
    source.start(time);  
    if(this.loops) source.loop = true;
    var gain = audioContext.createGain();
    gain.gain.setValueAtTime(this.volume, time);
    gain.connect(destination);
    source.connect(gain);    
    source.stopSound = function() {
      try {
        this.disconnect(gain);
      } catch(e) {
        console.log(e);
      }
    };
    source.myGain = gain;
    this.lastSound = source;
    source.getTime = function() {}
    source.pause = function() {}
    source.resume = function() {}
    return source;
  }
}

class SoundTag {
  constructor(url, playbackRate, volume) {
    url = SOUNDASSETS + url;
    this.url = url;
    this.playbackRate = playbackRate || 1;
    this.volume = volume || 1;
    this.createAudio();
  }
  createAudio() {
    var audioElement = document.createElement("audio");
    audioElement.src = this.url;
    this.audioElement = audioElement;
    audioElement.playbackRate = this.playbackRate;
    this.setVolume(1);
  }
  play() {
    if(!DESTINATION)return; 
    this.audioElement.play();
    this.audioElement.currentTime = 0;
    if(this.loops) this.audioElement.loop = true;        
    return this;
  }
  stopSound() {
    this.audioElement.pause();
  }
  pause() {
    this.audioElement.pause();
  }
  resume(time) {
    this.audioElement.play();
    if(time!=undefined) {
      this.audioElement.currentTime = time;
    }
  }
  getTime() {
    return this.audioElement.currentTime;
  }
  setVolume(v) {
    this.lastVolume = v;        
    v = v*VOLUME*this.volume;
    if(v<0)v=0;
    if(v>1)v=1;
    this.audioElement.volume = v;    
  }
}

var OnFile = (window.location.protocol == "file:");
if(OnFile) SoundSource = SoundTag;
// SoundSource=SoundTag;

class MixAudio {
  constructor(audios) {
    this.audios = audios;
  }
  play() {
    this.audios.forEach(a => a.play());
  }
}

class PickAudio {
  constructor(audios) {
    this.audios = audios;
  }
  play() {
    var i = Math.floor(Math.random()*this.audios.length);
    return this.audios[i].play();
  }
}

class MusicSource extends SoundSource {
  constructor(...args) {
    super(...args);
    this.loops = true;
    this.lastVolume = 1;
    this.isSong = false;
  }
  play() {
    if(this.lastSound)return this.lastSound;
    return super.play();
  }
  lerpVolume(v) {
    this.setVolume(this.lastVolume + (v-this.lastVolume) / 10);
  }
}

class MusicHandler {
  constructor(...args) {
    this.songs = args;
    this.setSong(0);
    this.volume = 1;
    this.on = true;
  }
  setSong(index) {
    var newSong = this.songs[index];
    if(this.song == newSong) return;
    newSong.isSong = true;
    if(this.on) newSong.play();
    if(this.song){
      this.song.stopSound();
      this.song.pause();
      this.song.isSong = false;
    }
    this.song = newSong;
  }
  toggle() {
    this.on = !this.on;
    this.volume = this.on ? 1 : 0;
  }
  play() {
    if(this.song == undefined)return;
    this.song.stopSound();
    return this.song.play();
  }
  lerpVolume(v) {
    this.song.lerpVolume(v*this.volume);
  }
  setVolume(v) {
    this.song.setVolume(v*this.volume);
  }
  getTime() {
    return this.song.getTime();
  }
  pause() {
    // this.song.pause();
    this.song.setVolume(0);
  }
  resume(k) {
    // this.song.setVolume(1);
    // this.song.resume(k);
  }
}

// class MusicSource extends SoundSource {
//   constructor(...args) {
//     super(...args);
//     this.loops = true;
//   }
//   onloadBuffer(buffer) {
//     this.buffer=buffer;
//     this.loaded = true;
//     this.play();
//     // setInterval(() => {
//     //   this.setPitch();
//     // }, 4000)
//     this.setPitch();
//   }
//   setPitch() {
//     // var v = 1 + (Math.random()-0.5)/2;
//     var v = 1;
//     if(Math.random()>.5)v = 2;
//     this.lastSound.playbackRate.setValueAtTime(v, AUDIOCONTEXT.currentTime);
//     setTimeout(() => {
//       this.setPitch();
//     }, 4000/v);
//   }
// }
class Background {
  constructor(type) {
    this.type = type;    
    this.backgroundColor = "#87ceeb";    
    this.background1 = this.createBackground(60, "#0b6623", true);
    this.background2 = this.createBackground(100, "#0b6623", false);
    // this.backgroundColor = "#333";
  }
  draw(canvas, camera, world) {
    this.drawLayers(canvas, camera, world);
  }
  drawLayers(canvas,camera, world) {
    canvas.save();
    if(this.backgroundColor) {
      canvas.fillStyle=this.backgroundColor;
      canvas.fillRect(0,0,canvas.width,canvas.height);
    }
    canvas.translate(0,world.h*world.s-canvas.height/2);
    canvas.translate(-camera.x/8,-camera.y);
    canvas.drawImage(this.background1,-150,-200);   
    canvas.translate(-camera.x/4,0);
    canvas.drawImage(this.background2,-150,-100); 
    canvas.restore();
  }
  createBackground(w,c,e) {
    switch(this.type) {
      case 0:
        return createHillBackground(w,c,e);
        break;
      case 1:
        return createForrestBackground(w,c,e);
        break;
      case 2:
        this.backgroundColor = MAIN.makeGrd();
        return createSpikeBackground(w,'#222',e);
        break;
      default:
        return createHillBackground(w,c,e);
        break;
    }
  }
}

class InfiniteBackground extends Background {
  drawLayers(canvas, camera) {
    var w = 3000;
    var w2 = 6000;
    var x1 = Math.floor(camera.x/w/2-.5)+1;
    var x2 = Math.floor(camera.x/w/2);
    var x11 = Math.floor(camera.x/w2/2-.5)+1;
    var x12 = Math.floor(camera.x/w2/2);
    canvas.save();
    if(this.backgroundColor) {
      canvas.fillStyle=this.backgroundColor;
      canvas.fillRect(0,0,canvas.width,canvas.height);
    }
    canvas.translate(-camera.x/2,-camera.y);
    canvas.drawImage(this.background1,0+w*2*x11,-200);
    canvas.save();
    canvas.translate(w+x12*w*2+3000/2,0);
    canvas.scale(-1,1);
    canvas.drawImage(this.background1,-3000/2,-200);
    canvas.restore();
    canvas.translate(-camera.x/2,0);
    canvas.drawImage(this.background2,0+w*2*x1,-100);
    canvas.translate(w+x2*w*2+3000/2,0);
    canvas.scale(-1,1);
    canvas.drawImage(this.background2,-3000/2,-100);

    // canvas.drawImage(this.background2,-150+x1*w*2,-100);     
    // canvas.drawImage(this.background2,-150+w+x2*w*2,-100);     
    canvas.restore();
  }
  drawInBounds(canvas,camera,y,height){
    var scaleFactor = [.5,1];
    //canvas width = 1000
    //background1 width = 3000
    //background2 width = 3000
    var w = 3000*scaleFactor[0];        //Distance until teleport
    var w2 = 6000*scaleFactor[0];       //distance until teleport
    var x1 = Math.floor(camera.x/w/2)+1;       
                                                  //why is it divided by 2?        
    var x2 = Math.floor(camera.x/w/2);
    var x11 = Math.floor(camera.x/w2/2-.5)+1;
    var x12 = Math.floor(camera.x/w2/2);
    canvas.save();
    if(this.backgroundColor) {
      canvas.fillStyle=this.backgroundColor;
      canvas.fillRect(0,0,canvas.width,canvas.height);
    }
    canvas.scale(scaleFactor[0],scaleFactor[1]);
    canvas.translate(-camera.x/2,camera.y);   //camera.y controls height displacement
    //canvas.drawImage(this.background1,0+w*2*x11,-200);    //3000*2*(camera.x/6000/2 - 0.5) + 1
    canvas.save();
    canvas.translate(w+x12*w*2+w,0);           //3000 + camera.x/6000/2*3000*2 + 3000 /2
    canvas.scale(-1,1);
    //canvas.drawImage(this.background1,0,-200);
    canvas.restore();
    canvas.translate(-camera.x/2,0);
    canvas.drawImage(this.background1,0+w*2*x1,-100);
    canvas.translate(w+x2*w*2+w,0);
    canvas.scale(-1,1);
    canvas.drawImage(this.background2,0,-100);

    // canvas.drawImage(this.background2,-150+x1*w*2,-100);     
    // canvas.drawImage(this.background2,-150+w+x2*w*2,-100);     
    canvas.restore();
  }
}
class ScrollingBackgroundObject {
  constructor(background,xScale,yScale,moveSpeed,initialX,yOffset,flipped,startActivated){
    this.background = background;
    this.activated = startActivated;
    this.scaleFactor = [xScale,yScale];
    this.maxSpeed = moveSpeed;
    this.moveSpeed = (this.activated) ? this.maxSpeed : 0;
    this.yOffset = yOffset;
    this.flipped = flipped;
    this.left = initialX*this.scaleFactor[0];     //the left bounds of the image
    this.width = this.background.width*this.scaleFactor[0];
    this.right = this.left + this.width; //The right bounds of the image
    this.colorChangeDuration = 25;
    this.colorTimer = (this.activated) ? 0 : this.colorChangeDuration ;
  }
  update(dt){
    this.left -= this.moveSpeed*dt;
    this.right = this.left+this.width;
    if(this.right < 0){
      this.left += this.width*2;
    }
    this.moveSpeed = (this.activated) ? this.maxSpeed : 0;
    this.updateGrayscale(dt);
  }
  updateGrayscale(dt){
    if(!this.activated){
      this.colorTimer += dt;
      if(this.colorTimer > this.colorChangeDuration){
        this.colorTimer = this.colorChangeDuration;
      }
    } else {
      this.colorTimer -= dt;
      if(this.colorTimer < 0)
        this.colorTimer = 0;
    }
  }
 
  draw(canvas){
    canvas.save();
    // canvas.filter = 'grayscale(' + (this.colorTimer/this.colorChangeDuration) + ')';
    if(this.flipped){
      canvas.translate(this.left+this.width,this.yOffset);
      canvas.scale(-1,1);
      canvas.scale(this.scaleFactor[0],this.scaleFactor[1]);
      canvas.drawImage(this.background,0,0);
    } else {
      canvas.translate(this.left,this.yOffset);
      canvas.scale(this.scaleFactor[0],this.scaleFactor[1]);
      canvas.drawImage(this.background,0,0);
    }
    canvas.restore();
  }
}
class SunEffect {
  constructor() {
    this.srcImage = createSunEffect();
    this.image = document.createElement('canvas');
    this.image.width = this.srcImage.width;
    this.image.height = this.srcImage.height;
    this.canvas = this.image.getContext('2d');
    this.canvas.save();
  }
  reset() {
    var width = this.image.width;
    var height = this.image.height;
    var canvas = this.canvas;
    canvas.restore();
    canvas.save();
    canvas.globalCompositeOperation="source-over";
    canvas.clearRect(0,0,width,height);
    canvas.drawImage(this.srcImage,0,0);
    canvas.globalCompositeOperation="destination-out";
  }
  draw(canvas) {
    canvas.drawImage(this.image, canvas.width/2-this.image.width/2,canvas.height/2-this.image.height/2);        
  }
}

function createSunEffect() {
  var image = document.createElement('canvas');
  var canvas = image.getContext('2d');
  image.width = 3000;
  image.height =  800;
  canvas.fillStyle="rgba(255,255,0,.5)";
  canvas.beginPath();
  canvas.arc(image.width/2,image.height/2,image.height/2,0,Math.PI*2);
  canvas.fill();
  return image;
}

function createHillBackground(w,c,e){
  var image = document.createElement('canvas');
  var canvas = image.getContext('2d');
  image.width = 3000;
  image.height =  800;
  canvas.fillStyle = c;

  var colorIndex = 0;
  var yy = 260+300;
  canvas.fillStyle = c;
  //canvas.fillStyle="#0b6623";
  // canvas.fillRect(0,yy,image.width,yy);
  var r = Math.random()*200+100;
  for(var i=0;i<image.width;i+=r) {
    var x = i;
    var y = yy+r;
    canvas.beginPath();
    canvas.arc(x,y,r,0,Math.PI*2);
    canvas.fill();
    r = Math.random()*200+100;    
  }
  for(var i=0;i<20;i++) {
    var r = Math.random()*200+100;
    var x = Math.random()*image.width;
    var y = yy+r/2;
    canvas.beginPath();
    canvas.arc(x,y,r,0,Math.PI*2);
    canvas.fill();
  }
  if(e) {
    canvas.globalCompositeOperation="source-atop";
    canvas.fillStyle="rgba(1,1,1,.1)";
    canvas.fillRect(0,0,image.width,image.height);
  }
  return image;
}

function createForrestBackground(w,c,e) {
  var image = document.createElement('canvas');
  var canvas = image.getContext('2d');
  image.width = 3000;
  image.height =  800;
  canvas.fillStyle = c;
  var colors = ["#382", "#4a3"];

  var colorIndex = 0;
  var yy = 260+300;
  canvas.fillStyle="#050";
  canvas.fillRect(0,yy,image.width,yy);
  w=60;
  for(var i=0;i<image.width;i+=w) {
    if(Math.random()>.5)continue;
    var h = 300; 
    h -= Math.random()*100;
    var y = yy-h;  
    var ww = w/2+Math.random()*10;
    canvas.fillStyle="#643";
    canvas.fillRect(i+w/2-ww/2, y, ww, h);
    canvas.fillStyle="#532";
    canvas.fillRect(i+w/2-ww/2, y, ww/2, h);
    var hh = w/2;//+Math.random()*20-5;
    var h = hh;
    for(var j=230;j>0;j-=h) {
      // h=hh+Math.random()*10-5;
      canvas.beginPath();
      colorIndex = (colorIndex + 1) % (colors.length);
      canvas.fillStyle=colors[colorIndex];
      canvas.moveTo(i+w/2-ww, y+j);
      canvas.lineTo(i+w/2+ww, y+j);
      canvas.lineTo(i+w/2, y+j-h*2);
      canvas.fill();
    }
    y+=Math.random()*10-Math.random()*10;
  }
  // canvas.globalCompositeOperation="source-atop";
  // canvas.fillStyle="rgba(255,255,255,.1)";
  // canvas.fillRect(0,0,image.width,image.height);
  if(e) {
    canvas.globalCompositeOperation="source-atop";
    canvas.fillStyle="rgba(1,1,1,.1)";
    canvas.fillRect(0,0,image.width,image.height);
  }
  return image;
}

function createInterriorBackground(w,c,e) {
  var image = document.createElement('canvas');
  var canvas = image.getContext('2d');
  image.width = 3000;
  image.height =  800;
  canvas.fillStyle = "#333";
  canvas.fillRect(0,0,image.width,image.height);
  canvas.save();
  canvas.fillStyle="#fff";
  // canvas.globalCompositeOperation = "destination-out";
  var ww = image.width/50;
  var hh = ww;
  for(var i=ww;i<image.width;i+=ww*2) {
    for(var j=1;j<10;j+=1) {
      canvas.fillRect(i,j*hh*2,ww,hh);
    }
  }
  canvas.restore();
  if(e) {
    canvas.globalCompositeOperation="source-atop";
    canvas.fillStyle="rgba(1,1,1,.1)";
    canvas.fillRect(0,0,image.width,image.height);
  }
  return image;
}

function createSpikeBackground(w,c) {
  var image = document.createElement('canvas');
  var canvas = image.getContext('2d');
  image.width = 3000;
  image.height =  1000;
  canvas.fillStyle = c;
  // canvas.fillStyle = "#000";
  canvas.strokeStyle="#000";
  canvas.lineWidth = 10;
  var y = 500;
  for(var i=0;i<image.width;i+=w) {
    var ww = w/3;
    // canvas.strokeRect(i+w/2-ww/2, y, ww, 400);
    canvas.fillRect(i+w/2-ww/2, y, ww, 400);        
    canvas.beginPath();
    canvas.moveTo(i+w/2-ww, y);
    canvas.lineTo(i+w/2+ww, y);
    canvas.lineTo(i+w/2, y- ww*2);
    canvas.closePath();
    // canvas.stroke();
    canvas.fill();    
    canvas.save();
    canvas.globalCompositeOperation = "source-atop";
    canvas.fillStyle = "rgba(0,0,0,.2)";
    canvas.fillRect(i+w/2-ww/2*2,y-ww*2,ww,400+ww*2);
    canvas.restore();
  }
  return image;
}

function createCityRuinBackground(w,c) {
  var image = document.createElement('canvas');
  var canvas = image.getContext('2d');
  image.width = 3000;
  image.height =  1000;
  canvas.fillStyle = c;    
  for(var i=0;i<image.width;i+=w) {
    canvas.fillRect(i, Math.floor(Math.random()*40)*5+400, w, 400);
  }
  for(var i=0;i<350;i++) {
    canvas.clearRect(Math.random()*image.width, Math.random()*image.height, Math.random()*50, Math.random()*50);
  }
  return image;
}
function makeWorld(width, height) {
  var world = [];
  for(var j=0;j<height;j++) {
    var row = [];
    for(var i=0;i<width;i++) {
      // if(i==0||j==0||i==width-1||j==height-1||Math.random()>.9)row.push(1);
      if(i==0||i==width-1||j==height-1)row.push(1);
      else row.push(0);
      // row.push(1);
    }
    world.push(row);
  }
  
  return world;
}
function randomizeWorld(world, width,height) {
  var x = 1; var y = 1;
    var dx = 1;
    var dy = 0;
    for(var i=0;i<10000;i++) {
      world[y][x] = 0;
      x+=dx;
      y+=dy;
      if(x<1)x = 1;
      if(y<1)y = 1;
      if(x>width-2) x = width-2;
      if(y>height-2) y = height-2;
      if(Math.random()>.8) {
        var d = Math.floor(Math.random()*2)*2-1;
        if(Math.random()>.5) {
          dx = d;
          dy = 0;
        } else {
          dy = d;
          dx = 0;
        }
      }
    }
}
class World {
  constructor(bgtype) {
    this.worldtype = bgtype;
    this.background = new Background(bgtype);    
    this.s = 40;
  }
  forceRedraw() {
    this.image = null;
  }
  /*drawGrid(canvas){
    var s = this.s;

    if (this.image){
      for (var i=0;i<this.w;i++){
        canvas.draw
      }
    }
  }*/
  draw(canvas,editor) {
    // CELLMAP[2].angle += Math.PI/10;
    var s = this.s;
    var world = this.world;
    if(this.image) {
      canvas.drawImage(this.image,0,0);
      // for(var i=0;i<this.w;i++) {
      //   for(var j=0;j<this.h;j++) {
      //     var type = world[j][i];
      //     var cell = CELLMAP[type];
      //     if(cell.draw&&cell.redraws) {
      //       if (!cell.hide || editor)
      //         cell.draw(canvas, s*i,s*j,s,s, this, i,j);
      //     }
      //     // if(type == 1) ctx.fillStyle='brown';
      //     // else if(type == 2) ctx.fillStyle='#fdd';
      //     // if(type) {
      //     //   ctx.fillRect(s*i,s*j, s,s);
      //     // }
      //   }
      // }
      return;
    }
    this.image = document.createElement('canvas');
    this.image.width = this.w*this.s;
    this.image.height = this.h*this.s;
    var ctx = this.image.getContext('2d');
    for(var i=0;i<this.w;i++) {
      for(var j=0;j<this.h;j++) {
        var type = world[j][i];
        var cell = CELLMAP[type];
        if(cell.draw) {
          var c = ctx;
          if(cell.redraws)c = canvas;
          if (!cell.hide || editor)
            cell.draw(c, s*i,s*j,s,s, this, i,j);
        }
        // if(type == 1) ctx.fillStyle='brown';
        // else if(type == 2) ctx.fillStyle='#fdd';
        // if(type) {
        //   ctx.fillRect(s*i,s*j, s,s);
        // }
      }
    }
    canvas.drawImage(this.image,0,0);    
  }

  oob(x,y) {
    return x<0||y<0||x>=this.w||y>=this.h;
  }
  wallExists(x,y) {
    return this.oob(x,y) || this.world[y][x];
  }
  pointCollides(x,y) {
    var type = this.wallExists(Math.floor(x/this.s), Math.floor(y/this.s));
    // this.entityCollision(entity, type);
    return type;
  }
  pointToMatrix(x,y) {
    return {
      x: Math.floor(x/this.s),
      y: Math.floor(y/this.s),
    };
  }
  matrixToPoint(x,y) {
    return {
      x: x*this.s,
      y: y*this.s,
      w: this.s,
      h: this.s,
    }
  }
  rectCollides(x,y,w,h,entity, dx,dy) {
    var result = false;
    var points = [[x,y],[x+w,y],[x,y+h],[x+w,y+h],[x+w/2,y+h],[x+w/2,y]];
    var types = {};
    for(var i in points) {
      var x1 = points[i][0];
      var y1 = points[i][1];
      var p = this.pointToMatrix(x1,y1);
      if(i==0) {
        entity.matrixPosition = p;
      }
      var cellPos = this.matrixToPoint(p.x,p.y);      
      cellPos.i = i;
      // var type = this.pointCollides(x1,y1);
      var type = this.getCellType(p.x,p.y);
      if(type === true) return cellPos;
      var cell = CELLMAP[type];
      if(!cell)continue;
      if(cell.ignoreCollisions) continue;
      // if(cell.groundBlock) return true;
      var colliding = true;
      var pos = {x: x1, y: y1, p: p, c: cellPos};
      if(cell.isColliding) colliding = cell.isColliding(entity,pos, dx,dy, cellPos);
      if(colliding) {
        if(colliding.x) cellPos = colliding;
        if(cell.safe) return cellPos;
        if(type != 0) types[type] = pos;
      }
    }
    for(var i in types) {
      var pos = types[i];
      var col = this.entityCollision(entity, i, pos, dx,dy)
      if(col){
        result = col;
      }
    }
    return result;
    // return this.pointCollides(x,y,entity) +
    //   this.pointCollides(x+w,y,entity) +
    //   this.pointCollides(x,y+h,entity) +
    //   this.pointCollides(x+w,y+h,entity);
  }
  entityCollision(entity, type, pos,dx,dy) {
    var cell = CELLMAP[type];
    if(!cell)return false;
    var colliding = true;
    var cellPos = pos.c;    
    if(cell.isColliding) colliding = cell.isColliding(entity,pos,dx,dy,cellPos);
    if(colliding&&cell.entityCollision)cell.entityCollision(entity,pos,dx,dy,cellPos);        
    if(colliding && cell.solid) {
      if(colliding.y) return colliding;
      else return cellPos;
    }
  }
  drawBackground(canvas, camera) {
    this.background.draw(canvas, camera, this);
  }
  getCellType(x,y) {
    if(y >= this.h) {
      if(y>this.h + 1) return 2;
      return 0;
    }
    if(this.oob(x,y))return true;
    return this.world[y][x];
  }
  getCell(x,y) {
    if(y >= this.h) return CELLMAP[2];
    if(this.oob(x,y))return {};
    return CELLMAP[this.world[y][x]];
  }
}

class WorldDefault extends World {
  constructor(w,h,s) {
    super();    
    this.w=w;
    this.h=h;
    this.world = makeWorld(w,h);
  }
}

class WorldFromLevel extends World {
  constructor(level, index) {
    var backgroundType = 0;
    // if(index>2) backgroundType=1;
    // if(index>3)backgroundType=2;
    if(level.worldType) backgroundType = level.worldType;
    var song = 0;
    if(level.song!=undefined){
      song = level.song;
    } else {
      song = level.worldType || 0;
    }
    SOUNDMAP.music.setSong(song);
    // if(level.worldType == 2)SOUNDMAP.music.setSong(1);
    // else SOUNDMAP.music.setSong(0);
    super(backgroundType);
    var grid = level.grid;
    //
    this.world = grid;
    this.h = grid.length;
    this.w = grid[0].length;
    this.index = index;
  }
  loadWorld(game) {
    var s = this.s;
    var world = this.world;
    for(var i=0;i<this.w;i++) {
      for(var j=0;j<this.h;j++) {
        var type = world[j][i];
        var cell = CELLMAP[type];
        if(cell.onload) {
          cell.onload(game, s*i,j*s,s,s,this,i,j);
        }
      }
    }
  }
}

// for(var index in CELLMAP)

/*
{
  // 'false': {},
  0: {
    //air
  },
  1: {
    //Ground
    solid: true,
    groundBlock: true,
    draw: function(canvas, x,y,w,h, world,i,j) {
      var color1 = "#732";
      var color2 = "#843";
      var color3 = "#090";
      // color1 = "#555";
      // color2 = "#777";
      // color3 = "#000";
      canvas.fillStyle=color1;
      canvas.fillRect(x,y,w,h);
      canvas.strokeStyle="#000";
      var s = Math.max(w,h);
      // canvas.strokeRect(x,y,w,h);
      canvas.fillStyle=color2;
      var ww = s/3;
      var hh = ww;
      var spacing = 10;
      for(var ii=0;ii<3;ii++) {
        var r1 = psuedoRandom(x,y,ii,1);
        var r2 = psuedoRandom(x,y,ii,2);
        var xx = Math.floor(r1*(w-ww)/spacing) * spacing;
        var yy = Math.floor(r2*(h-hh)/spacing) * spacing;
        canvas.fillRect(xx+x,yy+y,ww,hh);
      }
      if(!world.getCell(i,j-1).groundBlock) {
        canvas.fillStyle=color3;
        canvas.fillRect(x,y,w,s/8);
        canvas.strokeRect(x,y,w,0);
      }
      if(!world.getCell(i,j+1).groundBlock) {
        canvas.strokeRect(x,y+h,w,0);
      }
      if(!world.getCell(i+1,j).groundBlock) {
        canvas.strokeRect(x+w,y,0,h);
      }
      if(!world.getCell(i-1,j).groundBlock) {
        canvas.strokeRect(x,y,0,h);
      }
    }
  },
  2: {
    //Spike
    solid: true,
    angle: 0,
    redraws: false,
    draw: function(canvas, x,y,w,h, world,i,j) {
      canvas.fillStyle="white";
      canvas.strokeStyle = "#000";
      canvas.save();
      canvas.translate(x+w/2,y+h/2);
      canvas.rotate(this.angle);
      // this.angle += Math.PI/20*1.5;
      w=w*.9;
      h=h*.9;
      for(var i=0;i<3;i++){
        canvas.rotate(Math.PI/8);
        canvas.fillRect(-w/2,-h/2,w,h);        
        canvas.strokeRect(-w/2,-h/2,w,h);
      }
      w=w*.8;
      h=h*.8;
      canvas.rotate(-3*Math.PI/8);
      canvas.fillStyle="grey";
      canvas.fillRect(-w/2,-h/2,w,h);      
      canvas.restore();
    },
    entityCollision: function(entity, pos) {
      if(entity.player) entity.die();
      return true;
    }
  },
  3: {
    //Spike floor
    solid: true,
    redraws: false,
    groundBlock: true,
    draw: function(canvas, x,y,width,height, world,ii,jj) {
      var w= width;
      var h=height;
      var dd = width*.1;
      CELLMAP[2].draw(canvas,x+dd,y+dd,width-dd*2,height-dd*2,world,ii.jj)
      var dh = h * .4;
      CELLMAP[1].draw(canvas,x,y+dh, width, height-dh, world, ii,jj);
    },
    entityCollision: function(entity, pos) {
      if(entity.player && entity.grounded) entity.die();
      return true;
    }
  }
}*/addLevel( function(nameSpace) {
  {

    return {
      name: "Adventure Begins!",
      worldType: 0,
      grid: [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,19,19,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,19,19,19,19,19,19,19,19,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,19,19,0,0,0,0,0,19,19,19,19,19,19,19,19,19,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,19,19,19,19,19,19,19,0,0,19,19,19,19,19,19,19,19,19,19,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,19,19,19,19,19,19,19,19,0,0,19,19,19,19,19,19,19,19,19,19,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,19,19,19,19,19,18,19,19,0,0,19,19,18,18,19,18,18,19,19,19,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,19,19,19,19,18,18,19,19,0,0,0,19,19,18,18,18,18,18,18,19,0,],
        [0,0,0,0,0,0,0,0,0,19,19,19,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,19,19,18,18,18,19,19,19,0,0,0,0,9,23,23,18,18,18,19,19,0,],
        [0,0,0,0,0,0,0,0,19,19,19,19,19,19,0,0,0,0,0,0,0,0,0,0,0,0,0,19,19,19,18,18,19,19,0,0,0,0,0,19,19,18,18,18,19,19,19,0,],
        [0,0,0,0,0,0,0,19,19,19,19,19,19,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,19,18,18,19,0,0,0,0,0,0,19,19,18,18,18,19,19,0,0,],
        [0,0,0,0,0,0,0,19,19,19,19,19,19,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,18,18,0,0,0,1,1,0,0,0,19,18,18,18,19,0,0,0,],
        [0,0,0,0,0,0,0,19,19,19,19,18,19,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,18,18,0,0,0,1,1,0,0,0,0,18,18,1,0,0,0,0,],
        [0,0,0,0,0,0,0,0,19,19,18,18,19,0,0,0,0,0,0,0,0,0,0,0,0,0,9,9,9,1,1,18,0,0,2,1,1,0,0,0,0,18,18,1,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,18,18,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,18,0,0,2,1,1,0,0,0,0,18,1,1,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,18,18,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,2,2,1,1,0,0,0,2,1,1,1,1,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,18,18,0,0,1,1,0,0,0,0,0,0,0,15,0,0,0,0,2,1,1,1,1,1,1,1,1,0,2,2,2,1,1,1,1,0,5,0,],
        [0,0,0,0,0,0,0,0,0,0,18,18,1,1,1,1,0,0,0,0,0,0,1,1,1,0,2,2,2,1,1,1,1,1,1,1,1,2,2,2,2,1,1,1,1,1,1,1,],
        [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        [0,4,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        ],
      init(gameScene){
        gameScene.entities.push(new WorldText(300,730,500,"[W] or [Space] to JUMP",'25px ' + FONT,[255,255,255,1],[255,255,255,1],
          1,true,'left'));
        gameScene.entities.push(new WorldText(300,780,500,"[A] and [D] to MOVE",'25px ' + FONT,[255,255,255,1],[255,255,255,1],
        1,true,'left'));
        gameScene.entities.push(new WorldText(800,580,500,"Rescue Piggerton! ->",'40px ' + FONT,[255,255,255,1],[255,255,255,1],
        1,true,'center'));
      }
      
    };

  }
});
class Cloud {
  constructor(x,y,w,h,vx,vy,life,color) {
    this.x=x;this.y=y;this.w=w;this.h=h;this.vx=vx;this.vy=vy;
    this.life = life||10;
    this.maxlife = this.life;
    this.color = color||"rgba(200,200,200,1)";
    this.behind = true;
  }
  update() {
    this.life--;
    if(this.life<=0) {
      this.shouldDelete = true;
      return;
    }
    this.x+=this.vx;
    this.y+=this.vy;
    var val = Math.floor(100+155 * this.life/this.maxlife);
    // var val = *this.life/this.maxlife;
    this.color = "rgb("+val+","+val+","+val+")";
  }
  draw(canvas) {
    canvas.save();
    canvas.fillStyle = this.color;
    // canvas.globalAlpha = this.life/this.maxlife;
    var w = this.w + (this.maxlife-this.life);
    var h = w;
    canvas.translate(this.x,this.y);
    var d = w/5;
    if(this.life<5) {
      canvas.fillRect(-w/2+d,-h,w-d*2,h/4);
      canvas.fillRect(-w/2+d,-h/4,w-d*2,h/4);
      canvas.fillRect(-w/2,-h+d,w/4,h-d*2);
      canvas.fillRect(w/4,-h+d,w/4,h-d*2);
    } else {
      canvas.fillRect(-w/2+d,-h,w-d*2,h);
      canvas.fillRect(-w/2,-h+d,w,h-d*2);      
    }
    canvas.restore();
  }
}addBlock(function() { return {
  //Ground
    id: BLOCKS.length,
    name: "Air",
    air: true,
    ignoreCollisions:true,
    // redraws:true,
    // draw: function(canvas, x,y,w,h, world,i,j) {
    //   canvas.save();
    //   canvas.globalCompositeOperation='color-dodge';
    //   var t=MAIN.frameCount;
    //   var n = i*i+j*j+t;
    //   var v = Math.abs((n)%(255*2-1)-255);
    //    var c = 'rgba('+v+','+v+','+v+',0.5)';
    //   canvas.fillStyle = c;
    //   canvas.fillRect(x,y,w,h);
    //   canvas.restore();
    // }
}});
// SOUNDMAP.jump = new SoundEffect(.02, [440, 880, 1100, 2400], [.1,.5,.6,.7,.1], 5, 2);
// SOUNDMAP.jump = new SoundEffect(.04, [440, 550, 660,770, 1100], [.1,.5,.6,.7,.1], 5, 10);
SOUNDMAP.jump = new SoundEffect(.03, [550, 660,770, 1100], [.3,.5,.6,.4,0], 4, 2);
SOUNDMAP.jump = new SoundEffect(.02, [220, 440,660, 880], [.3,.5,.6,.4,0], 4, 1, 'sine');
SOUNDMAP.jump2 = new SoundEffect(.02, [450, 500,660, 1100], [.2,.5,.4,.7,0], 3, 10);
// SOUNDMAP.jump = new SoundEffect(.04, [330, 500, 550,660, 770, 1100], [.1,.5,.6,.6,.6,.001 ], 6, 10);
SOUNDMAP.land = new SoundEffect(.01, 
  [220, 440, 220, 440, 220, 220,],
  [.5, .8, .5, .5, .4, .2,],
3);
SOUNDMAP.land = new SoundEffect(.01, 
  [220, 440, 220, 220],
  [.5, .8, .5, 0],
4);
// SOUNDMAP.dash = new SoundEffect(.04, [440, 2400, 1200, 1800], [.1,.5,.6,.7,.1], 5, 10);
SOUNDMAP.dash = new SoundEffect(.04, [440, 2400, 2000, 1800], [.1,.5,.6,.7,.1], 5, 3);
SOUNDMAP.dash = new SoundEffect(.02, [660, 770, 880, 990, 990], [.1,.5,.6,.7,0], 5, 2, 'sine');
SOUNDMAP.woof = new SoundEffect(.04, [880, 1200, 660, 440], [.7,.5,.6,.3,.1], 5, 10);
SOUNDMAP.pickup = new SoundEffect(.1, [440, 880, 880], [.5,.5,0], 3, 1);
// SOUNDMAP.dash = new SoundEffect(.02, [2200,1500,2100,2000,1000,1900,], [.3,.35,.4,.45,.5,.6,.7], 5, 2);
// SOUNDMAP.playerDeath = new SoundEffect(.05, [1200,550,440,220,330,220,110], [.5],8,10, 'square');
// SOUNDMAP.playerDeath = new SoundEffect(.2, [880,110], [.5],2,20, 'square');
SOUNDMAP.playerDeath = new SoundEffect(.03,
  [1200,880,0,440,110,440,110,0,220,110,100,102,105,110,120,121],
  [.5, .5, 0, .5, .5, .5, .5, 0, .5],5,10, 'square');

SOUNDMAP.playerDeath = new SoundEffect(.04,
  [220,440,0,440,110,440,110,0,220,110,100,102,105,110,120,121],
  [.25, 0, 0, .25, .25, .5, .5, 0, .5],5,1, 'sawtooth');function sceneTransition(driver, scene) {
  var func = function() {
    this.driver.setScene(new scene());
  };
  return func.bind(driver);
}
function sceneTransition(driver, scene, playIntro){
  var func = function() {
    this.driver.setScene(new scene(playIntro));
  };
  return func.bind(driver);
}
function loadTransitionScene(driver, nextScene, TransitionType, duration, direction) {
  //direction is 1 or -1.  1 is fade to black, -1 is fade from black
  var func = function () {
    this.driver.setScene(new TransitionType(driver, nextScene, duration, direction));
  };
  return func.bind(driver);
}
function drawTransitionOverlay(color, canvas){
  canvas.fillStyle=color;
  canvas.fillRect(0,0,canvas.width,canvas.height);
}
function drawGrid(canvas){
  canvas.lineWidth = 1;
  canvas.strokeStyle = 'black';
  for(var i = 0; i < 10; i++){
    canvas.beginPath();
    canvas.moveTo(i/10.0*canvas.width,0);
    canvas.lineTo(i/10.0*canvas.width,canvas.height);
    canvas.stroke();
  }
  for(var j = 0; j < 10; j++){
    canvas.beginPath();
    canvas.moveTo(0,j/10.0*canvas.height);
    canvas.lineTo(canvas.width,j/10.0*canvas.height);
    canvas.stroke();
  }
}

class Scene {
  constructor(playIntro) {
    //playIntro is a boolean and does not need to be provided.  It defaults to false
    this.keyMap = [];
    this.gui = [];
    this.selectedButton = undefined;
    this.buttons = [];
    this.debug = false;

    this.inTransition = false;
    this.overlayColor = "rgba(0,0,0,0)";
    this.transitionTimer = 0;
    this.transitionDuration = 25;
    this.postTransitionCallback = undefined;
    this.transitionDirection = 1;
    this.allowUIInput = true;
    if(playIntro != undefined && playIntro){
      this.startTransition(25,-1,undefined);
    }
    this.touchButtonsActive = false;
    this.mouse = {x:-1,y:-1};
  }
  update(dt){
    this.handleHeldKeys(dt);
    this.updateTransition(dt);
    this.updateAllGUI(dt);
  }
  updateTransitionColor() {
    this.overlayColor = 'rgba(0,0,0,' + 
          (this.transitionTimer*1.0/this.transitionDuration) + ')';
  }
  updateTransition(dt){
    if(this.inTransition){
      if(this.transitionTimer > this.transitionDuration
        || this.transitionTimer < 0) {
        this.transitionTimer = (this.direction == 1) ? 0 : this.transitionDuration;
        this.inTransition = false;
        this.overlayColor = 'transparent';
        if(this.postTransitionCallback != undefined) {
          this.postTransitionCallback();
        }
      } else {
        this.transitionTimer += this.transitionDirection*dt;
        this.updateTransitionColor();
      }
    }
  }
  
  draw(canvas){}
  unload() {
    for(var i in this.keyMap) {
      this.keyMap[i].keyHeld = false;
    }
  }
  keydown(k) {
    var keyMap = this.keyMap;   
    var map = this.keyMap[k];
    if(!map)return;
    // map.keyHeld = (map.keyHeld||0)+1;
    map.keyHeld = true;
    if(map.down) {
      map.down();
    }
  }
  keyup(k) {
    var keyMap = this.keyMap;
    var map = this.keyMap[k];
    if(!map)return;
    // map.keyHeld -= 1;
    map.keyHeld = false;
    if(map.up) {
      map.up();
    }
  }
  handleHeldKeys(dt) {
    var keys = this.keys;
    var keyMap = this.keyMap;
    for(var k in keyMap) {
      var map = keyMap[k];
      if(keys[k]&&map.held) {
        map.held(dt);
      }
      if(keys[k]==false&&map.unheld) {
        map.unheld(dt);
      }
      if(map.noneheld&&!map.keyHeld) {
        map.noneheld(dt);
      }
    }
  }
  drawAllGUI(canvas){
    for(var i = 0; i < this.gui.length; i++){
      if(this.gui[i].visible){
        this.gui[i].draw(canvas);
      }
    }
  }
  updateAllGUI(dt){
    for(var i = 0; i < this.gui.length; i++){
      this.gui[i].update(dt,this.mouse);
    }
  }
  startTransition(duration,direction,callback){
    //callback is optional and is undefined if not provided
    this.inTransition = true;
    this.transitionDuration = duration;
    this.transitionTimer = (direction == 1) ? 0 : duration;
    this.transitionDirection = direction;
    this.postTransitionCallback = callback;
    this.updateTransitionColor();
  }
  pressButton(){
    //called by keys, not mouse
    if(!this.allowUIInput)
      return;
    this.selectedButton.held = true;
    this.allowUIInput = false;
    SOUNDMAP.uiselect.play();    
  }
  unpressButton(){
    //called by keystrokes, not mouse
    if(this.selectedButton.held){
      this.selectedButton.held = false;
      this.selectedButton.onRelease();
    }
    if(!this.inTransition){
      //If this button called a fade to black transition, do not allow UI inputs
      this.allowUIInput = true;
    }
  }
  safeButtonCall(){
    //This is confusing, yes
    //This function takes in any number of arguments
    //safeButtonCall(this,function object,arg,arg,arg,arg...)
    //This returns a new function that terminates if ui input is not allowed
    //This should be used when binding a button call directly to a keypress
    if(arguments.length < 2){
      console.log("safeButtonCall() with less than 2 arguments");
      return;
    }
    var self = arguments[0];
    var callback = arguments[1];
    var args = [];
    for(var i = 2; i < arguments.length; i++){
      args.push(arguments[i]);
    }
    var f = function(){
      if(!this.allowUIInput)
        return;
      callback.apply(this,args);
    };
    return f.bind(this);
  }
  navigateUI(direction){
    if(this.selectedButton == undefined || this.selectedButton.buttonLinks[direction] == undefined 
      || !this.allowUIInput || !this.selectedButton.buttonLinks[direction].selectable)
      return;
    this.selectedButton.selected = false;
    this.selectedButton.buttonLinks[direction].selected = true;
    this.selectedButton = this.selectedButton.buttonLinks[direction];
    SOUNDMAP.uimove.play();
  }
  toggleDebug(){
    this.debug = !this.debug;
  }
  mousedown(e, mouse) {
    this.updateMousePosition(e);
    if(!this.allowUIInput)
      return;
    GUIMouseDown(e,this.buttons);
  }
  mouseup(e, mouse) {
    this.updateMousePosition(e);
    if(!this.allowUIInput)
      return;
    GUIMouseUp(e,this.buttons);
  }
  mousemove(e, mouse) {
    this.updateMousePosition(e);
    if(!this.allowUIInput)
      return;
    GUIMouseMove(this,e,this.buttons);
  }
  updateMousePosition(e){
    var percentPoint = getPercentPoint(e);
    if(isNaN(percentPoint[0]) || isNaN(percentPoint[1])) return;
    this.mouse = {x:percentPoint[0],y:percentPoint[1]};
    this.mouse.x = constrain(this.mouse.x,0,1); 
    this.mouse.y = constrain(this.mouse.y,0,1)
  }
  onPause() {

  }
  onResume() {
    
  }
}
class GUIElement{
  constructor(x,y,w,h,groupID){
    this.originalDimension = [x,y,w,h];
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.interactable = true; //Can this element be moused over/used/clicked?     
    this.selectable = true;  
    this.groupID = groupID;   //for ease of grouping UI elements (eg: 0 is main menu UI elements, 1 is level select elements etc)
    this.visible = true;      //should this be drawn? 

  }
  move(vx,vy){
    this.x += vx;
    this.y += vy;
  }
  contains(x,y){
    //x,y are in SCREEN PERCENT
    return x>= this.x && x<=this.x+this.w && y>=this.y && y<=this.y+this.h;
  }
  setVisibility(x){
    this.visible = x;
  }
  setOptions(interactable, selectable, visible){
    this.interactable = interactable;
    this.visible = visible;
    this.selectable = selectable;
  }
  getPixelDimensions(canvas){
    //returns pixel [x,y,width,height] for this button
    return [this.x*canvas.width, this.y*canvas.height, this.w*canvas.width, this.h*canvas.height];
  }
  reset(){
    this.x = this.originalDimension[0];
    this.y = this.originalDimension[1];
    this.w = this.originalDimension[2];
    this.h = this.originalDimension[3];
  }
  update(dt){}
  draw(canvas){}
}
function colorLerp(color1,color2,percent){
  //colors must be passed as [r,g,b,a]
  var result = color1.slice();
  for(var i = 0; i < 4; i++){
    result[i] = Math.round(result[i] + (color2[i]-color1[i])*percent);
  }
  return result;
}
function makeColorStr(colorArray){
  return 'rgba('+Math.floor(colorArray[0])+','+Math.floor(colorArray[1])+','
    +Math.floor(colorArray[2])+','+colorArray[3]+')';
}
function rectDimFromCenter(x,y,width,height){
  var result = [];
  result.push(x-width/2);
  result.push(y-height/2);
  result.push(width);
  result.push(height);
  return result;
}
function getPercentPoint(e){
  //Will return percentPoint relative to object clicked in
  //eg: if there was a smaller canvas in the game, clicking on that
  //would yield the percent point within that smaller canvas.
  //Currently this should never happen.
  if(e.percentPoint) return e.percentPoint; 
  var point = [];
  point.push(e.offsetX/e.target.offsetWidth);
  point.push(e.offsetY/e.target.offsetHeight);
  point[0] = constrain(point[0],0,1);
  point[1] = constrain(point[1],0,1);
  return point;
}
function moveAllGUI(vx,vy,guiList){
  for(var i = 0; i < guiList.length; i++){
    guiList[i].move(vx,vy);
  }
}
function getButtons(guiList){
  var result = [];
  for(var i = 0; i < guiList.length; i++){
    if(guiList[i] instanceof Button){
      result.push(guiList[i]);
    }
  }
  return result;
}
function pointContainsGUI(percentPoint,guiList){
  //returns UI at point or undefined if none
  for(var i = 0; i < guiList.length; i++){
    if(guiList[i].contains(percentPoint[0],percentPoint[1]) 
        && guiList[i].interactable){
      return true;
    }
  }
  return false;
}
function getGUIInGroup(n,guiList){
  var result = [];
  for(var i = 0; i < guiList.length; i++){
    if(guiList[i].groupID == n){
      result.push(guiList[i]);
    }
  }
  return result;
}
function GUIMouseDown(e,buttonList){
  
  var percentPoint = getPercentPoint(e);  
  switch(touchOn){
    case false:
      for(var i = 0; i < buttonList.length; i++){
        if(buttonList[i].contains(percentPoint[0],percentPoint[1]) 
            && buttonList[i].interactable){
          buttonList[i].held = true;
          if(buttonList[i].onClick) buttonList[i].onClick();
        }
      }
      break;

    case true:
      for(var i = 0; i < buttonList.length; i++){
        buttonList[i].selected = false;
        if(buttonList[i].contains(percentPoint[0],percentPoint[1]) 
          && buttonList[i].interactable){
        buttonList[i].selected = true;
        buttonList[i].held = true;
        if(buttonList[i].onClick) buttonList[i].onClick();
      }
      }
      break;
  }
}
function GUIMouseUp(e,buttonList){
  var percentPoint = getPercentPoint(e);  
  for(var i = 0; i < buttonList.length; i++){
    if(buttonList[i].interactable && buttonList[i].held && !buttonList[i].requireMouseInRegionOnRelease){
      buttonList[i].held = false;
      if(buttonList[i].onRelease) buttonList[i].onRelease();
      break;
    }
    if(buttonList[i].contains(percentPoint[0],percentPoint[1])
        && buttonList[i].interactable && buttonList[i].held){
      buttonList[i].held = false;
      if(buttonList[i].onRelease) {
        buttonList[i].onRelease();
        SOUNDMAP.uiselect.play();
      }
    } else {
      buttonList[i].held = false;
    }
  }
}
function GUIMouseMove(self, e, buttonList){
  if(buttonList == undefined)
    return;

  if(!touchOn){
    for(var j = 0; j < buttonList.length; j++){
      if(buttonList[j].held)
        return; //If a button is currently being held (meaning this is a mouse drag
                //that was initiated on a valid button), bail out
    }
  }
  var percentPoint = getPercentPoint(e);  
  for(var i = 0; i < buttonList.length; i++){
    buttonList[i].selected = false;
    if(buttonList[i].contains(percentPoint[0],percentPoint[1]) && buttonList[i].selectable){
      if(self.selectedButton != undefined)
        self.selectedButton.selected = false;
      buttonList[i].selected = true;
      if(self.selectedButton != buttonList[i]) SOUNDMAP.uimove.play();
      self.selectedButton = buttonList[i];
      break;    //In case of overlapping buttons, exit loop after first contains
    } 
  }
}



var FONT = "Handlee";
var movementKeys = [32,37,38,39,40];
var touchButtons = [];
function setUpTouchBtns() {
  var moveBtnWidth = 0.15;
  var moveBtnHeight = 0.3;
  touchButtons = [
  {
    x: -1, y: 1-moveBtnHeight, w: 1+moveBtnWidth, h: moveBtnHeight,
    key: 65,
  },
  {
    x: .01+moveBtnWidth, y: 1-moveBtnHeight, w: moveBtnWidth, h: moveBtnHeight,
    key: 68,
  },
  {
    x: .75, y: .5, w: 1, h: .24,
    key: 32,
  },
  {
    x: .75, y: .76, w: .2, h: .24,
    key: 83,
  },
 
];
}
setUpTouchBtns();
function pressed(b) {
  return b && (b==1 || b.pressed);
}
function handleGamePad(driver) {
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
  // if(gamepads2.length>0)
  for(var i=0;i<gamepads.length;i++) {
    var gp = gamepads[i];
    if(!gp || gp.buttons.length <= 0)continue;
    if(gp.axes) {
      var x = gp.axes[0];
      var y = gp.axes[1];
      if(Math.abs(x)<.25)x=0;
      if(Math.abs(y)<.25)y=0;
      // if(x>0)x=1;
      // if(x<0)x=-1;
      // player.mx += x;
      if(x>0) {
        this.heldRight=true;
        driver.keydown({keyCode: 68});
      } else if(this.heldRight) {
        this.heldRight=false;        
        driver.keyup({keyCode: 68});        
      }
      if(x<0) {
        this.heldLeft=true;
        driver.keydown({keyCode: 65});
      } else if(this.heldLeft) {
        this.heldLeft = false;
        driver.keyup({keyCode: 65});        
      }
      if(y>.8) {
        driver.keydown({keyCode: 83});
        this.heldDown = true;
      } else if(this.heldDown){
        this.heldDown = false;
        driver.keyup({keyCode: 83});
      }
      if(y<-.8) {
        driver.keydown({keyCode: 87});
        this.heldUp = true;
      } else if(this.heldUp){
        this.heldUp = false;
        driver.keyup({keyCode: 87});
      }
    }
    if(gp.buttons) {
      
      if(pressed(gp.buttons[0])) {
        // if(!this.heldA) player.jump();
        driver.keydown({keyCode: 32});
        this.heldA = true;
      } else if(this.heldA) {
        // player.shortJump();
        driver.keyup({keyCode: 32});        
        this.heldA = false;
      }
      if(pressed(gp.buttons[1])) {
        this.heldB = true;
        driver.keydown({keyCode: 27});
      } else if(this.heldB) {
        this.heldB = false;
        driver.keyup({keyCode: 27});
      }
    }
  }
}
  
var touchButtonMap = {};
var touchOn = false;
if (typeof window.orientation !== 'undefined') {
  touchOn = true;
}
class MainDriver {
  constructor(canvas) {
    this.canvas=canvas;
    this.frameCount=0;
    this.keys = [];
    this.scene = new VgdcSplashScreen(true);
    this.scene.driver = this;
    this.mouse = {x:0,y:0};
    this.soundsInitialized = false;
    this.timeoutes = [];
    this.gamepadOn=true;


   
  }
  setTimeout(callback, frames) {
    this.timeoutes.push({callback, frames});
  }
  userGesture() {
    if(!this.soundsInitialized) {
      initializeSound();
      this.soundsInitialized = true;
    }
    AUDIOCONTEXT.resume();    
  }
  update(dt) {
    this.frameCount+=dt;
    // var time = Date.now();
    // var dt = time-this.lastTime;
    // this.lastTime=time;
    if(this.gamepadOn)
    handleGamePad(this);
    this.scene.keys = this.keys;
    this.scene.update(dt, this.frameCount);
    for(var i=0;i<this.timeoutes.length;i+=1) {
      var t = this.timeoutes[i];
      t.frames -= 1;
      if(t.frames<=0) {
        t.callback();
        this.timeoutes.splice(i--, 1);
      }
    }
  }
  draw(canvas) {
    canvas.clearRect(0,0,canvas.width,canvas.height);
    this.scene.draw(canvas);
    if(touchOn && this.scene.touchButtonsActive) {
      var W = canvas.width;
      var H = canvas.height;
      canvas.save();    
      for(var i=0;i<touchButtons.length;i+=1) {
        var btn = touchButtons[i];
        var x = btn.x*W;
        var y = btn.y*H;
        var w = btn.w*W;
        var h = btn.h*H;
        canvas.fillStyle='rgba(0,0,0,.5)';
        if(btn.held) canvas.fillStyle='rgba(255,0,0,.6)';
        canvas.fillRect(x,y,w,h);
      }
      canvas.restore();
    }
  }
  jankyTouch(e) {
    var x = e.changedTouches[0].pageX;
    var y = e.changedTouches[0].pageY;
    // this.scene.mousedown(e, {x,y});
    // this.keydown({keyCode: 32});
    if(this.scene.startGame)this.scene.startGame();
    if(this.scene.time)this.scene.time=0;
    else {
      var player = this.scene.player;
      if(x>700) this.keydown({keyCode :68});
      else this.keyup({keyCode: 68});
      if(x<300) this.keydown({keyCode :65});
      else this.keyup({keyCode :65});        
      if(y<200)this.scene.keydown(32);
    }
    // this.scene.keydown(32);
    e.preventDefault();
  }
  enterTouchButton(btn, id) {
    btn.held = id;
    this.keydown({keyCode: btn.key});
    touchButtonMap[id] = btn;    
  }
  leaveTouchButton(btn, id) {
    btn.held = 0;
    this.keyup({keyCode: btn.key});
    touchButtonMap[id] = 0;    
  }
  getTouchPosition(touch, e) {
    var boundingClientRect = CE.getBoundingClientRect();    
    var x = touch.pageX-boundingClientRect.left;
    var y = touch.pageY-boundingClientRect.top;
    var W = this.canvas.canvas.offsetWidth;
    var H = this.canvas.canvas.offsetHeight;
    x = x/W;
    y = y/H;
    this.mouse.x=x * this.canvas.width;
    this.mouse.y=y * this.canvas.height;
    return{x,y};
  }
  touchstart(e) {
    this.userGesture();
    e.preventDefault();
    touchOn = true;
    // if(this.scene.startGame)this.scene.startGame();
    // if(this.scene.time)this.scene.time=0;
    var touches = e.changedTouches;
    e.preventDefault();    
    for(var i=0;i<touches.length;i++) {
      var touch = e.changedTouches[i];
      var {x, y} = this.getTouchPosition(touch, e);
      e.percentPoint = [x,y];
      this.scene.mousedown(e, this.mouse);    
      if(this.scene.touchButtonsActive){ 
        for(var j=0;j<touchButtons.length;j++) {
          var btn = touchButtons[j];
          if(pointInRect(x,y,btn)) {
            this.enterTouchButton(btn, touch.identifier);
          }
        }
      }
    }
  }
  touchmove(e) {
    e.preventDefault();
    for(var i=0;i<e.changedTouches.length;i+=1) {
      var touch = e.changedTouches[i];
      var {x, y} = this.getTouchPosition(touch, e);
      e.percentPoint = [x,y];      
      this.scene.mousemove(e, this.mouse);    
      if(this.scene.touchButtonsActive){
        var cbtn = touchButtonMap[touch.identifier];
        if(cbtn) {
          if(!pointInRect(x,y,cbtn)) {
            this.leaveTouchButton(cbtn, touch.identifier);
          }
        }
        for(var j=0;j<touchButtons.length;j++) {
          var btn = touchButtons[j];
          if(pointInRect(x,y,btn)) {
            this.enterTouchButton(btn, touch.identifier);
          }
        }
      }
    }
  }
  touchend(e) {
    e.preventDefault();
    for(var i=0;i<e.changedTouches.length;i+=1) {
      var touch = e.changedTouches[i];
      var {x, y} = this.getTouchPosition(touch, e);
      e.percentPoint = [x,y];      
      this.scene.mouseup(e, this.mouse);           
      
      var cbtn = touchButtonMap[touch.identifier];
      if(cbtn) {
        this.leaveTouchButton(cbtn, touch.identifier);
      }
      
      // for(var i=0;i<touchButtons.length;i++) {
      //   var btn = touchButtons[i];
      //   if(pointInRect(x,y,btn)) {
      //     this.leaveTouchButton(btn, touch.identifier);
      //   }
      // }
    }
  }
  keydown(e) {
    this.userGesture();
    var keys = this.keys;
    var k = e.keyCode;
    if(movementKeys.includes(k)&&e.preventDefault) {
      e.preventDefault();
    }
    if(keys[k])return;
    this.scene.keydown(k);
    keys[k] = true;
  }
  keyup(e) {
    var keys = this.keys;
    var k = e.keyCode;
    if(!keys[k])return;
    this.scene.keyup(k);
    keys[k] = false;
  }
  setMousePos(e) {
    var boundingClientRect = e.target.getBoundingClientRect();
    this.mouse.x = e.clientX-boundingClientRect.left;
    this.mouse.y = e.clientY-boundingClientRect.top;
    this.mouse.x *= canvas.width/e.target.offsetWidth;
    this.mouse.y *= canvas.height/e.target.offsetHeight;
  }
  mousedown(e) {
    this.userGesture();
    this.setMousePos(e);
    this.mouse.held = true;
    this.scene.mousedown(e, this.mouse);
  }
  mouseup(e) {
    this.setMousePos(e);
    this.mouse.held = false;
    this.scene.mouseup(e, this.mouse);
  }
  mousemove(e) {
    this.setMousePos(e);
    this.scene.mousemove(e, this.mouse);
  }
  setScene(scene) {
    if(this.scene&&this.scene.unload)this.scene.unload();
    scene.driver = this;
    this.scene = scene;
  }
  makeGrd() {
    var gx = canvas.width/2;
    var gy = canvas.height*2;
    var r = canvas.height*2;
    var grd=canvas.createRadialGradient(gx, gy, 0, gx, gy, r);
    grd.addColorStop(0,"rgba(255,100,100,1)");
    grd.addColorStop(1,"rgba(20,20,20,1)");
    // grd.addColorStop(1,"rgba(20,50,100,1)");
    return grd;
  }
  
}
var CE = document.getElementById('gc');
var canvas = CE.getContext('2d');
canvas.fillStyle='black';
canvas.fillRect(0, 0, CE.width, CE.height);
canvas.fillStyle='white';
canvas.font = '10px Arial';
canvas.textAlign = 'center';
canvas.fillText("LOADING", CE.width/2,CE.height/2);

var CELLMAP;
var MAIN;

window.onload = function() {
  CELLMAP = createBlocks();  
  // initializeSound();
  // CE.width = window.innerWidth;
  // CE.height = window.innerHeight;
  canvas.width = CE.width;
  canvas.height = CE.height;
  // window.addEventListener('resize', function(e) {
  //   CE.width = window.innerWidth;
  //   CE.height = window.innerHeight;
  //   canvas.width = CE.width;
  //   canvas.height = CE.height;
  // })
  canvas.font = "30px " + FONT;
  var driver = new MainDriver(canvas);
  MAIN = driver;
  var lastTime = Date.now();
  var FPScounter = 0;
  var currentFPS = 0;
  var lastFPSupdate = lastTime;
  function step() {
    var currentTime = Date.now();
    var dt = currentTime-lastTime;
    lastTime = currentTime;
    dt = dt * 60 / 1000;
    FPScounter ++;
    if(currentTime>lastFPSupdate+1000) {
      currentFPS = FPScounter;
      FPScounter=0;
      lastFPSupdate = currentTime;
    }
    dt = .8;   
    // dt = 1;
    driver.update(dt);
    // window.requestAnimationFrame(step);
  }
  // window.addEventListener('keydown', function() {
  //   driver.update(.8);
  // });
  function draw() {
    driver.draw(canvas);
    canvas.fillStyle = "white";
    canvas.textAlign = 'left';
    window.requestAnimationFrame(draw);    
  }
  draw();
  // step();
  setInterval(step, 1000/60);
  // window.addEventListener('keydown', function(){
    // step();
  // })
  function onresize(e){
    var rw = window.innerWidth/window.innerHeight;
    var rc = canvas.width/canvas.height;
    if(rw > rc) {
      CE.style.height = "100%";
      CE.style.width = "";
    } else {
      CE.style.width = "100%";
      CE.style.height = "";
    }
  }
  window.addEventListener('keydown', driver.keydown.bind(driver));
  window.addEventListener('keyup', driver.keyup.bind(driver));
  window.addEventListener('mousemove', driver.mousemove.bind(driver));
  window.addEventListener('mouseup', driver.mouseup.bind(driver));
  window.addEventListener('mousedown', driver.mousedown.bind(driver));
  window.addEventListener('touchstart', driver.touchstart.bind(driver));
  window.addEventListener('touchmove', driver.touchmove.bind(driver));
  window.addEventListener('touchend', driver.touchend.bind(driver));
  window.addEventListener('touchcancel', driver.touchend.bind(driver));
  window.addEventListener('resize', onresize);
  onresize();
}
addLevel( function(nameSpace) {
  {
    
    return {
      name: "Birds",
      worldType: 0,
      grid: [
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0,],
        [ 0, 0,19,19,19, 0, 0,19,19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,],
        [19,19,19,19,19,19,19,19,19,19,19,19, 0, 0, 0,19,19, 0,19, 0, 0, 0, 0, 0, 0, 0, 0,19,19,19,19,19, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 1, 1, 1, 1, 1,],
        [19,19,19,19,19,19,19,19,19,19,19,19, 0,19,19,19,19,19,19,19,19, 0, 0, 0,19,19,19,19,19,19,19,27,23, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 1, 1, 1, 1, 1,],
        [19,18,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19, 0, 0,19,19,19,19,19,19,19,27,18,19, 0, 0, 0, 0, 0,14,17,15, 0, 1, 1, 1, 1, 1,],
        [19,19,18,19,18,19,19,19,18,19,19, 0, 0,19,19,19,19,19,18,19,19,19, 0,19,19,19,19,19,19,15,18,27,19,19, 0, 0, 0, 0, 0, 0, 9, 9, 1, 1, 1, 1, 1, 1,],
        [ 0,19,18,18,19,19,19,18,19,19, 0, 0, 0,19,18,19,18,18,19,19,19,19, 0,19,19,19,19,19,27,23,23,23,19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1,],
        [ 0,19,19,19,18,19,19,19,19,19, 0, 0, 0,19,18,18,18,19,19,18,19,19, 0,19,19,18,18,19,27,19,19,19,19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1,],
        [ 0, 0, 0, 0,18,18,18,19,19, 0, 0, 0,19,19,19,19,18,19,18,17,19,19, 0, 0,19,19,18,18,27,18,18,19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1,],
        [ 0, 0, 0, 0, 0,18,19,19,19, 0, 0, 0, 0,19,19,19,18,18,18,17,14, 0, 0, 0, 0, 0,19,19,27,18,18,19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1,],
        [ 0, 0, 0, 0, 0,18,18, 0, 0, 0, 0, 0, 0, 0, 0,19,18,23,23,23, 9, 9, 9, 0, 0, 0,19,19,18,18,19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,],
        [ 0, 0, 0, 0, 0,18,18, 0, 0, 0, 0, 0, 0, 0, 0,19,18,18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,18,18,18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1,],
        [ 0, 0, 0, 0, 0,18,18, 0, 0, 0, 0, 0, 0, 0, 0, 0,18,18,18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,18,18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1,],
        [ 4, 0, 0, 0, 0,18,18,18, 0, 0, 0, 0, 0, 0, 0, 0,18,18,18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,18,18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1,],
        [ 1, 1, 1, 1, 1, 1,18,18,18, 0, 0, 0, 0, 0, 0,18,18,18,18,18,18, 0, 0, 0, 0, 0, 0, 0, 0,18,18,18, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1,],
        [ 1, 1, 1, 1, 1, 1, 1, 1,18, 0, 0, 0, 0,15,18, 1, 1, 1, 1, 1,18,18, 0, 0, 0, 0, 0, 0,18,18,18, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        ]
  };
    
  }
});class FallingParticle {
  constructor(x,y,w,h,vx,vy,life,color,da) {
    this.x=x;this.y=y;this.w=w;this.h=h;this.vx=vx;this.vy=vy;
    this.life = life||10;
    this.maxlife = this.life;
    this.color = color||"rgba(200,200,200,.4)";
    this.da = Math.PI/20;
    this.angle = 0;
  }
  update(dt) {
    dt = 1 + (dt/0.8-1) / 2;
    this.life--;
    if(this.life<=0) {
      this.shouldDelete = true;
      return;
    }
    this.x+=this.vx*dt;
    this.y+=this.vy*dt;
    this.angle += this.da;
    this.vy += .5*dt;
  }
  draw(canvas) {
    canvas.save();
    canvas.fillStyle = this.color;
    var w = this.w;// + (this.maxlife-this.life);
    var h = w;
    canvas.translate(this.x,this.y);
    canvas.rotate(this.angle);
    canvas.fillRect(-w/2,-h/2,w,h);
    canvas.restore();
  }
}addBlock(function() { 
    var drawTypes = { 
      grass: function(canvas, x,y,w,h, world,i,j) {
      var color1 = "#732";
      var color2 = "#843";
      var color3 = "#090";
      var ri = Math.floor(i*i/2+i)
      if(ri%j==1) {
        color1="#6a2a1a";
        color2="#7a3a2a";
      }
      if(ri%j==0) {
        color1="#621";
        color2="#732";
      }
      // var color1 = "#7c4a0c";
      // var color2 = "#965c15";
      // color1 = "#555";
      // color2 = "#777";
      // color3 = "#000";
      canvas.fillStyle=color1;
      canvas.fillRect(x,y,w,h);
      canvas.strokeStyle="#000";
      canvas.lineWidth = 1;
      // console.log(canvas.lineWidth);
      var s = Math.max(w,h);
      // canvas.strokeRect(x,y,w,h);
      canvas.fillStyle=color2;
      var ww = s/3;
      var hh = ww;
      var spacing = 10;
      for(var ii=0;ii<3;ii++) {
        var r1 = psuedoRandom(x,y,ii,1);
        var r2 = psuedoRandom(x,y,ii,2);
        var xx = Math.floor(r1*(w-ww)/spacing) * spacing;
        var yy = Math.floor(r2*(h-hh)/spacing) * spacing;
        canvas.fillRect(xx+x,yy+y,ww,hh);
      }
      if(!world)
        return;
      if(!world.getCell(i,j-1).groundBlock) {
        canvas.fillStyle=color3;
        canvas.fillRect(x,y,w,s/6);
        canvas.strokeRect(x,y,w,0);
      }
      if(!world.getCell(i,j+1).groundBlock) {
        canvas.strokeRect(x,y+h,w,0);
      }
      if(!world.getCell(i+1,j).groundBlock) {
        canvas.strokeRect(x+w,y,0,h);
      }
      if(!world.getCell(i-1,j).groundBlock) {
        canvas.strokeRect(x,y,0,h);
      }
      // canvas.save();
      // canvas.globalCompositeOperation='color-dodge';
      // var t=MAIN.frameCount;
      // var n = i*i+j*j+t;
      // var v = Math.abs((n)%(255*2-1)-255);
      //  var c = 'rgba('+v+','+v+','+v+',0.5)';
      // canvas.fillStyle = c;
      // canvas.fillRect(x,y,w,h);
      // canvas.restore();
    },
    dirt: function(canvas, x,y,w,h, world,i,j) {
      // var color1 = "#732";
      // var color2 = "#843";
      var color1 = "#654029";
      var color2 = "#7f5039";
      var color3 = "#a74";
      var s = Math.max(w,h);
      var ts = w/6;
      var ri = Math.floor(i*i/2+i+world.index*3);
      if(ri%j<=4) {
      var color1 = "#603a22";
        // color1="#2a6a1a";
        // color2="#3a7a2a";
        color3 = "#092";
        ts = w/5;
      }
      if(ri%j==5) {
        color1 = "#553019";
        color2 = "#6f4529";
        // color1="#261";
        // color2="#372";
        // color3 = "#070";
      }
      canvas.fillStyle=color1;
      canvas.fillRect(x,y,w,h);
      canvas.strokeStyle="#000";
      canvas.lineWidth = 1;
      // console.log(canvas.lineWidth);
      // canvas.strokeRect(x,y,w,h);
      canvas.fillStyle=color2;
      var ww = s/3;
      var hh = ww*.8;
      var spacing = 10;
      for(var ii=0;ii<3;ii++) {
        var r1 = psuedoRandom(x,y,ii,1);
        var r2 = psuedoRandom(x,y,ii,2);
        var xx = Math.floor(r1*(w-ww)/spacing) * spacing;
        var yy = Math.floor(r2*(h-hh)/spacing) * spacing;
        canvas.fillRect(xx+x,yy+y,ww,hh);
      }
      if(!world)
        return;
      if(!world.getCell(i,j-1).groundBlock) {
        canvas.fillStyle=color3;
        canvas.fillRect(x,y,w,ts);
        canvas.strokeRect(x,y,w,0);
      }
      if(!world.getCell(i,j+1).groundBlock) {
        canvas.strokeRect(x,y+h,w,0);
      }
      if(!world.getCell(i+1,j).groundBlock) {
        canvas.strokeRect(x+w,y,0,h);
      }
      if(!world.getCell(i-1,j).groundBlock) {
        canvas.strokeRect(x,y,0,h);
      }
      // canvas.save();
      // canvas.globalCompositeOperation='color-dodge';
      // var t=MAIN.frameCount;
      // var n = i*i+j*j+t;
      // var v = Math.abs((n)%(255*2-1)-255);
      //  var c = 'rgba('+v+','+v+','+v+',0.5)';
      // canvas.fillStyle = c;
      // canvas.fillRect(x,y,w,h);
      // canvas.restore();
    },
    grass2: function(canvas, x,y,w,h, world,i,j) {

      var color1 = "#5f3529";
      var color2 = "#6f4539";
      var color3 = "#093";
      // var color1 = "#473";
      // var color2 = "#584";
      // var color3 = "#093";

      // var color1 = "#666";
      // var color1 = "#732";
      // var color2 = "#473";
      // var color3 = "#492";
      // var color2 = "#777";
      // var color3 = "#999";

      // var color1 = "#621";
      // var color2 = "#731";
      // var color3 = "#090";
      var ri = Math.floor(i*i/2+i)
      // if(ri%j==1) {
      //   color1="#2a6a1a";
      //   color2="#3a7a2a";
      // }
      // if(ri%j==0) {
      //   color1="#261";
      //   color2="#372";
      // }
      // var color1 = "#7c4a0c";
      // var color2 = "#965c15";
      // color1 = "#555";
      // color2 = "#777";
      // color3 = "#000";
      canvas.fillStyle=color1;
      canvas.fillRect(x,y,w,h);
      canvas.strokeStyle="#000";
      canvas.lineWidth = 1;
      // console.log(canvas.lineWidth);
      var s = Math.max(w,h);
      // canvas.strokeRect(x,y,w,h);
      canvas.fillStyle=color2;
      var ww = s/2;
      var hh = ww/2;
      var spacing = 10;
      for(var ii=0;ii<3;ii++) {
        var r1 = psuedoRandom(x,y,ii,1);
        var r2 = psuedoRandom(x,y,ii,2);
        var xx = Math.floor(r1*(w-ww)/spacing) * spacing;
        var yy = Math.floor(r2*(h-hh)/spacing) * spacing;
        canvas.fillRect(xx+x,yy+y,ww,hh);
      }
      if(!world)
        return;
      if(!world.getCell(i,j-1).groundBlock) {
        canvas.fillStyle=color3;
        canvas.fillRect(x,y,w,s/6);
        canvas.strokeRect(x,y,w,0);
      }
      if(!world.getCell(i,j+1).groundBlock) {
        canvas.strokeRect(x,y+h,w,0);
      }
      if(!world.getCell(i+1,j).groundBlock) {
        canvas.strokeRect(x+w,y,0,h);
      }
      if(!world.getCell(i-1,j).groundBlock) {
        canvas.strokeRect(x,y,0,h);
      }
      // canvas.save();
      // canvas.globalCompositeOperation='color-dodge';
      // var t=MAIN.frameCount;
      // var n = i*i+j*j+t;
      // var v = Math.abs((n)%(255*2-1)-255);
      //  var c = 'rgba('+v+','+v+','+v+',0.5)';
      // canvas.fillStyle = c;
      // canvas.fillRect(x,y,w,h);
      // canvas.restore();
    },
    asdf: function(canvas, x,y,w,h, world,i,j) {
      var t = MAIN.frameCount;
      var v = Math.abs((i*j+t)%(255*2-1)-255);
       var c = 'rgb('+v+','+v+','+v+')';
      canvas.fillStyle = c;
      canvas.fillRect(x,y,w,h)
    },
    funTime: function(canvas, x,y,w,h, world,i,j) {
      // var r = Math.floor(Math.random()*255);
      // var g = Math.floor(Math.random()*255);
      // var b = Math.floor(Math.random()*255);
      // var c = 'rgb('+r+','+g+','+b+')';
      var p = MAIN.scene.player;
      var hue = Math.floor(Math.random()*255);        
      var a = 1;
      if(p) {
        var dx = p.x - (x+w/2);
        var dy = p.y - (y+h/2);
        var r = Math.sqrt(dx*dx+dy*dy);
        hue = Math.floor(r - MAIN.frameCount + p.width*10)%255;
        // a = 1/(r/10+1);
        a = 1 - r/100;
        // if(a>.5)a=a/2+.5;
        if(a<0)a=0;
        a += 1/(r/10+1);
        // if(r>100)a=1/(r/100+1);
        // if(r>200)a=.1;          
        // if(r>300)a=0;
      }
      canvas.fillStyle = 'hsla('+hue+',100%,50%,'+a+')';
      canvas.fillRect(x,y,w,h)
    },
    concrete: function(canvas, x,y,w,h, world,i,j) {
      // var color1 = "#666";
      var color1 = "#000";
      // var color2 = "rgba(150,150,150,.5)";
      var color2 = '#777';
      var color3 = "#aaa";
      var ri = Math.floor(i*i/2+i)
      // var color1 = "#7c4a0c";
      // var color2 = "#965c15";
      // color1 = "#555";
      // color2 = "#777";
      // color3 = "#000";
      canvas.fillStyle=color1;
      canvas.fillRect(x,y,w,h);
      canvas.strokeStyle="#fff";
      var s = Math.max(w,h);
      // canvas.strokeRect(x,y,w,h);
      canvas.fillStyle=color2;
      var ww = s/2;
      var hh = ww;
      var spacing = 10;
      // canvas.save();
      // canvas.globalCompositeOperation='lighten';
      // for(var ii=0;ii<3;ii++) {
      //   var r1 = psuedoRandom(x,y,ii,1);
      //   var r2 = psuedoRandom(x,y,ii,2);
      //   var xx = Math.floor(r1*(w-ww)/spacing) * spacing;
      //   var yy = Math.floor(r2*(h-hh)/spacing) * spacing;
      //   canvas.fillRect(xx+x,yy+y,ww,hh);
      // }
      // canvas.restore();
      if(!world)
        return;
      if(!world.getCell(i,j-1).groundBlock) {
        canvas.fillStyle=color3;
        canvas.fillRect(x,y,w,s/8);
        canvas.strokeRect(x,y,w,0);
      }
      if(!world.getCell(i,j+1).groundBlock) {
        canvas.strokeRect(x,y+h,w,0);
      }
      if(!world.getCell(i+1,j).groundBlock) {
        canvas.strokeRect(x+w,y,0,h);
      }
      if(!world.getCell(i-1,j).groundBlock) {
        canvas.strokeRect(x,y,0,h);
      }
    },
  };
    return {
  //Ground
    id: BLOCKS.length,
    name: "Ground",
    solid: true,
    groundBlock: true,
    safe: true,
    // redraws: true,
    draw: function(canvas, x,y,w,h, world,i,j) {
      var type = (world&&world.worldtype) || 0;
      // type = 3;
      // this.redraws = true;
      this.drawTypes[type](canvas,x,y,w,h,world,i,j);
      // if(type == 3) this.redraws = true;
      // else this.redraws = false;
    },
    onload: function(game, x,y,width,height, world,ii,jj) {
      var block = world.getCell(ii,jj-1);
      if(!block.air) { return };
      if(Math.random()<.5)return;
      for(var i=0;i<3;++i) {
        game.unshift(new Grass(x+width/2,y, ii,jj));
      }
      if(Math.random()<.75)return;
      game.unshift(new Butterfly(x+width/2,y, ii,jj));
    },
    drawTypes: {
      0: drawTypes.grass,
      1: drawTypes.dirt,
      2: drawTypes.concrete,
      3: drawTypes.funTime,
    }
}});

/*
(canvas, x,y,w,h, world,i,j) {
    var v = Math.abs((i*j+t)%(255*2-1)-255);
   	var c = 'rgb('+v+','+v+','+v+')';
    canvas.fillStyle = c;
    canvas.fillRect(x,y,w,h)
    if(i==0&j==0) t+= 1;
}
*/SOUNDMAP.crouch = new SoundSource("jumpSound1-1.m4a", 3);
// SOUNDMAP.crouch = new SoundSource("crouch2.wav");
SOUNDMAP.land = new SoundSource("jumpSound1-2.m4a", 0.75);
// SOUNDMAP.jump = new SoundSource("crouch1-1.m4a", 3, 4);
SOUNDMAP.jump = new SoundSource("jump.wav", 1, 0.5);
SOUNDMAP.jump2 = new SoundSource("jumpSound1-1.m4a", 3, 1);
SOUNDMAP.wallJump = new SoundSource("crouch1-1.m4a", 2);
// SOUNDMAP.doubleJump = new SoundSource("jumpSound1-1.m4a", 5);
SOUNDMAP.doubleJump = new SoundSource("Double_Jump.wav", 1, 0.5);
// SOUNDMAP.powerup = new SoundSource("jumpSound1-2.m4a", 2);
SOUNDMAP.powerup = new SoundSource("Swipe.wav", 1);

SOUNDMAP.uncrouch = new SoundSource("crouch1-1.m4a", 4);
// SOUNDMAP.playerDeath = new SoundSource("rip.m4a");
SOUNDMAP.playerDeath = new SoundSource("Death.wav", null, 2);
SOUNDMAP.levelComplete = new SoundSource("Level_Complete.wav", 1, 0.5);
SOUNDMAP.pigrip = 
// new MixAudio([
  // new SoundSource("guitarlick2.m4a", 1),
  // new SoundSource("rip.m4a", 3);
  new SoundSource("Swipe.wav", 3);
// ]);
SOUNDMAP.bounce = new SoundSource("Bounce2.wav", 1);
SOUNDMAP.throw = new SoundSource("Throw.wav");
SOUNDMAP.uimove = new SoundSource("UI_Move2.wav", null, 0.2);
SOUNDMAP.uiselect = new SoundSource("UI_Select3.wav", null, 0.2);
// SOUNDMAP.songtroll = new MusicSource("Beep.wav");
SOUNDMAP.footstep = new PickAudio([
  new SoundSource("Steps1.wav"),
  new SoundSource("Steps2.wav"),
  new SoundSource("Steps3.wav"),
  new SoundSource("Steps4.wav"),
  new SoundSource("Steps5.wav"),
])

SOUNDMAP.hapMusic = new MusicSource("Hap_Yay.mp3", 1, 1);
SOUNDMAP.woofMusic = new MusicSource("Dance_of_the_Woofs.mp3", 1, 1);
SOUNDMAP.challengeMusic = new MusicSource("Challenge2.mp3");
SOUNDMAP.music = new MusicHandler(SOUNDMAP.hapMusic, SOUNDMAP.woofMusic, SOUNDMAP.challengeMusic,);

class SplashScreenScene extends Scene {
  constructor(playIntro, imageUrl, nextScene) {
    super(playIntro);
    this.splash = new Image();
    this.nextScene = nextScene;
    // this.splash.src = IMAGEASSETS + "CoolmathGames-800x600.jpg";
    // this.splash.src = IMAGEASSETS + "CoolmathGames-640x480_no-URL.jpg";
    this.splash.src = IMAGEASSETS + imageUrl;
    this.splash.onload = this.start.bind(this);
    this.running = false;
    this.showTime = 500;
    this.endingTime = 200;
    this.iconScale = 0.8;
    this.keyMap = {
      '27': {down: this.skip.bind(this)}
    }
  }
  start() {
    this.running = true;
    this.startTransition(25, -1, () => {
      setTimeout(() => {
        this.startTransition(15, 1, () => {
          this.running = false;
          setTimeout(() => {
            this.end();
          }, this.endingTime);
        })
      }, this.showTime)
    })
  }
  skip() {
    this.end();
  }
  end() {
    this.driver.setScene(new this.nextScene(true));
  }
  draw(canvas) { 
    canvas.fillStyle = 'black';
    canvas.fillRect(0,0,canvas.width,canvas.height);
    if (this.running) {
      var image = this.splash;
      var w = canvas.height * image.width / image.height;
      var h = canvas.height;
      w *= this.iconScale;
      h *= this.iconScale;
      var x = canvas.width/2 - w/2;
      var y = canvas.height/2 - h/2;
      canvas.drawImage(image, x,y, w, h);
      if(this.text) {
        canvas.fillStyle = 'white';
        canvas.fillText(this.text, x,y,w,h);
      }
    }
    drawTransitionOverlay(this.overlayColor,canvas);
  }
}class Button extends GUIElement {
  constructor(x,y,w,h,groupID,onRelease){
    super(x,y,w,h,groupID);
    this.onRelease = onRelease;
    this.onPress = undefined;
    this.onHold = undefined;
    this.held = false;
    this.selected = false;
    //buttonlinks can be filled in later 
    //(buttons to be linked to may not exist at this time)
    //buttonLinks[0] = UP
    //buttonLinks[1] = RIGHT
    //buttonLinks[2] = DOWN
    //buttonLinks[3] = LEFT
    this.requireMouseInRegionOnRelease = true;
    this.buttonLinks = Array(4).fill(undefined);
    this.value = undefined;   //value has no set type.
                              //it is simply some variable that you want associated with the button
  }
  setNeighbors(buttonList){
    this.buttonLinks = buttonList;
  }
  getNeighbor(direction){
    switch(direction){
      case "up":
        return this.buttonLinks[0];
      case "right":
        return this.buttonLinks[1];
      case "down":
        return this.buttonLinks[2];
      case "left":
        return this.buttonLinks[3];
      default:
        console.log("getNeighbor()->Expected: [up,right,down,left]");
        console.log("               Received: " + direction);
        return undefined;
    }
  }
  
  
  
  update(dt){}
  draw(canvas){}
}addLevel( function(nameSpace) {
  {
    
    return {
      name: "The Height",
      worldType: 0,
      grid: [
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27,27,27,27,27, 0, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27,23,23,23,23,23,27, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27,27,27,27,27,27,27,27,27, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27,27,23,23,27,23,23,27,27, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27,23,18,18,27,18,18,23,27, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0,23,18, 9, 9,23, 9, 9,18,23, 0, 0,],
        [ 4, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0,23,18,18,18,23,18,18,18,23, 0, 5,],
        [ 1, 1, 1, 0, 0, 0, 0, 0,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 9,23,27,27,27,27,27,27,27,27,27,23, 9,],
        [ 1, 1, 1, 1, 0, 0, 0, 0,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0,27,23,23,27,27,27,23,23,27, 0, 0,],
        [ 1, 1, 1, 1, 1, 0, 0,15,17,14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17,14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0,27,23,23,23,27,23,23,23,27, 0, 0,],
        [ 1, 1, 1, 2, 1, 9, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0,27, 0,15, 0, 0, 0,15, 0,27, 0, 0,],
        [ 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0, 0, 0, 0, 0, 0, 0,27,23,23,23,23,23,23,23,27, 0, 0,],
        [ 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17,14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0, 0, 0, 0, 0, 0, 0,27, 0,15, 0, 0,15,15, 0,27, 0, 0,],
        [ 1, 1, 1, 1, 1, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 2, 0, 0, 0, 0, 0, 0, 0,27,23,23,23,23,23,23,23,27, 0, 0,],
        [ 1, 1, 1, 1, 1,23, 9, 9,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0,27, 0, 0, 0, 0, 0, 0, 0,27, 0,15,15,15, 0,15, 0,27, 0, 0,],
        [ 1, 1, 1, 1, 1, 0, 0, 0,27, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0,27, 0, 0, 0, 0, 0, 0, 0, 0,27, 0, 0, 0, 0, 0, 0, 0,27,27,27,27,27,27,27,27,27, 0, 0,],
        [ 1, 1, 1, 0, 0, 0, 0, 0,27, 0, 0, 0, 0,27, 0, 0, 0, 0, 0, 0, 0, 0,27, 0, 0, 0, 0, 0, 0, 0, 0,27, 0, 0, 0, 0, 0, 0, 2,27,27,23,23,27,23,23,27,27, 0, 0,],
        [ 1, 1, 1, 0, 0, 0, 0, 0,27, 0, 0, 0, 0,27, 0, 0, 0, 0, 0, 0, 0, 0,27, 0, 2, 0, 0, 0, 2, 0, 0,27, 0, 0, 0, 0, 0, 0,27,27,27,18,18,27,18,18,27,27, 0, 0,],
        [ 1, 1, 1, 0, 0, 0, 0, 0,27, 0, 0, 2, 0,27, 0, 0, 2, 0, 0, 0, 0, 0,27, 0,27, 0, 0, 0,27, 0, 0,27, 0, 0, 0, 0, 0, 0,27,27,27,18,18,27,18,18,27,27, 0, 0,],
        [ 1, 1, 1, 1, 1, 0, 0, 0,27, 0, 0,27, 0,27, 0, 0,27, 0, 0, 0, 0, 0,27, 0,27, 0, 0, 0,27, 0, 0,27, 0, 0, 2, 0, 0, 0,27,27,27,18,18,27,18,18,27,27, 0, 0,],
        [ 1, 1, 1, 1, 1, 1, 0, 0,27, 0, 0,27, 0,27, 0, 0,27, 0, 0, 2, 0, 0,27, 0,27, 0, 0, 0,27, 0, 0,27, 0, 0,27, 0, 0, 0,27,27,27,18,18,27,18,18,27, 1, 0, 0,],
        [ 1, 1, 1, 1, 1, 1, 0, 0,27, 0, 0,27, 0,27, 0, 0,27, 0, 0,27, 0, 0,27, 0,27, 0, 0, 0,27, 0, 0,27, 0, 0,27, 0, 0, 0,27,27,27,18,18,27,18,18,27, 1, 0, 0,],
        [ 1, 1, 1, 1, 1, 1, 1, 0,27, 0, 0,27, 0,27, 0, 0,27, 0, 0,27, 0, 0,27, 0,27, 0, 0, 0,27, 0, 0,27, 0, 0,27, 0, 0, 0,27,27,27,18,18,27,18, 1, 1, 1, 0, 0,],
        [ 1, 1, 1, 1, 1, 1, 1, 0,27, 0, 0,27, 0,27, 0, 0,27, 0, 0,27, 0, 0,27, 0,27, 0, 0, 0,27, 0, 0,27, 0, 0,27, 0, 0, 0,27,27,27,18,18,27,18, 1, 1, 1, 0, 0,],
        [ 1, 1, 1, 1, 1, 1, 1, 1,27, 0, 0,27, 0,27, 0, 0,27, 0, 0,27, 0, 0,27, 0,27, 0, 0, 0,27, 0, 0,27, 0, 0,27, 0, 0, 0,27,27,27,18,18,27,18, 1, 1, 1, 0, 0,],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,27, 0,27, 0, 0,27, 0, 0,27, 0, 0,27, 0,27, 0, 0, 0,27, 0, 0,27, 0, 0,27, 0, 0, 0,27,27,27,18,18,27,18, 1, 1, 1, 0, 0,],
        ]
  };
    
  }
});
class Mover {
  constructor(x,y) {
    this.x = x||10;
    this.y = y||10;
    this.w = 25;
    this.h = 35;
    this.width = this.w;
    this.height = this.h;
    this.vx = 0;
    this.vy = 0;
    this.grav = .8;
    this.mx = 0;
    this.my = 0;
    this.speed = 10;
    this.grounded = false;
    this.jumpPower = 15;
    this.flipped = false;
    this.color = "#000";
    this.cloudParticlesOn = true;
    this.wallcolliding = false;
    this.maxJumps = 1;
    this.jumpCount = 0;
    this.dashCount = 0;
    this.angle = 0;
    this.terminalVelocity = 15;
    this.mover = true;
    this.wallSlides = true;
    this.wallJumps = false;
    this.groundAccel = 2;
    this.airAccel = 1.5;
    this.currentGroundAccel = this.groundAccel;
    this.diesToSpikes = false;
    this.spinning = false;
    this.invisible=false;
    this.ceilingColliding=false;
    this._angle = 0;
    this.movementStun=0;
    this.jumpSoundType = SOUNDMAP.jump2;
  }
  die() {
    this.shouldDelete=true;
  }
  update(dt, frameCount) {
    if(this.mx>1)this.mx=1;
    if(this.mx<-1)this.mx=-1;
    if(this.my>1)this.my=1;
    if(this.my<-1)this.my=-1;
    if(this.movementStun>0) {
      this.movementStun--;
    }
    if(this.mx && !this.spinning){
      this.flipped=this.mx<0;
      if(!this.wallcolliding&&this.cloudParticlesOn&&this.grounded&&!this.crouching&&(frameCount%20==0||this.vx*this.mx<=0||Math.abs(this.vx)<1)) {
        for(var i=0;i<3;i++) {
          this.game.addEntity(new Cloud(this.x-this.mx*i*5,this.y+Math.random(),5+i*2,10,-this.mx,0,10+i*2));
        }
      }
    }
    if(this.crouching&&this.grounded) {
      this.vx -= this.vx / 10;
      this.mx = 0;
    } else {
      // this.vx += (this.mx*this.speed-this.vx)/3;     
      var ga = this.currentGroundAccel;
      if(!this.grounded)ga = this.airAccel;
      var mx = this.mx;
      if(this.movementStun) mx =0;
      if(mx==0&&this.grounded)ga = 10;
      this.vx = linearMove(this.vx, mx*this.speed, ga*dt); 
    }
    this.vy += this.grav * dt;
    var tv = this.terminalVelocity;
    if(this.crouching) tv = tv*1.4;
    else if(this.jumpCount<this.maxJumps)tv *= 0.8;
    if(this.vy>tv)this.vy = tv;
    // this.x += this.vx;
    // this.y += this.vy;
    // this.safeMove(this.vx*dt,(this.vy - this.grav * dt/2)*dt);    
    this.safeMove(this.vx*dt,this.vy*dt + this.grav * dt * dt /2);
    // staticWorldCollide(this);
    // safeMoveOnWorld(this,this.vx,this.vy);
    if(!this.ghostOn) {
      var maxHeight = this.game.world.h*this.game.world.s+200;
      if(this.y > maxHeight) {
        this.groundCollide(maxHeight);
      }
    }
    if(this.wallCollideTimer>0)this.wallCollideTimer-=1;
    if(this.vy>0) {
      this.grounded = false;
    }
    if(this.wallcolliding) {
      // this.spinning = false;
      
      if(this.wallJumps&&this.wallSlides&&this.vy>0) {
        this.vy = this.vy * .7;
        if(!this.spinning) {
          // this.flipped = this.mx > 0;
        }
        // this.width -= .5;
        // this.height += .5;
      }
      if(this.wallJumps)this.wallCollideTimer = 10;
    } else if(this.wallCollideTimer>0&&this.mx!=0&&((this.mx>0)==this.walldirection)) {
      this.wallCollideTimer=0;
    }
    // if(this.wallCollideTimer>0) {
    //   this.x -= this.vx;
    // }
    if(this.vy>this.grav*3&&this.jumpCount==0)this.jumpCount=1; 
    if (this.jumpCount == 1 && !this.wallcolliding) {
      // this.angle = Math.atan2(-this.vy, this.vx);//,this.vy);
      this.angle = -Math.cos(this.vy/this.terminalVelocity*Math.PI)*(1-2*this.flipped)*Math.abs(this.vx/this.speed)/2;
    }
    else if(this.spinning&&!this.ceilingColliding) {
      if(this.wallcolliding) {
        this.angle -= angleBetween(this.angle, 0)/5 * -(1-2*this.flipped); 
      } else {
        this.angle += Math.PI/10*(1-2*this.flipped);
      }
      // this.width += 1;
      // this.height -=  4;
    } else if(Math.abs(this.vx)>1&&!this.wallcolliding&&!this.crouching&&this.grounded) {
      // this.angle = (Math.cos(this.x/this.speed*10*Math.PI/70)*Math.PI/20-Math.PI/40*(this.vx/this.speed));
      this.angle = -Math.PI/40*this.vx/this.speed + Math.cos(frameCount*Math.PI/7)*Math.PI/20;
    } else {
      this.angle = 0;
    }
    if(this.crouching) {
      this.width += (this.w*1.2-this.width)/2;
      this.height += (this.h*.6-this.height)/2;
    } else if(this.spinning) {
      this.width += (this.w*1-this.width)/5;
      this.height += (this.h*1-this.height)/5;
    } else {
      this.width += (this.w-this.width)/8;
      this.height += (this.h-this.height)/8;
    }
    if(this.ceilingColliding && (this.h-this.height) <= .5) {
      this.ceilingColliding = false;
    }
  }
  safeMove(vx,vy) {
    if(this.ghostOn) {
      this.x += vx;
      this.y += vy;
      return;
    }
    var world = this.game.world;
    var w = this.w;
    var h = this.h;
    var d = 0;//(1-2*this.flipped)*10;
    // this.ceilingColliding=false;    
    var xCol = world.rectCollides(this.x-w/2+vx+d, this.y-h+1,w,h-2,this, d+vx,0)
    if(!xCol) {
      this.x += vx;
      this.wallcolliding=false;
    } else {
      if(xCol.i%2===1) {
        var c = Math.floor((this.x+w/2+vx+d)/world.s);
        var cx = xCol.x;
        this.x = cx-w/2-1;
      } else {
        var c = Math.floor((this.x-w/2+vx+d)/world.s+1);
        var cx = xCol.x+xCol.w;
        this.x = cx+w/2+1;
      }
      this.walldirection = (this.vx+d)>0;
      // if(this.vx>0)this.vx = 1;
      // else this.vx = -1;
      if(!(this.wallJumps&&this.wallSlides&&!this.grounded)) {
        this.vx = 0;
      } else {
        if(this.vx>this.speed/2)this.vx=this.speed/2;
        else if(this.vx<-this.speed/2)this.vx = -this.speed/2;
      }
      this.wallcolliding=true;
    }
    // return
    var yCol = world.rectCollides(this.x-w/2,this.y-h+vy,w,h,this, 0,vy);
    if(yCol) {
      if(this.vy>0) {
        this.groundCollide(Math.floor(yCol.y));        
        this.ceilingColliding=false;        
      } else {
        this.y = yCol.y+h+world.s;
        // this.vy = 0;
        this.width+=-this.vy+3;
        this.height-=5;
        // this.spinning=false;
        this.vy = this.vy*.7;
        vy = 0;
        this.ceilingColliding=true;
      }
    } else {
      this.y += vy;
    }
  }
  land() {
    this.width += 30;
    this.height -= 20;
    this.currentGroundAccel=this.groundAccel/2;
    SOUNDMAP.land.play(this);
    var self = this;
    setTimeout(function(){
      self.currentGroundAccel = self.groundAccel;
    }, 10);
    if(!this.crouching) {
      this.vx = 0;
    }
    if(this.cloudParticlesOn) {
      for(var i=0;i<6;i++) {
        this.game.addEntity(new Cloud(this.x+this.w/2+4,this.y+3,3+Math.random(),10,3*Math.random()-3*Math.random(),0));
        this.game.addEntity(new Cloud(this.x-this.w/2-4,this.y+3,3+Math.random(),10,3*Math.random()-3*Math.random(),0));
      }
    }
  }
  groundCollide(y, animationless) {
    this.y = y;
    this.vy = 0;
    if(!this.grounded && !animationless) {
      this.land();
    }
    this.grounded = true;
    this.jumpCount = 0;
    this.dashCount = 0;
    this.spinning=false;
  }
  draw(canvas) {
    if(this.invisible)return;
    var h = this.height;
    var w = this.width;
    canvas.save();
    canvas.translate(this.x,this.y);
    if(this.ceilingColliding) {
      canvas.translate(0,-this.h+this.height);
    }
    if(Math.abs(this.vx)>1&&!this.wallcolliding&&!this.crouching&&this.grounded) {
      canvas.translate(0,-(Math.sin(this.x/this.speed*10*Math.PI/70)+1)*3)
    }
    if(this.spinning) {
      canvas.translate(0,-h/2);      
    }
    canvas.rotate(this.angle+this._angle);
    if(this.spinning) {
      canvas.translate(0,h/2);      
    }
    if(this.flipped) {
      canvas.scale(-1,1);
    }
    if(this.wallcolliding&&this.wallSlides&&this.wallJumps) {
      canvas.translate(-(this.w-this.width)/2,0);
    }
    this.drawShape(canvas,w,h);
    canvas.restore();
  }
  drawShape(canvas,w,h) {
    canvas.fillStyle = this.color;    
    canvas.fillRect(-w/2,-h, w,h);
  }
  jump(amt, noSound) {
    this.jumpRelease=false;    
    if(this.jumpSquating)return;
    // if(!this.grounded)return;
    if(this.wallCollideTimer>0&&this.wallJumps&&!this.grounded) {
      return this.wallJump();
    }
    if(this.jumpCount>=this.maxJumps)return;
    var time = 30;
    var jumpPower = amt || this.jumpPower;
    if(this.jumpCount>0) {
      time = 0;
      jumpPower += 2;
    } 
    {
      this.width = 55;
      this.height = 15;
    }
    // this.grounded = false;
    this.vy = 0;
    // this.jumpCount++;   
    this.jumpSquating = true; 
    this.vx = 0;
    this.currentGroundAccel=0;
    setTimeout(function() {
      this.jumpSquating = false;      
      this.vx = this.mx*this.speed; 
      this.currentGroundAccel=this.groundAccel;
      if(this.jumpCount>=this.maxJumps)return;      
      this.jumpCount++;
      this.grounded=false;
      if(this.jumpCount>1)this.spinning=true;
      else {
        this.height += 10;
        this.width -= 10;
      }
      this.vy = -jumpPower;
      if(!noSound)
      this.playJumpSound();
      if(this.jumpRelease) this.vy = this.vy * .65;
      if(this.cloudParticlesOn) {
        for(var i=0;i<3;i++) {
          this.game.addEntity(new Cloud(this.x-i*5,this.y,5+i*2,10,-2,0,5+i*2));
          this.game.addEntity(new Cloud(this.x+i*5,this.y,5+i*2,10,2,0,5+i*2));
          this.game.addEntity(new Cloud(this.x-6+i*3,this.y,5,10,-1+i,0,5+i*2));
        }
      }
    }.bind(this), time);
    
  }
  playJumpSound() {
    var jumpSoundType = this.jumpSoundType;
    if(this.jumpCount > 1) {
      jumpSoundType = SOUNDMAP.doubleJump;
    }
    this.jumpSound = jumpSoundType.play(this);
  }
  wallJump() {
    this.jumpCount = 1;
    this.dashCount = 0;
    this.vy = -this.jumpPower;
    // this.playJumpSound();
    SOUNDMAP.wallJump.play();
    this.grounded = false;
    this.height += 10;
    this.width -= 10;
    this.spinning = false;
    if(this.cloudParticlesOn) {
      for(var i=0;i<3;i++) {
        this.game.addEntity(new Cloud(this.x-i*5,this.y,5+i*2,10,-2,0,5+i*2));
        this.game.addEntity(new Cloud(this.x+i*5,this.y,5+i*2,10,2,0,5+i*2));
        this.game.addEntity(new Cloud(this.x-6+i*3,this.y,5,10,-1+i,0,5+i*2));
      }
    }
    this.vx = 12*(1-2*this.walldirection)*.7;
    this.wallcolliding=0;
    this.wallCollideTimer=0;
  }
  shortJump() {
    this.jumpRelease = true;
    if(!this.grounded&&this.jumpCount==1&&this.vy<-this.jumpPower/2) {
      this.vy = this.vy*.65;
      this.jumpSound.stopSound();
    }
  }
  crouch() {
    if(!this.crouching) {
      this.width = 50;
      this.height = 10;
      SOUNDMAP.crouch.play();
    }
    this.crouching = true;
    if(!this.grounded&&this.vy>0) this.vy += 10;
  }
  uncrouch() {
    if(this.crouching) {
      this.height = 40;
      this.width = 23;
      SOUNDMAP.uncrouch.play();      
    }
    this.crouching = false;
  }
  getHitBox() {
    var w = this.width;
    var h = this.height;
    return {x:this.x-.5*w, y:this.y-h, w:w, h:h};
  }
  dash(dir) {
    if(!DASHON) return;
    if(dir==undefined) dir = this.mx;
    if(!dir) dir = 1-2*this.flipped;
    if (this.dashCount == 0)
    {
      // if(this.grounded || this.jumpCount < this.maxJumps)
      {
        this.dashCount++;
        SOUNDMAP.dash.play(this);
        this.vx = (.5 * this.vx) + 30 * (dir);
        // if (this.vy < 0)
          // this.jumpCount++;
        // else
          this.vy = -10;
        this.grounded=false;
      }
    }
  }
}addBlock(function() { return {
      //Spike
      id: BLOCKS.length,
      name: "Spike",
      solid: true,
      angle: 0,
      redraws: false,
      draw: function(canvas, x,y,w,h, world,i,j) {
        if(world.getCell(i,j-1).trunk||world.getCell(i,j+1).trunk||world.getCell(i+1,j).trunk||world.getCell(i-1,j).trunk)
        CELLMAP[18].draw(canvas,x,y,w,h,world,i,j);   
        this.drawSpike(canvas,x,y,w,h,world,i,j);
      },
      drawSpike: function(canvas, x,y,w,h, world,i,j) {
        canvas.fillStyle="white";
        canvas.strokeStyle = "#000";
        canvas.save();
        canvas.translate(x+w/2,y+h/2);
        canvas.rotate(this.angle);
        // this.angle += Math.PI/20*1.5;
        w=w*.9;
        h=h*.9;
        for(var i=0;i<3;i++){
          canvas.rotate(Math.PI/8);
          canvas.fillRect(-w/2,-h/2,w,h);        
          canvas.strokeRect(-w/2,-h/2,w,h);
        }
        w=w*.8;
        h=h*.8;
        canvas.rotate(-3*Math.PI/8);
        canvas.fillStyle="grey";
        canvas.fillRect(-w/2,-h/2,w,h);      
        canvas.restore();
      },
      entityCollision: function(entity, pos) {
        if(entity.player) entity.die();
        return true;
      },
      // isColliding: function(entity, pos,dx,dy,cellPos) {
      //   if (pos.y-dy >= cellPos.y + 1) return { y: cellPos.y + 1};
      // }
}});
class VgdcSplashScreen extends SplashScreenScene {
  constructor(playsIntro) {
    super(playsIntro, "vgdc.png", MenuScene);
    this.endingTime = 400;
    this.showTime = 700;
    this.iconScale = 0.6;
    this.text = 'Video Game Development Club at UCI'
  }
}class TextButton extends Button{
  constructor(x,y,w,h,groupID,onRelease,text,font, 
    textColor,rectBackFillColor,rectOutlineColor, strokeWidth){
    super(x,y,w,h,groupID,onRelease);
    this.text = text;
    this.font = font;
    //optional values below (transparent if not given)
    this.textColor = textColor || "rgba(0,0,0,0)";
    this.rectBackFillColor = rectBackFillColor || "rgba(0,0,0,0)";
    this.rectOutlineColor = rectOutlineColor || "rgba(0,0,0,0)";
    this.strokeWidth = strokeWidth || 1;
  }
  update(dt){}

  draw(canvas){

    var dim = this.getPixelDimensions(canvas);
    this.drawRectangle(canvas,dim);
    if(!touchOn){
      if(this.selected && !this.held)
        this.drawOutline(canvas,dim);
    } else {
      if(this.selected)
        this.drawOutline(canvas,dim);
    }
    
    this.drawText(canvas,dim);
    
  }
  drawOutline(canvas,dim){
    canvas.lineWidth = this.strokeWidth;
    canvas.strokeStyle = this.rectOutlineColor;
    canvas.strokeRect(dim[0],dim[1],dim[2],dim[3]);
  }
  drawRectangle(canvas,dim){
    canvas.fillStyle = this.rectBackFillColor;
    canvas.fillRect(dim[0],dim[1],dim[2],dim[3]);
  }
  drawText(canvas,dim){
    canvas.font=this.font;
    canvas.fillStyle = this.textColor;
    canvas.textAlign = 'center';
    canvas.textBaseline='middle';
    canvas.fillText(this.text,dim[0]+dim[2]/2,dim[1]+dim[3]/2,this.w*canvas.width*.8);
  }
  
}addLevel( function(nameSpace) {
  {
    
    return {
      name: "Entrance to the Temple",
      worldType: 0,
      grid: [
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,27,27,27,27,27, 2, 0, 0, 0,27,27,27,27, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2,27,27,27, 2, 0, 0, 0, 0,27,27,27,27, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,27, 2, 0, 0, 0, 0, 0, 0, 2,27, 2, 0, 0, 0, 0, 0,27,27,27,27, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,27,27,27, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0,27,23,23,27, 0,],
        [ 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,27,27,27,27,27, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,23, 0, 0,23, 0,],
        [ 9,23,27,27,27,27,27,27,27,23, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,23,23,23,27,23,23,23, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,23, 0, 5,23, 0,],
        [ 0, 0,27,27,23,27,23,27,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0,23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,23,27,27,27,27,23,],
        [ 0, 0,27, 9, 9,27, 9, 9,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,27, 2, 0, 0, 0, 0, 0, 0, 0, 0,23, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0, 0, 0, 0, 0,27,27,27,27, 0,],
        [ 0, 0,27, 9, 9,27, 9, 9,27, 0, 0, 0, 0, 0, 0, 0, 0, 2,27,27,27, 2, 0, 0, 0, 0, 0, 9,23,27,23, 9, 0, 0, 0, 0, 0,17,14, 0, 0, 0, 0, 0, 0,27,27,27,27, 0,],
        [ 0, 0,27, 9, 9,27, 9, 9,27, 0, 0, 0, 0, 0, 0, 0, 2,27,27,27,27,27, 2, 0, 0, 0, 0, 0, 0,27, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0, 0, 0, 0, 0,27,23,23,27, 0,],
        [ 0, 0,27,23,23,27,23,23,27,14, 0, 0, 0, 0, 0, 0,27,27,27,27,27,27,27, 0, 0, 0, 0, 0, 0,27, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0, 0, 0, 0, 0,27, 0, 0,27, 0,],
        [ 0,27,27,27,27,27,27,27,27,27,27, 0, 0, 0, 0, 0, 0, 0, 0,27, 0, 0, 0, 0, 0, 0, 0, 0, 0,27, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0,],
        [ 0,27,18,27,27,27,27,27,18,27,23,27, 0, 0, 0, 0, 0, 0, 0,23, 0,17, 0, 0, 0, 0, 0, 0, 0,27, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 2,27, 2, 0, 0, 0, 0, 0, 0, 0,],
        [ 0,27,18,18,27,27,27,18,18,27,18,23,27, 0, 0, 0, 0, 0, 0,23, 0,17, 0, 0, 0, 0, 0, 0,14,27,14, 0, 0, 0, 0, 0, 0,17, 0, 2,27,27,27, 2, 0, 0, 0, 0, 0, 0,],
        [ 0,27,18,18,18,27,18,18,18,27,18,18,27, 0, 0, 0, 0, 9,23,27,23, 9, 0, 0, 0, 0, 0, 0, 0,27, 0, 0, 0, 0, 0, 0, 0,17, 2,27,27,27,27,27, 2, 0, 0, 0, 0, 0,],
        [ 0,27,18,18,18,18,18,18,18,27,18,18,27, 0, 0, 0, 0, 0, 0,27, 0, 0, 0, 0, 0, 0, 0, 0, 0,27, 0, 0, 0, 0, 0, 0, 0,17,27,27,27,27,27,27,27, 0, 0, 0, 0, 0,],
        [ 0,27,23,23,23,23,23,23,23,27,18,18,23,27, 0, 0, 0, 0, 0,27, 0, 0, 0, 0, 0, 0, 0, 0, 0,27, 0, 0, 0, 0, 0, 0, 0, 0,27,23,23,23,23,23,27, 0, 0, 0, 0, 0,],
        [ 0,27,27,23,23,23,23,23,27,27,27,18,18,27, 0, 0, 0, 0, 0,27, 0, 0, 0, 0, 0, 0, 0, 0, 0,27, 0, 0, 0, 0, 0, 0, 0, 0,27,23,23,23,23,23,27, 0, 0, 0, 0, 0,],
        [ 0, 0,27,27,23,23,23,27,27,27, 0,27,18,27, 0, 0, 0, 0, 0,27, 0, 0, 0, 0, 0, 0, 0, 0, 0,27, 0, 0, 0, 0, 0, 0, 0, 0,27, 0,15, 0,15, 0,27, 0, 0, 0, 0, 0,],
        [ 0, 0, 0,27,27,23,27,27,27, 0, 0, 0,27, 0, 0, 0, 0, 0, 0,27, 0, 0, 0, 0, 0, 0, 0, 0, 0,27, 0, 0, 0, 0, 0, 0, 0, 0,27,23,23,23,23,23,27, 0, 0, 0, 0, 0,],
        [ 0, 0, 0,27,27,27,27,27,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27, 0, 0, 0, 0, 0, 0, 0, 0, 0,27, 0, 0, 0, 0, 0, 0, 0, 0,27, 0, 0,15,15, 0,27, 0, 0, 0, 0, 0,],
        [ 0, 0, 0,27,23,27,23,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27, 0, 0, 0, 0, 0, 0, 0, 0, 0,27, 0, 0, 0, 0, 0, 0, 0, 0,27,23,23,23,23,23,27, 0, 0, 0, 0, 0,],
        [ 0, 0, 0,27,18,23,18,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27, 0, 0, 0, 0, 0, 0, 0, 0, 0,27, 0, 0, 0, 0, 0, 0, 0, 0,27, 0,15,15,15, 0,27, 0, 0, 0, 0, 0,],
        [ 0, 0, 0,27,18,18,18,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27, 0, 0, 0, 0, 0, 0, 0, 0, 0,27, 0, 0, 0, 0, 0, 0, 0, 0,27,23,23,23,23,23,27, 0, 0, 0, 0, 0,],
        ]
  };
    
  }
});
class Player extends Mover{
  constructor() {
    super();
    this.x = 100;
    this.y = 100;
    // this.speed = 10;
    this.mx = 0;
    this.eyeMovement = {x:0,y:0, blink: 0, blinkTime: 10, tx: 0, ty: 0};
    this.dead=false;
    this.player=true;
    this.color1 = "#666";
    this.color2 = "#222";
    this.jumpSoundType = SOUNDMAP.jump;
    this.bouncedOffEntity = false;
    this.holdingJump = false;
    this.bounceTimer = 0;
  }
  die() {
    if(this.dead)return;
    SOUNDMAP.playerDeath.play(this);
    this.dead=true;
    this.eyeMovement.x = -5;
    this.eyeMovement.y = 0;
      this.game.screenShakeLevel += 1;   
      this.game.frameStop = 10;         
      this.eyeMovement.blink = 0;
    this.animation = new Animation2(4, function(dt, frameCount) {
      this.mx = 0;
      this.angle = 0;
      this.width = this.w;
      this.height = this.h;
    }.bind(this), function() {
      var num = 20;
      for(var i=0;i<20;i++) {
        var x = this.x + (Math.random()*this.w-this.w/2)/2;
        var y = this.y - (Math.random()*this.h)/2;
        var w = 10;
        var h = 10;
        var vx = Math.random()*5-2+this.vx/5;
        var vy = Math.random()*5-2-10;
        var color = "#666";
        if(i>=num-8) color = "#222";
        if(i>=num-4) color = "#33d"
        if(i>=num-2) color = "#fff"; 
        this.game.addEntity(new FallingParticle(x,y,w,h,vx,vy,100,color));
      }
      this.vy=-20;   
      this.invisible = true;  
      this.animation = new Animation2(60, function(dt, frameCount) {
        // this.y+=this.vy;
        // this.vy++;
      }.bind(this), function() {
        this.game.respawn();
      }.bind(this))
    }.bind(this))
    // this.game.respawn();
  }
  resetControls() {
    this.mx = 0;
  }
  update(dt, frameCount){
    if(this.bounceTimer>0)this.bounceTimer -= 1;
    if(this.animation) {
      this.animation.update(dt, frameCount);
      return;
    }
    this.updateEye(dt, frameCount);
    super.update(dt, frameCount);
    if(this.grounded && !this.wallcolliding && this.vx && this.mx && Math.floor(frameCount) % 10 == 0) {
      SOUNDMAP.footstep.play();
    }
  }
  // draw(canvas){
  //   super.draw(canvas);
  //   var box = this.getHitBox();
	// 	canvas.strokeRect(box.x, box.y, box.w, box.h);
  // }
  reset() {
    this.x=60;
    this.y=100;
    this.vx=0;
    this.vy=0;
    this.maxJumps=1;
    this.wallJumps=false;
    this.animation=null;
    this.invisible=false;
    this.dead=false;
  }
  updateEye(dt, frameCount) {
    frameCount = Math.floor(frameCount);
    var t = frameCount%120;
    // if(t<10) {
    //   this.eyeMovement.blink = (1+Math.cos(t*Math.PI/20))/2;
    // } else {
    //   this.eyeMovement.blink = 0;
    // }
    // if(frameCount%120==0) {
    if(frameCount%60==0&&Math.random()>.5) {
      this.eyeMovement.blink = this.eyeMovement.blinkTime;
    }
    if(this.eyeMovement.blink>0) {
      this.eyeMovement.blink--;
    }
    if(this.mx==0) {
      if(Math.random()>.99) {
        this.eyeMovement.tx = Math.random()*6-3;
        this.eyeMovement.ty = Math.random()*5-4;
      }
      if(!this.crouching) {
        // if(frameCount%80<30) {
        //   this.width += 1;
        //   this.height -= 1;
        // } else {
        //   this.width -= 1;
        //   this.height += 1;
        // }
      }
    }else {
      this.eyeMovement.tx= 0;
      this.eyeMovement.ty= 0;
    }
    // this.eyeMovement.x = this.eyeMovement.tx;
    this.eyeMovement.x += (this.eyeMovement.tx-this.eyeMovement.x)/10;
    this.eyeMovement.y += (this.eyeMovement.ty-this.eyeMovement.y)/10;
  }
  drawTail(canvas, w,h) {
    canvas.fillStyle = 'brown';
    var width = 30;
    // canvas.fillRect(-w/2-width,-10,width,10);
    var dx = Math.cos(Date.now()/500)*10;
    var dy = 0;
    if(this.wallCollideTimer>0) {
      dy = 10;
      canvas.fillStyle="#c60";
      canvas.lineWidth = 7;
      // canvas.fillStyle="#fff";
      width += 5;
    }
    var a = Math.cos(Date.now()/300)*Math.PI/30+Math.PI/20+this.vy/30;
    canvas.save();
    canvas.rotate(a);
    canvas.beginPath();
    canvas.moveTo(-w/2, -1);
    canvas.quadraticCurveTo(-w/2-width/2, -1, -w/2-width/2+dx/2,-width/2-dx/2);
    canvas.quadraticCurveTo(-w/2, -width, -w/2-width,-width-dx-dy);
    canvas.quadraticCurveTo(-w/2-width, -1, -w/2-10,-1);
    // canvas.closePath();
    if(this.wallCollideTimer>0) {
      // canvas.strokeStyle = "white";
      // canvas.stroke();
    }  
    canvas.fill();    
    canvas.fillStyle = '#a42';    
    canvas.beginPath();
    canvas.moveTo(-w/2, -1);
    canvas.quadraticCurveTo(-w/2-width, -width/2, -w/2-width,-width-dx);
    canvas.quadraticCurveTo(-w/2-width, -1, -w/2-10,-1);
    if(this.wallCollideTimer>0) {
      // canvas.strokeStyle = "white";
      // canvas.stroke();
    }    
    canvas.fill();    
    canvas.restore();
    
  }
  drawWings(canvas, w,h,s) {
    if(this.maxJumps<2)return;
    var angle = 0;
    var ww = 40;
    var hh = 7;
    if(this.jumpCount==0) {
      ww=20;
      hh=5;
    }
    if(this.jumpCount<this.maxJumps) angle = Math.PI/10+this.vy/10;
    else {
      angle = -Math.PI/4+this.vy/10;
      ww=25;
    }
    canvas.fillStyle = this.color2;
    canvas.beginPath();
    // canvas.rect(-w/2-ww/2,-h/2, ww,hh);
    // canvas.rect(w/2,-h/2, ww,hh);
    var y = -h-angle*10;
    this.pathWingAtAngle(canvas, -w/2-ww*.8,y, ww,hh, ww*.8, hh/2, angle);
    this.pathWingAtAngle(canvas,w*.3,y, ww,hh, ww*.2, hh/2, -angle);
    if(s)canvas.stroke();
    else canvas.fill();
  }
  pathWingAtAngle(canvas, x,y,w,h, px,py, angle) {
    canvas.save();
    canvas.translate(x+px, y+py);
    canvas.rotate(angle);
    canvas.rect(-px,-py-10,w,h);
    canvas.rect(-px*.8,-py,w*.8,h);
    canvas.rect(-px*.5,-py+5,w*.5,h);
    canvas.restore();
  }
  drawShape(canvas,w,h) {
    if(this.wallJumps) this.drawTail(canvas, w,h);
    canvas.save();
    canvas.strokeStyle = "#000";
    canvas.lineWidth=7;
    if(this.jumpCount<this.maxJumps&&this.jumpCount>0&&!(this.wallJumps&&this.wallCollideTimer>0)) {
      // canvas.strokeStyle="white";
    }
    this.drawWings(canvas,w,h,1);    
    this.drawWings(canvas,w,h);  
    canvas.strokeStyle = "#000";      
    canvas.strokeRect(-w/2-1,-h-1,w+2,h+2);
    // canvas.fillStyle = "#73d";
    canvas.fillStyle = "#666";    
    
    // canvas.fillStyle = "#999";
    canvas.fillRect(-w/2,-h,w,h);
    // canvas.fillStyle = "#74e";
    // canvas.fillStyle = "#ddd";
    canvas.fillStyle = "#222";
    
    var shadeX = w*.4+this.eyeMovement.x/2;
    if(this.dead)shadeX-=5;
    canvas.fillRect(-w/2,-h,shadeX,h);
    var pantsHeight = h/8;
    canvas.fillStyle = "#33d";
    canvas.fillRect(-w/2,-pantsHeight,w,pantsHeight);    
    canvas.fillStyle = "#44e";
    canvas.fillRect(0,-pantsHeight,w/2,pantsHeight);        
    
    
    canvas.fillStyle="#fff";
    var squint = 1-.6*Math.abs(this.vy)/this.terminalVelocity;
    var eyey = -h+10 + this.eyeMovement.y;
    var eyex = 6 + this.eyeMovement.x;
    var eyed = 10 - this.eyeMovement.x/3;
    
    if(this.crouching) {
      // squint *= .2;
    }
    var blink = 0;
    if(this.eyeMovement.blink>0) {
      var t = this.eyeMovement.blinkTime - this.eyeMovement.blink+1;
      blink = (1+Math.cos(t*Math.PI/20))/2;
    }
    squint*= (1-blink);
    eyey += blink*4;
    // eyey -= this.width/this.w * 5;
    var eyh = 8*squint;
    var eyh2 = eyh;
    if(this.crouching) {
      // eyed += 2;
      eyex += 2;
    }
    canvas.fillRect(eyex-eyed,eyey,8,eyh);
    canvas.fillRect(eyex,eyey,6,eyh2);
    w=this.w;
    canvas.translate(0,-h);
    var hatAngle = Math.abs(this.angle);
    if(hatAngle>Math.PI/4)hatAngle=Math.PI/4;
    canvas.rotate(-hatAngle);
    canvas.rotate(0);
    canvas.fillStyle = "#f4d";
    // canvas.fillStyle = "#444";
    canvas.beginPath();
    canvas.rect(-w/2-1,-4,w+9,4);
    canvas.rect(-w/2-1,-12,w-3,12);
    canvas.stroke();
    canvas.fill();

    canvas.fillStyle = "#c2d";
    // canvas.fillStyle = "#111";
    canvas.beginPath();
    canvas.rect(-w/2-1,-4,(w+9)/4,4);
    canvas.rect(-w/2-1,-12,(w-3)/2,12);
    canvas.fill();
    canvas.restore();    
  }
  bounceOffEntity(enemy, amt) {
    this.groundCollide(this.y, true);
    this.bounceTimer = 10;
    // var jr = this.jumpRelease;
    var d = (amt || amt==0) ? amt : 20;
    this.jump(d, true);
    // if(!this.bouncedOffEntity)
    SOUNDMAP.bounce.play();
    this.bouncedOffEntity = true;
    // if(this.vy<=0)
    // this.jumpRelease=jr;
  }
  groundCollide(y, animationless) {
    super.groundCollide(y,animationless);
    this.bouncedOffEntity = false;
  }  
  getHitByEntity(enemy) {
    if (enemy.killPlayer)
      this.die();
  }
  
  
}
Player.controls = {
  right: {down: function() {if (this.crouching) this.dash(1);}, held: function() { this.mx += 1; }},
  left: {down: function() {if (this.crouching) this.dash(-1);}, held: function() { this.mx -= 1; }},
  up: {
    down: function() { this.holdingJump = true; if(!this.dead)this.jump(); },
    up: function() { this.holdingJump = false; if(!this.dead && !this.bouncedOffEntity){this.shortJump(); this.eyeMovement.ty = 0;} },
    held: function() { this.holdingJump = true; this.eyeMovement.ty = - 6; this.height += .5; this.width -= .5},
  },
  down: {down: function() { this.crouch(); }, noneheld: function() { this.uncrouch(); }},
  dash: { down: function() { this.dash(1-2*this.flipped); }},
};
addBlock(function() { return {
      //Spike floor
      id: BLOCKS.length,
      name: "Ground Spike",
      solid: true,
      redraws: false,
      groundBlock: true,
      draw: function(canvas, x,y,width,height, world,ii,jj) {
        var w= width;
        var h=height;
        var dd = width*.1;
        CELLMAP[2].drawSpike(canvas,x+dd,y+dd,width-dd*2,height-dd*2,world,ii,jj)
        var dh = h * .4;
        CELLMAP[1].draw(canvas,x,y+dh, width, height-dh, world, ii,jj);
      },
      entityCollision: function(entity, pos, dx, dy) {
        if(entity.player && dy>0) entity.die();
        return true;
      },
      // isColliding: function(entity, pos,dx,dy,cellPos) {
      //   // return true;
      //   // return pos.y-dy > cellPos.y + 1; 
      //   if (pos.y-dy >= cellPos.y + 1) return { y: cellPos.y + 1};
      // }
}});
class CoolmathSplashScreen extends SplashScreenScene {
  constructor(playsIntro) {
    super(playsIntro, "CoolmathGames-640x480_no-URL.jpg", VgdcSplashScreen);
  }
}class GrowthTextButton extends TextButton{
  constructor(x,y,w,h,groupID,onRelease,text,font, 
    textColor,rectBackFillColor,rectOutlineColor, strokeWidth,growthAmount){
      super(x,y,w,h,groupID,onRelease,text,font,textColor,rectBackFillColor,rectOutlineColor,strokeWidth);
      this.growthMax = growthAmount;
      this.maxWidth = this.w+this.growthMax;
      this.growthSpeed = 0.2;
      this.extraWidth = 0;
  }
  update(dt){
    if(this.selected){
      this.extraWidth += this.growthSpeed*dt*(this.growthMax-this.extraWidth);
      if(this.extraWidth>this.growthMax)
        this.extraWidth = this.growthMax;
    } else {
      this.extraWidth -= this.growthSpeed*dt*(this.extraWidth);
      if(this.extraWidth < 0)
        this.extraWidth = 0;
    }
  } 
  draw(canvas){

    var dim = this.getPixelDimensions(canvas);
    dim[2] += this.extraWidth*canvas.width;   //modify width
    dim[0] -= this.extraWidth*canvas.width/2; //move top left point to the left to account for increased width
    this.drawRectangle(canvas,dim);
    if(this.selected && !this.held)
      this.drawOutline(canvas,dim);
    dim = this.getPixelDimensions(canvas);
    this.drawText(canvas,dim);
  }
}addLevel( function(nameSpace) {
  {
    
    return {
      name: "Temple Of the Feather",
      worldType: 0,
      grid: [
        [ 0, 0,27,23,27,23,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [ 0, 0,27,23,27,23,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [ 0, 0,27,23,27,23,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,],
        [ 0, 0,27,23,27,23,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1,],
        [ 0, 0,27,23,27,23,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1,],
        [ 0, 0,27,23,27,23,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,],
        [ 0, 0,27,23,27,23,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,27,27,27,27,],
        [ 0, 0,27,27,27,27,27, 0, 0, 0, 0,14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,14,17, 0, 0, 0,17, 0, 0, 0, 0, 0, 0, 0, 0, 0,14, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27,27,27,27,27,],
        [ 0, 0,27, 9, 9, 9,23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27,27,27,27,27,],
        [ 0, 0,27, 0, 0, 0,23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0, 0,14, 0, 0, 0, 0, 0, 0, 0,27,27,23,23,23,],
        [ 0, 0,27,23,23,23,27,23, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 8, 0,17,14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27, 9, 0, 0, 0,],
        [ 0, 0,27,23,23,23,27, 0, 0, 0, 0, 0, 0, 0, 0, 0,14, 0, 0, 0, 0,14, 0, 0, 0, 0,17, 0, 0, 0,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,23, 0, 0, 0, 0,],
        [ 0, 0,27, 9, 9, 9,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,23, 0, 0, 5, 0,],
        [ 0, 0,27, 0,15, 0,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17,27,27,27,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,23,27,23,23,23,23,],
        [ 0, 0,27,23,23,23,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27,23,23,23,23,27, 0,23,27, 0,27, 0, 0,27,23,23,23,23,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,14,27,27,23,27,27,],
        [ 0, 0,23,23,23,23,23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27,23,23,23,27, 0, 9,27,18,27, 0, 0,27,23,23,23,27, 0, 0, 0, 0, 0, 0, 0,17,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27,27,23,27,27,],
        [ 4, 0,23,23,23,23,23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,14,27,23,23,23,27,27, 0,27,18,27, 0,27,27,23,23,23,27, 0, 0, 0, 0, 0, 0, 0,17,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0,27,27, 9,27,27,],
        [23,23,27,23,23,23,27,23, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27,27,23,23,27,27,27,18,27,27,27,23,23,23,27, 0, 0, 0, 0, 0, 0, 0, 0,17,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0,27,27, 9,27,27,],
        [ 0, 0,27,23,23,23,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27,23,23,23,23,18,23,23,23,23,27,27, 0, 0, 0, 0, 0, 0, 0, 0, 0,17,17, 0, 0,14, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0,27,27, 9,27,27,],
        [ 0, 0, 0,27,23,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27,18,18,18,18,18,18,18,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0,27,27, 0,27,27,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27,18,18,18,18,18,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0,27,27, 0,27,27,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27,18,18,18,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0,27,27, 1,27,27,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,14, 0,27,27, 9,27,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17,17, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0,14,17, 0, 0, 0,27, 1, 1, 1, 1,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27,27,27, 0,27,27,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0,27, 1, 1, 1, 1,],
        [ 0, 0, 0, 0, 0,14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27,23,27, 0,27,23,27, 0, 0, 0, 0, 0, 0, 0,14, 0, 0, 0, 0,17,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0,27, 1, 1, 1, 1,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,27, 9, 0, 9,27, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0,27, 1, 1, 1, 1,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,14, 0, 0, 0,27, 0, 0, 0,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0,27, 1, 1, 1, 1,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27, 0, 0, 0,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0,27, 1, 1, 1, 1,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27, 0, 0, 0,27, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0,17, 0, 0, 2, 1, 1, 1, 1, 1,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27, 0, 0, 0,27, 0, 0,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27, 0, 0,17, 0, 0, 1, 1, 1, 1, 1, 1,],
        [ 0, 0, 2, 0, 0, 0, 0, 0, 0,27, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0,27, 0, 0, 0,27, 0, 0,27, 0, 0, 0, 0, 0, 0, 0, 0, 0,27, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0,27, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1,],
        [ 0, 0,27, 0, 0, 0, 0, 0, 0,27, 0, 0, 0, 0, 0, 0,27, 0, 0, 0, 0, 0, 0, 0, 0, 0,27, 0, 0, 0,27, 0, 0,27, 0, 0, 0, 0, 0, 0, 0, 0, 0,27, 0, 0, 0, 0, 0,27, 0, 0, 0, 0,27, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1,],
        [ 0, 0,27, 0, 0, 0, 0, 0, 0,27, 0, 0, 0, 0, 0, 0,27, 0, 0, 0, 0, 2, 0, 0, 0, 0,27, 0, 0, 0,27, 0, 0,27, 0, 0, 0, 0, 2, 0, 0, 0, 0,27, 0, 0, 0, 0, 0,27, 0, 0, 0, 0,27, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1,],
        [ 0, 0,27, 0, 0, 0, 0, 0, 0,27, 0, 0, 0, 0, 0, 0,27, 0, 0, 0, 0,27, 0, 0, 0, 0,27, 0, 0, 0,27, 0, 0,27, 0, 0, 0, 0,27, 0, 0, 0, 0,27, 0, 0, 0, 0, 0,27, 0, 0, 0, 0,27, 0, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1,],
        [ 0, 0,27, 0, 0, 0, 0, 0, 0,27, 0, 0, 0, 0, 0, 0,27, 0, 0, 0, 0,27, 0, 0, 0, 0,27, 0, 0, 0,27, 0, 0,27, 0, 0, 0, 0,27, 0, 0, 0, 0,27, 0, 0, 0, 0, 0,27, 0, 0, 0, 0,27, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        [ 0, 0,27, 0, 0, 0, 0, 0, 0,27, 0, 0, 0, 0, 0, 0,27, 0, 0, 0, 0,27, 0, 0, 0, 0,27, 0, 0, 0,27, 0, 0,27, 0, 0, 0, 0,27, 0, 0, 0, 0,27, 0, 0, 0, 0, 0,27, 0, 0, 0, 0,27, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        ],
        init(gameScene){
          gameScene.addEntity(new WorldText(1240,300,600,'WINGS allow Jimothy to DOUBLE-JUMP','25px ' + FONT,[255,255,255,1],[255,255,255,1],1,true,'center'));
        }
  };
    
  }
});
class Pig extends Mover {
  constructor(x,y) {
    // x+=70;
    super(x,y);
    this.color = "pink";
    // this.w = 27;
    // this.h = 23;
    this.w=30;
    this.h=25;
    this.width = this.w;
    this.height = this.h;
    this.speed = 0;
    this.cloudParticlesOn=false;
    this.mx = -1;
    this.groundAccel=0;
    this.tx = x;
    this.ty = y;
    this.turnTime = 50;
    this.turnCounter = this.turnTime;
    this.bounceFrq = Math.PI/5;
    this.animationState = 0;
    this.isPig=true;
  }
  update(dt, frameCount) {
    // if(this.x > this.tx+50) this.mx = -1;
    // if(this.x < this.tx-50) this.mx = 1;
    // if(this.turnCounter<=0||this.wallcolliding) {
      // this.turnCounter = this.turnTime;
      // this.mx = -this.mx;
    // }
    // if(Math.random()>.95) this.speed=0;
    // if(Math.random()>.95) this.speed = 3;
    if(this.wallcolliding) {
      this.mx = -this.mx;
      this.wallcolliding=false;
      this.vx = 0;
    }
    this.width += Math.sin(frameCount*this.bounceFrq)*this.bounceFrq;
    this.height -= Math.sin(frameCount*this.bounceFrq)*this.bounceFrq;
    // this.width += Math.cos(this.angle*20) * 2;
    // this.height -= Math.cos(this.angle*20) * 2;
    super.update(dt, frameCount);
    if(rectangleCollision(this.getHitBox(), this.game.player.getHitBox()) == true) {
			this.playerCollision();
    }
    if(this.animationState == 0)
    this.flipped = this.game.player.x < this.x;
  }

  playerCollision()
  {
    this.game.levelComplete();
  }

  drawShape(canvas, w, h) {
    var tailSize = 15;
    var earSize = 5;    
    canvas.strokeStyle="#fff";
    canvas.fillStyle="#fff";    
    canvas.lineWidth = 5;
    // var feetSize = w/5;
    canvas.strokeRect(-w/2-1, -h-1, w+2, h+2); 
    this.drawTail(canvas,-w/2,-h*.8,7,tailSize); 
    canvas.strokeRect(w/2-h/4, -h*11/16, h/2, h/2);    
    canvas.beginPath();
    this.drawEar(canvas, 6, -h-earSize,earSize,earSize);
    canvas.stroke();
    canvas.beginPath();    
    this.drawEar(canvas, -6, -h-earSize,earSize,earSize);
    canvas.stroke();
    canvas.fillStyle = this.color;          
    canvas.fillRect(-w/2, -h, w, h);
    // canvas.fillRect(w/2-feetSize, 0, feetSize, feetSize/2);
    // canvas.fillRect(w/2-feetSize*2.2, 0, feetSize, feetSize/2);
    canvas.fillStyle = "#e8a";
    // canvas.fillRect(-w/2, 0, feetSize, feetSize/2);
    // canvas.fillRect(-w/2+feetSize*1.2, 0, feetSize, feetSize/2);
    canvas.fillRect(-w/2, -h, w/3, h);    
    // canvas.fillStyle = '#000';
    this.drawTail(canvas,-w/2,-h*.8,3,tailSize);
    canvas.fillStyle=this.color;
    canvas.beginPath();
    this.drawEar(canvas, 6, -h-earSize,earSize,earSize);
    this.drawEar(canvas, -6, -h-earSize,earSize,earSize);
    canvas.fill();
    this.drawSnout(canvas, w/2-h/4, -h*11/16, h/2, h/2);
    canvas.fillStyle='#000';
    var eyeH = 4+this.width/10;
    var eyeBrowAngle = Math.PI/5;
    var eyeY = -h+2;
    if(this.animationState==1) {
      eyeH = 2;
      eyeBrowAngle = 0;
      eyeY+=2;
    }
    if(this.animationState==2) {
      eyeBrowAngle = 0;
    }
    this.drawEye(canvas, 0,eyeY,5,eyeH, -eyeBrowAngle);
    this.drawEye(canvas, w/2-3,eyeY,5,eyeH, eyeBrowAngle);
  }
  drawEar(canvas, x,y,w,h) {
    canvas.rect(x,y,w,h);
  }
  drawSnout(canvas,x,y,w,h) {
    canvas.fillStyle = "#faa";
    canvas.fillRect(x,y,w,h);
    canvas.fillStyle = '#966';
    var ns = w/3;
    canvas.fillRect(x,y+h/2-ns,ns,ns);
    canvas.fillRect(x+w-ns,y+h/2-ns,ns,ns);    
  }
  drawTail(canvas,x,y,w,h) {
    canvas.save()
    canvas.strokeStyle = canvas.fillStyle;
    canvas.lineWidth = w;
    canvas.translate(x,y);
    canvas.rotate(Math.cos(this.x/this.speed/2)/2);
    // canvas.rotate(Math.cos(this.angle));
    // canvas.fillRect(-w,-h,w,h);
    canvas.beginPath();
    canvas.arc(-w/2,-h/4,h/4,Math.PI/2,Math.PI*3/2);
    canvas.arc(-w/2,-h/2+h/8,h/8,Math.PI/2,-Math.PI/2, true);
    canvas.stroke();
    canvas.restore();
  }
  drawEye(canvas, x,y,w,h,r) {
    if(this.animationState==2) {
      // canvas.fillRect(x,y,w,h);
      canvas.beginPath();
      canvas.moveTo(x,y+h/2);
      canvas.lineTo(x+w/2,y);
      canvas.lineTo(x+w,y+h/2);
      canvas.lineTo(x+w,y+h);
      canvas.lineTo(x+w/2,y+h/2);
      canvas.lineTo(x,y+h);
      canvas.fill();
      return;
    }
    canvas.save();
    canvas.translate(x+w/2,y+h/2);
    canvas.fillRect(-w/2,-h/2,w,h);
    // canvas.fillStyle = "#fff";
    // canvas.fillRect(-w*.5,-h*.5, w*.5,h*.5);
    if(this.animationState==0) {
      canvas.rotate(r);
    // w = w/2;
    // w=w*.8;
    // canvas.fillStyle="pink";
    // h = 4;
      canvas.fillRect(-w,-h,w*2,h/2);
    }
    canvas.restore();
  }
}
addBlock(function() { return {
  //Start Block
  id: BLOCKS.length,
  name: "Start",
  hide: true,   
  ignoreCollisions: true,
  redraws: false,
  drawer: new Player(),
  draw: drawEntity,
  onload: function(game, x,y,width,height, world,ii,jj) {
    game.player.x = x + width/2;
    game.player.y = y + height;
  },
}});

class GameScene extends Scene {
  constructor(level, dontSpawnPig,playIntro) {
    super(playIntro);
    this.touchButtonsActive = true;
    this.dontSpawnPig=dontSpawnPig;
    this.player = new Player();
    this.entities = [];
    this.behinds=[];    
    this.addEntity(this.player);
    var p1controls = connectControls(Player.controls, this.player);
    this.p1controls = p1controls;
    this.keyMap = {
      68: p1controls.right,
      87: p1controls.up,
      65: p1controls.left,
      83: p1controls.down,

      37: p1controls.left,
      38: p1controls.up,
      39: p1controls.right,
      40: p1controls.down,

      32: p1controls.up,

      27: {down: this.pause.bind(this)},
      69: p1controls.dash,
      78: {down: function() {
        if(this.keys[67] && DEBUG) {
          this.loadNewLevel(this.levelIndex+1);
        }
      }.bind(this)},
      66: {down: function() {
        if(this.keys[67] && DEBUG) {
          this.loadNewLevel(this.levelIndex-1);
        }
      }.bind(this)},
    }
    this.camera = {x:0,y:0,dx:0,dy:0,speed:10,zoom:1};
    
    // this.world = new World(200,50,50);

    this.inTransition = false;
    this.transitionDirection = -1;
    this.overlayColor = "rgba(0,0,0,0)";
    this.transitionTimer = 25.0;
    this.transitionDuration = 25.0;

    if(level) {
      this.levels = [level];
    } else {
      this.levels = createLevels();
    }
    this.levelIndex = 0;
    this.levelCompleted = false;
    this.loadNewLevel(0);
    this.shouldFillAroundWorld = true;    
    // this.level = this.levels[0];
    // this.world = new WorldFromLevel(this.level);
    // this.addEntity(new Pig(this.world.w*this.world.s-200,100));  
    // this.addEntity(new Enemy(300,100));
    this.screenShakeLevel=0;
    this.screenZoom=0;
    this.totalDeaths = 0;
    this.levelDeaths = 0;
    this.constrainCamera();
    this.frameStop = 0;

    this.allowUIInput = true;
    this.selectedButton = undefined;
    this.addGameGUI();
  }
  addEntity(entity) {
    entity.game = this;
    this.entities.push(entity);
  }
  unshift(entity) {
    entity.game = this;
    this.entities.unshift(entity);
  }
  collidesWithPlayer(entity) {
		var entityBox = entity.getHitBox();
		var playerBox = this.player.getHitBox();
		return rectangleCollision(entityBox, playerBox);
  }
  playLevelIntro(){
    this.startTransition(25,-1,undefined);
  }
  playLevelOutro(){
    var win = this.levelIndex+1>=this.levels.length;
    if(this.music) {
      // this.music.pause();
    }
    if(this.pig)
    this.driver.setScene(new LevelCompleteScene(this, () => {
      // this.startTransition(25, 1, function() { 
        if(this.levelIndex+1 >= this.levels.length) {
          this.win();
        } else {
          this.loadNewLevel(this.levelIndex+1);
          this.driver.setScene(new LevelIntroScene(this,true));
        }
      // });
    }, win));
    else {
       this.startTransition(25, 1, function() { 
        if(this.levelIndex+1 >= this.levels.length) {
          this.win();
        } else {
          this.loadNewLevel(this.levelIndex+1);
          this.driver.setScene(new LevelIntroScene(this,true));
        }
      });
    }
  }
  pause() {
    this.driver.setScene(new PauseScene(this));
  }
  moveCamera(targetX,targetY) {
    var target = {x:targetX,y:targetY};
    var camera = this.camera;
    var a = target.y-camera.y;
    a = a*a;
    var b = target.x-camera.x;
    b = b*b;
    var distance = Math.sqrt(a+b);
    if(camera.speed >= distance){
      camera.x = targetX;
      camera.y = targetY;
    }
    var directionToPoint = Math.atan2(target.y-camera.y,target.x-camera.x);
    var displace = circleMove(directionToPoint,camera.speed);
    camera.x += circleMoveX(directionToPoint,camera.speed);
    camera.y += circleMoveY(directionToPoint,camera.speed);

    this.constrainCamera();
  }
  followPlayer(){
    var camera = this.camera;
    var player = this.player;
    var canvas = this.canvas;
    // if(player.mx) {
      var cdx = (player.x-camera.x+camera.dx)/10;
      if(Math.abs(cdx)>3)camera.x += cdx;
      // camera.x += (player.x-camera.x+camera.dx)/10;
    // }
    // camera.x = linearMove(camera.x, (player.x + camera.dx), 5);    

    // var cdy = (player.y-camera.x+camera.dy-30)/10;
    // if(Math.abs(cdy)>3)camera.y += cdy;
    camera.y += (player.y-camera.y-30)/30;
    if(player.grounded) camera.y += (player.y-camera.y-30)/20;
    var d = 0;
    if(player.vy>0 && camera.y < player.y - 30) camera.y += (player.y-camera.y-30)/10;
    if(player.crouching&&player.grounded) camera.dy += 1; else camera.dy=0;
    if(camera.dy>30)camera.dy=30;
    if(camera.dy>10) camera.y+=(camera.dy*2-10)/3;
    //make the camera point more towards the direction
    //that the player is moving in so they can see ahead
    if(player.mx!=0) {
      // camera.dx = linearMove(camera.dx, (player.mx * 100), 5);
    }
    this.constrainCamera();
  }
  constrainCamera(x,y,w,h){
    var camera = this.camera;
    var canvas = this.canvas;
    if(!canvas)return;
      var world1 = this.world;
    if(x == undefined || y == undefined || w == undefined || h == undefined){
      camera.x = constrain(camera.x,canvas.width/2,world1.w*world1.s-canvas.width/2);
      camera.y = constrain(camera.y,canvas.height/2,world1.h*world1.s-canvas.height/2);
    } else {
      camera.x = constrain(camera.x,x+canvas.width/2,x+w-canvas.width/2);
      camera.y = constrain(camera.y,y+canvas.width/2,y+h-canvas.width/2);
      this.constrainCamera();
    }
  }

  detectLevelComplete() {
    if(this.player.x/this.world.s >= this.world.w-2&&this.player.grounded) {
      this.loadNewLevel(this.levelIndex+1);
    }
  }
  levelComplete() {
    if(this.player.dead)return;
    if(!this.levelCompleted) {
      this.levelCompleted = true;
      this.playLevelOutro();
    }
  }
  
  win() {
    this.driver.setScene(new PostWinScene(this));    
  }
  addGameGUI(){
    var bigFont = "60px Noteworthy";
    var buttonFont = "30px noteworthy";
    var textColor = 'black';
    if(touchOn){
      var dim = rectDimFromCenter(.88,.1,.095,.12);
      var pauseButton = new TextButton(dim[0],dim[1],dim[2],dim[3],0,
        this.pause.bind(this),"",buttonFont,'transparent','rgba(64,64,64,.5)','transparent',0);
      this.gui.push(pauseButton);
      dim = rectDimFromCenter(.895,.1,.02,.08);
      var box1 = new ColoredBox(dim[0],dim[1],dim[2],dim[3],0,'white','transparent',0);
      this.gui.push(box1);
      dim = rectDimFromCenter(.865,.1,.02,.08);
      var box2 = new ColoredBox(dim[0],dim[1],dim[2],dim[3],0,'white','transparent',0);
      this.gui.push(box2);

    }
    this.buttons = getButtons(this.gui);

    
  }
  loadNewLevel(index) {
    this.musicFaded = false;
    this.frameStop = 0;
    this.screenShakeLevel = 0;
    this.screenZoom=0;
    if(index<0)index=0;
    this.butcher = null;
    this.kingByrd = null;
    var same = false;
    var entities = this.entities;
    if(index==undefined) {
      same=true;
    } else {
      this.levelIndex = index;
      this.levelDeaths = 0;
      if(this.music) {
      } else
      this.music = SOUNDMAP.music.play(); 
    }
    if(this.levelIndex>=this.levels.length) {
      this.win();
      return;
    }
    var level = this.levels[this.levelIndex];
    if(!same)
      this.world = new WorldFromLevel(level, this.levelIndex);
    this.isFinalInWorld = level.isFinalInWorld;
    this.player.reset();
    this.entities = [];    
    //this.addEntity(new Byrd(100,400));
    this.world.loadWorld(this);
    this.entities.push(this.player);
    this.initializeLevel(level);
    // this.behinds.forEach(function (e){
    //   entities.unshift(e);
    // });
    // this.behinds=[];
    if(level.modifyPlayer) {
      level.modifyPlayer(this.player);
    }
    this.level=level;
    this.camera.x=this.player.x;
    this.camera.y=this.player.y;
    this.constrainCamera();

    //if(!this.dontSpawnPig) {
    //  this.pig = new Pig(this.world.w*this.world.s-200,100);
    //  this.addEntity(this.pig);
    //}
    // this.addEntity(new Enemy(300,100));  
    this.playLevelIntro();
    this.levelCompleted = false;
    this.touchButtonsActive = true;
    /*
    var text = new WorldText(800,600,300,"TEXT HERE",'60px ' + FONT,[0,0,0,0],[0,0,0,1],
      100,false)
    this.entities.push(text);
    var trigger = new TriggerZone(800,700,100,100,this.player,text.appear.bind(text),undefined,text.disappear.bind(text),true);
    this.entities.push(trigger);
    */
  }
  initializeLevel(level){
    if(level.init){
      level.init(this);
    }
  }
  respawn() {
    this.totalDeaths++;
    this.levelDeaths++;
    // console.log(this.deaths);
    this.loadNewLevel();
  }
  musicFadeOnPig() {
    var pig = this.pig;
    var player = this.player;
    // if(!this.music) this.music = SOUNDMAP.music.play();
    if(pig&&player) {
      var r = distanceBetweenEntities(pig, player);
      if(r<500) {
        SOUNDMAP.music.lerpVolume(r/500);     
        if(r<100) {
          this.musicFaded = true;
          this.musicTime = this.music.getTime();
          SOUNDMAP.music.pause();
        } else {
          if(this.musicFaded)
          SOUNDMAP.music.resume(this.musicTime);
          this.musicFaded=false;          
        }
      } else {
        if(this.music) {
          if(this.musicFaded)
          SOUNDMAP.music.resume(this.musicTime);
          this.musicFaded=false;          
        }
        this.musicTime = this.music.getTime();
        SOUNDMAP.music.setVolume(1);
      }
    }
  }
  update(dt, frameCount) {
    this.musicFadeOnPig();
    this.player.resetControls();
    var entities = this.entities;
    super.update(dt);
    if(this.frameStop>0) {
      // this.frameStop -= 1;
      // this.followPlayer();   
      // this.updateScreenShakeLevel();         
      // return;
      this.frameStop-=0.1;
      var t = this.frameStop;
      t=t/5;
      if(t>1) t = 1;
      dt = dt * (1 - 0.8 * t)
    }
    for(var i=0;i<entities.length;i+=1) {
      var entity = entities[i];
      entity.update(dt, frameCount);
      if(entity.shouldDelete) {
        entities.splice(i--,1);
      }
    }
    entities = this.entities;
    this.behinds.forEach(function (e){
      entities.unshift(e);
    });
    this.behinds=[];
    // this.entities = this.entities.sort(function(a,b) {
    //   return -b.behind;
    // })
    this.followPlayer();

    

    // this.detectLevelComplete();
    this.updateScreenShakeLevel();
    // this.screenShakeLevel -= this.screenShakeLevel/10;
  }
  updateScreenShakeLevel() {
    this.screenShakeLevel = linearMove(this.screenShakeLevel, 0, .05); 
    // this.screenZoom = linearMove(this.screenZoom, 0, .005); 
    // this.camera.zoom = this.screenZoom+1;
  }
  draw(canvas) {
    if(!this.canvas) {
      this.canvas = canvas;
      this.constrainCamera();
    }
    var camera = this.camera;
    canvas.clearRect(0,0,canvas.width,canvas.height);
    this.doScreenShake(canvas);    

    canvas.save();
    this.world.drawBackground(canvas, this.camera);    
    if(this.shouldFillAroundWorld) {
      this.fillAroundWorld(canvas);
    }

    canvas.translate(canvas.width/2,canvas.height/2);  
    canvas.rotate(camera.r);
    
    canvas.translate(-Math.floor(camera.x), -Math.floor(camera.y));
    
    this.world.draw(canvas);
    for(var i=0;i<this.entities.length;i+=1) {
      var entity = this.entities[i];
      if(entity.x-camera.x>canvas.width/2+entity.w)continue;
      if(entity.x-camera.x<-canvas.width/2-entity.w)continue;
      entity.draw(canvas);
    }
    canvas.restore();
    if(this.level.name) {
      canvas.fillStyle='#fff';
      canvas.font = '30px Noteworthy';
      canvas.fillText(this.level.name, 200, canvas.height-30);
    }
    this.drawAllGUI(canvas);
    drawTransitionOverlay(this.overlayColor,canvas);
    
  }
  testUpdate() {
    var startTime = Date.now();
    var iters = 1000;
    for(var i=0;i<iters;++i) {
      this.update(0.8);
    }
    var endTime = Date.now();
    console.log(endTime-startTime);
  }
  testDraw() {
    var startTime = Date.now();
    var iters = 1000;
    for(var j=0;j<iters;++j) {
      this.draw(canvas);
    }
    var endTime = Date.now();
    console.log(endTime-startTime);
  }
  testDrawEntity(entityIndex) {
    var startTime = Date.now();
    var iters = 1000;
    for(var j=0;j<iters;++j) {
      this.entities[entityIndex].draw(canvas);
    }
    var endTime = Date.now();
    console.log(endTime-startTime);
  }
  fillAroundWorld(canvas) {
    if(this.world.image) {
      var cameraOffsetY = canvas.height/2-Math.floor(this.camera.y);
      canvas.fillStyle="black";          
      canvas.fillRect(0,this.world.image.height+cameraOffsetY,this.world.image.width,1000);  
      canvas.fillRect(0,-1000+cameraOffsetY,this.world.image.width,1000);    
    }
  }
  doScreenShake(canvas) {
    if(this.paused)return;
    if(this.screenShakeLevel==0) {
      return this.camera.r = 0;
    }
    var x = Math.cos(this.driver.frameCount*Math.PI/3)*this.screenShakeLevel*10;
    var y = Math.sin(this.driver.frameCount*Math.PI/3)*this.screenShakeLevel*10;
    var r = Math.cos(this.driver.frameCount*Math.PI/4)*this.screenShakeLevel*Math.PI/80;
    // canvas.translate(x,y);
    this.camera.x+=x;
    this.camera.y+=y;
    this.camera.r=r;
    // canvas.rotate(r);
  }
  onPause() {
    this.paused = true;
  }
  onResume() {
    this.paused = false;
  }
}
class Label extends GUIElement{
  constructor(x,y,width,height,groupID
    ,text,font,textColor,textAlign){
    super(x,y,width,height,groupID);
    super.setOptions(false,false,true);
    this.text = text;
    this.font = font;
    this.textColor = textColor;
    this.textAlign = textAlign;
    this.visible = true;
  }
  update(dt){}
  draw(canvas){
    var dim = this.getPixelDimensions(canvas);
    this.drawText(canvas,dim);
  }
  drawText(canvas,dim){
    canvas.font=this.font;
    canvas.fillStyle = this.textColor;
    canvas.textAlign = this.textAlign;
    canvas.textBaseline='middle';
    switch(this.textAlign){
      case 'left':
        canvas.fillText(this.text,dim[0],dim[1]+dim[3]/2,this.w*canvas.width*.9);  
        break;
      case 'right':
        canvas.fillText(this.text,dim[0]+dim[2],dim[1]+dim[3]/2,this.w*canvas.width*.9);  
        break;
      case 'center':
        canvas.fillText(this.text,dim[0]+dim[2]/2,dim[1]+dim[3]/2,this.w*canvas.width*.9);  
        break;
    }
  }
  setOptions(interactable,selectable,visible){
    //Interactable and selectable should never be true
    //But calling setOptions with 3 parameters like buttons should be possible
    super.setOptions(false,false,visible);
  }
}addLevel( function(nameSpace) {
  {

    return {
      name: "Bridge",
      worldType: 0,
      grid: 
      [
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,19,19,19,19,19, 0, 0, 0, 0,19,19,19,19,19,19, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,19,18,18, 2,19, 3, 0, 0, 0,19,19,19,19,19,19,19,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,19,19,18,19,19, 1, 0, 0, 0,19,19,18,18,19,19,19,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,19,19,18,18,18, 1, 0, 0, 0,19,19,19,18,19,18,19,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,18, 1, 1, 0, 0, 0, 0, 0,19,18,19,19,19,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0,30, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0,30, 0, 0, 0, 0, 0, 2, 0, 0,30, 0, 0, 2, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,18,18, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,18,18, 5,],
        [ 0, 0, 0,30, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 2, 1, 1,27,27,23,23,23,27,27, 1, 1, 1, 1,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,27,23,18,18,18,23,27,27, 1, 1, 1,],
        [ 0, 0, 0, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,27,18,18,18,18,18,27,27, 1, 1, 1,],
        [ 0, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,27,18,18,18,18,18,27,27, 1, 1, 1,],
        [ 2, 1, 1,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,18,18,18,18,18,27,27, 1, 1, 1,],
        [ 1, 1,27,27,18,18,18,18,18,27,18,18,18,18,18,18,18,18,27,18,18,18,18,18,27,18,18,18,18,18,18,27,18,18,18,18,18,18,18,27,18,18,27,18,18,18,18,18,27,27, 1, 1, 1,],
        [ 1,27,27,27,18,18,18,18,18,27,18,18,18,18,18,18,18,27,27,27,18,18,18,18,27,18,18,18,18,18,18,27,18,18,18,18,18,18,18,27,18,18,27,18,18, 9,18,18,27,27, 1, 1, 1,],
        [27,27,18,18,18,18,18,18,18,27,18,27,27,27,18,18,27, 0, 0, 0,27,18,18,27,27,27,18,18,18,18,27,27,27,18,18,18,18,18,27,27,27,18,27,18, 9, 0, 9,18,27,27, 1, 1, 1,],
        [27,18,18,18, 9,18,18,18,18,27,27, 0, 0, 0,27,27, 0, 0, 8, 0, 0,27,27, 0, 0, 0,27,18,18,27, 0, 0, 0,27,18,18,18,27, 0, 0, 0,27,27,18, 0,15, 0,18,27,27, 1, 1, 1,],
        [18,18,18, 9, 0, 9,18,18,18,27, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0,27,27, 0, 0, 8, 0, 0,27,27,27, 0, 0, 8, 0, 0,27, 9, 9, 9, 9, 9,27,27, 1, 1, 1,],
        [18,18,18, 0, 8, 0,18,18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27,27, 1, 1, 1,],
        [18,18,18, 0, 0, 0,18,18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27,27, 1, 1, 1,],
        [18,18,18, 0, 4, 0,18,18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0, 0, 0,27,27, 1, 1, 1,],
        [27,27,27,27,27,27,27,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0,14, 0, 0, 0,27,27, 1, 1, 1,],
        [23,23,27,27,23,23,27,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0, 0, 0,27,27, 1, 1, 1,],
        [23,23,27,27,23,23,27,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27,27, 1, 1, 1,],
        [ 9, 9,27,27, 9, 9,27,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27,27, 1, 1, 1,],
        [ 9, 9,27,27, 9, 9,27,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27,27, 1, 1, 1,],
        [ 9, 9,27,27, 9, 9,27,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27,27, 1, 1, 1,],
        [ 0, 0,27,27, 0, 0,27,27, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0,27,27, 1, 1, 1,],
        [ 0, 0,27,27, 0, 0,27,27, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3,27,27, 1, 1, 1,],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 2,27, 1, 1, 1, 1,],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 2, 1, 1, 1, 1, 1,],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        ]
    };

  }
});
class Enemy extends Mover {
	constructor(x,y) {
		super(x,y);
		this.w = 40;
		this.h = 40;
		this.height = this.h;
		this.width = this.w; 
		this.color = "red";
		this.speed = 3;
		this.groundAccel = 5;
		this.mx = 1;
    this.killPlayer = true;
    this.isColliding = false;
	}
		 
	playerCollision(player) {
		if(player.vy > 0 && player.y-player.vy<this.y ) {
			return true;
		} else {
			return false;
		}
	}

	getHitByEntity(player) {
		player.bounceOffEntity(this);
		this.h=this.h/2;
		// this.die();
	}

	onHitPlayer(player) {
	}


	update(dt, frameCount) {
		if(this.wallcolliding == true) {
			this.mx = this.mx*-1;
		}
		super.update(dt, frameCount);       
		var enemyBox = this.getHitBox();	// Perforamnce effeciency issue
		var playerBox = this.game.player.getHitBox();
		if(rectangleCollision(enemyBox, playerBox) == true) {
      if(!this.isColliding&&this.game.player.bounceTimer<=0) {
        if(this.playerCollision(this.game.player) == true) {
          this.getHitByEntity(this.game.player);
          this.isColliding = true;
        } else {
          this.onHitPlayer(this.game.player);
          this.game.player.getHitByEntity(this);
        }
      }
		} else {
      this.isColliding = false;
    }
	}       
	draw(canvas) {
    super.draw(canvas);
    // var box = this.getHitBox();
    // canvas.strokeRect(box.x,box.y,box.w,box.h);
  }
}addBlock(function() { return {
  //End Block
  id: BLOCKS.length,
  name: "End",
  hide: true,
  ignoreCollisions: true,
  redraws: false,
  drawer: new Pig(),
  draw: drawEntity,
  onload: function(game, x,y,width,height, world,ii,jj) {
    game.pig = new Pig(x + width/2,y + height);
    game.addEntity(game.pig);
  },
}});

class PigFunScene extends GameScene{
  constructor() {
    super({
      grid: [
        [0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,19,19,19,19,19,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,],
        [0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,19,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,19,19,19,19,19,19,19,19,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,],
        [0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,19,19,19,19,19,19,19,0o0,19,19,0o0,0o0,19,19,19,19,19,19,19,19,19,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,],
        [0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,19,19,19,19,19,19,19,19,19,19,19,19,23,23,23,19,19,19,18,18,19,19,19,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,],
        [0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,19,19,19,19,19,19,19,19,19,19,19,21,19,19,19,19,18,18,18,18,18,19,19,19,19,0o0,0o0,0o0,0o0,0o0,19,19,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,],
        [0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,19,19,19,19,19,19,19,18,19,19,19,19,19,19,19,19,19,19,18,18,18,19,19,19,19,19,0o0,0o0,0o0,0o0,0o0,19,19,19,19,19,19,19,19,19,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,],
        [0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,19,19,19,19,19,19,19,18,19,18,19,19,0o0,0o0,19,19,19,19,19,19,19,18,18,18,23,23,19,19,0o0,0o0,0o0,0o0,19,19,19,19,19,19,19,19,19,19,19,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,],
        [0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,19,19,19,19,19,19,19,19,19,19,18,18,18,23,23,23,9,9,19,18,19,19,19,19,0o0,18,18,18,18,19,19,0o0,0o0,0o0,0o0,19,19,19,19,19,19,19,18,19,19,19,19,19,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,],
        [0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,22,19,19,19,19,19,19,19,19,19,19,19,18,18,18,18,18,19,19,19,19,18,19,19,19,19,19,18,18,18,19,0o0,19,0o0,0o0,0o0,0o0,19,19,19,19,19,19,19,18,18,19,19,19,19,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,],
        [0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,19,19,19,19,19,19,19,19,19,19,23,23,23,23,18,18,19,19,19,19,19,18,18,19,18,19,19,18,18,18,0o1,0o0,0o0,0o0,0o0,0o0,0o0,19,0o0,19,19,18,19,19,18,18,19,19,19,0o0,0o0,19,19,19,19,19,0o0,0o0,0o0,0o0,19,19,19,19,19,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,],
        [0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,19,19,19,19,19,19,19,19,19,19,19,19,19,18,18,18,18,19,21,0o0,19,19,18,18,18,18,19,19,18,18,18,0o1,0o0,0o0,0o0,0o0,0o0,0o0,19,0o0,19,18,18,19,18,18,18,19,19,19,0o0,0o0,19,19,19,19,19,19,0o0,0o0,19,19,19,19,19,19,19,19,0o0,0o0,0o0,0o0,19,19,19,19,19,19,19,0o0,0o0,0o0,0o0,0o0,0o0,],
        [0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,19,19,21,19,19,19,19,19,19,19,19,0o0,19,19,18,18,18,19,19,0o0,19,19,19,18,18,18,19,19,18,18,18,0o1,0o1,0o1,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,18,18,18,18,18,19,19,0o0,19,19,19,19,19,19,19,19,0o0,19,19,19,19,19,19,19,19,19,0o0,0o0,0o0,0o0,19,19,19,19,19,19,19,19,19,0o0,0o0,0o0,0o0,],
        [0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,19,19,19,19,18,19,19,19,19,19,19,0o0,0o0,19,18,18,18,0o0,19,0o0,0o0,19,19,19,18,18,19,0o0,18,18,18,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,23,23,23,23,23,19,19,19,0o0,19,19,19,19,19,19,19,19,19,19,19,19,19,18,19,19,19,19,0o0,0o0,0o0,19,19,19,19,19,19,19,19,19,19,19,0o0,0o0,0o0,],
        [0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,19,19,19,18,18,18,18,19,19,0o0,19,0o0,0o0,0o0,18,18,18,0o0,0o0,0o0,0o0,0o0,0o0,19,18,18,19,0o0,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,19,18,18,18,18,19,0o0,19,19,19,18,19,19,19,19,19,19,19,19,19,19,19,19,19,19,18,19,19,0o0,19,19,19,19,19,19,19,19,19,19,19,19,0o0,0o0,0o1,],
        [0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,19,19,19,18,23,23,23,9,0o0,19,0o0,0o0,0o1,0o1,18,18,0o0,0o0,0o0,0o0,0o0,9,23,23,18,0o0,0o0,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,19,19,18,18,19,19,0o0,19,19,19,18,19,18,19,18,19,19,19,19,18,19,19,18,19,19,19,19,19,0o0,19,19,18,19,19,19,18,19,19,19,19,19,0o0,0o0,0o1,],
        [0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,19,0o0,19,18,18,18,19,21,0o0,0o0,0o0,0o0,0o1,0o1,0o1,18,0o0,0o0,0o0,0o0,0o0,0o0,0o0,18,18,0o0,0o0,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o0,19,18,18,19,19,0o0,0o0,19,21,18,18,18,18,18,19,19,19,19,19,18,19,18,18,18,19,0o0,0o0,0o0,0o0,19,19,18,19,19,19,18,19,19,19,0o0,0o1,0o0,0o1,],
        [0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,19,0o0,19,18,18,19,19,0o0,0o0,0o0,0o0,0o0,0o1,0o1,0o1,18,0o0,0o0,0o0,0o0,0o0,0o0,0o0,18,18,0o0,0o0,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o0,18,18,19,0o0,0o0,0o0,19,19,19,18,18,18,18,18,19,19,19,19,18,18,18,23,23,23,23,23,9,0o0,0o0,19,18,18,19,18,18,18,18,19,0o0,0o1,0o1,0o1,],
        [0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,18,18,19,0o0,0o0,0o0,0o0,0o0,0o0,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,18,18,18,0o0,0o0,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o0,18,18,0o0,0o1,0o0,0o0,0o0,0o0,19,19,23,23,23,18,19,19,0o0,19,18,18,18,18,19,19,19,0o0,0o0,0o0,0o0,19,19,18,18,18,18,18,19,19,0o0,0o1,0o1,0o1,],
        [0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,18,18,0o0,0o0,0o1,0o1,0o0,0o0,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,18,18,0o0,0o1,9,9,9,9,9,23,23,23,18,18,19,19,0o0,0o0,18,18,18,18,19,19,0o0,0o0,0o0,0o0,0o0,9,23,23,23,18,18,18,19,0o0,0o0,0o1,0o1,0o1,],
        [0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,18,18,0o0,0o0,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,18,18,0o1,0o1,0o0,0o0,0o0,0o0,0o0,0o0,19,18,18,18,0o0,19,0o0,0o0,0o0,18,18,19,19,0o0,24,0o0,0o0,0o0,0o0,0o0,21,19,18,18,18,0o0,21,0o0,0o0,0o1,0o1,0o1,],
        [0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o1,0o1,18,0o0,0o0,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,18,0o1,0o1,0o0,0o0,0o0,0o0,0o0,0o0,0o0,18,18,18,0o0,21,0o0,0o0,0o0,18,18,19,0o0,0o0,24,0o0,0o0,0o0,0o0,0o0,0o0,0o0,18,18,0o0,0o0,0o0,0o0,0o0,0o1,0o1,0o1,],
        [0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o1,0o1,0o1,0o1,0o1,18,0o0,0o0,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o0,0o0,0o0,0o0,0o0,0o0,0o0,0o0,18,18,18,0o0,0o0,0o0,0o0,0o0,18,18,0o0,0o0,0o0,24,0o0,0o0,0o0,0o0,0o0,0o0,0o0,18,23,23,9,0o0,0o0,0o0,0o1,0o1,0o1,],
        [0o0,0o4,0o0,0o0,0o0,0o0,0o0,0o0,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o0,0o0,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o0,0o0,0o0,0o0,0o0,0o0,20,0o0,18,18,18,18,0o0,0o0,0o0,18,18,18,0o0,0o0,0o0,24,0o0,0o0,0o0,0o0,0o0,25,0o0,18,18,18,0o0,0o0,0o0,0o0,0o1,0o1,0o1,],
        [0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o0,0o0,0o0,0o0,0o0,25,0o0,18,18,18,0o0,0o0,0o1,0o1,0o1,0o1,0o1,],
        [0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o0,0o0,0o0,0o0,0o0,25,0o0,18,18,18,0o0,0o0,0o1,0o1,0o1,0o1,0o1,],
        [0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,0o1,],
        ]
    },true);
    this.gui = [];
  }
  win() {
    this.driver.setScene(new IntroScene());    
  }
  // update(dt, frameCount) {
  //   super.update(dt,frameCount);
  // }
}class ColorLerpBox extends GUIElement{
  constructor(x,y,w,h,groupID,activeColor, inactiveColor, changeDuration,startActivated){
    super(x,y,w,h,groupID);
    //Color is in format [r,g,b,a]
    this.activeColor = activeColor;
    this.inactiveColor = inactiveColor;
    this.changeDuration = changeDuration;
    this.activated = startActivated;
    this.colorTimer = startActivated ? this.changeDuration : 0;
  }
  update(dt){
    if(this.activated){
      this.colorTimer += dt;
      if(this.colorTimer > this.changeDuration)
        this.colorTimer = this.changeDuration;
    } else {
      this.colorTimer -= dt;
      if(this.colorTimer < 0)
        this.colorTimer = 0;
    }  
  }
  draw(canvas){
    var fillColor = colorLerp(this.inactiveColor,this.activeColor,this.colorTimer/this.changeDuration);
    canvas.fillStyle = makeColorStr(fillColor);
    canvas.fillRect(this.x*canvas.width,this.y*canvas.height,this.w*canvas.width,this.h*canvas.height);
  }
  setOptions(interactable,selectable,visible){
    //Interactable and selectable should never be true
    //But calling setOptions with 3 parameters like buttons should be possible
    super.setOptions(false,false,visible);
  }
}addLevel( function(nameSpace) {
  {

    return {
      name: "Feather Adventure",
      worldType: 1,
      grid: 
      [
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,19,19,19, 0, 0, 0, 0, 0, 0,19,19,19,19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0,19,19,19,19, 0, 0, 0, 0, 0,19,19,19,19,19,19,19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0,19,19,19,18,19,19, 0, 0, 0,19,19,19,19,19,19,19,19,19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,27, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0,19,19,18,27,19,19, 0, 0, 0,19,19,19,19,19,19,19,19,19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,27,27, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0,19,19,18,27,19,19, 0, 0, 0, 0,19,19,19,19,18,19,19,19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,27,27,27, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0,19,18,27,19,19, 0, 8, 0, 8,19,19,18,18,18,19,19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27,27,27, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,18,27,18,19,19, 0, 8, 0,19,19,18, 2,18, 0,19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27,27,27, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,18,27,18,19,19, 0, 0, 0,19,19,18, 2,18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27,27,27, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,18,27,18, 0, 0, 0, 0, 0,19, 0,18,27,18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1,27,27,27, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,18,27,18, 0, 0, 0, 0, 0, 0, 0,18,27,18,14, 0, 0, 0, 0, 0, 0, 0, 0, 0,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27,27,27, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2,27,18, 0, 0, 0, 0, 0, 0, 8,18,27,18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27,27,27, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0,19,18,18,18,27,18, 0, 0, 0, 0, 0, 0, 0,18,27,18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27,27,27, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0,19,19,19,18,27,18, 8, 0, 0, 0, 0, 2, 2, 2,27,18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27,27,27, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,18,27,18, 0, 0, 0, 0, 0,19,18,18,27,18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 8, 0, 3, 3,27,27,27, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,18,27, 2, 2, 2, 0, 0, 0, 0, 0,18,27,18, 0, 0, 0, 0,19,19, 0,19,19,19,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27,27,27, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,18,27,18,19,19, 0, 0, 0, 0, 0,18,27, 2, 2, 2, 0, 0,19,19,19,19,19,19,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27,27,27, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,18,27,18,19,19, 0, 0, 0, 0, 8,18,27,18,18,19, 0,19,19,18,19,19,19,19,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27,27,27, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,18,27,19,19, 0, 0, 0, 0, 0, 0,18,27,18, 0, 0, 0,19,19,18,18,19,18,19,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27,27,27, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2,27,18, 0, 0, 0, 0, 0, 2, 2, 2,27,18, 0, 0, 0,19,19,19,18,19,18,19,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27,27,27, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0,19,18,27,18, 8, 0, 0, 0, 0,19, 0,18,27,18, 0, 0, 0, 0,19,18,18,18,19,19,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27,27,27, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0,19,18,27,18, 0, 0, 0, 0, 0, 0, 0,18,27,18, 0, 0, 0, 0, 0,18,19,19,19,19,27, 3, 3, 3, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3,27,27,27, 0, 0, 0,],
        [ 0, 0, 0, 8, 0, 0, 0, 0, 0,19,18,27, 2, 2, 2, 0, 0, 0, 0, 0,18,27,18, 0, 0, 0, 0, 0,18,18, 0, 0, 0,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27,23,27, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,18,27,18, 0, 0, 0, 0, 0, 0, 0,18,23,18, 0, 0, 0, 0, 0,18,18, 0, 0, 0,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,23,18,23, 0, 0, 0,],
        [ 4, 0, 0, 0, 0, 0, 0, 0, 0, 0,18,27,18, 0, 0, 0, 0, 0, 0, 0,18,23,18, 0, 0, 0, 0,18,18,18,18, 0, 0,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,23,18,23, 0, 5, 0,],
        [ 1, 1, 1, 1, 0, 0, 0, 9, 9, 9,23,27,23, 9, 9, 9, 9, 9, 9, 9,23, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        [ 1, 1, 1, 1, 1, 0, 0, 0, 0, 0,18,18,18, 0, 0, 0, 0, 0, 0, 0,18, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        [ 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,18,18,18, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1,18,18,18,18, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,18,18, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        ]
    };

  }
});
var TheByrd;
class Byrd extends Enemy {
  constructor(x,y) {
    super(x,y);
    this.w = 60;
    this.h = 50;
    this.width = this.w;
    this.height = this.h;
    this.width = this.w;
    this.height = this.h;
    this.color="black";
    this.jumpPower = 10;
    this.killPlayer = false;
    this.startY= y;
    this.isByrd = true;
    // this.color1 = "#612a99";
    // this.color2 = "#1e045b";
    this.color1 = "#200089";
    this.color2 = "#000";
    this.color3 = '#ca87fd';
    this.eyeColor = "#fff";
    this.beakColor = "#f7ff8c";
    // this.beakColor = "#000";
    
    TheByrd = this;
  }
  playJumpSound() {
    
  }
  die() {

  }
  getHitByEntity(player) {
    player.bounceOffEntity(this);
    this.height/=4;
    this.width*=.8;
		// this.h=this.h/2;
		// this.die();
	}
  update(dt, frameCount) {
    if(this.y>this.startY&&this.vy>=0) {
      this.jumpCount = 0;
      this.jump();
    }
    super.update(dt, frameCount);
    this._angle = -this.angle;
  }
  drawShape(canvas, w,h) {
    canvas.strokeStyle="#000";
    canvas.lineWidth = 5;
    canvas.strokeRect(-w/2,-h,w,h);    
    this.drawWings(canvas,w,h,1);        
    canvas.fillStyle=this.color1;
    canvas.fillRect(-w/2,-h,w,h);
    canvas.fillStyle=this.color2;    
    canvas.fillRect(-w/2,-h,w/4,h);
    canvas.fillStyle=this.color3;
    canvas.fillRect(-w/10,-h*.9,w/8,h/10);
    this.drawWings(canvas,w,h);    
    this.drawFace(canvas,w,h);
  }
  drawFace(canvas,w,h) {
    canvas.fillStyle = this.eyeColor;
    canvas.fillRect(25,-h*.95,7,5);
    // canvas.fillText('^', 25,-h*.95+h*.4);
    canvas.fillStyle = this.beakColor;
    // canvas.fillRect(12,-h*.7,30,15);
    canvas.beginPath();
    canvas.moveTo(22,-h*.9);
    canvas.lineTo(22+30,-h*.9+15/2);
    canvas.lineTo(22,-h*.9+15);
    canvas.fill();
    canvas.fillStyle = this.eyeColor;
    // canvas.fillText('^', 10,-h*.95+h*.4);
    canvas.fillRect(10,-h*.95,7,5);
    // canvas.lineWidth=4;
    // canvas.lineCap = 'round';
    // canvas.moveTo(3,-h*.8);
    // canvas.lineTo(3+2,-h*.8+2);
    // canvas.moveTo(20,-h*.8);
    // canvas.lineTo(20-2,-h*.8+2);
    // canvas.stroke();
  }
  drawWings(canvas, w,h,s) {
    var ww = w*.6;
    var hh = h/4;
    canvas.fillStyle = this.color1;
    canvas.beginPath();
    // canvas.rect(-w/2-ww/2,-h/2, ww,hh);
    // canvas.rect(w/2,-h/2, ww,hh);
    var angle = this.vy/15;
    var y = -h*.8-angle*10;
    this.pathWingAtAngle(canvas, -w/2-ww/2,y, ww,hh, ww*.8, hh/2, angle);
    this.pathWingAtAngle(canvas,w*.4,y, ww,hh, ww*.2, hh/2, -angle);
    if(s)canvas.stroke();
    else canvas.fill();
  }
  pathWingAtAngle(canvas, x,y,w,h, px,py, angle) {
    canvas.save();
    canvas.translate(x+px, y+py);
    canvas.rotate(angle);
    canvas.rect(-px,-py-10,w,h);
    canvas.rect(-px*.8,-py,w*.8,h);
    canvas.rect(-px*.5,-py+5,w*.5,h);
    canvas.restore();
  }
}addBlock(function() { return {
  //Enemy Block
  id: BLOCKS.length,
  name: "Enemy",
  hide: true,   
  ignoreCollisions: true,
  drawer: new Enemy(),
  draw: drawEntity,
  onload: function(game, x,y,width,height, world,ii,jj) {
    game.addEntity(new Enemy(x + width/2,y + height));
  },
}});
class MenuScene extends Scene{
  constructor(playIntro) {
    super(playIntro);
    
    //up    - 0
    //right - 1
    //down  - 2
    //left  - 3
    this.menuState = 0;
    this.allowUIInput = true;
    this.addMainMenuGUI();
    this.keyMap = {
      '32': { down: this.pressButton.bind(this), up: this.unpressButton.bind(this) }, //space
      '13': { down: this.pressButton.bind(this), up: this.unpressButton.bind(this) }, //enter
      '69': { down: () => {if(DEBUG)this.driver.setScene(new LevelEditorSelectScene(false));} },
      '87': { down: this.navigateUI.bind(this,0)},    //W
      '65': { down: this.navigateUI.bind(this,1)},   //D
      '83': { down: this.navigateUI.bind(this,2)},    //S
      '68': { down: this.navigateUI.bind(this,3)},    //A
      '38': { down: this.navigateUI.bind(this,0)},  //up
      '39': { down: this.navigateUI.bind(this,1)},  //right
      '40': { down: this.navigateUI.bind(this,2)},   //down
      '37': { down: this.navigateUI.bind(this,3)},   //left

    }
    this.background = new InfiniteBackground();
   
    this.camera = {x:0,y:0,dx:0,dy:0};
    this.allowUIInput = true;
  }
  
  update(dt) {
    this.camera.x+=3;
    super.update(dt);
   
  }
  draw(canvas) {
    this.background.drawLayers(canvas, this.camera);

    
    this.drawAllGUI(canvas);
    if(this.debug)
      drawGrid(canvas);
    drawTransitionOverlay(this.overlayColor,canvas);
  }
  drawAllGUI(canvas){
    for(var i = 0; i < this.gui.length; i++){
      if(this.gui[i].visible){
        this.gui[i].draw(canvas);
      }
    }
  }
 
  addMainMenuGUI(){
    var bigFont = "60px " + FONT;
    var buttonFont = "30px " + FONT;

    var dim = rectDimFromCenter(.5,.28,.58,.12);

    switch(touchOn){
      case false:
        var mainTitle = new Label(dim[0],dim[1],dim[2],dim[3],0,
          "Jimothy Piggerton",bigFont,"white",'center');
        this.gui.push(mainTitle);
        dim = rectDimFromCenter(.5,.48,.18,.1);
        var startButton = new GrowthTextButton(dim[0],dim[1],dim[2],dim[3],0,this.startGame.bind(this),
          "Start Game",buttonFont,"white","transparent","white",5,.08);
        this.gui.push(startButton);
    
        dim = rectDimFromCenter(.5,.60,.18,.1);
        var levelSelectButton = new GrowthTextButton(dim[0],dim[1],dim[2],dim[3],0,this.goToLevelSelect.bind(this),
          "Level Select",buttonFont,"white","transparent","white",5,.08);
        this.gui.push(levelSelectButton);
    
        dim = rectDimFromCenter(.5,.72,.18,.1);
        var optionsButton = new GrowthTextButton(dim[0],dim[1],dim[2],dim[3],0,this.goToOptions.bind(this),
          "Options",buttonFont,"white","transparent","white",5,.08);
        this.gui.push(optionsButton);
    
        dim = rectDimFromCenter(.5,.84,.18,.1);
        var creditsButton = new GrowthTextButton(dim[0],dim[1],dim[2],dim[3],0,this.goToCredits.bind(this),
          "Credits",buttonFont,"white","transparent","white",5,.08);
        this.gui.push(creditsButton);
    
        startButton.setNeighbors([undefined,undefined,levelSelectButton,undefined]);
        levelSelectButton.setNeighbors([startButton,undefined,optionsButton,undefined]);
        optionsButton.setNeighbors([levelSelectButton,undefined,creditsButton,undefined]);
        creditsButton.setNeighbors([optionsButton,undefined,undefined,undefined]);
        break;

      case true:

        buttonFont = FONT;
        var fontSize = '35px';
        var largerFontSize = '45px';
        var backFill = 'rgba(0,0,0,.2)';
        var expandFactor = .3;
        var mainTitle = new Label(dim[0],dim[1],dim[2],dim[3],0,
          "Jimothy Piggerton",bigFont,"white",'center');
        this.gui.push(mainTitle);
        dim = rectDimFromCenter(.31,.52,.27,.24);
        var startButton = new ExpandingMobileButton(dim[0],dim[1],dim[2],dim[3],0,this.startGame.bind(this),
          "Start Game",buttonFont,fontSize,largerFontSize,'white',backFill,'white',10,expandFactor);
        this.gui.push(startButton);
    
        dim = rectDimFromCenter(.69,.52,.27,.24);
        var levelSelectButton = new ExpandingMobileButton(dim[0],dim[1],dim[2],dim[3],0,this.goToLevelSelect.bind(this),
          "Level Select",buttonFont,fontSize,largerFontSize,'white',backFill,'white',10,expandFactor);
        this.gui.push(levelSelectButton);
    
        dim = rectDimFromCenter(.31,.8,.27,.24);
        var optionsButton = new ExpandingMobileButton(dim[0],dim[1],dim[2],dim[3],0,this.goToOptions.bind(this),
          "Options",buttonFont,fontSize,largerFontSize,'white',backFill,'white',10,expandFactor);
        this.gui.push(optionsButton);
    
        dim = rectDimFromCenter(.69,.8,.27,.24);
        var creditsButton = new ExpandingMobileButton(dim[0],dim[1],dim[2],dim[3],0,this.goToCredits.bind(this),
          "Credits",buttonFont,fontSize,largerFontSize,'white',backFill,'white',10,expandFactor);
        this.gui.push(creditsButton);
        break;
    }

    

    this.selectedButton = startButton;
    this.selectedButton.selected = true;
    this.buttons = getButtons(this.gui);

  }
  startGame(){
   
    this.allowUIInput = false;
    //this.driver.setScene(new PigFunScene());
    this.startTransition(25,1,sceneTransition(this,IntroScene,true));
  }
  goToLevelSelect(){
   
    this.allowUIInput = false;
    this.driver.setScene(new LevelSelectScene(false));

  }
  goToOptions(){
    this.allowUIInput = false;
    this.driver.setScene(new OptionScene(false));
  } 
  goToCredits(){
   
    this.allowUIInput = false;
    this.driver.setScene(new CreditsScene(false));
  }
  
  
}



class ColoredBox extends GUIElement{
  constructor(x,y,w,h,groupID,fillColor,outlineColor,lineWidth){
    super(x,y,w,h,groupID);
    this.fillColor = fillColor || 'transparent';
    this.outlineColor = outlineColor || 'transparent';
    this.lineWidth = lineWidth
  }
  update(dt){}
  draw(canvas){
    canvas.fillStyle = this.fillColor;
    canvas.strokeStyle = this.outlineColor;
    canvas.lineWidth = this.lineWidth;
    var dim = this.getPixelDimensions(canvas);
    canvas.fillRect(dim[0],dim[1],dim[2],dim[3]);
    canvas.strokeRect(dim[0],dim[1],dim[2],dim[3]);
  }
  setOptions(interactable,selectable,visible){
    //Interactable and selectable should never be true
    //But calling setOptions with 3 parameters like buttons should be possible
    super.setOptions(false,false,visible);
  }
}changeWorldType(1);
class Powerup {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.w = 70;
    this.h = 70;
    this.color="black";
    this.jumpPower = 10;
    this.killPlayer = false;
    this.mx = 0;
    this.my = 0;
    this.power = 0;
    this.startY = this.y;
    this.reset = this.reset.bind(this);
    this.on = true;
    this.offset=0;
  }
  update(dt, frameCount) {
    if(!this.on)return;
    var myBox = this.getHitBox();	// Perforamnce effeciency issue
    var player = this.game.player;
		var playerBox = player.getHitBox();
		if(rectangleCollision(myBox, playerBox) && this.canBeCollected()) {
      this.die();
      this.onHitPlayer(player);
    }
    if(this.on) {
      this.offset = Math.cos(frameCount*Math.PI/20)*2;
    } else {
      this.offset=0;
    }
  }
  canBeCollected() {
    return true;
  }
  draw(canvas) {
    canvas.save();
    if(!this.on)canvas.globalAlpha = 0.5;
    canvas.translate(this.x,this.y);
    // canvas.translate(-this.w/2,-this.h/2);
    canvas.translate(0,this.offset);
    this.drawShape(canvas,this.w,this.h);
    canvas.restore();
  }
  drawShape(canvas,w,h) {
    canvas.fillStyle = this.color;
    canvas.fillRect(-w/2, -h, w, h);
  }

  onHitPlayer(player) {
    PLAYER_ABILITIES[this.power](player);
    SOUNDMAP.powerup.play();
    player.game.screenShakeLevel = 0.4;
    player.game.frameStop = 2;
    for(var i=0;i<10;i++) {
      var x = this.x;// + (Math.random()*this.w-this.w/2)/2;
      var y = this.y;// - (Math.random()*this.h)/4;
      var w = 10;
      var h = 10;
      var vx = Math.random()*5-2;
      var vy = Math.random()*5-2-10;
      var color = this.color1;
      // if(i>=num-8) color = "#222";
      // if(i>=num-4) color = "#33d"
      // if(i>=num-2) color = "#fff"; 
      this.game.addEntity(new FallingParticle(x,y,w,h,vx,vy,30,color));
    }
  }

  getHitBox() {
    return {x:this.x-.5*this.w, y:this.y-this.h, w:this.w, h:this.h};
  }

  reset() {
    this.on = true;
    this.color = 'black';
  }

  die() {
    this.on = false;
    this.color = 'rgba(150,150,150,.5)';
    this.game.driver.setTimeout(this.reset, 60);
  }
}addBlock(function() { return {
  //End Block
  id: BLOCKS.length,
  name: "WallJump",
  hide: true,
  ignoreCollisions: true,
  draw: drawEntity,
  drawer: new wallJump(),
  //entityCollision: function(entity, pos, dx, dy, cellPos) {
 //   entity.game.world.world[cellPos.y/cellPos.h][cellPos.x/cellPos.w] = 1;
//    entity.game.world.forceRedraw();
  //},
  onload: function(game, x,y,width,height, world,ii,jj) {
    game.addEntity(new wallJump(x + width/2,y));
  },
}});
class IntroScene extends GameScene{
  constructor() {
    var w = 18;
    var l = 19;
    super({
      grid: [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,1,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,1,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,19,19,19,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        [0,0,0,0,0,0,0,0,0,0,0,19,19,19,19,19,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        [0,0,0,0,0,0,0,0,0,19,19,19,19,19,19,19,19,19,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        [0,0,0,0,0,0,0,0,19,19,19,19,19,19,19,19,19,19,19,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        [0,0,0,0,0,0,0,0,19,19,19,19,19,19,19,19,19,19,19,19,19,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        [0,0,0,0,0,0,0,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        [0,0,0,0,0,0,0,0,19,19,19,19,19,19,19,19,19,19,19,19,19,19,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        [0,0,0,0,0,0,0,0,19,19,19,19,19,19,19,19,19,19,19,19,0,19,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        [0,0,0,0,0,0,0,0,19,19,19,18,19,19,18,19,18,19,19,19,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        [4,0,0,0,0,0,0,0,19,0,19,18,18,19,18,18,18,19,19,19,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        [0,0,0,0,0,0,0,0,0,0,0,19,18,18,18,18,19,19,0,19,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        [0,0,0,0,0,0,0,0,0,0,0,19,0,18,18,18,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,18,18,18,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        [1,1,1,0,0,0,0,0,0,0,0,0,0,18,18,18,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        [1,1,1,1,1,1,1,1,0,0,0,0,4,18,18,18,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        
        ]
    },true);
    this.touchButtonsActive = false;
    this.gui = [];
    this.keyMap = {
      '27': {down: sceneTransition(this, GameScene)},
    }
    this.gamePadOn = false;
    // this.player.x = 500;
    this.player.flipped = true;
    this.pig = new Pig(this.player.x+100, this.player.y);
    this.pig.speed=0;
    this.butcher = new Butcher(this.player.x+600, this.player.y);
    this.addEntity(this.butcher);
    this.butcher.speed=0;    
    this.addEntity(this.pig);
    this.player.updateEye = function() {};
    this.pig.mx = 0;
    this.pig.bounceFrq = Math.PI/30;
    this.totalTime = 400;
    this.time = this.totalTime+1000;
    this.player.resetControls = function() {};
    this.player.speed = 4;
    this.player._angle = Math.PI/10;
    this.player.eyeMovement.blink = 1;
    this.pig.animationState = 1;
    this.startTransition(100, -1, function() {
      this.time=this.totalTime;
      this.butcher.speed = 3.9;
    });
    this.makeLetterBox();
    this.timeToWait=0;
    this.emitZ = true;
    this.emissionDelay = 35;

    this.allowUIInput = true;
    this.selectedButton = undefined;
    this.touchCount = 0;
    this.addIntroGUI();
  }
  makeLetterBox(){
    var upperBoxHeight = 0.2;
    var lowerBoxHeight = 0.2;

    this.upperLetterBox = new ColoredBox(0,0,1,upperBoxHeight,0,'black','transparent',1);
    this.lowerLetterBox = new ColoredBox(0,1-lowerBoxHeight,1,lowerBoxHeight,0,'black','transparent',1);
    this.gui.push(this.upperLetterBox);
    this.gui.push(this.lowerLetterBox);
  }
  moveCamera(){
    var camera = this.camera;
    var player = this.player;
    var canvas = this.canvas;
    // if(player.mx) {
      var cdx = (player.x-camera.x+camera.dx)/10;
      if(Math.abs(cdx)>3)camera.x += cdx;
      // camera.x += (player.x-camera.x+camera.dx)/10;
    // }
    // camera.x = linearMove(camera.x, (player.x + camera.dx), 5);    

    // var cdy = (player.y-camera.x+camera.dy-30)/10;
    // if(Math.abs(cdy)>3)camera.y += cdy;
    camera.y += (player.y-camera.y-30)/30;
    if(player.grounded) camera.y += (player.y-camera.y-30)/20;
    var d = 0;
    if(player.vy>0 && camera.y < player.y - 30) camera.y += (player.y-camera.y-30)/10;
    if(player.crouching&&player.grounded) camera.dy += 1; else camera.dy=0;
    if(camera.dy>60)camera.dy=60;
    if(camera.dy>10) camera.y+=(camera.dy-10)/3;
    //make the camera point more towards the direction
    //that the player is moving in so they can see ahead
    if(player.mx!=0) {
      // camera.dx = linearMove(camera.dx, (player.mx * 100), 5);
    }
    if(!canvas)return;
    var world1 = this.world;
    if(camera.x<canvas.width/2)camera.x = canvas.width/2;
    if(camera.x>world1.w*world1.s-canvas.width/2) camera.x = world1.w*world1.s-canvas.width/2;
    if(camera.y>world1.h*world1.s-canvas.height/2+canvas.height*this.lowerLetterBox.h)camera.y = world1.h*world1.s-canvas.height/2+canvas.height*this.lowerLetterBox.h;
    if(camera.y<canvas.height/2-canvas.height*this.upperLetterBox.h)camera.y = canvas.height/2-canvas.height*this.upperLetterBox.h;  
  }
  followPlayer(){
    this.moveCamera();
  }
  constrainCamera(x,y,w,h){
    
  }
  addIntroGUI(){
    var buttonFont = "25px noteworthy";
    var textColor = 'black';
    if(touchOn){
      var entireScreenButton = new TextButton(0,0,1,1,0,
        this.increaseTouchCount.bind(this),"",buttonFont,'transparent','transparent','transparent',0);
      this.gui.push(entireScreenButton);
      
      var dim = rectDimFromCenter(.83,.08,.5,.1);
      this.skipMessage = new Label(dim[0],dim[1],dim[2],dim[3],0,
        "",buttonFont, 'rgba(255,255,255,.9)', 'center');
      this.gui.push(this.skipMessage);
    }
    this.buttons = getButtons(this.gui);


    
  }
  increaseTouchCount(){
    this.touchCount += 1;
  }
  update(dt, frameCount) {
    super.update(dt,frameCount);

    if(touchOn){
      if(this.touchCount >= 1){
        this.skipMessage.text = "Tap again to skip";
      }
      if(this.touchCount >= 2){
        this.time = 0;
      }
    }

    this.timeToWait--;
    this.time--;
    if(this.time<=0) {
      this.driver.setScene(new LevelIntroScene(new GameScene(),true));
    }
    if(this.time > this.totalTime-200){
      if(this.time % this.emissionDelay == 0){
        this.addEntity(new SleepText(this.player.x+this.player.w,this.player.y-this.player.h,20,2,-2,"Z",
          "30", FONT,[255,255,255,1],[255,255,255,0],25,25,true));
      }
      
    }
    if(this.time > this.totalTime-150){
      if(this.time % this.emissionDelay == 9){
        this.addEntity(new SleepText(this.pig.x+this.pig.w,this.pig.y-this.pig.h,20,2,-2,"Z",
          "30", FONT,[255,255,255,1],[255,255,255,0],25,25,true));
      }
    }
    if(this.time == this.totalTime-160){
      this.addEntity(new SleepText(this.pig.x+this.pig.w/2,this.pig.y-this.pig.h-70,80,0,0,"!?",
          "65", FONT,[255,255,255,1],[255,255,255,0],20,30,true));
    }
    if(this.time == this.totalTime - 200) {
      this.player.flipped = false;
      this.player.jump(7);
      this.player._angle = 0;      
      this.player.eyeMovement.blink = 0;      
    }
    if(this.time < this.totalTime - 230) {
      this.player.mx = 1;
      this.moveCamera = function() {};
    }
    
  }
  draw(canvas){
    super.draw(canvas);
    this.drawAllGUI(canvas);
  }
}class ArrowSelector extends Button{
  constructor(x,y,w,h,groupID,onRelease,moveDistance,moveSpeed,fillColor,outlineColor,lineWidth,flipped){
    super(x,y,w,h,groupID,undefined);
    
    this.fillColor = fillColor;
    this.outlineColor = outlineColor;
    this.lineWidth = lineWidth;
    this.moveSpeed = moveSpeed;
    this.flipped = flipped;
    this.moveDistance = moveDistance;
    this.onRelease = function(){
      if(this.flipped)
        this.x = this.originalDimension[0]-this.moveDistance;
      else  
        this.x = this.originalDimension[0]+this.moveDistance;
      onRelease();
    }.bind(this);
  }
  update(dt){
    this.moveToPosition(dt,this.originalDimension[0]);
  }
  draw(canvas){
    canvas.fillStyle = this.fillColor;
    canvas.strokeStyle = this.outlineColor;
    canvas.lineWidth = this.lineWidth;
    var drawPoints = [undefined,undefined,undefined];
    if(this.flipped){
      drawPoints[0] = [this.x+this.w,this.y];
      drawPoints[1] = [this.x+this.w,this.y+this.h];
      drawPoints[2] = [this.x,this.y+this.h/2];
    } else {
      drawPoints[0] = [this.x,this.y]
      drawPoints[1] = [this.x,this.y+this.h];
      drawPoints[2] = [this.x+this.w,this.y+this.h/2];
    }
    
    canvas.beginPath();
    canvas.moveTo(drawPoints[0][0]*canvas.width,drawPoints[0][1]*canvas.height);
    canvas.lineTo(drawPoints[1][0]*canvas.width,drawPoints[1][1]*canvas.height);
    canvas.lineTo(drawPoints[2][0]*canvas.width,drawPoints[2][1]*canvas.height);
    canvas.lineTo(drawPoints[0][0]*canvas.width,drawPoints[0][1]*canvas.height);
    
    canvas.fill();
    canvas.stroke();
  }
  
  getBounds(points){
    var left = points[0][0];
    var right = points[0][0];
    var top = points[0][1];
    var bottom = points[0][1];
    for(var i = 0; i < points.length; i++){
      left = Math.min(left,points[i][0]);
      right = Math.max(right,points[i][0]);
      top = Math.min(top,points[i][1]);
      bottom = Math.max(bottom,points[i][1]);
    }
    return [right-left,bottom-top];
  }
  moveToPosition(dt,destX){
    var toMove = dt * (destX-this.x)*this.moveSpeed;
    this.x += toMove;
  }
  displaceArrow(){
    if(this.flipped)
        this.x = this.originalDimension[0]-this.moveDistance;
      else  
        this.x = this.originalDimension[0]+this.moveDistance;
  }
}addLevel( function(nameSpace) {
  {

    return {
      name: "Woof Pen",
      worldType: 1,
      grid: [
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,19,19,19,19,19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,19,19,19,19,19,19,19,19,19,19,19,19,19, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19, 0, 0, 0, 0, 0, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,19,19,19,19,19,19,19,19,18,19,19,19,19,19,19,19, 0, 0, 0, 0, 0, 0, 0, 0,],
        [ 0, 0, 0,19,19,19,19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,19,19,19,19,19,19,19,19,18,19,19,19,19,18,18,19,19,19,18,18,19, 0, 0, 0, 0, 0, 0, 0, 0,],
        [ 0, 0,19,19,19,19,19,19,19, 0, 0, 0, 0, 0, 0, 0, 0, 0,19,19,19,19,19,19,19,19,18,19,18,18,19,19,19,18,18,19,18,18,19,19, 0, 0, 0, 0, 0, 0, 0, 0,],
        [ 0,19,19,19,19,19,19,19,19,19, 0, 0, 0, 0, 0, 0, 0,19,19,19,19,19,19,19,19,19,18,19,19,19,18,19,19,19,18,18,18,18,19, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [19,19,19,19,19,19,19,19,19,19, 0, 0, 0, 0, 0, 0,19,19,19,19,19,19,18,19,19,19,19,18,18,18,19,18,19,19,18,18,19,19,19, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [19,19,18,18,19,19,18,19,19,19, 0, 0, 0, 0, 0, 0,19,19,19,19,18,18,19,19,19,19,19,19,18,18,18,18,19,18,18,18,19,19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [19,19,19,18,18,19,18,18,18,19, 0, 0, 0, 0, 0, 0,19,19,19,19,19,18,19,19,18,19,19,19,18,18,18,19,19,18,18,18,18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [19,19,19,19,18,18,18,18,19,19, 0, 0, 0, 0, 0, 0,19,19,18,18,18,18,19,18,19,19,19,18,18,18,19,19, 0,18,18,18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [ 0,19,18,19,18,18,18,19,19, 0, 0, 0, 0, 0, 0, 0, 0,19,19,19,18,18,18,19,19,19,19,19,18,18,18, 0, 0,18,18,18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [ 0,19,19,18,18,18,19,19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,19,19,18,18,19,19,18,19,18,18,27,18,18, 0, 0,18,18,18,18, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,],
        [ 0, 0, 0,19,18,18,19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,18,18,18,19,18,19,19,19,27,18,18, 0,18,18,18,18,18,16, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0,],
        [ 0, 0, 0, 0,18,18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,18,18,18,18,19,19, 0,19,27,23,23, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 5, 0, 0, 0,],
        [ 0, 0, 0, 0,18,18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,18,18,18,19, 0, 0, 0,18,18,18, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        [ 0, 0, 0, 0,18,18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,18,18,18,19, 0, 0,18,18,18,18,18, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        [ 4, 0, 0,18,18,18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,23,23,18,18, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        [ 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,18,18,18, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        [ 1, 1, 1, 1, 1, 1, 1, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,18,18, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        [ 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,18,18,18, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,18,18,18, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,16, 0, 0, 0, 0, 0, 0,18,18,18,18, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        ]
    };

  }
});
class doubleJump extends Powerup {
  constructor(x,y) {
    super(x,y);
    this.w = 40;
    this.h = 40;
    this.color="black";
    this.jumpPower = 0;
    this.killPlayer = false;
    this.mx = 0;
    this.my = 0;
    this.power = 2;
    this.color1= "#000";
    this.angle = Math.PI/4;
  }
  canBeCollected() {
    var player = this.game.player;
    return player.maxJumps == 1 || player.jumpCount > 1;
  }
  drawShape(canvas,w,h) {
    canvas.strokeStyle = '#fff';
    canvas.lineWidth = 7;
    w=w*2;
    this.drawWings(canvas,w,h,1);
    this.drawWings(canvas,w,h);
  }
  pathWingAtAngle(canvas, x,y,w,h, px,py, angle) {
    var d = w/3;
    canvas.save();
    canvas.translate(x+px, y+py);
    canvas.rotate(angle);
    canvas.rect(-px,-py-10,w,h);
    canvas.rect(-px*.8-d,-py,w*.8+d,h);
    canvas.rect(-px*.5,-py+5,w*.5,h);
    canvas.restore();
  }
  drawWings(canvas, w,h,s) {
    var ww = w*.6;
    var hh = h/4;
    canvas.fillStyle = this.color1;
    canvas.beginPath();
    // canvas.rect(-w/2-ww/2,-h/2, ww,hh);
    // canvas.rect(w/2,-h/2, ww,hh);
    var angle = this.angle;
    var y = -h*.4-angle*10;
    // this.pathWingAtAngle(canvas, -w/2-ww/2,y, ww,hh, ww*.8, hh/2, angle);
    this.pathWingAtAngle(canvas,-w/2+ww/2,y, ww,hh, ww*.2, hh/2, -angle);
    if(s)canvas.stroke();
    else canvas.fill();
  }
}addBlock(function() { return {
  //End Block
  id: BLOCKS.length,
  name: "DoubleJump",
  hide: true,
  ignoreCollisions: true,
  drawer: new doubleJump(),
  draw: drawEntity,
  onload: function(game, x,y,width,height, world,ii,jj) {
    game.addEntity(new doubleJump(x + width/2,y + height));
  },
}});
class PauseScene extends Scene {
  constructor(prevScene) {
    super();
    this.prevScene = prevScene;
    if(prevScene.onPause)prevScene.onPause();
    this.keyMap = {
      '32': { down: this.pressButton.bind(this), up: this.unpressButton.bind(this) }, //space
      '13': { down: this.pressButton.bind(this), up: this.unpressButton.bind(this) }, //enter

      '27': {down: this.safeButtonCall(this,this.unpause)}, //esc
      '87': { down: this.navigateUI.bind(this,0)},    //W
      '65': { down: this.navigateUI.bind(this,1)},   //D
      '83': { down: this.navigateUI.bind(this,2)},    //S
      '68': { down: this.navigateUI.bind(this,3)},    //A
      '38': { down: this.navigateUI.bind(this,0)},  //up
      '39': { down: this.navigateUI.bind(this,1)},  //right
      '40': { down: this.navigateUI.bind(this,2)},   //down
      '37': { down: this.navigateUI.bind(this,3)},   //left

      '78': {down: function() {
        if(this.keys[67] && DEBUG) {
          this.goToLevelEditor(prevScene.levelIndex+1);
        }
      }.bind(this)},
    }
    this.allowUIInput = true;
    this.selectedButton = undefined;
    this.addPauseMenuGUI();
  }
  update(dt){
    super.update(dt);
    SOUNDMAP.music.lerpVolume(0.2, 0.05);
  }
  unpause() {
    if(this.prevScene.onResume)this.prevScene.onResume();
    this.driver.setScene(this.prevScene);
  }
  goToMainMenu(){
    this.allowUIInput = false;
    this.startTransition(25,1,sceneTransition(this,MenuScene,true));
  }
  goToLevelSelect(){
    this.allowUIInput = false;
    this.startTransition(25,1,sceneTransition(this,LevelSelectScene,true));
  }
  restartLevel(){
    this.allowUIInput = false;
    this.prevScene.loadNewLevel();
    if(this.prevScene instanceof PigFunScene)
      this.prevScene.spawnPig();
    this.unpause();
  }
  goToLevelEditor(index){
    if (index == 24)
      index = -1;
    var scene = new LevelEditorScene(index);
    this.driver.setScene(scene);
  }
  draw(canvas) {
    this.prevScene.draw(canvas);
    canvas.fillStyle="rgba(255,255,255,.7)"
    canvas.fillRect(0,0,canvas.width,canvas.height);
    this.deathCount.text = ""+this.prevScene.levelDeaths;
    this.drawAllGUI(canvas);
    if(this.debug)
      drawGrid(canvas);
    drawTransitionOverlay(this.overlayColor,canvas);
  }
  addPauseMenuGUI(){
    var bigFont = "60px " + FONT;
    var buttonFont = "30px " + FONT;
    var textColor = 'black';
    var buttonGap = 0.085;

    

    dim = rectDimFromCenter(.96,.95,.05,.08);
    this.deathCount = new Label(dim[0],dim[1],dim[2],dim[3],0,
      "X", bigFont, textColor,'left');
    this.gui.push(this.deathCount);

    dim = rectDimFromCenter(.82,.96,.2,.08);
    var deathLabel = new Label(dim[0],dim[1],dim[2],dim[3],0,
      "Fails:", buttonFont,textColor,'right');
    this.gui.push(deathLabel);

    switch(touchOn){
      case false:
        var dim = rectDimFromCenter(.5,.4,.2,.08);
        var pauseLabel = new Label(dim[0],dim[1],dim[2],dim[3],0,
          "Paused",bigFont,textColor,'center');
        this.gui.push(pauseLabel);
        dim = rectDimFromCenter(0.5,.55,0.2,.08);
        var resumeButton = new GrowthTextButton(dim[0],dim[1],dim[2],dim[3],0,
          this.unpause.bind(this),"Resume",buttonFont,textColor,'transparent',textColor,5,.08);
        this.gui.push(resumeButton);
    
        dim = rectDimFromCenter(.5,.55+buttonGap,.2,.08);
        var levelSelectButton = new GrowthTextButton(dim[0],dim[1],dim[2],dim[3],0,
          this.goToLevelSelect.bind(this),"Level Select",buttonFont,textColor,'transparent',textColor,5,.08);
        this.gui.push(levelSelectButton);
    
        dim = rectDimFromCenter(0.5,0.55+buttonGap*2,.2,.08);
        var restartButton = new GrowthTextButton(dim[0],dim[1],dim[2],dim[3],0,
          this.restartLevel.bind(this),"Restart",buttonFont,textColor,'transparent',textColor,5,.08);
        this.gui.push(restartButton);
        
        dim = rectDimFromCenter(0.5,0.55+buttonGap*3,.2,.08);
        var mainMenuButton = new GrowthTextButton(dim[0],dim[1],dim[2],dim[3],0,
          this.goToMainMenu.bind(this),"Main Menu",buttonFont,textColor,'transparent',textColor,5,.08);
        this.gui.push(mainMenuButton);
    
        this.selectedButton = resumeButton;
        this.selectedButton.selected = true;
  
        break;
      case true:
        var touchScreenFont = FONT;
        var fontSize = '35px';
        var largerFontSize = '45px';
        var backFill = 'rgba(0,0,0,.2)';
        var expandFactor = .3;        
        var dim = rectDimFromCenter(.5,.28,.2,.08);
        var pauseLabel = new Label(dim[0],dim[1],dim[2],dim[3],0,
          "Paused",bigFont,textColor,'center');
        this.gui.push(pauseLabel);
        dim = rectDimFromCenter(.31,.52,.27,.24);
          var resumeButton = new ExpandingMobileButton(dim[0],dim[1],dim[2],dim[3],0,
          this.unpause.bind(this),"Resume",touchScreenFont,fontSize,largerFontSize,textColor,'rgba(128,128,128,0.5)',textColor,5,expandFactor);
        this.gui.push(resumeButton);
    
        dim = rectDimFromCenter(.69,.52,.27,.24);
        var levelSelectButton = new ExpandingMobileButton(dim[0],dim[1],dim[2],dim[3],0,
          this.goToLevelSelect.bind(this),"Level Select",touchScreenFont,fontSize,largerFontSize,textColor,'rgba(128,128,128,0.5)',textColor,5,expandFactor);
        this.gui.push(levelSelectButton);
    
        dim = rectDimFromCenter(.31,.8,.27,.24);
        var restartButton = new ExpandingMobileButton(dim[0],dim[1],dim[2],dim[3],0,
          this.restartLevel.bind(this),"Restart",touchScreenFont,fontSize,largerFontSize,textColor,'rgba(128,128,128,0.5)',textColor,5,expandFactor);
        this.gui.push(restartButton);

        dim = rectDimFromCenter(.69,.8,.27,.24);
        var mainMenuButton = new ExpandingMobileButton(dim[0],dim[1],dim[2],dim[3],0,
          this.goToMainMenu.bind(this),"Main Menu",touchScreenFont,fontSize,largerFontSize,textColor,'rgba(128,128,128,0.5)',textColor,5,expandFactor);
        this.gui.push(mainMenuButton);

        var dim = rectDimFromCenter(.88,.1,.095,.12);
        var pauseButton = new TextButton(dim[0],dim[1],dim[2],dim[3],0,
          this.unpause.bind(this),"",touchScreenFont,'transparent','rgba(64,64,64,.5)','transparent',0);
        this.gui.push(pauseButton);
        dim = rectDimFromCenter(.895,.1,.02,.08);
        var box1 = new ColoredBox(dim[0],dim[1],dim[2],dim[3],0,'white','transparent',0);
        this.gui.push(box1);
        dim = rectDimFromCenter(.865,.1,.02,.08);
        var box2 = new ColoredBox(dim[0],dim[1],dim[2],dim[3],0,'white','transparent',0);
        this.gui.push(box2);
        
        break;
    }
    
    resumeButton.setNeighbors([undefined,undefined,levelSelectButton,undefined]);
    levelSelectButton.setNeighbors([resumeButton,undefined,restartButton,undefined]);
    restartButton.setNeighbors([levelSelectButton,undefined,mainMenuButton,undefined]);
    mainMenuButton.setNeighbors([restartButton,undefined,undefined,undefined]);

    this.buttons = getButtons(this.gui);

  }
} class BlockButton extends Button{
  constructor(x,y,w,h,groupID,onRelease,blockID){
    super(x,y,w,h,groupID,onRelease);
    this.blockID = blockID;
    this.world = {
      getCell: function() {return true;},
    };
    this.i = 0;
    this.j = 0;
  }
  draw(canvas){
    var dim = this.getPixelDimensions(canvas);
    if(this.blockID >= 0 && this.blockID < CELLMAP.length){
      var cell = CELLMAP[this.blockID];
      if(cell.draw){
        cell.draw(canvas,dim[0],dim[1],dim[2],dim[3],
          this.world,this.i,this.j);
      }    
    }
    canvas.strokeStyle = 'black';
    if(this.held)
      canvas.strokeStyle = 'gray';
    canvas.lineWidth = 5;
    canvas.strokeRect(dim[0],dim[1],dim[2],dim[3]);
  }
  
}addLevel( function(nameSpace) {
  {

    return {
      name: "Let The Dogs Out",
      worldType: 0,
      grid: [
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 5, 0, 0,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,],
        [ 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,],
        [ 1, 1, 1, 1, 1, 9, 9, 9, 9, 9, 9, 1, 1, 1, 9, 9, 9, 9, 9, 9, 1, 1, 1, 0, 0, 0, 0, 9, 9, 9, 9, 1, 1, 1, 9, 9, 9, 9, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1,],
        [ 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 9, 9, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1,],
        [ 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 2, 1, 1, 2, 1,16, 0, 9, 9, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1,],
        [ 1, 1, 1, 1, 0, 0, 0,16, 0, 0, 0, 0, 1, 0, 0, 0,16, 0, 0, 0, 0, 1, 2, 2, 0, 0, 0, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1,],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        ]
    };

  }
});
class wallJump extends Powerup {
  constructor(x,y) {
    var h = 30;
    super(x,y+h);
    this.w = 30;
    this.h = h;
    this.color="black";
    this.jumpPower = 0;
    this.killPlayer = false;
    this.mx = 0;
    this.my = 0;
    this.power = 1;
    this.color1 = "#741";
    this.color2 = "#520";
    this.color3 = "#411";
  }
  drawShape(canvas,w,h) {
    // canvas.translate(0,-h/2);
    // canvas.rotate(this.angle);
    // canvas.translate(0,h/2);    
    canvas.strokeStyle = "#fff";
    canvas.lineWidth = 7;
    this.drawAcorn(canvas,w,h,1);
    this.drawAcorn(canvas,w,h);
  }
  drawAcorn(canvas, w,h,s) {
    h=h*1;
    var w2 = w*.8;
    var h2 = h*1.2;
    canvas.doRect = s? canvas.strokeRect : canvas.fillRect;
    canvas.fillStyle = this.color1;
    canvas.doRect(-w/2,-h,w,h);
    // canvas.fillRect(-w2/2,-h,w2,h2);
    canvas.fillStyle = this.color2;   
    canvas.doRect(-w/2,-h,w/2,h);   
    // canvas.fillRect(-w2/2,-h,w2/2,h2);   
    canvas.fillStyle = this.color3;   
    var d = w/10; 
    var dh = h/3;
    var sd = w/8;
    canvas.doRect(-w/2-d,-h,w+d*2,dh);            
    canvas.doRect(-sd,-h-dh,sd*2,dh);      
    canvas.fillStyle = "#fff";
    canvas.doRect(-w*0.1,-h*0.6,w*0.5,h*0.15);    
  }
  die() {
    this.shouldDelete = true;
  }
}addBlock(function() { return {
    name: "Platform",
    solid: true,
    groundBlock: false,
    safe: true,
    platform: true,
    id: BLOCKS.length,
    draw: function(canvas, x,y,w,h, world,i,j) {
      canvas.save();
      h*=.5;
      // var color1 = "#754";
      // var color2 = "#532";

      var color1 = "#805940";
      var color2 = "#531";
      // color1 = "#555";
      // color2 = "#777";
      // color3 = "#000";
      canvas.fillStyle=color1;
      canvas.fillRect(x,y,w,h);
      canvas.strokeStyle="#000";
      canvas.lineWidth = 2;
      var s = Math.max(w,h);
      // canvas.strokeRect(x,y,w,h);
      canvas.fillStyle=color2;
      canvas.fillRect(x,y+h/2,w,h/2);
      var ww = s/3;
      var hh = ww;
      var spacing = 10;
      // for(var ii=0;ii<3;ii++) {
      //   var r1 = psuedoRandom(x,y,ii,1);
      //   var r2 = psuedoRandom(x,y,ii,2);
      //   var xx = Math.floor(r1*(w-ww)/spacing) * spacing;
      //   var yy = Math.floor(r2*(h-hh)/spacing) * spacing;
      //   canvas.fillRect(xx+x,yy+y,ww,hh);
      // }
      // if(world.getCell(i,j-1).id!=this.id) {
        canvas.strokeRect(x,y,w,0);
      // }
      // if(world.getCell(i,j+1).id!=this.id) {
        canvas.strokeRect(x,y+h,w,0);
      // }
      if(!world)
        return;
      if(!world.getCell(i+1,j).platform) {
        canvas.strokeRect(x+w,y,0,h);
      }
      if(!world.getCell(i-1,j).platform) {
        canvas.strokeRect(x,y,0,h);
      }
      canvas.restore();
    },
    isColliding: function(entity, pos, dx, dy, cellPos) {
      if(entity.apple)
      return false;
      if(dy>0&&entity.y<=cellPos.y) {
        return true;
      }
      return false;
    },
}});
class WinScene extends Scene{
  constructor() {
    super();
    this.gui = [];
    this.keyMap = {
      '32': {down: this.start.bind(this)}
    }
  }
  start() {
    this.driver.setScene(new GameScene());
  }
  draw(canvas) {
    canvas.fillStyle = 'black';
    canvas.textAlign = 'center';
    canvas.fillText('You Win! Press Space To Restart', canvas.width/2, canvas.height/2);
  }
}class Slider extends Button{
  constructor(x,y,w,h,groupID,onRelease,handleWidth,defaultValue,
    barColor,handleColor,handleHeldColor,handleOutlineColor,handleOutlineWeight){
    super(x,y,w,h,groupID,onRelease);
    this.barColor = barColor;
    this.handleWidth = handleWidth;
    this.handleColor = handleColor;
    this.handleHeldColor = handleHeldColor;
    this.handleOutlineColor = handleOutlineColor;
    this.handleOutlineWeight = handleOutlineWeight || 0;
    this.value = defaultValue;
    this.selectable = false;
    this.requireMouseInRegionOnRelease = false;
  }
  update(dt,percentPoint){
    if(this.held){
      this.setValue((percentPoint.x-this.x)/this.w);
    }    
  }
  draw(canvas){
    canvas.fillStyle = this.handleBarColor;
    var dim = this.getPixelDimensions(canvas);
    dim[1] += dim[3]/3;
    dim[3] /= 3;
    canvas.fillRect(dim[0],dim[1],dim[2],dim[3]);

    canvas.fillStyle = (this.held) ? this.handleHeldColor : this.handleColor;
    canvas.strokeStyle = this.handleOutlineColor;
    canvas.lineWidth = this.handleOutlineWeight;
    dim = {x:0,y:0,w:0,h:0};
    dim.x = ((this.value * this.w)+this.x-this.handleWidth/2)*canvas.width;
    dim.y = this.y*canvas.height;
    dim.w = this.handleWidth*canvas.width;
    dim.h = this.h*canvas.height;
    canvas.lineWidth = this.handleOutlineWeight*10;
    if(this.selected){
      canvas.lineWidth = 8;

    }
    canvas.fillRect(dim.x,dim.y,dim.w,dim.h);
    canvas.strokeRect(dim.x,dim.y,dim.w,dim.h);
  }
  setValue(x){
    this.value = x;
    this.value = (this.value > 1) ? 1 : this.value;
    this.value = (this.value < 0) ? 0 : this.value;
    if(this.onHold) this.onHold(this.value);
  }
  contains(x,y){
    return x>= this.x+this.value*this.w-this.handleWidth/2 && x<=this.x+this.value*this.w+this.handleWidth/2 && y>=this.y && y<=this.y+this.h;
  }
}addLevel( function(nameSpace) {
  {

    return {
      name: "RUN!",
      worldType: 1,
      grid: [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,19,19,19,0,0,0,0,0,0,0,19,19,19,19,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,19,19,19,19,19,19,0,0,0,19,19,19,19,19,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,19,0,0,0,0,],
        [0,0,0,19,19,19,19,0,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,0,0,0,0,0,0,0,0,0,0,0,0,19,19,19,19,19,19,0,0,0,],
        [0,0,0,19,19,19,19,19,19,19,19,18,19,19,19,19,19,19,19,19,19,18,19,19,19,19,19,0,0,0,0,0,0,0,0,0,0,19,19,19,19,19,19,19,19,19,19,0,],
        [0,0,0,19,19,19,19,19,19,19,19,19,18,18,19,19,19,19,19,19,19,18,19,19,19,19,19,0,0,0,0,0,0,0,0,0,0,19,19,18,19,19,18,19,19,19,19,0,],
        [0,0,0,19,18,18,18,19,19,19,18,19,19,18,18,18,19,19,19,19,18,19,19,19,27,19,19,0,0,0,0,0,0,0,0,0,19,19,19,19,19,19,19,18,19,19,19,0,],
        [0,0,0,19,19,19,18,18,18,18,18,19,19,19,19,18,18,18,18,18,19,19,16,19,27,19,19,0,0,0,0,0,0,0,0,0,19,19,19,19,18,18,19,18,19,19,19,19,],
        [16,0,19,19,19,19,19,19,19,19,18,19,19,19,19,18,18,23,23,23,23,23,23,23,27,19,19,0,0,0,0,0,0,0,0,0,0,19,19,19,19,18,19,19,18,19,18,18,],
        [9,0,19,19,19,18,18,19,19,18,18,18,18,18,18,18,19,19,18,18,18,18,19,19,19,19,19,0,0,0,0,0,0,0,0,0,0,0,19,19,19,19,18,18,18,18,18,19,],
        [0,19,19,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,19,19,19,0,19,19,19,0,0,0,0,0,0,0,0,0,0,0,0,0,19,19,18,18,18,18,19,19,],
        [16,2,19,18,19,19,19,0,0,0,18,18,18,18,18,18,18,18,18,18,18,0,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,19,18,18,18,19,19,0,],
        [9,0,19,19,19,0,0,0,0,0,0,0,18,18,18,18,18,18,18,18,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,18,18,18,18,0,0,0,],
        [4,0,0,0,0,0,0,0,0,0,0,0,0,18,18,18,18,18,18,18,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,18,18,18,18,0,0,16,],
        [1,1,1,1,1,1,9,9,9,16,3,3,0,0,18,18,18,18,18,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,18,18,27,18,18,18,0,],
        [1,1,1,1,1,1,1,1,1,1,1,1,9,9,23,23,18,18,18,18,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,18,18,27,23,23,9,9,],
        [1,1,1,1,1,1,1,1,1,1,1,1,16,18,18,18,18,23,23,23,23,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,18,18,18,27,18,16,0,0,],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,18,16,18,18,18,18,18,18,18,0,0,0,0,0,0,0,0,0,0,0,0,0,18,18,18,18,27,23,1,1,1,],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,9,9,9,9,9,9,9,0,0,0,23,23,23,23,23,1,1,1,1,1,1,],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,0,0,0,0,0,],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,5,0,0,],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        ]
    };

  }
});

class DoinkPad {
    constructor(x,y){
        this.x=x;this.y=y;
        this.w= 30;
        this.h = 30;
        this.r = 15;
        this.bounceAnimation = 0;
        this.behind = true;
    }
    update() {    
		var doinkBox = this.getHitBox();
    var playerBox = this.game.player.getHitBox();
    if(rectangleCollision(doinkBox, playerBox) == true) {
      if(!this.isColliding) {
        if(this.playerCollision(this.game.player) == true) {
          this.getHitByEntity(this.game.player);
          this.isColliding = true;
        }
      }
    } else {
      this.isColliding = false;
    }
        if (this.bounceAnimation > 0)this.bounceAnimation-=1;
	}
    draw(canvas) {
    var r = this.r;
    r += Math.cos(this.bounceAnimation*Math.PI/5)*10;
    canvas.fillStyle="#ffee5e";
    // canvas.arc(this.x,this.y-Math.cos(this.bounceAnimation*Math.PI/10)*10,r,0,Math.PI*2);
    var bounce = Math.cos(this.bounceAnimation*Math.PI/10);
    var pinch = this.w/10;
    pinch += 3*bounce;
    canvas.beginPath();    
    canvas.moveTo(this.x-this.w+pinch, this.y-this.h-5*bounce);
    canvas.quadraticCurveTo(this.x,this.y-this.h-20*bounce,this.x+this.w-pinch, this.y-this.h-5*bounce);
    canvas.lineTo(this.x+this.w,this.y);
    canvas.lineTo(this.x-this.w,this.y);
    canvas.fill();
    canvas.fillStyle = "#d1be55";
    canvas.beginPath();
    canvas.moveTo(this.x-this.w+pinch, this.y-this.h-5*bounce);
    canvas.quadraticCurveTo(this.x-this.w,this.y,this.x+this.w,this.y);
    canvas.lineTo(this.x-this.w,this.y);
    canvas.fill();
    }

    getHitByEntity(player) {
        this.bounceAnimation = 20;
      player.bounceOffEntity(this);
	}

  playerCollision(player) {
		if(player.vy > 0) {
			return true;
		} else {
			return false;
		}
	}

    getHitBox() {
      var w = this.w*2;
      var h = this.h;
    return {x:this.x-.5*w, y:this.y-h, w, h};
    }
    
}addBlock(function() { return {
  name: "Platform2",
  solid: true,
  groundBlock: false,
  safe: true,
  platform: true,
  id: BLOCKS.length,
  draw: function(canvas, x,y,w,h, world,i,j) {
    h*=.4;
    var color1 = "#642";
    var color2 = "#532";
    
    // color1 = "#555";
    // color2 = "#777";
    // color3 = "#000";
    canvas.fillStyle=color1;
    canvas.fillRect(x,y,w,h);
    canvas.strokeStyle="#000";
    var s = Math.max(w,h);
    // canvas.strokeRect(x,y,w,h);
    canvas.fillStyle=color2;
    canvas.fillRect(x,y+h/2,w,h/2);
    var ww = s/3;
    var hh = ww;
    var spacing = 10;
    // for(var ii=0;ii<3;ii++) {
    //   var r1 = psuedoRandom(x,y,ii,1);
    //   var r2 = psuedoRandom(x,y,ii,2);
    //   var xx = Math.floor(r1*(w-ww)/spacing) * spacing;
    //   var yy = Math.floor(r2*(h-hh)/spacing) * spacing;
    //   canvas.fillRect(xx+x,yy+y,ww,hh);
    // }
    // if(world.getCell(i,j-1).id!=this.id) {
      canvas.strokeRect(x,y,w,0);
    // }
    // if(world.getCell(i,j+1).id!=this.id) {
      canvas.strokeRect(x,y+h,w,0);
    // }
    if(!world)
      return;
    if(!world.getCell(i+1,j).platform) {
      canvas.strokeRect(x+w,y,0,h);
    }
    if(!world.getCell(i-1,j).platform) {
      canvas.strokeRect(x,y,0,h);
    }
  },
  isColliding: function(entity, pos, dx, dy, cellPos) {
    if(entity.apple)
      return false;
    if(dy>0&&entity.y<=cellPos.y&&!entity.crouching) {
      return true;
    }
    return false;
  },
}});
class LevelTesterScene extends GameScene {
  constructor(level, prevScene) {
    super(level, undefined, false);
    this.prevScene = prevScene;
    this.keyMap[27] = {down: this.back.bind(this)};
    this.transitionDuration = 1;
    this.updateTransition();
  }
  back() {
    this.driver.setScene(this.prevScene);
  }
  win() {
    this.back();
  }
}class MobileTextButton extends TextButton{

  constructor(x,y,w,h,groupID,onRelease,text,font, 
    textColor,rectBackFillColor,rectOutlineColor, strokeWidth, 
    selectedTextColor,selectedBackFillColor,selectedOutlineColor){
      super(x,y,w,h,groupID,onRelease,text,font, 
        textColor,rectBackFillColor,rectOutlineColor, strokeWidth);
      this.selectedTextColor = selectedTextColor;
      this.selectedBackFillColor = selectedBackFillColor;
      this.selectedOutlineColor = selectedOutlineColor;
    }

  update(dt){}

  draw(canvas){

    var dim = this.getPixelDimensions(canvas);
    this.drawRectangle(canvas,dim);
    this.drawOutline(canvas,dim);
    
    this.drawText(canvas,dim);
    
  }
  drawOutline(canvas,dim){
    canvas.lineWidth = this.strokeWidth;
    if(this.selected)
      canvas.strokeStyle = this.selectedOutlineColor;
    else
      canvas.strokeStyle = this.rectOutlineColor;
    canvas.strokeRect(dim[0],dim[1],dim[2],dim[3]);
  }
  drawRectangle(canvas,dim){
    if(this.selected)
      canvas.fillStyle = this.selectedBackFillColor;
    else
      canvas.fillStyle = this.rectBackFillColor;
    canvas.fillRect(dim[0],dim[1],dim[2],dim[3]);
  }
  drawText(canvas,dim){
    canvas.font=this.font;
    if(this.selected)
      canvas.fillStyle = this.selectedTextColor;
    else
      canvas.fillStyle = this.textColor;
    canvas.textAlign = 'center';
    canvas.textBaseline='middle';
    canvas.fillText(this.text,dim[0]+dim[2]/2,dim[1]+dim[3]/2,this.w*canvas.width*.8);
  }

}addLevel( function(nameSpace) {
  {

    return {
      name: "Escape from the Den",
      worldType: 1,
      grid: [
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,19,19,19,19,19,19,19,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,19,19,19,19,19,19,19,19,19,19,18,18,19,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,19,19,19,19,19,19,19,19,18,19,19,19,19,19,18,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,19,19,18,19,19,19,19,18,19,19,19, 0, 5,19,19,],
        [ 0, 0, 0, 0,19,19,19, 0, 0, 0, 0, 0, 0,19,19,19,19, 0, 0, 0, 0,19,19,19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,19,19,19,18,19,19,18,19,19,19, 9,23,23,23,],
        [ 0, 0, 0,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19, 0,19,19,19,19,19,19, 0,19,19,19,18,18,18,18,19,19,19,19,19,19,19,],
        [ 0, 0, 0,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19, 0,19,19,19,19,18,18,18,18,18,19,19,18,19,],
        [ 0, 0, 0,19,19,18,18,19,19,19,19,19,19,19,19,19,19,18,19,19,19,19,19,19,19,19,19,19,19,19,18,27,19,19,19,18, 0, 0,19,18,18,18,18,18,18,19,18,19,],
        [ 0, 0, 0,19,19,19,18,18,19,18,19,19,19,19,19,18,18,19,19,19,19,19,18,18,19,19,19,19,19,19,18,27,16,23,23,23,27,18,18,18,18,18,18,18,18,18,18,27,],
        [ 0, 0, 0, 0, 0,19,19,18,18,19,19,19,19,19,18,18,19,19,19,19,19,19,19,18,18,18,18,19,18,18,18,27,27,27,27,27,27,27,27,27,27,18,18,27,23,23,23,27,],
        [19,19,19,19,19, 0,18,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,18,18,18,18,18,18,18,18,18,19,19,19,19,19, 0, 0,18,18,23,23,27,18,19,19,19,],
        [19,19,18,19,19, 0,18,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,19,19,18,18,18,18,18,19,19,19, 0, 0, 0, 0, 0, 0,18,18,18,18,27,18,18, 0, 0,],
        [19,19,18,18,19,19, 0,18,18,19,18,18,18,18,18,18,18,18,19,19, 0,19, 0,18,18,18,18,18,18,19,19, 0, 0, 0, 0, 0, 0,27,27,27,27,27,27,27,18,18,18,18,],
        [ 0,19,18,18,18,18,18,18,18,18,18,18,18,18,18,18,19,19,19,19,18,18,18,18,18,18,18,18,18,18, 0, 0, 0, 0, 0, 9,23,27,18,18,18,18,18,18,18,18,18,18,],
        [ 0,19,19,18,18,18,18,18,18,18,18,18,18,18,19,19,19, 0, 0, 0,19,18,18,18,18,18,18,18,18,18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,18,18,18,18,18, 0, 0,],
        [16, 9,23,23,27,18,18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,19,19,19, 0,18,18,18,18,18,18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,18,18,18,18,18, 0, 0,],
        [ 9, 9, 9,23,23,23,23,23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,18,18,18,18,18,18, 0, 0, 0, 0, 0, 0,18,18,18,18,18,18, 0, 0, 0, 0,],
        [ 0,16, 0,18,18,18,18,18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,18,18,18,18,18,18,18,18,18, 0, 0, 0, 0, 0,18,18,18,18,18,18, 0,16, 0, 0,],
        [ 1, 1, 9,23,23,23,23,27, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,18,18,18,18,18,18,18,18, 0, 0,18,18,18,18,18,18,18,18, 0, 0, 0,],
        [ 1, 0, 0, 0,18,18,18,27,18, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        [ 0, 0, 0, 0, 0,18,18,27,18,18,18, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        [ 4, 0, 0, 0, 0,18,18,27, 0, 0,18,18, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        [ 1, 1, 1,27,23,23,23,18,16, 1, 1,18,18, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        ]
    };

  }
});
class Woof extends Enemy {
  constructor(x,y) {
    super(x,y);
    this.w = 50;
    this.h = 40;
    this.width = this.w;
    this.height = this.h;
    this.jumpPower = 7;
    this.killPlayer = true;
    this.startY= y;
    this.mx = .5;
    this.transition = 0; //timer for transitions
    this.fsm = [];//state machine
    this.populateFsm();
    this.state = 0;//starting state
    this.xsight = 300;//line of sight
    this.ysight = 300;
    this.color1="#aaa";
    this.color2="#888";
    this.color3="#555";
    this.jumpSoundType = SOUNDMAP.woof; 
  }

  populateFsm()
  {
    this.fsm.push({//initializing the state
        name: "Wandering", 
        index: 0, // will have to change this to be fsm.length
        run: function(entity)
        {//this is what we want to run while in this state
          var dist = entity.game.player.x-entity.x;
          var ydist = entity.game.player.y-entity.y;
          if ((dist > -entity.xsight && dist < entity.xsight  && ydist < entity.ysight-100 && ydist > -entity.ysight-100)) {//exit condition
            return entity.toOne();
          }
          return this.index;//nothing has changed
        },
      });

    this.fsm.push({
        name: "Noticing", 
        index: 1,
        run: function(entity){
          if (entity.transition <= 0 && entity.vy == 0)//exit condition- end of animation
          {
            return entity.toTwo();
          }
          entity.transition--;//tick down timer- might have to modify this so it's not fps dependent
          return this.index;
        },
      });

      this.fsm.push({
        name: "Charging", 
        index: 2,
        run: function(entity)
        {
          //console.log(this.wallcolliding);
          if (entity.transition ==1 && entity.vy == 0)//exit condition- end of animation
          {
            return entity.toThree();
          }
          if(entity.wallcolliding && entity.transition == 0)
          {
            entity.speed = -5;
            entity.transition = 20;

            entity.vx = -10 * entity.mx;
            entity.mx *= -1;
            entity.vy = -10;
            //entity.jump();
            entity.killPlayer = false;
            //entity.mx *= -1;
          }
          //if (entity.transition == 20)
          //{
          //   entity.jump();
          //}

          if (entity.transition > 1)
            entity.transition--;

          else 
          {
            var dist = entity.game.player.x-entity.x;
            if (dist > -entity.xsight/2 && dist < entity.xsight/2 && entity.transition == 0)
            {
              entity.jump();
              entity.killPlayer = true;
            }
          }
          
          return this.index;
        },
      });

      this.fsm.push({
        name: "Confused", 
        index: 3,
        run: function(entity){
          //var dist = entity.game.player.x-entity.x;
          //var ydist = entity.game.player.y-entity.y;
          /*if ((dist > -entity.xsight && dist < entity.xsight  && ydist < 100 && ydist > -100)) {//in case we find the player again
            toOne()
          }*/
          entity._angle = Math.cos(entity.transition*Math.PI/10)*Math.PI/20;          
          if (entity.transition <= 0) //otherwise
          {
            return entity.toZero();
          }
          else if (entity.transition%7==0)
          {
            // entity.mx *= -1; // turning around in confusion
            entity.flipped = !entity.flipped;
          }
          entity.transition--;
          return this.index;
        },
      });
  }

  onHitPlayer(player) {
    if(!this.killPlayer)return;
    this.y -= 5;
    //player.vy = -5;
    player.vx = (2*(this.mx >= 0)-1) * 20;
    super.onHitPlayer(player);

  }


  getHitByEntity(player) {
		player.bounceOffEntity(this);
    // player.y -= 20;
    this.width+=20;
    this.height-=10;
    this.movementStun += 10;
    this.toThree();
		//this.h=this.h/2;
		//this.die();
	}

  toZero()
  {
    this.transition = 0;
    if(this.mx==0)this.mx = 1-2*this.flipped;
    this.mx = .5 * Math.sign(this.mx);
    this.speed = 3;
    this._angle = 0;
    return 0;//back to wandering
  }

  toOne()
  {
    this.transition = 10;//set the transition timer
    this.mx = 1 * (this.game.player.x-this.x < 0 ? -1 : 1);//prepare for next state
    this.speed = 0;
    this.jump();//just a lil surprise animation
    this.game.addEntity(new SleepText(this.x,this.y-this.h-70,80,0,-1,"!",
    "45", FONT,[255,255,255,1],[250,40,40,0],10,10,true));
    return 1;//change state
  }

  toTwo()
  {
    this.transition = 0;
    this.mx = 1 * (this.game.player.x-this.x < 0 ? -1 : 1);//speed up for chase
    this.speed = 10;
    return 2;//now we chasing
  }

  toThree()
  {
    this.transition = 21;
    this.mx = 0;//-1 * Math.sign(this.mx);//prep for next animation
    this.speed = 1;
    return 3;
  }

  update(dt, frameCount) {

    this.state = this.fsm[this.state].run(this); //update is all cleaned up now
    //if (!CELLMAP[this.game.world.pointCollides(this.x + this.mx * 200, this.y)]==1)// && CELLMAP[this.game.world.pointCollides(this.x + this.mx * 100, this.y - 2*this.game.world.s)] == 0)
    //{
     // this.jump();
    //}
    super.update(dt, frameCount);
  }
  drawShape(canvas,w,h) {
    var hh = h*.2;
    canvas.translate(0,-hh);
    h -= hh;
    canvas.fillStyle = this.color1;
    canvas.strokeStyle = "#000";
    canvas.lineWidth = 5;
    canvas.strokeRect(-w/2,-h,w,h);
    this.pathEars(canvas,w,h);
    canvas.stroke();
    this.pathTail(canvas,w,h);
    canvas.stroke();
    this.pathFeet(canvas,w,h,hh);    
    canvas.stroke();
    canvas.fillStyle = this.color1;
    canvas.fillRect(-w/2,-h,w,h);
    this.pathEars(canvas,w,h);
    canvas.fill();
    this.pathFeet(canvas,w,h,hh);    
    canvas.fill();
    this.pathTail(canvas,w,h);    
    canvas.fill();
    canvas.fillStyle = this.color2;
    canvas.fillRect(-w/2,-h,w/3,h);
    // canvas.fillRect(-w/2,-h/6,w,h/6);
    canvas.translate(w/4,-h*.6);
    this.drawFace(canvas, w/2,h*.6);
  }
  pathFeet(canvas,w,h,hh) {
    hh-=2;
    canvas.beginPath();
    canvas.fillStyle=this.color3;
    var ww = w/10;
    var d = this.angle*10;
    canvas.rect(-w*.4+d,-d/2,ww,hh);
    canvas.rect(w*.3-ww-d,-d/2,ww,hh);
  }
  pathEars(canvas, w,h) {
    canvas.beginPath();
    canvas.rect(w*.35, -h-4, 4,4);
    canvas.rect(0, -h-4, 4,4);
    canvas.fillStyle = this.color2;    
  }
  pathTail(canvas,w,h) {
    canvas.beginPath();
    var ww = 8;
    var hh = 8;
    canvas.fillStyle=this.color3;
    canvas.rect(-w/2-ww*.8,-h-hh*.3,ww,hh);
    ww*=.8;
    hh*=.8;
    canvas.rect(-w/2-ww*1.5,-h-hh,ww,hh);
  }
  drawFace(canvas, w,h) {
    canvas.lineWidth = 3;
    canvas.lineCap = "round";
    canvas.beginPath();
    canvas.moveTo(-w/4-2, -h/4);
    canvas.lineTo(-w/4,-h/4+2);
    canvas.moveTo(w/4+2, -h/4);
    canvas.lineTo(w/4,-h/4+2);    
    canvas.stroke();
    canvas.lineWidth = 3;
    canvas.beginPath();
    canvas.moveTo(1,0);
    canvas.lineTo(0,0);
    canvas.stroke();
    canvas.translate(0,4);
    canvas.lineWidth = 1;  
    var m = Math.abs(this.vy);
    canvas.translate(0,-m/4);
    this.drawMouth(canvas,w*.6,h*.8);
    canvas.translate(0,m); 
    this.drawMouth(canvas,w*.6,h*.8); 
  }
  drawMouth(canvas, w,h) {
    canvas.beginPath();
    canvas.moveTo(-w/2,2);
    canvas.lineTo(-w/2,h/4);
    canvas.lineTo(-w/7,2);
    canvas.lineTo(0,h/4);
    canvas.lineTo(w/7,2);    
    canvas.lineTo(w/2,h/4);    
    canvas.lineTo(w/2,2);  
    canvas.stroke();
  }
}addBlock(function() { return {
  name: "Boost",
  solid: false,
  id: BLOCKS.length,
  draw: function(canvas, x,y,w,h, world,i,j) {
    canvas.fillStyle="black";
    canvas.fillRect(x,y,w,h);
    canvas.strokeStyle = "#fff";
    canvas.beginPath();
    canvas.moveTo(x,y+h/2);
    canvas.lineTo(x+w,y+h/2);
    canvas.lineTo(x+w/2,y+h/4);
    canvas.lineTo(x,y+h/2);    
    canvas.lineTo(x+w/2,y+h*3/4);
    canvas.lineTo(x+w,y+h/2);    
    canvas.stroke();
  },
  entityCollision: function(entity, pos, dx, dy, cellPos) {
    // if(!entity.grounded)entity.dash(1-2*entity.flipped);
   if(entity.vy>0) {
     entity.vy=-10;
     entity.y-=1;
     entity.vx = 20*(1-2*entity.flipped);
   }
   return false;
    // var time = Date.now();
    // if(entity.boostCollision > time-100)return false;
    // entity.boostCollision = time;
    // entity.dash(1-2*entity.flipped);
    // return false;
  },
}});
class LevelEditorScene extends Scene{
  constructor(index) {
    super(false);
    this.editLevel = index;
    this.zoom = 1;
    var grid;

    switch (this.editLevel)
    {
      case -2:
        this.world = new WorldDefault(48,24);
        break;
      case -1:
        var level = new PigFunScene();
        this.world = new WorldFromLevel(level.levels[0]);
        break;
      case 0:
        this.world = new WorldDefault(48, 24);      
        grid = this.load();
        this.world.h = grid.length;
        this.world.w = grid[0].length;
        break;
      default:
        var levels = createLevels();
        this.world = new WorldFromLevel(levels[this.editLevel-1]);
    }
      
    if(grid) {
      this.world.world = grid;
    }
    this.grid = this.world.world;
    this.camera = {x:0,y:0, offset: {x: 0, y: 0}};
    this.keyMap = {
      '32': {down: this.startDragging.bind(this), held: this.drag.bind(this)},
      '75': {down: this.runTest.bind(this)},    //K
      '80': {down: this.printLevel.bind(this)},       //P
      '83': {down: this.cycleBlockBackwards.bind(this)},//S
      '87': {down: this.cycleBlock.bind(this)},         //W
      '69': {down: this.cycleAbility.bind(this)},       //E
      '84': {down: this.zoomIn.bind(this)},             //T
      '71': {down: this.zoomOut.bind(this)},            //G
      '73': {down: this.growi.bind(this)},              //I
      '74': {down: this.growj.bind(this)},              //J
      //'27': {down: this.backToSelect.bind(this)},       //Escape
      '66': {down: this.resetCameraPosition.bind(this)},//B
      '65': {down: this.pickBlockFromLevel.bind(this)}, //A

      '82': {down: this.gridScrollUp.bind(this)},     //R
      '70': {down: this.gridScrollDown.bind(this)},   //F
      '68': {down: this.selectAir.bind(this)},        //D
      '72': {down: this.toggleCommandList.bind(this)},//H

      '90': {down: this.selectFromQuickSelect.bind(this,0)},   //Z
      '88': {down: this.selectFromQuickSelect.bind(this,1)},   //X
      '67': {down: this.selectFromQuickSelect.bind(this,2)},   //C
      '86': {down: this.selectFromQuickSelect.bind(this,3)},   //V
      
      '49': {down: this.selectFromBar.bind(this,0)},            //1
      '50': {down: this.selectFromBar.bind(this,1)},            //2
      '51': {down: this.selectFromBar.bind(this,2)},            //3
      '52': {down: this.selectFromBar.bind(this,3)},            //4
      '53': {down: this.selectFromBar.bind(this,4)},            //5
      '54': {down: this.selectFromBar.bind(this,5)},            //6
      '55': {down: this.selectFromBar.bind(this,6)},            //7

      
    }
    this.bottomBarHeight = 0.2;
    this.showCommands = false;
    this.dragPivot = {x: 0, y: 0};
    this.clickDragPivot = {x: 0, y: 0};
    this.mousePoint = {x: 0, y: 0};
    this.currentBlock = 1;
    this.playerAbility = [0,0];
    this.rowLength = 7;
    this.rowCount = 2;
    this.buttonGrid = Array(this.rowLength);
    this.quickSelect = [];
    this.resetCameraPosition();
    this.addLevelEditorGUI();
  }
  resetCameraPosition() {
    this.camera.x=this.world.w*this.world.s/2*this.zoom;
    this.camera.y=this.world.h*this.world.s/2*this.zoom;
  }
  zoomIn() {
    this.zoom += .1;
    if(this.zoom>2) {
      this.zoom=2;
      return;
    }
    this.camera.x += this.world.w*this.world.s*.1/2;
    this.camera.y += this.world.h*this.world.s*.1/2;
  }
  zoomOut() {
    this.zoom -= .1;
    if(this.zoom<.1) {
      this.zoom=.1;
      return;
    }
    this.camera.x -= this.world.w*this.world.s*.1/2;    
    this.camera.y -= this.world.h*this.world.s*.1/2;    
  }
  growi()
  {
    if(this.keys[16]) return this.extendLeft();
    for (var j = 0; j < this.grid.length; j++)
    {
      this.grid[j].push(0);
    }
    this.world.w++;
  }
  growj()
  {
    if(this.keys[16]) return this.extendTop();
    var newrow = [];
    for (var j = 0; j < this.grid[0].length; j++)
    {
      newrow.push(0);
    }
    this.grid.push(newrow);
    this.world.h++;
  }
  extendTop() {
    var newrow = [];
    for (var j = 0; j < this.grid[0].length; j++) {
      newrow.push(0);
    }
    this.grid.unshift(newrow);
    this.world.h++;
    this.world.forceRedraw();
  }
  extendLeft() {
    for (var j = 0; j < this.grid.length; j++)
    {
      this.grid[j].unshift(0);
    }
    this.world.w++;
    this.world.forceRedraw();
    
  }
  shrinkj() {
    this.grid.splice(this.grid.length-1,1);
    this.world.h--;    
  }
  backToSelect()
  {
    var newScene = new LevelEditorSelectScene();
    this.driver.setScene(newScene);
  }
  cycleBlockBackwards() {
    var l = CELLMAP.length;
    this.currentBlock = (this.currentBlock - 1 + l) % l;
  }
  cycleBlock() {
    this.currentBlock = (this.currentBlock + 1) % CELLMAP.length;
  }
  cycleAbility() {
    if (this.playerAbility[1] == 0)
      this.playerAbility[1] = 1;
    else
    {
      if (this.playerAbility[0] == 0)
      {
        this.playerAbility = [1,0];
      }
      else
        this.playerAbility = [0,0];
    }
  }
  getLevelString() {
    var string = '[\n';
    for(var i = 0;i < this.grid.length;i++) {
      string += '[';
      for(var j=0;j<this.grid[i].length;j++) {
        var s = this.grid[i][j];
        if(s<10) s='0'+s;
        string += s + ',';
      }
      string += '],\n'
    }
    string += ']';
    return string;
  }
  save() {

    //if (this.editLevel)
    //  return;
    var string = this.getLevelString();
    if(!localStorage||!localStorage.setItem)return;
    localStorage.setItem("currentLevel", string);
  }
  load() {
    if(!localStorage || !localStorage.getItem)return null;
    var string = localStorage.getItem("currentLevel");
    if(!string)return false;
    var grid = [];
    var currentRow;
    var currentDigit = '';
    var x = 0;
    var y = 0;
    for(var i = 1; i < string.length-1; i++) {
      var char = string[i];
      switch(char) {
        case '[':
          currentRow = [];
          break;
        case ']':
          grid.push(currentRow);
          break;
        case ',':
          if(currentDigit != '') {
            var type = parseInt(currentDigit, 10);
            if(!CELLMAP[type]) type = 0;
            currentRow.push(type);
            currentDigit = '';
          }
          break;
        default:
          currentDigit += char;
      }
    }
    return grid;
  }
  printLevel() {
    var string = this.getLevelString();
    console.log(string);
  }
  getLevel() {
    return {
      name: 'test1',
      abilities: this.playerAbility,
      modifyPlayer: function(player) {
        for (var i = 0; i < this.abilities.length; i++)
        {
          if (this.abilities[i] == 1)
          {
            PLAYER_ABILITIES[i+1](player);
          }
        }
      },
      grid: this.grid,
    }
  }
  runTest() {
    var testerScene = new LevelTesterScene(this.getLevel(), this);
    this.driver.setScene(testerScene);
  }
  startDragging() {
    this.dragPivot.x = this.driver.mouse.x;
    this.dragPivot.y = this.driver.mouse.y;
  }
  drag() {
    var dx = this.driver.mouse.x - this.dragPivot.x;
    var dy = this.driver.mouse.y - this.dragPivot.y;
    this.camera.x-=dx;
    this.camera.y-=dy;
    this.dragPivot.x += dx;
    this.dragPivot.y += dy; 
  }
  mousedown(e, mouse) {
    // var camera = this.camera;
    // var wx = mouse.x + camera.x - camera.offset.x;
    // var wy = mouse.y + camera.y - camera.offset.y;
    // var x = Math.floor(wx/this.world.s);
    // var y = Math.floor(wy/this.world.s);
    // if(this.world.oob(x,y))return;
    // var t = this.grid[y][x];
    // this.grid[y][x] = (t+1)%3;
    // this.grid[y][x] = this.currentBlock;
    // this.world.forceRedraw(); 
    var onGUI = pointContainsGUI(getPercentPoint(e),this.gui);
    if(!onGUI&&canvas.height-mouse.y> this.bottomBarHeight*canvas.height){
      this.clickDragPivot = {x:0,y:0};
      this.clickDragPivot.x = mouse.x/this.zoom;
      this.clickDragPivot.y = mouse.y/this.zoom;
    } else {
      this.clickDragPivot = undefined;
    }
    super.mousedown(e,mouse);
  }
  mouseup(e, mouse) {

    if(canvas.height-mouse.y> this.bottomBarHeight*canvas.height && this.clickDragPivot != undefined){
      var camera = this.camera;    
      var wx = mouse.x/this.zoom + (camera.x - camera.offset.x)/this.zoom;
      var wy = mouse.y/this.zoom + (camera.y - camera.offset.y)/this.zoom;
      var x1 = Math.floor(wx/this.world.s);
      var y1 = Math.floor(wy/this.world.s);

      wx = this.clickDragPivot.x + (camera.x - camera.offset.x)/this.zoom;
      wy = this.clickDragPivot.y + (camera.y - camera.offset.y)/this.zoom;
      var x2 = Math.floor(wx/this.world.s);
      var y2 = Math.floor(wy/this.world.s);

      var dx = (1 - 2 * (x2<x1));
      var dy = (1 - 2 * (y2<y1));
      for(var i = x1; i != x2+dx; i+= dx) {
        for(var j=y1; j!=y2+dy; j+=dy) {
          if(this.world.oob(i, j))continue;
          this.grid[j][i] = this.currentBlock;
          //var t = this.grid[j][i];
          //this.grid[j][i] = (t+1)%3;
        }
      }
      this.save();
      this.world.forceRedraw();
    }
    super.mouseup(e,mouse);
  }
  mousemove(e,mouse){
    super.mousemove(e);
    this.mousePoint.x = mouse.x;
    this.mousePoint.y = mouse.y;
  }
  // mouseheld(mouse) {

  // }
  // update(dt) {
  //   super.update(dt);
  //   var mouse = this.driver.mouse;
  //   if(mouse.held) {
  //     this.mouseheld(mouse);
  //   }
  // }
  update(dt){
    super.update(dt);
  }
  addLevelEditorGUI(){
    this.buildButtonGrid();
    this.buildQuickSelect();

    var dim = rectDimFromCenter(0.945,.75,.07,.08);
    var saveButton = new TextButton(dim[0],dim[1],dim[2],dim[3],0,this.save.bind(this),'Save','30px ' + FONT,'black','rgba(255,255,255,0.75)','black',5);
    this.gui.push(saveButton);



    this.buttons = getButtons(this.gui);
  }
  buildButtonGrid(){
    
    var dim = [];
    var buttonGridRegionWidth = 0.7;
    var buttonGridRegionHeight = 0.2
    var origin = [.05,.85];
    var labelOffset = {x:0.043,y:0.036};
    var labelFont = '20px ' + FONT;
    var labelColor = 'black';
    for(var i = 0; i < this.rowCount; i++){
      this.buttonGrid[i] = [];
      for(var j = 0; j < this.rowLength; j++){
        dim = rectDimFromCenter(origin[0]+j/this.rowLength*buttonGridRegionWidth,
          origin[1]+i/this.rowCount*buttonGridRegionHeight,1/this.rowLength*buttonGridRegionWidth-.02,1/this.rowCount*buttonGridRegionHeight-.02);
        var button = new BlockButton(dim[0],dim[1],dim[2],dim[3],0,
          undefined,i*this.rowLength+j);
        button.onRelease = this.selectBlock.bind(this,button);
        this.buttonGrid[i].push(button);
        this.gui.push(button);

        if(i==0 && j < this.rowLength){
          var label = new Label(dim[0]+labelOffset.x,dim[1]+labelOffset.y,.05,.05,0,""+(j+1),labelFont,labelColor,'center');
          this.gui.push(label);
        }
      }
    }
  }
  buildQuickSelect(){
    var dim = [];
    var regionWidth = 0.2;
    var regionHeight = 0.2;
    var origin = {x:0.78,y:.85};
    var buttonWidth = 0.08;
    var buttonHeight = 0.09;

    var labelOffset = {x:0.043,y:0.045};
    var labelFont = '20px ' + FONT;
    var labelColor = 'black';
    dim = rectDimFromCenter(origin.x,origin.y,buttonWidth,buttonHeight);
    var button1 = new BlockButton(dim[0],dim[1],dim[2],dim[3],0,
      undefined,0);
    button1.onRelease = this.quickSelectClick.bind(this,button1); 
    this.quickSelect.push(button1); 
    this.gui.push(button1);
    var label = new Label(dim[0]+labelOffset.x,dim[1]+labelOffset.y,0.05,0.05,0,'Z',labelFont,labelColor,'center');
    this.gui.push(label);    

    dim = rectDimFromCenter(origin.x+buttonWidth,origin.y,buttonWidth,buttonHeight);
    var button2 = new BlockButton(dim[0],dim[1],dim[2],dim[3],0,
      undefined,0);
    button2.onRelease = this.quickSelectClick.bind(this,button2);  
    this.quickSelect.push(button2); 
    this.gui.push(button2);
    var label = new Label(dim[0]+labelOffset.x,dim[1]+labelOffset.y,0.05,0.05,0,'X',labelFont,labelColor,'center');
    this.gui.push(label);

    dim = rectDimFromCenter(origin.x,origin.y+buttonHeight,buttonWidth,buttonHeight);
    var button3 = new BlockButton(dim[0],dim[1],dim[2],dim[3],0,
      undefined,0);
    button3.onRelease = this.quickSelectClick.bind(this,button3); 
    this.quickSelect.push(button3);  
    this.gui.push(button3);
    var label = new Label(dim[0]+labelOffset.x,dim[1]+labelOffset.y,0.05,0.05,0,'C',labelFont,labelColor,'center');
    this.gui.push(label);

    dim = rectDimFromCenter(origin.x+buttonWidth,origin.y+buttonHeight,buttonWidth,buttonHeight);
    var button4 = new BlockButton(dim[0],dim[1],dim[2],dim[3],0,
      undefined,0);
    button4.onRelease = this.quickSelectClick.bind(this,button4); 
    this.quickSelect.push(button4);  
    this.gui.push(button4);
    var label = new Label(dim[0]+labelOffset.x,dim[1]+labelOffset.y,0.05,0.05,0,'V',labelFont,labelColor,'center');
    this.gui.push(label);

    dim = rectDimFromCenter(0.945,0.94,.06,.08);
    var resetBackWall = new ColoredBox(dim[0],dim[1],dim[2],dim[3],0,'white','black',5);
    this.gui.push(resetBackWall);
    var resetQuickSelectButton = new TextButton(dim[0],dim[1],dim[2],dim[3],0,this.resetQuickSelect.bind(this),'X','30px ' + FONT,'red','transparent','transparent','3');
    this.gui.push(resetQuickSelectButton);
    
  }
  quickSelectClick(button){
    if(button.blockID == 0){
      button.blockID = this.currentBlock;
    } else {
      this.selectBlock(button);
    }
  }
  selectFromQuickSelect(quickSlotIndex){
    this.currentBlock = this.quickSelect[quickSlotIndex].blockID;
  }
  selectFromBar(index){
    this.currentBlock = this.buttonGrid[0][index].blockID;
  }
  selectBlock(button){
    this.currentBlock = button.blockID;
    if(this.currentBlock >= CELLMAP.length-1)
      this.currentBlock = CELLMAP.length-1;
    if(this.currentBlock < 0){      
      this.currentBlock = 0;
    }
  }
  resetQuickSelect(){
    for(var i = 0; i < this.quickSelect.length; i++){
      this.quickSelect[i].blockID = 0;
    }
  }
  gridScrollUp(){
    if(this.buttonGrid[0][0].blockID >= this.rowLength){
      for(var i = 0; i < this.rowCount; i++){
        for(var j = 0; j < this.rowLength; j++){
          this.buttonGrid[i][j].blockID -= this.rowLength;
        }
      }
    }
  }
  gridScrollDown(){
    if(this.buttonGrid[0][0].blockID <= CELLMAP.length-7){
      for(var i = 0; i < this.rowCount; i++){
        for(var j = 0; j < this.rowLength; j++){
          this.buttonGrid[i][j].blockID += this.rowLength;
        }
      }
    }
  }
  drawBlockAtCursor(canvas){
    var offset = {x: 20, y: 20};
    var width = 30;
    var height = 30;
    var world = {
      getCell: function() {return true}
    };
    if(this.currentBlock < CELLMAP.length && this.currentBlock > 0 && CELLMAP[this.currentBlock].draw)
      CELLMAP[this.currentBlock].draw(canvas,this.mousePoint.x+offset.x,this.mousePoint.y+offset.y,width,height,world,0,0);
    canvas.strokeStyle = 'black';
    canvas.lineWidth = 3;
    canvas.strokeRect(this.mousePoint.x+offset.x,this.mousePoint.y+offset.y,width,height);
    if(this.driver.mouse.held && this.clickDragPivot) {
      var w = Math.floor((this.clickDragPivot.x - this.driver.mouse.x)/this.zoom/this.world.s);
      var h = Math.floor((this.clickDragPivot.y - this.driver.mouse.y)/this.zoom/this.world.s);
      w = Math.abs(w);
      h = Math.abs(h);
      canvas.fillText(w+','+h, this.mousePoint.x + offset.x*3, this.mousePoint.y+offset.y*3);
    }
  }
  selectAir(){
    this.currentBlock = 0;
  }
  toggleCommandList(){
    this.showCommands = !this.showCommands;
  }
  pickBlockFromLevel(){

    var camera = this.camera;    
    var wx = this.mousePoint.x/this.zoom + (camera.x - camera.offset.x)/this.zoom;
    var wy = this.mousePoint.y/this.zoom + (camera.y - camera.offset.y)/this.zoom;
    var x = Math.floor(wx/this.world.s);
    var y = Math.floor(wy/this.world.s);
    if(x > this.world.w || x < 0 || y > this.world.h || y < 0) return;  //bail if out of bounds
    this.currentBlock = this.grid[y][x];
  
  }
  draw(canvas) {
    var camera = this.camera;
    var world1 = this.world;
    camera.offset = {x: canvas.width/2, y: canvas.height/2};
    var xmin = -canvas.width/2 + world1.s*this.zoom;
    var xmax = canvas.width/2 + (world1.w-1)*world1.s*this.zoom;
    var ymin = -canvas.height/2 + world1.s*this.zoom;
    var ymax = canvas.height/2 + (world1.h-1)*world1.s*this.zoom;
    if(camera.x<xmin) camera.x = xmin;
    if(camera.x>xmax) camera.x = xmax;
    if(camera.y>ymax)camera.y = ymax;
    if(camera.y<ymin)camera.y = ymin;  
    var camera = this.camera;
    canvas.save();
    canvas.translate(canvas.width/2,canvas.height/2);
    canvas.translate(-Math.floor(camera.x), -Math.floor(camera.y));
    canvas.scale(this.zoom,this.zoom);
    canvas.strokeStyle = 'black';
    canvas.lineWidth = 10;
    canvas.strokeRect(0,0,world1.w*world1.s,world1.h*world1.s);
    this.world.draw(canvas,true);
    canvas.restore();
    var mouse = this.driver.mouse;

    //canvas.fillStyle='#fff';
    canvas.fillStyle = 'rgba(255,255,255,0.85)';

    canvas.beginPath();
    canvas.rect(0, canvas.height - canvas.height/5, canvas.width, canvas.height/5);
    canvas.fill();
    canvas.stroke();
    
    canvas.fillStyle='#000';
    canvas.fillText("[" + CELLMAP[this.currentBlock].name + "]", canvas.width/5, canvas.height/1.1-100);
    canvas.fillText("[Wall Jump: " + this.playerAbility[0] + "   Double Jump: " + this.playerAbility[1]+ "]", canvas.width/1.5, canvas.height/1.1-100);
    
  /*
'32': {down: this.startDragging.bind(this), held: this.drag.bind(this)},
      '75': {down: this.runTest.bind(this)},    //K
      //'80': {down: this.printLevel.bind(this)},
      '65': {down: this.cycleBlockBackwards.bind(this)},//S
      '68': {down: this.cycleBlock.bind(this)},         //W
      '69': {down: this.cycleAbility.bind(this)},       //E
      '84': {down: this.zoomIn.bind(this)},             //T
      '71': {down: this.zoomOut.bind(this)},            //G
      '73': {down: this.growi.bind(this)},              //I
      '74': {down: this.growj.bind(this)},              //J
      '27': {down: this.backToSelect.bind(this)},       //Escape
      '88': {down: this.openBlockSelect.bind(this)},    //X
      '66': {down: this.resetCameraPosition.bind(this)},//B

      '82': {down: this.gridScrollUp.bind(this)},     //R
      '70': {down: this.gridScrollDown.bind(this)},   //F
      '69': {down: this.selectAir.bind(this)},        //D
      '72': {down: this.toggleCommandList.bind(this)},//H
  */
    canvas.font = "20px " + FONT;
    canvas.textAlign = 'left';
    if(this.showCommands){
      var origin = {x:0.02,y:0.1};
      var gap = 0.04;
      var text = [
        "[H] - Toggle Command List",
        "[W] - Cycle block forward",
        "[S] - Cycle block backward",
        "[E] - Cycle abilities",
        "[A] - Block Picker",
        "[R] - Scroll Block Select Up",
        "[F] - Scroll Black Select Down",
        "[T] - Zoom In",
        "[G] - Zoom Out",
        "[D] - Select Erase (Air)",
        "[1/2/3/4] - Quick select",
        "[K] - Test Level",
        "[B] - Reset Camera",
        "[I] - Grow I",
        "[J] - Grow J",
        "[P] - Print as String",

      ];
      for(var i = 0; i < text.length; i++){
        canvas.fillStyle = 'rgba(255,255,255,0.75)';
        canvas.fillRect(origin.x*canvas.width,
          (origin.y+i*gap-gap/2)*canvas.height,300,gap*canvas.height);
        canvas.fillStyle = 'black';
        canvas.fillText(text[i],origin.x*canvas.width,
          (origin.y+i*gap)*canvas.height,1600);
      }
    } else {
      canvas.fillText("[H] - Help",canvas.width*0.02,canvas.height*0.1,1600);
    }
    canvas.textAlign = 'center';
    this.drawAllGUI(canvas);
    this.drawBlockAtCursor(canvas);
    if(mouse.held && this.clickDragPivot != undefined) {
      canvas.strokeStyle = "rgba(0,100,0,1)";
      canvas.fillStyle = "rgba(0,255,0,.5)";
      canvas.beginPath();
      var tx = this.clickDragPivot.x*this.zoom;
      var ty = this.clickDragPivot.y*this.zoom;
      canvas.rect(tx, ty, -tx+mouse.x, -ty+mouse.y);
      canvas.fill();
      canvas.stroke();
    }
  }
}class ExpandingMobileButton extends TextButton{

  constructor(x,y,w,h,groupID,onRelease,text,font,fontSize,largerFontSize, 
    textColor,rectBackFillColor,rectOutlineColor, strokeWidth, 
    expandFactor){
      super(x,y,w,h,groupID,onRelease,text,font, 
        textColor,rectBackFillColor,rectOutlineColor, strokeWidth);
      this.expandFactor = expandFactor;
      this.expandValue = (this.selected) ? this.expandFactor: 0;
      this.speedFactor = .55;
      this.originalDim = [x,y,w,h];
      this.center = {x:x+w/2,y:y+h/2};
      this.fontSize = fontSize;
      this.largerFontSize = largerFontSize;
      
  }  
  update(dt){
    if(this.selected){
      this.expandValue += this.speedFactor*dt*(this.expandFactor-this.expandValue);
    } else {
      this.expandValue -= this.speedFactor*dt*(this.expandValue);
    }
    this.expandValue = constrain(this.expandValue,0,this.expandFactor);
  }
  draw(canvas){

    var dim = [0,0,0,0];
    dim[2] = this.originalDim[2]*(1+this.expandValue);
    //dim[3] = this.originalDim[3]*(1+this.expandValue);
    dim[3] = this.originalDim[3]
    dim[0] = (this.center.x-dim[2]/2);
    //dim[1] = (this.center.y-dim[3]/2);
    dim[1] = this.originalDim[1];

    dim[0]*=canvas.width;
    dim[1]*=canvas.height;
    dim[2]*=canvas.width;
    dim[3]*=canvas.height;
    this.drawRectangle(canvas,dim);
    this.drawOutline(canvas,dim);
    
    this.drawText(canvas,dim);
    
  }
 
  drawText(canvas,dim){
    canvas.fillStyle = this.textColor;

    if(this.selected){
      canvas.font = this.largerFontSize + " " + this.font;
    }
    else{
      canvas.font = this.fontSize + " " + this.font;
    }
    canvas.textAlign = 'center';
    canvas.textBaseline='middle';
    canvas.fillText(this.text,dim[0]+dim[2]/2,dim[1]+dim[3]/2,this.w*canvas.width*.8);
  }
}addLevel( function(nameSpace) {
  {

    return {
      name: "The Acorn",
      worldType: 1,
      grid: [
        [ 0,19,19,19,19,19,19,19,19,19,19,19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,],
        [ 0,19,19,19,19,19,19,19,19,19,27,19,19, 0, 0, 0, 0, 0, 0, 0, 0, 0,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,18,19,19,19,19,19,19,19,18,],
        [19,19,18,19,19,19,19,18,19,19,27,19,19,19, 0, 0, 0, 0, 0, 0, 0, 0, 0,19,19,18,18,18,19,19,18,18,19,19,19,19,19,18,27,19,19,18,19,18,19,19,18,18,],
        [ 4,18,19,19,18,19,19,18,19,19,27,19,19,19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,19,19,19,18,18,19,18,19,19,19,19,18,18,18,27,18,19,19,18,18,18,18,27,23,],
        [23,23,18,19,18,19,19,18,19,18,27,19,19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,19,18,18,18,18,18,19,19,19,18,19,19,19,27,18,18,18,19,18,18,19,27,18,],
        [ 0,18,18,18,18,19,18,18,19,18,27,19,19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9,23,23,23,23,27,18,19,19,18,23,23,23,27,18,18,18,27,18,19,19,27,19,],
        [ 0, 0,18,18,18,18,18,18,18,18,18,19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,19,18,18,18,27,18,19,18,19,19,19,19,27,18,18,18,27,18,18,18,27,19,],
        [ 0, 0, 0,19,23,23,27,18,18,18,19,19, 0, 0, 0, 0, 0,19,19,19,19,19,19,19, 0, 0,19,19,18,18, 2,18,18,19,19,19,19,19,19,19,18,18,27,18,18,19,27, 0,],
        [ 0,19,19,19,19,18,27,18,18,18,19,19, 0, 0, 0,19,19,19,19,19,19,19,19,19,19,19, 0,19,22,18, 2,18,18,19,19,19,19,19,19,19,19,18,27,18,18, 0,27, 0,],
        [ 0,19,19,19,19,18,27,18,18,19,19,19, 0, 0, 0,19,19,19,19,19,19,19,19,19,19,19, 0, 0, 0,18,27,18,18,19,19,19, 0, 0, 0, 0,19,18,27,18,18,27,18, 0,],
        [ 0,19,19,18,19,18,27,18,19,18,19,19, 0, 0, 0,19,19,19,19,18,18,19,19,19,18,19,19, 0, 0,18,27,18,18,19,19,23,23,23,23, 9,19,18,27,18,18,27,18, 0,],
        [ 0,19,19,18,19,18,18,18,18,18,19, 0, 0, 0, 0,19,18,19,18,19,18,18,18,19,18,19,19, 0, 0,18,27,18,18,18,18,18,18,19,19, 0,19,18,27,18,18,27, 0, 0,],
        [ 0, 0,19,18,18,18,19,19,19,19,19, 0, 0, 0, 0,19,18,18,18,19,18,18,18,18,18,18, 0, 0, 0,18,27,18,18,18, 2,19,19,19, 0, 0, 0,18,27,18,18,27, 0, 0,],
        [ 0, 0,19,19,19,18,19,18,19,19, 0, 0, 0, 0,19,19,19,19,18,18,18,18,19,19,18,19,19, 0, 0,18, 2,18,18,19,27,19,19, 0, 0, 0, 0,18,27,18,18,27, 0, 0,],
        [ 0, 0, 0, 0,19,18,18,18,19,19, 0, 0, 0, 0, 0, 0, 0,19,19,18,18,18,19,19,19,19,19, 0, 0,18, 2,18,19,19,27, 0, 0, 0, 0, 0,23,23,27,18,18,27, 0, 0,],
        [ 0, 0, 0, 0, 0,18,18,18,19, 0, 0, 0, 0, 0, 0, 0, 0, 9,23,23,27,18,18,18,19,19,19, 0,18,18,27,18, 0, 0,27, 0, 0, 0, 0, 0, 0,18,27,18,18,27, 0, 0,],
        [ 0, 0, 0, 0, 0,18,18,18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,18,27,18,18,19,19,19,19, 0,18,18,27,18, 0, 0,27,18,18, 0, 0, 0, 0,18,27,18,18,27, 0, 0,],
        [ 0, 0, 0, 0, 0,18,18,18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27,18,19,19, 0, 0,19, 0,18,18,27,18, 0, 0, 2,18,18, 0, 0, 0, 0,18,27,18,18,27, 0, 0,],
        [ 1, 1, 1, 1, 1, 1, 1,18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,27,18, 0, 0, 0, 0,19, 0,18,18,27,18, 0, 0, 2,18,18, 0, 0, 0, 0,18,27,18,18,18, 0, 0,],
        [ 1, 1, 1, 1, 1, 1, 1,18,18, 0,15, 0, 0, 0, 0, 0, 0, 0, 0,18,27,18, 0, 0, 0, 0, 7, 0,18,18,18,18, 0, 0,27,18,18, 0, 0, 0, 0, 2,27,18,18,18, 0, 0,],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 2,18,27,18,18, 0, 0, 0, 0, 0,18,18,18,18, 0, 0,27,18,18,18, 0, 0, 0,18,27,18,18,18, 5, 0,],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 2,18,27,18,18,18, 0, 0, 0,18,18,18,18,18, 0, 0,27,18,18,18, 0, 0, 2,18,27, 1, 1, 1, 1, 1,],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3,18,18,27,18,18,18,18, 0,18,18,18,18,18,18,18, 0, 2,18,18,18,18, 0,18,18, 1, 1, 1, 1, 1, 1,],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        ],
      init(gameScene){
        var acornTutorial = new WorldText(1030,820,620,'ACORNS allow Jimothy to WALL JUMP','30px ' + FONT,[255,255,255,0],[255,255,255,1],25,false,'center');
        var acornTrigger = new TriggerZone(830,720,420,200,gameScene.player,acornTutorial.appear.bind(acornTutorial),undefined,acornTutorial.disappear.bind(acornTutorial),false)
        gameScene.entities.push(acornTutorial);
        gameScene.entities.push(acornTrigger);
      }
    };

  }
});
class Butcher extends Mover {
  constructor(x,y) {
    super(x,y);
    this.w = 35;
    this.h = 50;
    this.width = this.w;
    this.height = this.h;
    this.eyeMovement = {x:0,y:0, blink: 0, blinkTime: 10, tx: 0, ty: 0, px: 8, py:15, dx: 20, w:8, w2:7};
    this.eyeColor = "#fff";
    this.outlineColor = "#000";
    this.color1 = "#aaa";
    this.color2 = "#888";
    this.mx=-1;
    this.speed = 4;
    this.state = 0;
    this.knifeAngle = 0;
    this.wielding=true;
  }
  update(dt, frameCount) {
    super.update(dt, frameCount);
    // if(Math.floor(frameCount/dt)%30==0) {
      // this.game.addEntity(new Knife(this.x,this.y, -3, -3));
    // }
    switch(this.state) {
      case 0:
        this.moveToPig();
        break;
      case 1:
        this.waitForJump();
        break;
      case 2:
        this.waitForFall();
        break;
      case 3:
        this.moveOffScreen();
      default:
        break;
    }
  }
  attachPig() {
    this.game.pig.x = this.x-this.w/4*(1-2*this.flipped);
    this.game.pig.y = this.y-this.h/4;
    this.game.pig.flipped = !this.flipped;
    this.game.pig.vy = 0;
    this.game.pig._angle = this.angle;
    this.game.pig.animationState = 0;    
    this.game.pig.bounceFrq = Math.PI/10;
  }
  waitForJump() {
    this.mx = 0;
    if(this.grounded==false) this.state = 2;
    this.attachPig();
  }
  waitForFall() {
    this.mx = 0;
    if(this.grounded) {
      this.state = 3;
    }
    this.attachPig();
  }
  moveToPig() {
    this.mx = -1;
    if(this.x<this.game.pig.x) {
      this.state=1;
      this.jump(7);
      this.mx = 0;
    }
  }
  moveOffScreen() {
    this.mx = 1;
    this.attachPig();
  }
  drawShape(canvas,w,h) {
    canvas.save();
    canvas.strokeStyle = this.outlineColor;
    canvas.lineWidth=5;
    canvas.strokeRect(-w/2-1,-h-1,w+2,h+2);
    // canvas.fillStyle = "#73d";
    canvas.fillStyle = this.color1;    
    
    // canvas.fillStyle = "#999";
    canvas.fillRect(-w/2,-h,w,h);
    // canvas.fillStyle = "#74e";
    // canvas.fillStyle = "#ddd";
    canvas.fillStyle = this.color2;
    
    var shadeX = w*.2+this.eyeMovement.x/2;
    if(this.dead)shadeX-=5;
    canvas.fillRect(-w/2,-h,shadeX,h);
    var pantsHeight = h*.4;
    canvas.fillStyle = "#fff";
    var apronx = w/4;
    var stringHeight = h/10;
    canvas.fillRect(-w/2+apronx,-pantsHeight,w-apronx,pantsHeight);    
    canvas.fillRect(-w/2,-pantsHeight,apronx,stringHeight);  
    canvas.fillStyle="#a88";  
    canvas.fillRect(-w/2+apronx+7,-pantsHeight+5,w-apronx-10,7);        
    // canvas.fillStyle = "#44e";
    // canvas.fillRect(0,-pantsHeight,w/2,pantsHeight);        
    
    
    canvas.fillStyle=this.eyeColor;
    var squint = 1-.6*Math.abs(this.vy)/this.terminalVelocity;
    var eyey = -h+this.eyeMovement.py + this.eyeMovement.y;
    var eyex = this.eyeMovement.px + this.eyeMovement.x;
    var eyed = this.eyeMovement.dx - this.eyeMovement.x/3;
    
    if(this.crouching) {
      // squint *= .2;
    }
    var blink = 0;
    if(this.eyeMovement.blink>0) {
      var t = this.eyeMovement.blinkTime - this.eyeMovement.blink+1;
      blink = (1+Math.cos(t*Math.PI/20))/2;
    }
    squint*= (1-blink);
    eyey += blink*4;
    // eyey -= this.width/this.w * 5;
    var eyh = 8*squint;
    var eyh2 = eyh;
    if(this.crouching) {
      // eyed += 2;
      eyex += 2;
    }
    this.drawEye(canvas, eyex-eyed,eyey,this.eyeMovement.w,eyh,0, Math.PI/20, this.eyeMovement.w*2, 6,"#000");
    this.drawEye(canvas, eyex,eyey,this.eyeMovement.w2,eyh2,3, -Math.PI/20, this.eyeMovement.w*2, 6, "#000");
    w=this.w;
    
    canvas.translate(0,-h);
    var hatAngle = Math.abs(this.angle);
    if(hatAngle>Math.PI/4)hatAngle=Math.PI/4;
    canvas.rotate(-hatAngle);
    this.drawHat(canvas,w);
    canvas.translate(0,h);
    if(this.wielding) {
      this.drawKnife(canvas, w,h);
    }
    canvas.restore();    
  }
  drawEye(canvas, x,y,w,h, dx, browangle, broww, browh, browcolor) {
    canvas.fillRect(x,y,w,h);
    canvas.save();
    canvas.fillStyle=browcolor;
    canvas.translate(x+w/2+dx,y-browh/4);
    canvas.rotate(browangle);
    canvas.fillRect(-broww/2, -browh/2, broww, browh);
    canvas.restore();
  }
  drawHat(canvas,w) {
    canvas.fillStyle = "#fff";
    // canvas.fillStyle = "#444";
    canvas.beginPath();
    canvas.rect(-w/2-1,-6,w,12);
    canvas.stroke();
    canvas.fill();

    canvas.fillStyle = "#ddd";
    // canvas.fillStyle = "#111";
    canvas.beginPath();
    canvas.rect(-w/2-1,-6,(w)/4,12);
    canvas.fill();
  }
  drawKnife(canvas,w,h) {
    var bladew = 18;
    var bladeh = 23;
    var handlew = 5;
    var handleh = 10;
    var holer = 3;
    canvas.save();
    canvas.translate(w/2-this.knifeAngle*10,-h/3-this.knifeAngle*10);
    canvas.scale(-1,1);
    canvas.rotate(-Math.PI/5+this.knifeAngle);
    canvas.lineWidth = 3;    
    canvas.beginPath();
    canvas.fillStyle = "#a33";
    canvas.rect(-handlew, 0, handlew, handleh);
    canvas.stroke();
    canvas.fill();
    canvas.fillStyle = "#822";
    canvas.fillRect(-handlew, 0, handlew/2, handleh);    
    canvas.fillStyle = "#eee";
    canvas.beginPath();
    canvas.rect(-bladew,-bladeh,bladew,bladeh);
    canvas.stroke();    
    canvas.fill();
    canvas.fillStyle="#fff";
    canvas.fillRect(-bladew,-bladeh,bladew/4,bladeh);
    canvas.beginPath();
    canvas.fillStyle="#000";
    canvas.arc(-holer*1.5, -bladeh+holer*1.5, holer, 0, Math.PI*2);
    canvas.fill();
    canvas.restore();
  }
}addBlock(function() { return {
  name: "Bounce",
  solid: false,
  id: BLOCKS.length,
  draw: function(canvas, x,y,w,h, world,i,j) {
    canvas.fillStyle="#900";
    canvas.fillRect(x,y,w,h);
    canvas.strokeStyle = "#fff";
    canvas.beginPath();
    canvas.moveTo(x+w/4,y+h/2);
    canvas.lineTo(x+w*3/4,y+h/2);
    canvas.lineTo(x+w/2,y);
    canvas.lineTo(x+w/4,y+h/2);    
    canvas.lineTo(x+w/2,y+h);
    canvas.lineTo(x+w*3/4,y+h/2);    
    canvas.stroke();
  },
  entityCollision: function(entity, pos, dx, dy, cellPos) {
    if(entity.x<cellPos.x+cellPos.w/2 && entity.vx>=0) {
      entity.vy=-10;
      entity.vx = -20;
      entity.y-=1;
    }
    if(entity.x>cellPos.x+cellPos.w/2 && entity.vx<=0) {
      entity.vy=-10;
      entity.vx = 20;
      entity.y-=1;
    }

    entity.spinning=true;
    entity.angle += Math.PI;
    // entity.jumpCount = 0;
    // entity.jump();
    // entity.width+=10;
    // entity.vx = -entity.vx;
    // entity.spinning=true;
    // entity.eyeMovement.y -=10;
    // entity.height += 10;
    // entity.vy -= 10;
    // entity.game.world.world[cellPos.y/cellPos.h][cellPos.x/cellPos.w+1] = 1;
    // entity.game.world.forceRedraw();    
  },
}});
//menustate constants
var SELECTWORLD = 0;
var SELECTLEVEL = 1;


class LevelSelectScene extends Scene{
    constructor(playIntro){
        super(playIntro);
        this.keyMap = {
          '32': { down: this.pressButton.bind(this), up: this.unpressButton.bind(this) }, //space
          '13': { down: this.pressButton.bind(this), up: this.unpressButton.bind(this) }, //enter
          '27': {down: this.safeButtonCall(this,this.handleEscape)},   //esc
    
          '87': { down: this.navigateLevelSelect.bind(this,0)},    //W
          '68': { down: this.navigateLevelSelect.bind(this,1)},    //D
          '83': { down: this.navigateLevelSelect.bind(this,2)},    //S
          '65': { down: this.navigateLevelSelect.bind(this,3)},   //A
    
          '38': { down: this.navigateLevelSelect.bind(this,0)},  //up
          '39': { down: this.navigateLevelSelect.bind(this,1)},  //right
          '40': { down: this.navigateLevelSelect.bind(this,2)},   //down
          '37': { down: this.navigateLevelSelect.bind(this,3)},   //left
        }
        this.levels = createLevels();    

        this.levelsInWorld = [0,0,0];     //numbers should match how many levels are in each world
        for(var i = 0; i < this.levels.length; i += 1) {
          var level = this.levels[i];
          var worldType = level.worldType || 0;
          this.levelsInWorld[worldType] += 1;
        }
        this.menuState = SELECTWORLD;
        this.worldSelected = 0;
        this.levelIndex = 0;    
        if(touchOn){
          this.buttonsInRow = 4;
        } else {
          this.buttonsInRow = 6;
        }
        this.buttonRow = [];

        this.worldButtons = [];
        this.worldLabels = [];
        this.allowUIInput = true;
        this.backWall = [];
        this.addLevelSelectGUI();
        this.backgroundList = [[],[],[]];  //list of lists
                                                                //top to bottom
                                                                //4 ScrollingBackgrounds each
        this.createBackgrounds();


    }


    update(dt){
      super.update(dt);
      this.updateBackgrounds(dt);
      if(this.menuState == SELECTLEVEL){
        this.levelIndex = this.selectedButton.value;
        var absoluteLevelIndex = this.levelIndex;
        for(var i = 0; i < this.worldSelected; i++){
          absoluteLevelIndex += this.levelsInWorld[i];
        }
        if(this.levels[absoluteLevelIndex])
          this.levelName.text = ""+this.levels[absoluteLevelIndex].name;
        else  
          this.levelName.text = "";
      }
    }
    draw(canvas){
      this.drawBackgrounds(canvas);
      canvas.strokeStyle = 'black';
      if(this.menuState == SELECTWORLD)
        canvas.lineWidth = 3;
      else if(this.menuState == SELECTLEVEL)
        canvas.lineWidth = 10;
      canvas.strokeRect(0,this.worldSelected*canvas.height/3,canvas.width,canvas.height/3);
      this.drawGrayScale();
      this.drawAllGUI(canvas);
      drawTransitionOverlay(this.overlayColor,canvas);
      if(this.debug)
        drawGrid(canvas);
    }
    drawGrayScale() {
      canvas.save();      
      canvas.globalCompositeOperation='hue';    
      canvas.fillStyle = 'white';        
      for(var i=0;i<3;i+=1) {
        var obj = this.backgroundList[i][0];
        canvas.globalAlpha = obj.colorTimer/obj.colorChangeDuration;
        canvas.fillRect(0,i*canvas.height/3,canvas.width,canvas.height/3);
      }
      canvas.restore();      
    }
    updateBackgrounds(dt){
      for(var i = 0; i < this.backWall.length; i++){
        this.backWall[i].update(dt);
      }
      for(var i = 0; i < this.backgroundList.length; i++){
        for(var j = 0; j < this.backgroundList[i].length; j++){
          this.backgroundList[i][j].update(dt);
        }
      }
    }
    drawBackgrounds(canvas){
      for(var i = 0; i < this.backWall.length; i++){
        this.backWall[i].draw(canvas);
      }
      for(var i = 0; i < this.backgroundList.length; i++){
        for(var j = 0; j < this.backgroundList[i].length; j++){
          this.backgroundList[i][j].draw(canvas);
        }
      }
    }
    createBackgrounds(){
      var slowSpeed = 3;
      var fastSpeed = 5;
      
      var xScale = 0.55;
      var bgSprite1 = createHillBackground(6000, "rgb(10,92,31)", false);
      var bg1 = new ScrollingBackgroundObject(bgSprite1,xScale,.35,slowSpeed,0,-80,false,true);
      var bg2 = new ScrollingBackgroundObject(bgSprite1,xScale,.35,slowSpeed,bgSprite1.width,-80,true,true);
      this.backgroundList[0].push(bg1);
      this.backgroundList[0].push(bg2);
      
      var bgSprite2 = createHillBackground(6000, "rgb(11,102,35)", false);
      bg1 = new ScrollingBackgroundObject(bgSprite2,xScale,.2,fastSpeed,0,37,false,true);
      bg2 = new ScrollingBackgroundObject(bgSprite2,xScale,0.2,fastSpeed,bgSprite2.width,37,true,true);
      this.backgroundList[0].push(bg1);
      this.backgroundList[0].push(bg2);

      xScale = 0.7;
      var bgSprite3 = createForrestBackground(60, "0b6623", false);
      var bg1 = new ScrollingBackgroundObject(bgSprite3,xScale,.35,slowSpeed,0,120,false,false);
      var bg2 = new ScrollingBackgroundObject(bgSprite3,xScale,.35,slowSpeed,bgSprite3.width,120,true,false);
      this.backgroundList[1].push(bg1);
      this.backgroundList[1].push(bg2);

      var bgSprite4 = createForrestBackground(100, "0b6623", false);
      bg1 = new ScrollingBackgroundObject(bgSprite4,xScale,.2,fastSpeed,0,237,false,false);
      bg2 = new ScrollingBackgroundObject(bgSprite4,xScale,0.2,fastSpeed,bgSprite4.width,237,true,false);
      this.backgroundList[1].push(bg1);
      this.backgroundList[1].push(bg2);

      var bgSprite5 = createSpikeBackground(60, "#222", false);
      var bg1 = new ScrollingBackgroundObject(bgSprite5,xScale,.35,slowSpeed,0,320,false,false);
      var bg2 = new ScrollingBackgroundObject(bgSprite5,xScale,.35,slowSpeed,bgSprite5.width,320,true,false);
      this.backgroundList[2].push(bg1);
      this.backgroundList[2].push(bg2);

      var bgSprite6 = createSpikeBackground(100, "#222", false);
      bg1 = new ScrollingBackgroundObject(bgSprite6,xScale,.2,fastSpeed,0,437,false,false);
      bg2 = new ScrollingBackgroundObject(bgSprite6,xScale,0.2,fastSpeed,bgSprite6.width,437,true,false);
      this.backgroundList[2].push(bg1);
      this.backgroundList[2].push(bg2);
    }
    addLevelSelectGUI(){
      var bigFont = '40px ' + FONT;
      var buttonFont = '30px ' + FONT;
      var textColor = 'white';
      //level select title
      var dim = rectDimFromCenter(.5,.06,.3,.1);
      var levelSelectTitle = new Label(dim[0],dim[1],dim[2],dim[3],3,
        "Select Level",'50px ' + FONT,textColor,'center');
      this.gui.push(levelSelectTitle);
      //Color lerp backgrounds
      var world1Back = new ColorLerpBox(0,0,1,.333,3,[135,206,235,255],[128,128,128,255],25,true );
      this.backWall.push(world1Back);

      var world2Back = new ColorLerpBox(0,.3333,1,.333,3,[135,206,235,255],[128,128,128,255],25,false );
      this.backWall.push(world2Back);

      var world3Back = new ColorLerpBox(0,.6666,1,.333,3,[130,56,48,255],[128,128,128,255],25,false );
      this.backWall.push(world3Back);

      //World labels
      dim = rectDimFromCenter(.1,.09,.2,.12);
      var world1Label = new Label(dim[0],dim[1],dim[2],dim[3],3,"World 1",bigFont,textColor,'center');
      world1Label.setVisibility(true);
      this.gui.push(world1Label);
      this.worldLabels.push(world1Label);

      dim = rectDimFromCenter(.1,.09+.333,.2,.12);
      var world2Label = new Label(dim[0],dim[1],dim[2],dim[3],3,"World 2",bigFont,textColor,'center');
      world2Label.setVisibility(false);
      this.gui.push(world2Label);
      this.worldLabels.push(world2Label);

      dim = rectDimFromCenter(.1,.09+.666,.2,.12);
      var world3Label = new Label(dim[0],dim[1],dim[2],dim[3],3,"World 3",bigFont,textColor,'center');
      world3Label.setVisibility(false);
      this.gui.push(world3Label);
      this.worldLabels.push(world3Label);

      //World buttons (invisible but functional)
      var world1Button = new Button(0,0,1,1/3,0,this.handleWorldClick.bind(this,0));
      this.gui.push(world1Button);
      this.worldButtons.push(world1Button);

      var world2Button = new Button(0,.333,1,1/3,1,this.handleWorldClick.bind(this,1));
      this.gui.push(world2Button);
      this.worldButtons.push(world2Button);

      var world3Button = new Button(0,.666,1,1/3,2,this.handleWorldClick.bind(this,2));
      this.gui.push(world3Button);
      this.worldButtons.push(world3Button);

      world1Button.setNeighbors([undefined,undefined,world2Button,undefined]);
      world2Button.setNeighbors([world1Button,undefined,world3Button,undefined]);
      world3Button.setNeighbors([world2Button,undefined,undefined,undefined]);

      
      this.buildButtonRow();
      dim = rectDimFromCenter(.8,.532,.05,.08);
      if(touchOn){
        dim[1] -= .012;
        dim[2] *= 1.3;
        dim[3] *= 1.3;
      }
      this.rightArrow = new ArrowSelector(dim[0],dim[1],dim[2],dim[3],5,this.incrementLevels.bind(this),.05,.4,'white','black',5,false);
      this.rightArrow.selectable = false;
      this.rightArrow.setVisibility(false);
      this.gui.push(this.rightArrow);

      dim = rectDimFromCenter(.2,.532,.05,.08);
      if(touchOn){
        dim[1] -= .012;
        dim[2] *= 1.3;
        dim[3] *= 1.3;
      }
      this.leftArrow = new ArrowSelector(dim[0],dim[1],dim[2],dim[3],5,this.decrementLevels.bind(this),.05,.4,'white','black',5,true);
      this.leftArrow.selectable = false;
      this.leftArrow.setVisibility(false);
      this.gui.push(this.leftArrow);

      dim = rectDimFromCenter(.5,.62,.4,.1);
      this.levelName = new Label(dim[0],dim[1],dim[2],dim[3],5,"",'30px ' + FONT,'white','center');
      this.gui.push(this.levelName);

      if(touchOn){
        dim = rectDimFromCenter(.85,.06,.25,.08);
        var mainMenuButton = new TextButton(dim[0],dim[1],dim[2],dim[3],10,this.goToMainMenu.bind(this),"Main Menu",buttonFont,'white','rgba(255,255,255,.5)','white',5);
        this.gui.push(mainMenuButton);
      }
      this.buttons = getButtons(this.gui);
      this.selectedButton = world1Button;
    }
    buildButtonRow(){
      var regionWidth = 0.5;
      var regionHeight = 0.12;
      var square = [1,16/9];
      var buttonWidth = .05*square[0];
      var buttonHeight = .05*square[1];
      
      var buttonGap = regionWidth/this.buttonsInRow;
      var origin = {x:0.5-buttonGap*(this.buttonsInRow-1)/2,y:.535};
      if(touchOn){
        buttonWidth *= 1.5;
        buttonHeight *= 1.25;
        origin.y = .52;
      }
      var dim = [];
      for(var i = 0; i < this.buttonsInRow; i++){
        dim = rectDimFromCenter(origin.x+buttonGap*i,origin.y,buttonWidth,buttonHeight);        
        if(!touchOn){
          var button = new TextButton(dim[0],dim[1],dim[2],dim[3],4,
            this.loadGameLevel.bind(this,i+1),""+(i+1),'40px Noteworthy','white',
            'transparent','white',5);
        } else {
          var button = new TextButton(dim[0],dim[1],dim[2],dim[3],4,
            this.loadGameLevel.bind(this,i+1),""+(i+1),'40px Noteworthy','white',
            'rgba(255,255,255,.5)','white',5);
        }
        /*
        var outline = new ColoredBox(dim[0],dim[1],dim[2],dim[3],4,'transparent','white',3);
        this.gui.push(outline);
        outline.setOptions(false,false,false);
        */
        button.setOptions(false,false,false);
        button.value = i;
        this.gui.push(button);
        this.buttonRow.push(button);
      }
      for(var i = 0; i < this.buttonRow.length; i++){
        var left = (i == 0) ? undefined : this.buttonRow[i-1];
        var right = (i == this.buttonRow.length-1) ? undefined : this.buttonRow[i+1];
        this.buttonRow[i].setNeighbors([undefined,right,undefined,left]);
      }
    }
    updateWorldSelection(worldNumber){
      this.worldSelected = worldNumber;
      for(var i = 0; i < this.backWall.length; i++){
        this.backWall[i].activated = false;
        this.worldLabels[i].setVisibility(false);
      }
      this.worldLabels[worldNumber].setVisibility(true);
      this.backWall[worldNumber].activated = true;
      for(var i = 0; i < this.backgroundList.length;i++){
        for(var j = 0; j < this.backgroundList[i].length;j++){
          if(i == worldNumber)
            this.backgroundList[i][j].activated = true;
          else 
            this.backgroundList[i][j].activated = false;
        }
      }
    }
    handleWorldClick(worldNumber){
      if(this.menuState == SELECTWORLD){
        this.updateWorldSelection(worldNumber);
        this.selectWorld(worldNumber);
      } else if(this.menuState == SELECTLEVEL){
        if(!touchOn){
          if(worldNumber != this.worldSelected){
            this.returnToWorldSelect();  
            this.updateWorldSelection(worldNumber);    
          }  
        } else {
          if(worldNumber != this.worldSelected){
            this.returnToWorldSelect();
            this.updateWorldSelection(worldNumber);
            this.handleWorldClick(worldNumber);
          }
        }   
      }
    }
    selectWorld(worldNumber){
      this.worldSelected = worldNumber;
      this.menuState = SELECTLEVEL;
      this.selectedButton = this.buttonRow[0];
      this.selectedButton.selected = true;
      for(var i = 0; i < this.buttonRow.length; i++){
        this.buttonRow[i].value = i;
      }
      for(var i = 0; i < this.worldButtons.length; i++){
        this.worldButtons[i].setOptions(true,false,false);
      }
      var offSet = (this.worldSelected-1)/3;
      var group4GUI = getGUIInGroup(4,this.gui);
      for(var i = 0; i < group4GUI.length; i++){
        group4GUI[i].setOptions(true,true,true);
        group4GUI[i].y += offSet;
      }
      var group5GUI = getGUIInGroup(5,this.gui);
      for(var i = 0; i < group5GUI.length; i++){
        group5GUI[i].setOptions(true,false,true);
        group5GUI[i].y += offSet;
      }
      
      this.leftArrow.setVisibility(true);
      this.rightArrow.setVisibility(true);
      this.levelIndex = 0;
      if(this.menuState == SELECTLEVEL){
        var absoluteLevelIndex = this.levelIndex;
        for(var i = 0; i < this.worldSelected; i++){
          absoluteLevelIndex += this.levelsInWorld[i];
        }
        if(this.levels[absoluteLevelIndex])
          this.levelName.text = ""+this.levels[absoluteLevelIndex].name;
        else  
          this.levelName.text = "";
      }
    }
    
    returnToWorldSelect(){
      this.menuState = SELECTWORLD;
      this.selectedButton.selected = false;
      this.selectedButton = getGUIInGroup(this.worldSelected,this.gui)[0];
      for(var i = 0; i < this.worldButtons.length; i++){
        this.worldButtons[i].setOptions(true,true,true);
      }
      var group4GUI = getGUIInGroup(4,this.gui);
      for(var i = 0; i < group4GUI.length; i++){
        group4GUI[i].setOptions(false,false,false);
        group4GUI[i].reset();
      }
      var group5GUI = getGUIInGroup(5,this.gui);
      for(var i = 0; i < group5GUI.length; i++){
        group5GUI[i].setOptions(false,false,false);
        group5GUI[i].reset();
      }
      this.levelIndex = 0;
      for(var i = 0; i < this.buttonRow.length; i++){
        this.buttonRow[i].text = ''+(i+1);
      }
    }
    
    loadGameLevel(){
      //This calls a fade to black transition and then loads the level at the end of the transition
      this.allowUIInput = false;
      var levelToLoad = 0;
      for(var i = 0; i < this.worldSelected; i++){
        levelToLoad += this.levelsInWorld[i];       //sums # of levels in previous worlds
      }
      levelToLoad += this.levelIndex;     
      this.startTransition(25,1,function() {
        var newScene = new GameScene();
        if(levelToLoad < newScene.levels.length){
          newScene.loadNewLevel(levelToLoad);
          this.driver.setScene(new LevelIntroScene(newScene,true));
        } else {
          this.allowUIInput = true;
        }
      });
      
    }
    handleEscape(){
      if(this.menuState == SELECTWORLD){
        this.driver.setScene(new MenuScene(false));
      } else if(this.menuState == SELECTLEVEL){
        this.returnToWorldSelect();
      }
    }
    goToMainMenu(){
      this.driver.setScene(new MenuScene(false));
    }
    mousemove(e, mouse) {
      //Overload
      if(!this.allowUIInput)
        return;
      if(this.menuState == SELECTWORLD){
        var percentPoint = getPercentPoint(e);
        var worldNumber = Math.floor(percentPoint[1]*3);        //spreads values 0 to .999 -> 0 to 2.999
        if(!worldNumber&&worldNumber!=0)return;
        var worldNumber = (worldNumber >= 3) ? 2 : worldNumber; //cap to 2 if too large
        var worldNumber = (worldNumber < 0) ? 0 : worldNumber;  //cap to 0 if too small
        this.updateWorldSelection(worldNumber);   
      } 
      GUIMouseMove(this,e,this.buttons);
    }
    navigateLevelSelect(direction){
      //Overload
      if(!this.allowUIInput)
        return;
      if(this.menuState == SELECTWORLD){
        this.navigateUI(direction);
        this.updateWorldSelection(this.selectedButton.groupID);
      } else if(this.menuState == SELECTLEVEL){
        
        switch(direction){
          case 1: //right
            this.rightArrow.displaceArrow();
            break;
          case 3: //left
            this.leftArrow.displaceArrow();
            break;
        }

        if(direction == 1 && this.selectedButton == this.buttonRow[this.buttonsInRow-1]){
          this.incrementLevels();
        }
        else if(direction == 3 && this.selectedButton == this.buttonRow[0]){
          this.decrementLevels();
        }
        this.navigateUI(direction);
        this.levelIndex = this.selectedButton.value;

      }
    }
    
    incrementLevels(){
      this.selectedButton = this.selectedButton.getNeighbor('right') || this.selectedButton;
      if(this.buttonRow[this.buttonsInRow-1].value
        < this.levelsInWorld[this.worldSelected]-1){
        for(var i = 0; i < this.buttonRow.length; i++){
          this.buttonRow[i].value+= 1;
          this.buttonRow[i].text = ""+(this.buttonRow[i].value+1);
        }
        this.levelIndex = this.selectedButton.value;
        if(this.selectedButton != this.buttonRow[0]){
          this.selectedButton.selected = false;
          this.selectedButton = this.selectedButton.getNeighbor('left');
          this.selectedButton.selected = true;
        } else {
          this.selectedButton.selected = true;
        }
      } else {
        this.selectedButton.selected = true;
      }
    }
    decrementLevels(){
      this.selectedButton = this.selectedButton.getNeighbor('left') || this.selectedButton;
      if(this.buttonRow[0].value > 0){
        for(var i = 0; i < this.buttonRow.length; i++){
          this.buttonRow[i].value-= 1;
          this.buttonRow[i].text = ""+(this.buttonRow[i].value+1);
        }
        this.levelIndex = this.selectedButton.value;
        if(this.selectedButton != this.buttonRow[this.buttonsInRow-1]){
          this.selectedButton.selected = false;
          this.selectedButton = this.selectedButton.getNeighbor('right');
          this.selectedButton.selected = true;
        } else {
          this.selectedButton.selected = true;
        }
      } else {
        this.selectedButton.selected = true;
      }
    }
}addLevel( function(nameSpace) {
  {

    return {
      name: "Jungle Gym",
      worldType: 0,
      grid: [
        [ 0, 0, 0, 0, 0,19,19,19,19,19,19,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,27,19,18,19,19,18,18,18,18,18,18,18,27,18,19,19,19,19,19, 0, 0, 0,],
        [ 0, 0, 0,19,19,19,19,19,19,19,19,19,18,18,19,18,19,19,18,19,19,19,19,19,18,18,27,19,19,19,19,18,18,18,19,19,18,18,27,19,19,19,19,19,19,19,19,19,],
        [ 0, 0,19,19,19,19,19,19,19,19,19,19,18,18,27,18,18,18,19,19,19, 0, 0,19,18,18,27,19,19,18,19,19,18,18,18,18,18,19,27,19,19,19,19,19,19,19,19,19,],
        [ 0, 0,19,19,19,19,19,19,19,19,19,19,19,18,27,18,18,19,27,23,23,23,23,27,19,18,27,18,18,19,22,18,18,18,18,19,19,19,27,19,19,19,18,19,19,19,18,19,],
        [ 0, 0,19,19,19,19,19,19,19,19,19,19,19,19,27,23,23,23,27,18,18,18,18,27,19,18,27,23,23,23,23,23,23,27,18,18,19,18,27,19,19,19,18,19,19,19,19,18,],
        [ 0,19,19,19,19,19,19,19,19,19,19,19,19,19, 2,18,18,18,27,18,18,18,27,27,19,23,27, 2,18,18,18,18, 2,27,18,19,19,18,27,19,19,18,18,19,19, 0,19,19,],
        [ 0,19,19,19,19,19,19,19,19,19,19,19,19,19,27,18,18,18,27,18,18,18,27,19,19,18,27, 2,18,18,18,18, 2,27,19,19,19,18,27,18,19,23,23,23, 9, 0, 0, 5,],
        [ 0,19,19,19,19,19,19,18,19,19,19,19,19,19,27,18,18,18, 2,18,18,27,27,19, 0,18,27, 2,18,19,18,18, 2,27, 0,19,19,18,27,18,18,18,19,19,19, 0, 9,23,],
        [ 0, 0,19,19,19,19,18,18,18,19,19,19,19,18,27,18,18,18, 2,18,18,27,19,19, 0, 2,27, 2,18,19,18,18, 2,27, 0,19,19,18,18,19,18,27,19,19, 0, 0,19,19,],
        [ 0, 0,19, 0,19,19,18,18,19,19,19,19,19,18,27,18,18,18, 2,18,27,27,19, 0, 2,18,18,18,18,19,19,18,18,27,19,19,19,18,18,19,18,27,19,19,19,19,19, 0,],
        [ 0, 0, 7, 0, 0,19,18,18,18,18,19,19,18,18, 2,18,18,18, 2,18,27,19,19, 2,19,18,18,18,18,19,19,18,18,27,19,18,18,18,27,19,18,27,19,19,19,19,19, 0,],
        [ 0, 0, 0, 0, 0, 0,18,18,18, 0, 0,19,19,18,27,18,18,18, 2,27,27,19, 0, 2,19,18,18,18,18,18,18,18,18,27,19,19,18,18,27,18,18,18,18,18,18,18,19,19,],
        [ 0, 0, 0, 0, 0, 0,18,18,18, 0, 0, 0,19,18,27,18,18,18, 2,27,19,19, 2,19,19,18,18,18,18,18,19,18,18,27,19,19,19,19,27,18,18,18,18,18,19,19,19,19,],
        [ 0, 0, 9,23,23,23,23,18,18, 0, 0, 0, 0,19,27,18,18,18, 2,27, 0, 0, 2,19,18,18,18,18,18,19,19,18,18,27,19,19,18,19,18,18,18,27,18,19,19, 0, 0, 0,],
        [ 0, 0, 0,19,19,18,18,18,18, 0, 0, 0, 0, 0,27,18,18,18, 2,27, 0, 2,19,19,19,18,18,18,18,19,18,18,18,18,19,19,19,18,18,18,18,27,19,19, 0, 0, 0, 0,],
        [ 0, 0, 0, 0,19,19,18,18,18, 0, 0, 0, 0, 0,27,18,18,18, 2,27, 0,19,19,23,23,23,27,18,18, 0,18,18,18,18,19, 0,19,19,18,18,18,18, 0, 0, 0, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0,18,18,23,23,23, 9, 0, 0, 2,18,18,18,27,27, 0, 0,19,19,18,18,27,18,18, 0,18, 2,18,18,19, 0, 0, 0,18,18,18,18, 0, 0, 0, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0,18,18,18,18, 0, 0, 0, 0, 2,18,18,18,27,27, 0, 0, 0,19,19,18,27,18,18, 0,18,27,18,19,19, 0, 9,23,23,27,18,18, 0, 0, 0, 0, 0, 0,],
        [ 0, 0, 0, 0, 0, 0,18,18,18, 0, 0, 0, 0, 0, 0,18,18,18,27,27, 0, 0, 0, 0, 0,18,27,18,18, 0,18,27,18,19, 0, 0, 0, 0,18,27,18,18, 0, 0, 0, 0, 0, 0,],
        [ 0, 0, 0, 0,23,23,23,18,18, 0, 0, 0, 0, 0,18,18,18,18, 2,27, 2, 0, 0, 0, 0,18,27,18,18, 0,18,27,18, 0, 0, 0, 0, 0,18,27,18,18,18, 0, 0, 0, 0, 0,],
        [ 0, 4, 0,18,18,18,18,18,18,18,18, 0, 0,18,18,18,18,18, 2,27, 2, 2, 2, 0, 0,18,27,18,18, 0,18,27,18, 0, 0, 0, 0, 0,18,27,18,18,18,18,18, 0, 0, 0,],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,18,18,27,18,18,18,18,27, 2, 0, 0, 0, 0, 2, 2,27,18,18,18,18,18, 0, 0, 0,],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,18,18,27,18, 2, 2, 2, 2,18,18, 1, 1, 1, 1, 1,18,18, 0, 0,],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3,],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        ],
    };

  }
});

class PigBeginning extends Pig {
  constructor(x,y) 
  {
    super(x,y);
    this.apples = 0;
    this.fsm = [];//state machine
    this.populateFsm();
    this.state = 0;//starting state
    this.xsight = 100;//line of sight
    this.ysight = 200;
    this.transition = 1;
    this.animationState = 2;
    this.speed = 5;
    this.groundAccel = 1;
    this.isBeginning = true;
    this.appleDict = [];
  }
  update(dt, frameCount) 
  {  
    if (this.apples >= 4)
    {
      this.game.win();
    }
    this.state = this.fsm[this.state].run(this);
    super.update(dt, frameCount);
  }

  playerCollision()
  {
    if (this.game.player.y < this.y && this.game.player.vy>0)
      this.game.player.bounceOffEntity(this, 22);
  }

  populateFsm()
  {
    this.fsm.push({//initializing the state
        name: "Following", 
        index: 0, // will have to change this to be fsm.length
        run: function(entity)
        {//this is what we want to run while in this state
          //entity.mx = 1 * (entity.game.player.x-entity.x < 0 ? -1 : 1);
          if (entity.transition == 1)
            entity.toZero();
          else if (entity.transition > 1)
            entity.speed = 0;
          var dist = entity.game.player.x-entity.x;
          var ydist = entity.game.player.y-entity.y;
          if ((dist > -entity.xsight && dist < entity.xsight  && ydist < entity.ysight && ydist > -entity.ysight)) {//exit condition
            return entity.toOne();
          }
          if (entity.wallcolliding)
          {
            entity.transition = 10;
            //return entity.toOne();
          }
          return this.index;//nothing has changed
        },
      });

    this.fsm.push({
        name: "Waiting", 
        index: 1,
        run: function(entity){
          entity.mx = 1 * (entity.game.player.x-entity.x < 0 ? -1 : 1);
          if (entity.transition > 0)
          {
            entity.transition --;
          }
          if (entity.vy == 0)
            entity.speed = 0;
          var dist = entity.game.player.x-entity.x;
          var ydist = entity.game.player.y-entity.y;
          if (dist > -entity.xsight*4 && dist < entity.xsight*4 && ydist < -15 && entity.transition == 0)// && entity.game.player.vy > 0)
          {
            entity.speed = 3;//entity.game.player.speed;
            entity.jump();
            entity.transition = 10;
          }
          if ((dist < -entity.xsight || dist > entity.xsight)) {//exit condition
            return entity.toZero();
          }
          //entity.transition--;//tick down timer- might have to modify this so it's not fps dependent
          return this.index;
        },
      });

      this.fsm.push({
        name: "Afraid", 
        index: 2,
        run: function(entity)
        { 
          if (entity.appleDict.length > 0)
          {
            return entity.toThree;
          }
          return this.index;
        },
      });

      this.fsm.push({
        name: "HuntingApple", 
        index: 3,
        run: function(entity)
        { 
          entity.mx = 1 * (entity.appleDict[entity.appleDict.length-1]-entity.x < 0 ? -1 : 1);
          return this.index;
        },
      });
  }
  toZero()
  {
    this.transition = 0;
    this.mx = 1 * (this.game.player.x-this.x < 0 ? -1 : 1);
    this.speed = this.game.player.speed;
    return 0;//back to wandering
  }

  toOne()
  {
    this.transition = 10;//set the transition timer
    //this.mx = -1 * (this.game.player.x-this.x > 0 ? -1 : 1);//prepare for next state
    this.speed = 0;
    //this.jump();//just a lil surprise animation
    return 1;//change state
  }

  toTwo()
  {
    if (this.state == 3)
      return this.toThree();;
    this.transition = 0;
    this.animationState = 0;
    this.speed = 0;
   // this.mx = 1 * (this.game.player.x-this.x < 0 ? -1 : 1);//speed up for chase
    //this.speed = 10;
    return 2;//now we chasing
  }

  toThree()
  {
    this.transition = 0;
    this.animationState = 2;
    this.speed = 3;
    return 3;
  }

  eatApple(x)
  {
    this.appleDict.push(x);
    this.state = this.toThree();
  }

  ateApple(x)
  {
    for (var i = this.appleDict.length - 1; i >= 0; i--)
    {
      if (this.appleDict[i] == x)
      {
        this.appleDict.splice(i,1);
      }
    }
    if (this.appleDict.length == 0)
    {
      this.state = this.toOne();
    }
  }

}addBlock(function() { return {
  name: "Kaizo",
  solid: false,
  id: BLOCKS.length,
  hide: true,
  //ignoreCollisions: true,
  draw: function(canvas, x,y,w,h, world,i,j) {
    //var w= width;
    //var h=height;
    canvas.fillStyle = 'rgba(50,50,0,.5)';
    canvas.fillRect(x,y,w,h);
  },
  entityCollision: function(entity, pos, dx, dy, cellPos) {
    if(dy<0) {
      entity.game.world.world[cellPos.y/cellPos.h][cellPos.x/cellPos.w] = 1;
      entity.game.world.forceRedraw();
      //entity.game.world.world[cellPos.y/cellPos.h][cellPos.x/cellPos.w] = this.id;
    }
  },
}});
class CreditsScene extends Scene{
  constructor(playIntro){
    super(playIntro);
    this.keyMap = {
      '32': { down: this.pressButton.bind(this), up: this.unpressButton.bind(this) }, //space
      '13': { down: this.pressButton.bind(this), up: this.unpressButton.bind(this) }, //enter

      '27': {down: this.safeButtonCall(this,this.goToMainMenu)},   //esc
    }
    this.memberNames = ["Brian Dizon",
                        "Christian Gramling",
                        "Kyle Wong",
                        "Kristen Campbell",
                        "Taylor Poppoff",
                        "TJ Hanson",
                        "Muhammad Albayati",];
    this.memberRoles = ["Project Lead",
                        "Programming & Design",
                        "Programming",
                        "Music & Audio",
                        "Art",
                        "Programming",
                        "Programming"];
    this.addCreditsGUI();
    this.nameLabels = getGUIInGroup(2,this.gui);
    this.roleLabels = getGUIInGroup(3,this.gui);
    moveAllGUI(-.7,0,this.nameLabels);
    moveAllGUI(.7,0,this.roleLabels);
    this.creditsTimer = 0;
    this.initialDelay = 15;
    this.delayBetween = 8;
    this.labelVelocity = 0.08;
    this.endDistanceFromCenter = .03;   //distance around center where credit entries should go
                                        //Not actually accurate but decreasing this moves both sides closer
                                        //and increasing it moves them away from the center.
  }

  update(dt){
    super.update(dt);
    this.updateCreditsLabels(dt);
  }
  draw(canvas){
    canvas.fillStyle = 'black';
    canvas.fillRect(0,0,canvas.width,canvas.height);
    this.drawAllGUI(canvas);
  }
  updateCreditsLabels(dt){
    //controls which labels should be moved every frame
    //There is an initial delay where no labels are moving
    //After that, every delayBetween duration allows one more row to begin
    //moving to the center.
    this.creditsTimer += dt;
    if(this.creditsTimer > this.initialDelay){
      for(var i = 0; i < this.memberNames.length; i++){
        if(this.creditsTimer > this.initialDelay+i*this.delayBetween){
          this.moveCreditsEntry(this.nameLabels[i],'right',dt);
          this.moveCreditsEntry(this.roleLabels[i],'left',dt);
        }
      }
    }
  }
  moveCreditsEntry(label,direction,dt){
    //Moves label until it is within endDistanceFromCenter distance from center of screen
    //Speed scales with distance to destination.
    switch(direction){
      case 'left':
        var distance = label.x-(0.5+this.endDistanceFromCenter);
        if(label.x + dt*(-this.labelVelocity)*distance < 0.5 + this.endDistanceFromCenter){
          label.x = 0.5+this.endDistanceFromCenter;
        } else {
          label.x -= dt*this.labelVelocity*distance;
        }
        break;
      case 'right':
        var distance = 0.5-this.endDistanceFromCenter-(label.x+label.w);
        if(label.x+label.w + dt*(this.labelVelocity)*distance > 0.5-this.endDistanceFromCenter){
          label.x = 0.5-label.w-this.endDistanceFromCenter;;
        } else {
          label.x += dt*this.labelVelocity*distance;
        }
        break;
    }
  }
  addCreditsGUI(){
    var textColor = 'white';
    var titleFont = '60px ' + FONT;
    var creditsFont = '30px ' + FONT;
    this.leftRefObject = new GUIElement(-0.5,0.5,0,0,0);
    this.rightRefObject = new GUIElement(1.5,0.5,0,0,0);

    var dim = rectDimFromCenter(0.5,.1,.4,.2);
    var creditsTitle = new Label(dim[0],dim[1],dim[2],dim[3],
      1,"Credits",titleFont,textColor,'center');
    this.gui.push(creditsTitle);

    dim = rectDimFromCenter(0.6,0.9,.1,.1);
    var backButton = new TextButton(dim[0],dim[1],dim[2],dim[3],
      4,this.goToMainMenu.bind(this),"Back",creditsFont,textColor,
      'transparent',textColor,3);
    this.gui.push(backButton);

    var labelWidth = 0.3;
    var labelGap = 0.6/this.memberNames.length;   //This controls how far down the credit entries should go.
    var labelHeight = labelGap-0.05;
    var origin = [0.5,0.25];                      //origin[1] is height that the credit entires begin drawing
    for(var i = 0; i < this.memberNames.length; i++){
      dim = rectDimFromCenter(origin[0]-0.05,origin[1]+(i*labelGap),labelWidth,labelHeight);
      var memberLabel = new Label(dim[0],dim[1],dim[2],dim[3],
        2,this.memberNames[i],creditsFont,textColor,'right');
      this.gui.push(memberLabel);

      dim = rectDimFromCenter(origin[0]+0.05,origin[1]+(i*labelGap),labelWidth,labelHeight);
      var memberRole = new Label(dim[0],dim[1],dim[2],dim[3],
        3,this.memberRoles[i],creditsFont,textColor,'left');
      this.gui.push(memberRole);
    }

    this.selectedButton = backButton;
    backButton.selected = true;
    //backbutton intentionally has no neighbors
    this.buttons = getButtons(this.gui);
  }
  goToMainMenu(){
    this.driver.setScene(new MenuScene(false));
  }
}addLevel( function(nameSpace) {
  {

    return {
      name: "Woof-Bouncing",
      worldType: 1,
      grid: [
        [1,1,0,0,0,0,0,0,0,0,0,18,18,18,18,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,],
        [1,1,0,0,0,0,0,0,0,0,0,18,18,18,18,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,],
        [1,1,1,0,0,0,0,0,5,0,0,18,18,18,18,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        [1,1,1,9,9,9,9,9,9,9,9,23,23,23,23,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,],
        [1,1,1,0,0,0,0,0,0,0,0,18,18,18,18,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,],
        [1,1,1,0,0,14,0,0,0,0,14,18,18,18,18,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        [1,1,1,0,0,0,0,0,0,0,0,18,18,18,18,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,9,9,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,],
        [1,1,1,0,0,0,0,0,0,0,0,18,18,18,18,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,],
        [1,1,1,0,0,0,0,0,0,0,0,18,18,18,18,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,1,1,1,],
        [1,1,1,0,0,0,0,0,0,0,0,18,18,18,18,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,15,0,0,0,1,0,0,0,0,1,1,1,1,],
        [1,1,1,1,1,0,0,0,18,18,18,1,1,1,23,23,23,23,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,9,9,9,9,9,9,0,0,0,0,0,0,1,1,1,],
        [1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,2,23,23,23,23,0,0,0,0,0,0,0,0,16,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,],
        [1,1,1,1,1,9,9,9,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,1,1,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,9,9,9,1,1,14,0,0,0,0,0,0,0,0,0,0,0,14,1,1,],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,9,1,1,1,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,],
        [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,],
        [1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,],
        [1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,1,1,],
        [1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,16,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,16,0,0,0,0,1,1,1,1,1,],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,3,3,3,3,3,0,0,0,1,1,1,1,1,],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,3,3,3,1,1,1,3,0,0,0,0,0,0,16,0,0,1,1,1,1,1,1,1,1,3,3,3,1,1,1,1,1,],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,3,3,3,3,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        ]
    };

  }
});

class Apple extends Mover {
  constructor(x,y){
      super(x,y);
      this.x=x;this.y=y;
      this.startY=this.y;
      this.w= 25;
      this.h = 25;
      this.r = 15;
      this.mx = 0;
      //this.vy = 0;
      this.grav = 0;
      this.color1 = "red";
      this.color2 = "#a00";
      this.color3 = "#fff";
      this.color4 = "#640";
      //this.behind = true;
      this.hit = false;
      this.apple = true;
  }
  update(dt, frameCount) {    
    var doinkBox = this.getHitBox();
    var playerBox = this.game.player.getHitBox();
    if(!this.hit&&rectangleCollision(doinkBox, playerBox)&&this.game.player.vy>0) {
      if(this.playerCollision(this.game.player)) {
        this.getHitByEntity(this.game.player);
        if (!this.game.pig||!this.game.pig.isBeginning)
        {
          setTimeout(() => {
            this.y = this.startY;
            this.hit = false;
            this.grav = 0;
          }, 1000);
        }
      }
    }
    if(this.game.pig&&this.game.pig.isBeginning&&rectangleCollision(doinkBox, this.game.pig.getHitBox())) {
        this.grav = 0;
        this.y -= 5000;
        this.game.pig.apples++;
        this.game.pig.ateApple(this.x);
    }
    super.update(dt, frameCount);
    // if (this.bounceAnimation > 0)this.bounceAnimation-=1;
	}

  getHitByEntity(player) {
    //this.bounceAnimation = 20;
    // player.jumpCount--;
    // player.jump(5);
    player.bounceOffEntity(this, 15);
    this.grav = 1;
    this.hit=true;
    //player.apples++;
    if (this.game.pig&& this.game.pig.isBeginning)
    {
      if (Math.abs(this.x-this.game.pig.x) < 500)
        this.game.pig.eatApple(this.x);
      else
      {
        setTimeout(() => {
          this.y = this.startY;
          this.hit = false;
          this.grav = 0;
        }, 1000);
      }
    }
	}

  playerCollision(player) {
		return true;
	}
  getHitBox() {
    return {x:this.x-.5*this.w, y:this.y-this.h, w:this.w, h:this.h};
  }
  drawShape(canvas,w,h) {
    // canvas.strokeStyle = "#fff";
    // canvas.lineWidth = 7;
    // canvas.strokeRect(-w/2,-h,w,h);    
    // canvas.strokeRect(-w*0.1,-h*1.3,w*0.2,h*0.3);
    
    canvas.fillStyle = this.color1;
    canvas.fillRect(-w/2,-h,w,h);
    canvas.fillStyle = this.color2;
    canvas.fillRect(-w/2,-h,w/2,h);
    canvas.fillStyle= this.color3;
    canvas.fillRect(-w*0.1,-h*0.9,w*0.5,h*0.2);
    canvas.fillStyle = this.color4;
    canvas.fillRect(-w*0.1,-h*1.3,w*0.2,h*0.3);
  }
}addBlock(function() { return {
  //Byrd Block
  id: BLOCKS.length,
  name: "Byrd",
  hide: true,   
  ignoreCollisions: true,
  redraws: false,
  drawer: new Byrd(),
  draw: drawEntity,
  onload: function(game, x,y,width,height, world,ii,jj) {
    game.addEntity(new Byrd(x + width/2,y + height));
  },
}});
class LevelEditorSelectScene extends LevelSelectScene{
  constructor(playIntro){
    super(playIntro);
    
    this.keyMap['78'] = {down: this.loadNewLevel.bind(this)};
    this.keyMap['69'] = {down: this.loadLocalLevel.bind(this)};
    this.keyMap['82'] = {down: this.loadPigLevel.bind(this)};
    this.addExtraGUI();
  }
  update(dt,frameCount){
    super.update(dt,frameCount);
  }
  draw(canvas){
    super.draw(canvas);
  }
  
  loadNewLevel(){
    this.loadGameLevel(-2);
  }

  loadLocalLevel(){
    this.loadGameLevel(0);
  }
  loadPigLevel(){
    this.loadGameLevel(-1);
  }
  addExtraGUI(){
    var dim = rectDimFromCenter(.5,.33,.7,.1);
    var levelEditorLabel = new Label(dim[0],dim[1],dim[2],dim[3],7,"Level Editor    [N] - New Level    [E] - Local Level    [R] - PigFunScene",'30px ' + FONT,'white','center');
    this.gui.push(levelEditorLabel);
  }
  loadGameLevel(index){
    if(index == undefined){
      super.loadGameLevel();
      return;
    }
    var absoluteLevelIndex = index;
    for(var i = 0; i < this.worldSelected; i++){
      absoluteLevelIndex += this.levelsInWorld[i];
    } 
    
    var scene = new LevelEditorScene(absoluteLevelIndex);
    this.driver.setScene(scene);
  }
}addLevel( function(nameSpace) {
  {

    return {
      name: "Tree Tops",
      worldType: 1,
      grid: [
        [ 0, 0, 0, 0, 0,19,19,19,19,19,19,18,18,18,18,18,19,19,19,19, 2,19,18,18,18,18,19,19,18,19,19,18,18,18,18,18,18,18,19,18,19,19,19,19,19, 0, 0, 0,],
        [ 0, 0, 0,19,19,19,19,19,19,19,19,19,18,18,19,18,19,19,19, 2,19,19,19,19,18,18,19,19,19,19,19,18,18,18,19,19,18,18,19,19, 2,19,19,19,19,19,19,19,],
        [ 0, 0,19,19,19,19,19,19,19,19,19,19,18,18,19,18,19,19,19,27,19,19, 0,19,18,18,19,19,19,18,19,19,18,18,18,18,18,19,19, 2,19,19,19,19,19,19,19,19,],
        [ 0, 0,19,19,19,19,19,19,19,19,19,19,19,23,27, 2, 2,19,18,27,23,23,23,18,18,18,19,18,18,19,19,18,18,27,23,23,18,19,19,27, 2,19,18,19,19,19,18,19,],
        [ 0, 0,19,19, 7,19,19,19,19,19, 2,19,19,19,27,27,18,18,18,27,18,19,18,18,19,18,27,23,23,23,23,23,23,27,18,18,19,19,19,27,19,19,18,19,19,19,19,18,],
        [ 0,19,19,19,19,19,19,19,19,19, 2,19,19,19, 2,27,18,18,18,27,19,19,18,18,19,18,27, 2,18,18,18,18, 2,27,18,19,19,19,19,27,19,18,18,19,19,19,19,19,],
        [ 4,19,19,19,19,19,19,19,19,19, 2,19,19,19,27,27,18,18,18,27,18,18,18,19,19,18,27, 2,18,18,18,18, 2,27,18,19, 2,19,19,27,19,23,23,23, 9,19,19, 0,],
        [23,23,23,23,19,18,19,19,19,19,19,19,19,19,27,27,18,18,18,27,23,23,23,23,23,23,23,19,19,19,19,19,19,27,19,19,27, 2, 2,27,18,18,27,19,19,19,19, 0,],
        [ 0, 0,18,18,18,18,18,18,18,19,19,19,19,18, 2,27,18,18,18,27,18,18,27,19,19,18,18,19,19,19,18,18, 2,27,19, 2,27,18,18,27,18,18,27,18,19,19,19,19,],
        [ 0, 0, 0,18,18,18,18,18,19,19,19,19,19,18,27,27,18,18, 2,27,18,18,27,19,18,18,18,18,18,19,19,18,18,27,19,19,18,18,19, 2,18,18,27,18,18,19,19, 5,],
        [ 0, 0, 0, 0, 0,18,18, 2,18,18,19,19,18,18,27,27,18,18,18,18,18,18,27,19,19,18,18,18,18,19,19,18,18,27,19, 0,18,18,19, 2,18,18,27,23,23,23,23,23,],
        [ 0, 0, 0, 0, 0,18,18,27,18, 0, 0,19,19,18, 2,27,18,18,18,18,18,18,27,19,19,18,18,18,18,22,18,18,18,27,19, 0,18,18,19, 2,18,18,27,18,18,18,19,19,],
        [ 0, 0, 0, 0, 0,18,18,27,18, 0, 0, 0,19,18, 0,27,18,18,18,23,23,23,27,19,19,18,18,18,23,23,23,18,18,27, 0,19, 2,18,19, 2,18,18,27,18,19,19,19,19,],
        [ 0, 0, 0, 0, 0,18,18,27,18, 0, 0, 0, 0,19, 0,27,18,18,18,18,18,19,19,19,18,18,18,18,18,19,19,18,18,27,19,19,27,18,19,19,18,18,27,19,19, 0, 0, 0,],
        [ 0, 0, 0, 0, 0,18,18,27,18, 0, 0, 0, 0, 0, 0,18, 2,18,18,18,19, 0, 0,19,19,18,18,18,18,19,18,18,18,27,19, 2,27,18,19,19,18,18,19,19,19,19, 0, 0,],
        [ 0, 0, 0, 0, 0,18,18,27,18, 0, 0, 0, 0, 0, 0,18,18,18,18,18, 0,19,19,23,23,23,27,18,18, 0,18,18,18,27, 2,19,27,18,19, 0,18,18, 2, 0,19, 0, 0, 0,],
        [ 0, 0, 0, 0,18,18,18,27,18,18, 0, 0, 0, 0, 0,18,18,18,18,18, 0, 0,19,19,18,18,27,18,18, 0,18, 2,18,27, 0,18,27,18, 0,27,23,23, 0, 0, 0, 0, 0, 0,],
        [ 0, 0, 0, 0,18,18,18,27,18,18,18, 0, 0, 0, 0,18,18,18,18,18, 0, 0, 0,19,19,18,27,18,18, 0,18,27, 2,27, 0,18,27,18, 0,27,18,18, 0, 0, 0, 0, 0, 0,],
        [ 0, 0, 0, 0,18,18,18,27,18,18,18,18, 0, 0, 0,18,18,18,18,18, 0, 0, 0, 0, 0,18,27,18,18, 0,18,27,18,19, 0,18,18,18, 2,27,18,18, 0, 0, 0, 0, 0, 0,],
        [ 0, 0, 0,18, 2,18,18,27,18,18,18,18, 2,18,18,18, 2,18,18,18,18, 0, 0, 0, 0,18,27,18,18, 0,18,27,18, 0, 0,18,18,18,18,27,18,18,18, 0, 0, 0, 0, 0,],
        [ 0, 2,18,18,18,18,18,27,18, 2,18,18,18,18, 2,18,18,18, 2,18, 2, 2, 2, 0, 2,18,27,18,18, 0,18,27,18, 0,18,18, 2,18,18,27,18,18,18,18,18, 0, 0, 0,],
        [ 2,18,18, 2,18, 2,18,27,18,18,18, 0,18,18,18, 3, 1,18, 1,18,18, 1, 1, 0,18,18, 2,18,18,18, 2,27, 2, 0,18,18,18, 2, 2,27,18,18,18,18,18, 0, 0, 0,],
        [ 1, 1,18, 1,18, 1, 3, 1, 3,18, 3, 3, 1,18, 1, 1, 1, 1, 1, 3,18, 1, 1, 3, 1, 1, 1,18, 3,18,18,27,18, 2, 2, 2, 2,18,18, 1, 1, 1, 1, 1,18,18, 0, 0,],
        [ 1,18, 1,18, 1, 1, 1, 1, 1,18,18, 1, 1, 1,18,18, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,18, 3, 1, 3,18, 1, 1,18,18,18,18, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3,],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        ]
    };

  }
});
class Collectable {
  constructor(x,y) {
    this.w=30;
    this.h=30;
    this.x=x-this.w/2;
    this.y=y-this.h/2;
    this.color = 'gainsboro';

    this.color1 = "red";
    this.color2 = "#a00";
    this.color3 = "#fff";
    this.color4 = "#640";
  }
  getHitBox() {
    return this;
  }
  update(dt, frameCount) {
    if(this.game.collidesWithPlayer(this)) {
      this.shouldDelete=true;
      var player = this.game.player;
      SOUNDMAP.pickup.play(player);
      player.game.screenShakeLevel = 0.4;
      player.game.frameStop = 2;
      for(var i=0;i<10;i++) {
        var x = this.x;// + (Math.random()*this.w-this.w/2)/2;
        var y = this.y;// - (Math.random()*this.h)/4;
        var w = 10;
        var h = 10;
        var vx = Math.random()*5-2;
        var vy = Math.random()*5-2-10;
        var color = this.color1;
        // if(i>=num-8) color = "#222";
        // if(i>=num-4) color = "#33d"
        // if(i>=num-2) color = "#fff"; 
        this.game.addEntity(new FallingParticle(x,y,w,h,vx,vy,30,color));
      }
    }
  }
  draw(canvas) {
    // canvas.fillStyle = this.color;
    // canvas.fillRect(this.x,this.y,this.w,this.h);
    canvas.save();
    canvas.translate(this.x+this.w/2,this.y+this.h/2);
    this.drawShape(canvas,this.w,this.h);
    canvas.restore();
  }
  drawShape(canvas,w,h) {
    // canvas.strokeStyle = "#fff";
    // canvas.lineWidth = 7;
    // canvas.strokeRect(-w/2,-h,w,h);    
    // canvas.strokeRect(-w*0.1,-h*1.3,w*0.2,h*0.3);
    
    canvas.fillStyle = this.color1;
    canvas.fillRect(-w/2,-h,w,h);
    canvas.fillStyle = this.color2;
    canvas.fillRect(-w/2,-h,w/2,h);
    canvas.fillStyle= this.color3;
    canvas.fillRect(-w*0.1,-h*0.9,w*0.5,h*0.2);
    canvas.fillStyle = this.color4;
    canvas.fillRect(-w*0.1,-h*1.3,w*0.2,h*0.3);
  }
}addBlock(function() { return {
  //Doink Block
  id: BLOCKS.length,
  name: "DoinkPad",
  hide: true,
  ignoreCollisions: true,
  redraws: false,
  drawer: new DoinkPad(),
  draw: drawEntity,
  onload: function(game, x,y,width,height, world,ii,jj) {
    game.addEntity(new DoinkPad(x + width/2,y + height));
  },
}});
class OptionScene extends Scene{
  constructor(playLevelIntro){
    super(playLevelIntro);
    this.keyMap = {
      '27': {down: this.safeButtonCall(this,this.goToMainMenu)},   //esc
      '32': { down: this.pressButton.bind(this), up: this.unpressButton.bind(this) }, //space
      '13': { down: this.pressButton.bind(this), up: this.unpressButton.bind(this) }, //enter
      '87': { down: this.navigateUI.bind(this,0)},    //W
        '68': { down: this.navigateUI.bind(this,1)},    //D
        '83': { down: this.navigateUI.bind(this,2)},    //S
        '65': { down: this.navigateUI.bind(this,3)},   //A
  
        '38': { down: this.navigateUI.bind(this,0)},  //up
        '39': { down: this.navigateUI.bind(this,1)},  //right
        '40': { down: this.navigateUI.bind(this,2)},   //down
        '37': { down: this.navigateUI.bind(this,3)},   //left


    
    }
    this.background = new InfiniteBackground();
   
    this.camera = {x:0,y:0,dx:0,dy:0};
    this.loadOptionGUI();
    this.FREE = 0;
    this.VOLUME = 1;
    this.state = 0;
  }
  update(dt){
    this.camera.x += 3;
    super.update(dt);
    this.volumeLabel.text = "Volume: "+Math.floor(this.volumeSlider.value*100);
  }
  draw(canvas){
    this.background.drawLayers(canvas, this.camera);
    this.drawAllGUI(canvas);
  }
  changeVolumeBy(toAdd){
    this.volumeSlider.setValue(this.volumeSlider.value+toAdd);
    this.volumeSlider.setValue(Math.round(this.volumeSlider.value*100)/100);
    this.volumeSlider.onRelease();
  }
  loadOptionGUI(){
    var dim = rectDimFromCenter(.5,.5,.2,.1);
    this.volumeSlider = new Slider(dim[0],dim[1],dim[2],dim[3],
      0,undefined,0.03,DESTINATION.gain.value,'white','white','gray','black');
    this.volumeSlider.onRelease = this.playSliderSound.bind(this,this.volumeSlider); 
    this.volumeSlider.onHold = this.setVolume.bind(this,this.volumeSlider);
    this.volumeSlider.selectable = true;
    this.gui.push(this.volumeSlider);

    dim = rectDimFromCenter(0,.4,.25,.1);
    this.volumeLabel = new Label(.4,dim[1],dim[2],dim[3],0,
      this.volumeSlider.value,'35px ' + FONT,'white','left');
    this.gui.push(this.volumeLabel);

    
    switch(touchOn){
      case false:
        dim = rectDimFromCenter(.8,.9,.2,.1);
        var backButton = new GrowthTextButton(dim[0],dim[1],dim[2],dim[3],0,this.goToMainMenu.bind(this),"Main Menu",'30px Noteworthy', 
        'white','transparent','white', 5,.05);
        this.gui.push(backButton);
        this.selectedButton = backButton;
        backButton.selected = true;

        dim = rectDimFromCenter(.5,.82,.2,.1);
        var gamepadBtn = new GrowthTextButton(dim[0],dim[1],dim[2],dim[3],0,() => {
          MAIN.gamepadOn = !MAIN.gamepadOn;
          gamepadBtn.text = "Gamepad " + (MAIN.gamepadOn ? 'On' : 'Off');
        },"Gamepad On",'30px Noteworthy', 
        'white','transparent','white', 5,.05);
        this.gui.push(gamepadBtn);

        dim = rectDimFromCenter(.5,.7,.2,.1);
        var musicBtn = new GrowthTextButton(dim[0],dim[1],dim[2],dim[3],0,() => {
          SOUNDMAP.music.toggle();
          musicBtn.text = "Music " + (SOUNDMAP.music.on ? 'On' : 'Off');
        },"Music On",'30px Noteworthy', 
        'white','transparent','white', 5,.05);
        this.gui.push(musicBtn);
      break;
      case true:
        dim = rectDimFromCenter(.8,.9,.2,.1);
        var backButton = new TextButton(dim[0],dim[1],dim[2],dim[3],0,this.goToMainMenu.bind(this),"Main Menu",'30px Noteworthy', 
        'white','rgba(255,255,255,0.5)','white', 5);
        this.gui.push(backButton);
        this.selectedButton = backButton;
        backButton.selected = true;

        dim = rectDimFromCenter(.5,.82,.2,.1);
        var gamepadBtn = new TextButton(dim[0],dim[1],dim[2],dim[3],0,() => {
          MAIN.gamepadOn = !MAIN.gamepadOn;
          gamepadBtn.text = "Gamepad " + (MAIN.gamepadOn ? 'On' : 'Off');
        },"Gamepad On",'30px Noteworthy', 
        'white','rgba(255,255,255,0.5)','white', 5);
        this.gui.push(gamepadBtn);

        dim = rectDimFromCenter(.5,.7,.2,.1);
        var musicBtn = new TextButton(dim[0],dim[1],dim[2],dim[3],0,() => {
          SOUNDMAP.music.toggle();
          musicBtn.text = "Music " + (SOUNDMAP.music.on ? 'On' : 'Off');
        },"Music On",'30px Noteworthy', 
        'white','rgba(255,255,255,0.5)','white', 5);
        this.gui.push(musicBtn);
      break;
    }
    

    dim = rectDimFromCenter(.5,.15,.4,.2);
    var optionsLabel = new Label(dim[0],dim[1],dim[2],dim[3],0,"Options",'60px ' + FONT,'white','center');
    this.gui.push(optionsLabel);
    
    this.volumeSlider.setNeighbors([undefined,undefined,gamepadBtn,undefined]);
    backButton.setNeighbors([gamepadBtn,undefined,undefined,gamepadBtn]);
    gamepadBtn.setNeighbors([this.volumeSlider,backButton,backButton,undefined]);
    this.buttons = getButtons(this.gui);
  }
  goToMainMenu(){
    this.driver.setScene(new MenuScene(false));
  }
  setVolume(slider){
    setVolume(slider.value);
  }
  playSliderSound(slider){
    SOUNDMAP.bounce.play();
  }
  navigateUI(direction){
    switch(this.state){
      case this.FREE:
        super.navigateUI(direction);
        break;
      case this.VOLUME:
        if(direction == 1)
          this.changeVolumeBy(0.05);
        else if(direction == 2){
          this.selectedButton = this.selectedButton.buttonLinks[2];
          this.selectedButton.selected = true;
          this.volumeSlider.selected = false;
          this.state = this.FREE;
        }
        else if(direction == 3)
          this.changeVolumeBy(-0.05);
        break;
      
    }
    if(this.selectedButton == this.volumeSlider){
      this.state = this.VOLUME;

    }
  }
}changeWorldType(2);
class WorldText{
  constructor(x,y,w,text,font,inactiveColor,activeColor,
    changeDuration,isVisible,textAlign){
    this.x = x;
    this.y = y;
    this.w = w;
    this.text = text;
    this.font = font;
    this.inactiveColor = inactiveColor;
    this.activeColor = activeColor;
    this.changeDuration = changeDuration;
    this.colorTimer = (isVisible) ? this.changeDuration : 0;
    this.visible = isVisible || false;
    this.textAlign = textAlign || "center";
  }
  update(dt){
    if(this.visible){
      this.colorTimer += dt;
      if(this.colorTimer > this.changeDuration)
        this.colorTimer = this.changeDuration;
    } else {
      this.colorTimer -= dt;
      if(this.colorTimer < 0)
        this.colorTimer = 0;
    } 
  }
  setVisible(x){
    this.visible = x;
  }
  appear(){
    this.visible = true;
  }
  disappear(){
    this.visible = false;
  }
  draw(canvas){
    canvas.save();
    var fillColor = colorLerp(this.inactiveColor,this.activeColor,this.colorTimer*1.0/this.changeDuration);
    canvas.globalAlpha = this.colorTimer*1.0/this.changeDuration;
    fillColor[3] = 1;
    canvas.fillStyle = makeColorStr(fillColor);
    canvas.font = this.font;
    canvas.textAlign = this.textAlign;
    canvas.textBaseline='middle';
    var dim = rectDimFromCenter(this.x,this.y,this.w,0);
    switch(this.textAlign){
      case 'left':
        canvas.fillText(this.text,dim[0],dim[1]+dim[3]/2,this.w);  
        break;
      case 'right':
        canvas.fillText(this.text,dim[0]+dim[2],dim[1]+dim[3]/2,this.w);  
        break;
      case 'center':
        canvas.fillText(this.text,dim[0]+dim[2]/2,dim[1]+dim[3]/2,this.w);  
        break;
    }
    canvas.restore();
  }

}addBlock(function() { return {
  //Woof Block
  id: BLOCKS.length,
  name: "Woof",
  hide: true,   
  ignoreCollisions: true,
  redraws: false,
  drawer: new Woof(),
  draw: drawEntity,
  onload: function(game, x,y,width,height, world,ii,jj) {
    game.addEntity(new Woof(x + width/2,y + height));
  },
}});
class LevelIntroScene extends Scene{
  constructor(nextScene, playIntro){
    super(playIntro);
    this.nextScene = nextScene;

    this.player = this.nextScene.player;
    this.originalPlayer = {x:this.player.x,y:this.player.y};
    this.player.x = -50;
    this.player.uncrouch();
    this.player.width = this.player.w;
    this.player.height = this.player.h;
    this.player.y = this.originalPlayer.y;
    this.player.vx = this.player.speed/3;
    this.player.mx = 1;
    this.postMoveDuration = 15;
    this.postMoveTimer = 0;
    this.nextScene.behinds=[];
    this.touchButtonsActive = true;
  }
  update(dt, frameCount){
    super.update(dt);
    this.nextScene.updateTransition(dt);
    this.player.updateEye(dt, frameCount);
    this.player.y = this.originalPlayer.y;
    this.player.vx = this.player.speed/3;
    if(this.player.x < this.originalPlayer.x){
      this.player.x += dt*this.player.vx;
      this.player.angle = -Math.PI/40*this.player.vx/this.player.speed + Math.cos(frameCount*Math.PI/7)*Math.PI/20;
    } else {
      this.player.angle = 0;
      this.player.vx = 0;
      this.player.x = this.originalPlayer.x;
      if(this.postMoveTimer < this.postMoveDuration){
        this.postMoveTimer += dt;
      } else{
        this.loadNextScene();
      }
    }
  }
  draw(canvas){
    super.draw(canvas);
    this.nextScene.draw(canvas);
    drawTransitionOverlay(this.overlayColor, canvas)
  }
  loadNextScene(){
    this.player.angle = 0;
    this.player.vx = 0;
    this.player.x = this.originalPlayer.x;
    this.player.grounded = true;
    this.driver.setScene(this.nextScene);
  }
}addLevel( function(nameSpace) {
  {

    return {
      name: "Spiketops",
      worldType: 2,
      grid: 
      [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,7,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,4,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,3,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,],
        [1,1,1,1,1,1,1,1,1,1,1,3,3,3,3,3,3,3,1,3,3,3,3,3,3,3,3,3,3,3,3,1,1,1,3,3,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        ]
    };

  }
});
class TriggerZone{
  constructor(x,y,w,h,player,onEnter,onStay,onExit,drawDebug){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.drawDebug = drawDebug || false;
    this.player = player;
    this.previousOutputState = 0;
    this.outputState = 0;
    this.onEnter = onEnter;
    this.onStay = onStay;
    this.onExit = onExit;
  }
  update(dt){
    if(pointInRect(this.player.x,
      this.player.y,{x:this.x,y:this.y,w:this.w,h:this.h})){
      this.outputState = 1;
    } else {
      this.outputState = 0;
    }
    if(this.previousOutputState == 0 && this.outputState == 1){
      if(this.onEnter) this.onEnter();
    }
    else if(this.previousOutputState == 1 && this.outputState == 0){
      if(this.onExit) this.onExit();
    }
    else if(this.previousOutputState == 1 && this.outputState == 1){
      if(this.onStay) this.onStay();
    }
    this.previousOutputState = this.outputState;
  }
  draw(canvas){
    if(this.drawDebug){
      canvas.fillStyle = (this.outputState == 1) ? 'rgba(0,255,0,0.4)': 'rgba(255,0,0,.4)';
      canvas.fillRect(this.x,this.y,this.w,this.h);
    }
  }
}addBlock(function() { return {
  name: "ByrdWall",
  solid: true,
  id: BLOCKS.length,
  hide: true,
  //ignoreCollisions: true,
  draw: function(canvas, x,y,w,h, world,i,j) {
    //var w= width;
    //var h=height;
    canvas.fillStyle = 'rgba(50,50,0,.5)';
    canvas.fillRect(x,y,w,h);
  },
  isColliding: function(entity, pos, dx, dy, cellPos) {
    if(entity.isByrd||entity.isPig || entity.isBigSaw) {
      return true;
      //entity.mx = 2*(entity.x < this.x) - 1;
      //entity.mx = 2*(dx<0)-1;
      //entity.game.world.world[cellPos.y/cellPos.h][cellPos.x/cellPos.w] = 1;
      //entity.game.world.forceRedraw();
      //entity.game.world.world[cellPos.y/cellPos.h][cellPos.x/cellPos.w] = this.id;
    }
  },
}});
class LevelCompleteScene extends Scene{
  constructor(prevScene, callback, win){
    super(false);
    this.prevScene = prevScene;
    this.callback = callback;
    this.win = win;
    this.player = prevScene.player;
    this.pig = prevScene.pig;
    this.prevLevelAlpha = 1;
    this.camera = this.prevScene.camera;
    this.entities = [this.player, this.pig];
    this.time = 0;
    this.maxTime = 100;
    this.midPoint = {
      x: (this.player.x+this.pig.x)/2,
      y: (this.player.y+this.pig.y)/2
    };
    this.pig.animationState = 2;
    var player = this.player;
    player.angle = 0;
    player.uncrouch();
    this.r = 20;
    this.update = this.update0;
    prevScene.screenShakeLevel = 0;
    this.keyMap = {
      27: {down: this.startExitTransition.bind(this) },
      78: {down: function() {
        if(this.keys[67] && DEBUG) {
          this.loadNextScene();
        }
      }.bind(this)},
    };
    this.butcher = new Butcher(0,0);
    this.butcher.ghostOn = true;
    this.butcher.state = -1;
    SOUNDMAP.levelComplete.play();
    this.addAllGUI();
    this.touchCount = 0;
  }
  update0(dt,frameCount) {
    super.update(dt,frameCount);
    this.checkTapToSkip();
    if(this.player.grounded||true) {
      this.update = this.update1;
      this.player.ghostOn = true;
      this.pig.ghostOn = true;
      this.time = 0;
      return;
    }
    this.entities.forEach(e => {
      e.update(dt,frameCount)
    });
  }
  update1(dt, frameCount){
    super.update(dt,frameCount);
    this.checkTapToSkip();
    var t = this.time/this.maxTime;
    this.prevLevelAlpha = 1 - t;
    if(this.time>=this.maxTime) {
      this.prevLevelAlpha = 0;
      // this.startExitTransition();
      this.time = 0;
      this.update = this.update2;
      return;
    }
    this.entities.forEach(e => {
      e.vy = 0;
      e.update(dt,frameCount)
    });
    this.time += 1;
    this.midPoint.x += (this.camera.x - this.midPoint.x)*t*t;
    this.midPoint.y += (this.camera.y - this.midPoint.y)*t*t;
    // this.midPoint.x += ;
    var angle = t*t * Math.PI*4 + Math.PI;
    // var rw = 20+t*100 - (2-t*t)*100;
    if(t<.75) this.r += (100-this.r)/10;
    else if(t<.9) this.r += (10-this.r)/10;
    else this.r += (10-this.r)/10;
    var rw = this.r;
    var rh = rw/2;
    this.player.angle = Math.cos(angle)*Math.PI/20;
    this.player.x = this.midPoint.x + Math.cos(angle)*rw;
    this.player.y = this.midPoint.y + Math.sin(angle)*rh;
    angle += Math.PI;
    this.pig.x = this.midPoint.x + Math.cos(angle)*rw;
    this.pig.y = this.midPoint.y + Math.sin(angle)*rh;
    this.player.flipped = this.player.x > this.pig.x;
    this.pig.flipped = !this.player.flipped;
    if(t>.75) {
      this.player.eyeMovement.blink = 7*t*t;          
    }
  }
  update2(dt,frameCount) {
    super.update(dt,frameCount);
    this.checkTapToSkip();
    this.time += 1;
    this.maxTime = 40;
    var t = this.time/this.maxTime;
    this.player.y += Math.sin(t*t*Math.PI*2) *1;
    this.pig.y += Math.sin(t*t*Math.PI*2) *1;
    if(this.time>this.maxTime) {
      if(this.win) {
        return this.startExitTransition();
      }
      this.prevScene.screenShakeLevel = 1; 
      SOUNDMAP.pigrip.play();
      this.player.maxJumps = 1;
      this.player.wallJumps=false;
      this.time = 0;
      this.maxTime = 100;     
      this.update = this.update3;
      this.entities.splice(1,0,this.butcher);
      return;
    }
    this.player.eyeMovement.blink = 7;    
  }
  update3(dt,frameCount) {
    super.update(dt,frameCount);
    this.checkTapToSkip();
    if(!this.prevScene.isFinalInWorld) {
      this.prevScene.musicFadeOnPig();
    }
    this.time += 1;    
    var t = this.time/this.maxTime;
    var player = this.player;
    var pig = this.pig;
    pig.animationState = 0;
    this.prevScene.updateScreenShakeLevel();
    pig.x += (t*t)*20;
    if(this.time >= this.maxTime) {
      this.startExitTransition();
    }
    player.eyeMovement.blink = -2 + 2*t;
    player.angle = t*Math.PI/5-Math.PI/5;
    player.eyeMovement.x = 5*t;
    player.eyeMovement.y = -3;
    // player.updateEye(dt,frameCount);
    pig.angle = t*t*Math.PI*2;
    this.butcher.x = pig.x+40;
    this.butcher.y = pig.y - 20;
    this.butcher.flipped = true;
    this.butcher.mx = -1;
    this.butcher.update(dt,frameCount);
  }
  draw(canvas){
    canvas.save();
    canvas.globalAlpha = this.prevLevelAlpha;
    this.prevScene.draw(canvas);
    canvas.restore();
    this.drawWithCamera(canvas);
    this.drawAllGUI(canvas);
    drawTransitionOverlay(this.overlayColor,canvas);    
  }
  drawWithCamera(canvas) {
    var camera = this.prevScene.camera;
    canvas.save();
    canvas.translate(canvas.width/2,canvas.height/2);  
    canvas.rotate(camera.r);
    canvas.translate(-Math.floor(camera.x), -Math.floor(camera.y));    
    for(var i=0;i<this.entities.length;i+=1) {
      var entity = this.entities[i];
      entity.draw(canvas);
    }
    canvas.restore();
  }
  startExitTransition(){
    this.prevScene.screenShakeLevel = 0;
    this.update = super.update;
    setTimeout(() => {
      this.startTransition(20, 1, this.loadNextScene);
    }, 300)
  }
  loadNextScene() {
    this.player.ghostOn = false;
    this.pig.ghostOn = false;
    this.player.flipped = false;
    this.driver.setScene(this.prevScene);
    this.callback();
  }
  addAllGUI(){
    var bigFont = "60px " + FONT;
    var buttonFont = "30px noteworthy";
    var textColor = 'black';
    var dim = rectDimFromCenter(.96,.95,.05,.08);
    if(this.prevScene.levelDeaths > 0) {
      this.deathCount = new Label(dim[0],dim[1],dim[2],dim[3],0,
        ""+this.prevScene.levelDeaths, bigFont, textColor,'left');
      this.gui.push(this.deathCount);

      dim = rectDimFromCenter(.82,.96,.2,.08);
      this.deathLabel = new Label(dim[0],dim[1],dim[2],dim[3],0,
        "Fails in level:", buttonFont,textColor,'right');
      this.gui.push(this.deathLabel);
    } else {
      dim = rectDimFromCenter(.82,.96,.2,.08);
      this.perfectLabel = new Label(dim[0],dim[1],dim[2],dim[3],0,
        "Perfect Clear!", buttonFont,textColor,'right');
      this.gui.push(this.perfectLabel);
    }
    if(touchOn){
      var entireScreenButton = new TextButton(0,0,1,1,0,
        this.increaseTouchCount.bind(this),"",buttonFont,'transparent','transparent','transparent',0);
      this.gui.push(entireScreenButton);
      
      var dim = rectDimFromCenter(.83,.08,.5,.1);
      this.skipMessage = new Label(dim[0],dim[1],dim[2],dim[3],0,
        "",buttonFont, 'black', 'center');
      this.gui.push(this.skipMessage);
    }
    this.buttons = getButtons(this.gui);

  }
  increaseTouchCount(){
    this.touchCount += 1;
  }
  checkTapToSkip(){
    if(touchOn){
      if(this.touchCount >= 1){
        this.skipMessage.text = "Tap again to skip";
      }
      if(this.touchCount >= 2){
        this.startExitTransition()
      }
    }
  }
}addLevel( function(nameSpace) {
  {

    return {
      name: "Deadly Byrds",
      worldType: 2,
      grid: [
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
[1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,0,0,],
[1,0,0,0,0,0,0,0,0,0,17,0,0,0,0,0,0,0,0,17,0,0,0,0,0,0,0,17,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,],
[1,0,0,0,0,0,0,0,0,0,17,0,0,0,0,0,0,0,0,17,0,0,0,0,14,0,0,17,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,],
[1,0,0,0,0,0,0,0,0,0,17,0,0,14,0,0,0,0,0,17,0,0,14,0,0,0,0,17,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,],
[1,0,0,0,0,0,0,0,0,0,17,0,14,0,0,14,0,17,0,17,14,0,0,0,0,0,0,17,0,0,14,0,0,0,0,14,0,0,0,0,1,0,0,0,],
[1,10,10,10,10,3,10,10,10,3,3,10,10,10,10,10,10,3,3,3,10,10,10,3,3,10,10,10,10,10,3,10,3,10,10,3,3,3,0,0,1,0,0,0,],
[1,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,],
[1,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,1,2,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,],
[1,1,0,15,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,15,0,1,2,2,0,0,0,0,0,0,0,2,1,1,0,0,0,0,1,1,0,0,],
[1,1,1,1,1,0,0,0,0,2,1,1,1,1,0,0,0,0,0,0,1,1,1,1,2,2,0,0,0,0,0,15,0,2,1,1,0,0,0,0,1,1,1,1,],
[0,0,0,0,0,0,0,0,0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,0,22,0,0,2,1,2,1,1,1,0,0,0,0,0,0,0,0,],
[0,4,0,0,0,0,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,1,2,2,2,1,1,1,1,1,0,0,0,0,0,5,0,0,],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
]
    };

  }
});
class Knife {
  constructor(x,y,vx,vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.w = 30;
    this.h = 30;
    this.angle = 0;
    this.killPlayer = true;
    this.da = -Math.PI/20;
    this.bouncable = false;    
    this.flipped = this.vx>0;
  }
  die() {
    this.shouldDelete = true;
  }
  update(dt,frameCount) {
    dt = dt/0.8;
    this.x += this.vx*dt;
    this.y += this.vy*dt;
    this.angle += this.da*dt;
    var world = this.game.world;
    var h = this.getHitBox();
    if(world.rectCollides(h.x, h.y, h.w, h.h, this, 0,0)) {
      // this.die();
      this.killPlayer = false;
      this.vx=0;
      this.vy=0;
      this.da = 0;
      setTimeout(() => this.die(), 1000);
    }
    if(this.game.collidesWithPlayer(this)) {
      this.onCollision(this.game.player);
    }
  }
  onCollision(player) {
    if(this.bouncable&&(player.y<this.y||player.vy>0)) {
      this.die();
      player.bounceOffEntity(this);
      // player.vy = -10;
    } else {
      this.game.player.getHitByEntity(this);
    }
  }
  draw(canvas) {
    canvas.save();
    canvas.translate(this.x,this.y);
    // canvas.fillStyle = 'red';
    // canvas.fillRect(-this.w/2,-this.h/2,this.w,this.h);
    if(this.flipped)canvas.scale(-1,1);
    canvas.rotate(this.angle);
    this.drawKnife(canvas, this.w,this.h);
    canvas.restore();
  }
  getHitBox() {
    return {
      x: this.x - this.w/2,
      y: this.y - this.h/2,
      w: this.w,
      h: this.h,
    };
  }
  drawKnife(canvas,w,h) {
    var bladew = 18;
    var bladeh = 23;
    var handlew = 5;
    var handleh = 10;
    var holer = 3;
    canvas.strokeStyle = "#000";
    canvas.lineWidth = 7;
    canvas.save();
    canvas.translate(w/8,h/8);
    // if(this.vx>0)
    // canvas.scale(-1,1);
    // canvas.rotate(-Math.PI/5);
    canvas.lineWidth = 3;    
    canvas.beginPath();
    canvas.fillStyle = "#a33";
    canvas.rect(-handlew, 0, handlew, handleh);
    canvas.stroke();
    canvas.fill();
    canvas.fillStyle = "#822";
    canvas.fillRect(-handlew, 0, handlew/2, handleh);    
    canvas.fillStyle = "#eee";
    canvas.beginPath();
    canvas.rect(-bladew,-bladeh,bladew,bladeh);
    canvas.stroke();    
    canvas.fill();
    canvas.fillStyle="#fff";
    canvas.fillRect(-bladew,-bladeh,bladew/4,bladeh);
    canvas.beginPath();
    canvas.fillStyle="#000";
    canvas.arc(-holer*1.5, -bladeh+holer*1.5, holer, 0, Math.PI*2);
    canvas.fill();
    canvas.restore();
  }
}addBlock(function() { return {
    name: "treeTrunk",
    solid: false,
    groundBlock: false,
    ignoreCollisions: true,
    id: BLOCKS.length,
    trunk: true,
    draw: function(canvas, x,y,w,h, world,i,j) {
      //h*=.5;
      // var color1 = "#754";
      // var color2 = "#532";
      // var color1 = "#6a5545";
      // var color2 = "#4a3525";
      var color1 = "#4a3525";
      var color2 = "#3a2515";
      // color1 = "#555";
      // color2 = "#777";
      // color3 = "#000";
      canvas.fillStyle=color1;
      canvas.fillRect(x,y,w,h);
      canvas.strokeStyle="#000";
      var s = Math.max(w,h);
      // canvas.strokeRect(x,y,w,h);
      canvas.fillStyle=color2;
      canvas.fillRect(x+w/2,y,w/2,h);
      var ww = s/3;
      var hh = ww;
      var spacing = 10;
      
      for(var ii=0;ii<3;ii++) {
          var r1 = psuedoRandom(x,y,ii,1);
          var r2 = psuedoRandom(x,y,ii,2);
          var xx = Math.floor(r1*(w-ww)/spacing) * spacing;
          var yy = Math.floor(r2*(h-hh)/spacing) * spacing;
          canvas.fillRect(xx+x,yy+y,ww,hh);
      }
      return;
      if(!world)
        return;
      if(!world.getCell(i,j-1).trunk&&world.getCell(i,j-1).id!=this.id+1) {
        canvas.strokeRect(x,y,w,0);
       }
      if(!world.getCell(i,j+1).trunk&&world.getCell(i,j+1).id!=this.id+1) {
        canvas.strokeRect(x,y+h,w,0);
      }
      if(!world.getCell(i+1,j).trunk&&!(world.getCell(i+1,j).id==this.id+1&&world.getCell(i,j+1).id!=this.id)) {
        canvas.strokeRect(x+w,y,0,h);
      }
      if(!world.getCell(i-1,j).trunk&&!(world.getCell(i-1,j).id==this.id+1&&world.getCell(i,j+1).id!=this.id)) {
        canvas.strokeRect(x,y,0,h);
      }
    },
    isColliding: function(entity, pos, dx, dy, cellPos) {
      if(dy>0&&entity.y<=cellPos.y) {
        return true;
      }
      return false;
    },
}});
class PostWinScene extends Scene{
  constructor(prevScene) {
    super();
    this.prevScene = prevScene;
    this.keyMap = {
      '32': { down: this.pressButton.bind(this), up: this.unpressButton.bind(this) }, //space
      '13': { down: this.pressButton.bind(this), up: this.unpressButton.bind(this) }, //enter

      '87': { down: this.navigateUI.bind(this,0)},    //W
      '65': { down: this.navigateUI.bind(this,1)},   //D
      '83': { down: this.navigateUI.bind(this,2)},    //S
      '68': { down: this.navigateUI.bind(this,3)},    //A
      '38': { down: this.navigateUI.bind(this,0)},  //up
      '39': { down: this.navigateUI.bind(this,1)},  //right
      '40': { down: this.navigateUI.bind(this,2)},   //down
      '37': { down: this.navigateUI.bind(this,3)},   //left
    }
    this.allowUIInput = true;
    this.selectedButton = undefined;
    this.addAllGUI();
  }
  update(dt){
    super.update(dt);
  }
  draw(canvas){
    this.prevScene.draw(canvas);
    canvas.fillStyle="rgba(255,255,255,.7)"
    canvas.fillRect(0,0,canvas.width,canvas.height);
    this.deathCount.text = ""+this.prevScene.totalDeaths;
    this.drawAllGUI(canvas);
    if(this.debug)
      drawGrid(canvas);
    drawTransitionOverlay(this.overlayColor,canvas);
  }
  addAllGUI(){
    var bigFont = "60px " + FONT;
    var buttonFont = "30px noteworthy";
    var textColor = 'black';
    var buttonGap = 0.085;

    var dim = rectDimFromCenter(.5,.4,.2,.08);
    var winLabel = new Label(dim[0],dim[1],dim[2],dim[3],0,
      "You Win!",bigFont,textColor,'center');
    this.gui.push(winLabel);

    dim = rectDimFromCenter(.5,.55,.05,.08);
    this.deathCount = new Label(dim[0],dim[1],dim[2],dim[3],0,
      "X", bigFont, textColor,'center');
    this.gui.push(this.deathCount);

    dim = rectDimFromCenter(.48,.56,.3,.08);
    var deathLabel = new Label(dim[0],dim[1],dim[2],dim[3],0,
      "You died          times", buttonFont,textColor,'center');
    this.gui.push(deathLabel);


    dim = rectDimFromCenter(0.5,0.7,.15,.08);
    var mainMenuButton = new GrowthTextButton(dim[0],dim[1],dim[2],dim[3],0,
      this.goToMainMenu.bind(this),"Main Menu",buttonFont,textColor,'transparent',textColor,5,.08);
    this.gui.push(mainMenuButton);

    this.selectedButton = mainMenuButton;
    this.selectedButton.selected = true;

    this.buttons = getButtons(this.gui);
  }
  goToMainMenu(){
    this.allowUIInput = false;
    this.startTransition(25,1,sceneTransition(this,MenuScene,true));
  }
}addLevel( function(nameSpace) {
  {

    return {
      name: "Saws",
      worldType: 2,
      grid:   [
  [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,27, 2, 2, 2, 2, 1,],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9, 9, 9,27,27,27,27,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,30, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
  [ 0, 0,30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,30, 1,],
  [ 0, 9, 9, 9,23, 9, 9, 9, 9,23, 9, 9, 9,23, 9, 9, 9,23, 9, 9, 9,23, 9, 9,23, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 1,],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,29, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
  [ 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0,30, 0, 2, 0, 0, 0, 0, 0, 0,30, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 1,],
  [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
  [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
  [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
  ]
    };

  }
});class ButcherTurret extends Butcher{
  constructor(x,y) {
    super(x,y);
    this.shootSpeed = 60;
    this.shootTimer = 0;
    this.projectileSpeed = 6;
    this.restrictDirection = false;
    // this.butcher = new Butcher(x,y+30);
    this.inRange = false;
    this.range = 300;
    this.targetX = x;
    this.targetY = y;
    this.butcher = this;
    this.speed = 9;
    this.moveTimer = 0;
    this.min = null;
    this.wielding = true;
  }
  update(dt,frameCount) {
    dt = dt/0.8;
    if(this.shootTimer>-20&&this.shootTimer<30) {
      var mx = this.targetX-this.x;
      var my = this.targetY-this.y;
      this.x += mx /10*dt;
      this.y += my /10*dt;
      // this.x = linearMove(this.x,this.targetX,this.speed);
      // this.y = linearMove(this.y,this.targetY,this.speed);
      
      if(Math.abs(mx) + Math.abs(my) > 30) {
        if(this.shootTimer<0)this.shootTimer+=dt;
        return;
      }
    }
    var player = this.game.player;
    var dx = player.x - this.x;
    var dy = player.y - this.y - player.h/2;
    // if(this.shootTimer<20) 
    {
      this.dx = dx;
      this.dy = dy;
    }
    if(this.shootTimer>=0) {
    this.butcher.flipped = dx<0;
    }
    
    var r = Math.sqrt(dx*dx+dy*dy);
    if(this.restrictDirection) {
      if(Math.abs(dx)>Math.abs(dy)) dy = 0; else dx = 0;
      this.angle = Math.atan2(dy,dx);
    }
    // if(r<this.range) {
    //   this.inRange=true;
    // }
    // if(!this.inRange)return;
    this.shootTimer += dt;
    if(this.shootTimer>this.shootSpeed) {
      if(r>200||dy>-30) {
        this.shootTimer=0;
        this.shoot();
      } else {
        this.shootTimer = this.shootSpeed;
      }
      // if(r>this.range) {
      //   this.inRange=false;
      // }
    }
    var t = this.shootTimer/this.shootSpeed;
    t = t<.5 ? 2*t*t : -1+(4-2*t)*t;
    // t=t*2;
    // if(t>1)t=1;
    this.butcher.knifeAngle = 0 + t*Math.PI/2;
    this.butcher.angle = 0-Math.PI/20*t;
    if(this.shootTimer>=0 && this.game.collidesWithPlayer(this)) {
      var player = this.game.player;
      if(player.vy>0&&player.y<this.y) {
        this.shootTimer = -100;
        player.bounceOffEntity(this);
      }
    }
  }
  processPoint(point) {
    var x = point.x;
    var y = point.y;
    var player = this.game.player;
    var dx = player.x - x;
    var dy = player.y - y - player.h/2;
    var r = Math.sqrt(dx*dx+dy*dy);
    point.r = r;
    if(!this.min || r < this.min.r-30) {
      this.setTarget(x,y);
      this.min = point;
    }
  }
  setTarget(x,y) {
    y=y+30;
    this.targetX = x;
    this.targetY = y;
  }
  draw(canvas) {
    var t = this.shootTimer/this.shootSpeed;
    var s = 10+t*10;    
    // canvas.fillStyle = 'rgba(255,0,0,'+t+')';
    // canvas.fillRect(this.x-s,this.y-s,s*2,s*2);
    // this.butcher.draw(canvas);
    super.draw(canvas);
  }
  shoot() {
    SOUNDMAP.throw.play();
    var player = this.game.player;
    // var dx = player.x - this.x;
    // var dy = player.y - this.y - player.h/2 + this.h/2;
    var dx = this.dx;
    var dy = this.dy;
    if(this.restrictDirection) {
      if(Math.abs(dx)>Math.abs(dy)) dy = 0; else dx = 0;
      var r= Math.abs(dx+dy);
    } else {
      var r = Math.sqrt(dx*dx+dy*dy);
    }
    var speed = this.projectileSpeed
    var vx = dx/r*speed;
    var vy = dy/r*speed;
    var knife = new Knife(this.x,this.y-this.h/2, vx, vy);
    this.game.addEntity(knife);
  }
}addBlock(function() { return {
    name: "treeLeaves",
    solid: false,
    groundBlock: false,
    ignoreCollisions: true,
    leaves: true,
    id: BLOCKS.length,
    draw: function(canvas, x,y,w,h, world,i,j) {
      //h*=.5;
      var color1 = "#292";
      var color2 = "#181";
      var color3 = "#532";
      var color4 = "#754";
      

      var s = Math.max(w,h);
      var ww = s/3;
      var hh = ww;
      var spacing = 3;
      // canvas.strokeRect(x,y,w,h);
      canvas.fillStyle=color2;

      //var edge = false;

      var we = w;
      var he = h;
      var xe = x;
      var ye = y;
      if(!world)
        return;
      if(!world.getCell(i,j-1).leaves&&!world.getCell(i,j-1).trunk) {
        he /= 2;
        ye += he;
      }
      if(!world.getCell(i,j+1).leaves) {
        he /= 2;
      } 
      if(!world.getCell(i-1,j).leaves&&!world.getCell(i-1,j).trunk) {
        we /= 2;
        xe += we;
      }
      if(!world.getCell(i+1,j).leaves&&!world.getCell(i+1,j).trunk) {
        we /= 2;
      }

      canvas.fillRect(xe,ye,we,he);
      if (world.getCell(i,j+1).name == "treeTrunk")
      {
        //console.log("help");

        world.getCell(i,j+1).draw(canvas,x,y+h-he,w,he, world,i,j);
        /*canvas.fillStyle=color3;
        canvas.fillRect(x,y+h-he,w,he);


        canvas.fillStyle=color4;
        for(var ii=0;ii<3;ii++) {
            var r1 = psuedoRandom(x,y,ii,1);
            var r2 = psuedoRandom(x,y,ii,2);
            var xx = Math.floor(r1*(w-ww)/spacing) * spacing;
            var yy = Math.floor(r2*(h-hh)/spacing) * spacing;
            canvas.fillRect(xx+x,yy+y+h-he,ww,hh);
        }


        canvas.strokeStyle="#000";
        if(world.getCell(i+1,j+1).trunk) {
          canvas.strokeRect(x+w,y+h-he,0,he);
        }
        if(world.getCell(i-1,j+1).trunk) {
          canvas.strokeRect(x,y+h-he,0,he);
        } 
        */
      }

            
      canvas.fillStyle=color1;
      for(var ii=0;ii<10;ii++) {
          var r1 = psuedoRandom(x,y,ii,1);
          var r2 = psuedoRandom(x,y,ii,2);
          var xx = Math.floor(r1*(w-ww)/spacing) * spacing;
          var yy = Math.floor(r2*(h-hh)/spacing) * spacing;
          canvas.fillRect(xx+x,yy+y,ww,hh);
      }

    },
    isColliding: function(entity, pos, dx, dy, cellPos) {
      if(dy>0&&entity.y<=cellPos.y) {
        return true;
      }
      return false;
    },
}});
addLevel( function(nameSpace) {
  {

    return {
      name: "The Woof of Saw Street",
      worldType: 2,
      grid:   
     [
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0,18, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27,27,23,27,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27, 0, 0, 0,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,],
[ 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9, 9, 9,27,27,27,27,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,],
[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 1, 9,16, 1, 0,],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 1, 0,],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 1, 0,],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,],
[ 0, 0,30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,30, 1, 0,],
[ 9, 9, 9, 9,23, 9, 9, 9, 9,23, 9, 9, 9,23, 9, 1, 0, 0, 0, 0, 0, 1, 9, 9, 9, 9,23, 9, 9, 9, 9, 9, 9, 9, 9, 9,23, 9, 9, 9, 9, 9, 9,23, 9, 9, 9, 1, 0,],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,],
]
    };

  }
});addBlock(function() { return {
  id: BLOCKS.length,
  name: "Pig",
  hide: true,   
  ignoreCollisions: true,
  redraws: false,
  drawer: new PigBeginning(),
  draw: drawEntity,
  onload: function(game, x,y,width,height, world,ii,jj) {
    game.pig = new PigBeginning(x + width/2,y + height);
    game.addEntity(game.pig);
  },
}});class ButcherTurretPoint {
  constructor(x,y) {
    this.x=x;
    this.y=y;
    this.w = 20;
    this.h=20;
    this.update = this.update1;
    this.range = 300;
  }
  update1() {
    var butcher = this.game.butcher;
    if(!butcher) {
      butcher = new ButcherTurret(this.x,this.y);
      this.game.addEntity(butcher);
      this.game.butcher= butcher;
    }
    this.butcher = butcher;
    this.update=this.update2;
  }
  update2(dt,frameCount) {
    return this.butcher.processPoint(this);
    var player = this.game.player;
    var dx = player.x - this.x;
    var dy = player.y - this.y - player.h/2;
    var r = Math.sqrt(dx*dx+dy*dy);
    if(r<this.range) {
      this.inRange=true;
      this.butcher.setTarget(this.x,this.y);
    }
    // if(!this.inRange)return;
    // if(this.shootTimer>this.shootSpeed) {
    //   this.shootTimer=0;
    //   this.shoot();
    //   if(r>this.range) {
    //     this.inRange=false;
    //   }
    // }
    // var t = this.shootTimer/this.shootSpeed;
    // t = t<.5 ? 2*t*t : -1+(4-2*t)*t;
    // // t=t*2;
    // // if(t>1)t=1;
    // this.butcher.knifeAngle = 0 + t*Math.PI/2;
    // this.butcher.angle = 0-Math.PI/20*t;
  }
  draw(canvas) {
    canvas.fillStyle = '#000';
    canvas.fillRect(this.x-this.w/2,this.y-this.h/2,this.w,this.h);
  }
}addLevel( function(nameSpace) {
  {
    
    return {
      name: "Double Jump and Wall Jump",
      worldType: 2,
      grid: [
        [1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,],
        [1,0,0,0,0,8,0,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,],
        [1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,],
        [1,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,],
        [1,0,0,0,1,2,2,2,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,],
        [1,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,],
        [1,0,0,0,0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,1,0,0,1,],
        [1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,2,1,1,0,0,1,],
        [1,0,0,2,2,1,2,0,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,2,1,1,0,0,1,],
        [1,0,0,2,2,1,2,0,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,2,1,1,0,0,1,],
        [1,7,0,2,2,1,2,0,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,2,0,0,0,0,8,0,0,0,0,2,1,1,0,0,1,],
        [1,0,0,0,2,1,2,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,2,1,1,0,0,0,],
        [0,0,0,0,2,1,2,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,2,1,1,0,0,0,],
        [0,4,0,0,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,2,1,1,0,5,0,],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,3,3,3,3,3,3,3,3,1,1,1,1,1,],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        ]
  };
    
  }
});
addBlock(function() { return {
    name: "treeApple",
    solid: false,
    groundBlock: false,
    ignoreCollisions: true,
    leaves: true,
    id: BLOCKS.length,
    draw: function(canvas, x,y,w,h, world,i,j) {
      CELLMAP[19].draw(canvas,x,y, w, h, world, i,j);
      canvas.fillStyle = "#640";
      var dw = w*.44;
      var dh = h*.6;
      canvas.fillRect(x+dw,y+dh,w-dw*2,h-dh);
    },
    isColliding: function(entity, pos, dx, dy, cellPos) {
      if(dy>0&&entity.y<=cellPos.y) {
        return true;
      }
      return false;
    },
    onload: function(game, x,y,width,height, world,ii,jj) {
      // world.getCell(ii,jj).id = 19;
      game.addEntity(new Apple(x + width/2,y + height*1.5));
  },
}});
class KnifeTurret {
  constructor(x,y) {
    this.x=x;
    this.y=y;
    this.shootSpeed = 50;
    this.shootTimer = this.shootSpeed;
    this.projectileSpeed = 6;
    this.restrictDirection = false;
    this.butcher = new ButcherTurret(x,y+30);
    this.dx = 1;
    this.dy = 0;
  }
  update(dt,frameCount) {
    var player = this.game.player;
    var dx = player.x - this.x;
    var dy = player.y - this.y - player.h/2;
    var r = Math.sqrt(dx*dx+dy*dy);
    if(this.shootTimer > this.shootSpeed/10 && this.shootTimer < this.shootSpeed/5) {      
      this.butcher.flipped = dx<0;
      if(this.restrictDirection) {
        if(Math.abs(dx)>Math.abs(dy)) dy = 0; else dx = 0;
        this.angle = Math.atan2(dy,dx);
      }
      this.dx = dx/r;
      this.dy=dy/r;
    }
    if(r>700) {
      this.shootTimer = this.shootSpeed;
      // this.shootTimer = 0;
      return;
    }
    this.shootTimer += 1;
    if(this.shootTimer>this.shootSpeed) {
      this.shootTimer=0;
      this.shoot();
    }
    var t = this.shootTimer/this.shootSpeed;
    t = t<.5 ? 2*t*t : -1+(4-2*t)*t;
    // t=t*2;
    // if(t>1)t=1;
    this.butcher.knifeAngle = 0 + t*Math.PI/2;
    this.butcher.angle = 0-Math.PI/10*t;
    if(this.butcher.flipped)this.butcher.angle *= -1;
    // if(this.shootTimer>=0 && this.game.collidesWithPlayer(this)) {
    //   var player = this.game.player;
    //   if(player.vy>0&&player.y<this.y) {
    //     this.shootTimer = -100;
    //     player.bounceOffEntity(this);
    //   }
    // }
  }
  draw(canvas) {
    var t = this.shootTimer/this.shootSpeed;
    // var s = 10+t*10;    
    // canvas.fillStyle = 'rgba(255,0,0,'+t+')';
    // canvas.fillRect(this.x-s,this.y-s,s*2,s*2);
    // canvas.save();
    // canvas.translate(this.x,this.y);
    // canvas.rotate(this.angle);
    // var h = s/2;
    // canvas.fillRect(-s/2,-h,s*2,h*2);
    // canvas.restore();
    this.butcher.draw(canvas);
  }
  shoot() {
    SOUNDMAP.throw.play();
    
    var player = this.game.player;
    var speed = this.projectileSpeed
    var vx = this.dx*speed;
    var vy = this.dy*speed;
    var knife = new Knife(this.x,this.y, vx, vy);
    this.game.addEntity(knife);
  }
}addLevel( function(nameSpace) {
  {

    return {
      name: "Final Battle",
      worldType: 2,
      song: 0,
      grid: 
      [
        [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9, 9, 9,27,27,27,27,27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,16, 9, 1,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,30, 0, 0, 0, 0, 0, 0, 9, 9, 1,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
        [ 0, 0,30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
        [ 9, 9, 9, 9, 9,23, 9, 9, 9, 9, 9,23, 9, 9, 9, 9, 9,23, 9, 9, 9, 9, 9,23, 9, 9, 9, 9, 9,23, 9, 9, 9, 9, 9,23, 9, 9, 9, 9, 9,23, 9, 9, 9, 9,23, 1,],
        [ 0, 0, 0, 0, 0,19, 0, 0, 0, 0, 0,19, 0, 0, 0, 0, 0,19, 0, 0, 0, 0, 0,19, 0, 0, 0, 0, 0,19, 0, 0, 0, 0, 0,19, 0, 0, 0, 0, 0,19, 0, 0, 0, 0,19, 1,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,19, 0, 0, 0, 0, 0,19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,19, 0, 0, 0, 0, 0, 1,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,29, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,29, 0, 0, 0, 0, 0, 0, 0, 0, 0,29, 0, 0, 0, 0, 0, 0, 0, 0,29, 0, 0, 0, 0, 0, 0, 1,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,],
        [ 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0,30, 0, 2, 0, 0, 0, 0, 0, 0,30, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0,15, 0, 0, 0, 1,],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        ]
    };

  }
});
addBlock(function() { return {
  //Byrd Block
  id: BLOCKS.length,
  name: "collectable",
  hide: true,   
  ignoreCollisions: true,
  draw: function(canvas, x,y,width,height, world,ii,jj) {
    canvas.fillStyle = 'rgba(50,0,50,.5)';
    canvas.fillRect(x,y,width,height);
  },
  onload: function(game, x,y,width,height, world,ii,jj) {
    game.addEntity(new Collectable(x + width/2,y + height/2));
  },
}});
class MovingWorldText extends WorldText{
  constructor(x,y,w,dx,dy,text,font,inactiveColor,activeColor,
    changeDuration,initialDelay,isVisible){
    super(x,y,w,text,font,inactiveColor,activeColor,changeDuration,isVisible);
    this.dx = dx;
    this.dy = dy;
    this.initialDelay = initialDelay;
    this.lifeTime = this.initialDelay + changeDuration;
  }
  update(dt){
    this.lifeTime -= dt;
    if(this.lifeTime <0){
      this.die();
    }
    this.x += this.dx*dt;
    this.y += this.dy*dt;
    if(this.initialDelay > 0){
      this.initialDelay -= dt;
      return;
    } 
    this.disappear();
    super.update(dt);

  }
  draw(canvas){
    super.draw(canvas);
  }
  die(){
    this.shouldDelete = true;
  }
}addBlock(function() { return {
  name: "Platform",
  solid: true,
  groundBlock: false,
  trunk: true,
  platform: true,
  safe: true,
  id: BLOCKS.length,
  draw: function(canvas, x,y,w,h, world,i,j) {
    CELLMAP[18].draw(canvas,x,y+h/2, w, h/2, world, i,j);  
    CELLMAP[9].draw(canvas,x,y, w, h, world, i,j);
  },
  isColliding: function(entity, pos, dx, dy, cellPos) {
    if(entity.apple)
      return false;
    if(dy>0&&entity.y<=cellPos.y) {
      return true;
    }
    return false;
  },
}});
class SleepText extends MovingWorldText{
  constructor(x,y,w,dx,dy,text,fontSize,fontType,inactiveColor,activeColor,
    changeDuration,initialDelay,isVisible){
    super(x,y,w,dx,dy,text,""+fontSize + "px " + fontType,inactiveColor,activeColor,changeDuration,initialDelay,isVisible);
    this.fontSize = fontSize;
    this.fontType = fontType;
    this.fontTimer = this.changeDuration;
  }
  update(dt){

    super.update(dt);
    if(this.initialDelay > 0)
      return;
    this.fontTimer -= dt;
  }
  draw(canvas){
    canvas.save();
    canvas.textAlign = 'center';
    var fillColor = colorLerp(this.inactiveColor,this.activeColor,this.colorTimer*1.0/this.changeDuration);
    canvas.globalAlpha = this.colorTimer*1.0/this.changeDuration;
    fillColor[3] = 1;
    canvas.fillStyle = makeColorStr(fillColor);
    var size = constrain((this.fontTimer*1.0/this.changeDuration)*this.fontSize,0,this.fontSize);
    canvas.font = ""+size + "px " + this.fontType;
    canvas.fillText(this.text,this.x,this.y,this.w);
    canvas.restore();
  }
}addBlock(function() { return {
  name: "PigFear",
  solid: true,
  id: BLOCKS.length,
  hide: true,
  //ignoreCollisions: true,
  draw: function(canvas, x,y,w,h, world,i,j) {
    //var w= width;
    //var h=height;
    canvas.fillStyle = 'rgba(50,50,0,.5)';
    canvas.fillRect(x,y,w,h);
  },
  isColliding: function(entity, pos, dx, dy, cellPos) {
    if(entity.isPig) {
      entity.state = entity.toTwo();
      return false;
    }
  },
}});
class KingByrd extends Byrd{
  constructor(x,y) {
    super(x,y);
    this.shootSpeed = 50;
    this.shootTimer = 0;
    this.projectileSpeed = 6;
    this.restrictDirection = false;
    //this.kingByrd = new Byrd(x,y+30);
    this.inRange = false;
    this.range = 300;
    this.targetX = x;
    this.targetY = y;
    this.kingByrd = this;
  }
  update(dt,frameCount) {
    this.speed = this.game.player.speed;
    if(this.shootTimer>-5) {
      // this.x += (this.targetX - this.x) /20;
      // this.y += (this.targetY - this.y) /20;
      this.x = linearMove(this.x,this.targetX,this.speed);
      this.y = linearMove(this.y,this.targetY,this.speed);
    }
    var player = this.game.player;
    var dx = player.x - this.x;
    var dy = player.y - this.y - player.h/2;
    if(this.shootTimer>=0) {
    this.kingByrd.flipped = dx<0;
    }
    
    var r = Math.sqrt(dx*dx+dy*dy);
    if(this.restrictDirection) {
      if(Math.abs(dx)>Math.abs(dy)) dy = 0; else dx = 0;
      this.angle = Math.atan2(dy,dx);
    }
    // if(r<this.range) {
    //   this.inRange=true;
    // }
    // if(!this.inRange)return;
    this.shootTimer += 1;
    if(this.shootTimer>this.shootSpeed) {
      this.shootTimer=0;
      this.shoot();
      // if(r>this.range) {
      //   this.inRange=false;
      // }
    }
    var t = this.shootTimer/this.shootSpeed;
    t = t<.5 ? 2*t*t : -1+(4-2*t)*t;
    // t=t*2;
    // if(t>1)t=1;
   // this.butcher.knifeAngle = 0 + t*Math.PI/2;
    //this.butcher.angle = 0-Math.PI/20*t;
    if(this.shootTimer>=0 && this.game.collidesWithPlayer(this)) {
      var player = this.game.player;
      if(player.vy>0&&player.y<this.y) {
        //this.shootTimer = -100;
        player.bounceOffEntity(this);
      }
    }
  }
  draw(canvas) {
    var t = this.shootTimer/this.shootSpeed;
    var s = 10+t*10;    
    // canvas.fillStyle = 'rgba(255,0,0,'+t+')';
    // canvas.fillRect(this.x-s,this.y-s,s*2,s*2);
    // this.butcher.draw(canvas);
    super.draw(canvas);
  }
  shoot() {
    /*
    var player = this.game.player;
    var dx = player.x - this.x;
    var dy = player.y - this.y - player.h/2 + this.h/2;
    if(this.restrictDirection) {
      if(Math.abs(dx)>Math.abs(dy)) dy = 0; else dx = 0;
      var r= Math.abs(dx+dy);
    } else {
      var r = Math.sqrt(dx*dx+dy*dy);
    }
    var speed = this.projectileSpeed
    var vx = dx/r*speed;
    var vy = dy/r*speed;
    var knife = new Knife(this.x,this.y-this.h/2, vx, vy);
    this.game.addEntity(knife);
    */
  }
}addBlock(function() { return {
  name: "PigEnd",
  solid: true,
  id: BLOCKS.length,
  hide: true,
  //ignoreCollisions: true,
  draw: function(canvas, x,y,w,h, world,i,j) {
    //var w= width;
    //var h=height;
    canvas.fillStyle = 'rgba(50,50,0,.5)';
    canvas.fillRect(x,y,w,h);
  },
  isColliding: function(entity, pos, dx, dy, cellPos) {
    if(entity.isPig) {
      entity.animationState = 1;
      entity.game.driver.setScene(new IntroScene());
      return false;
    }
  },
}});
class KingByrdPoint {
  constructor(x,y) {
    this.x=x;
    this.y=y;
    this.w = 20;
    this.h=20;
    this.update = this.update1;
    this.range = 200;
  }
  update1() {
    var kingByrd = this.game.kingByrd;
    if(!kingByrd) {
      kingByrd = new KingByrd(this.x,this.y);
      this.game.addEntity(kingByrd);
      this.game.kingByrd= kingByrd;
    }
    this.kingByrd = kingByrd;
    this.update=this.update2;
  }
  update2(dt,frameCount) {
    var kingByrd = this.game.kingByrd;
    if(!kingByrd) {
      kingByrd = new KingByrd(this.x,this.y);
      this.game.addEntity(kingByrd);
      this.game.kingByrd= kingByrd;
    }
    this.kingByrd = kingByrd;
    var player = this.game.player;
    var dx = player.x - this.x;
    var dy = player.y - this.y - player.h/2;
    var r = Math.sqrt(dx*dx+dy*dy);
    if(r<this.range) {
      this.inRange=true;
      this.kingByrd.targetX = this.x;
      this.kingByrd.targetY = this.y+30;
    }
    // if(!this.inRange)return;
    // if(this.shootTimer>this.shootSpeed) {
    //   this.shootTimer=0;
    //   this.shoot();
    //   if(r>this.range) {
    //     this.inRange=false;
    //   }
    // }
    // var t = this.shootTimer/this.shootSpeed;
    // t = t<.5 ? 2*t*t : -1+(4-2*t)*t;
    // // t=t*2;
    // // if(t>1)t=1;
    // this.butcher.knifeAngle = 0 + t*Math.PI/2;
    // this.butcher.angle = 0-Math.PI/20*t;
  }
  draw(canvas) {
    canvas.fillStyle = '#000';
    canvas.fillRect(this.x-this.w/2,this.y-this.h/2,this.w,this.h);
  }
}addBlock(function() { return {
  //Enemy Block
  id: BLOCKS.length,
  name: "KnifeTurret",
  hide: true,   
  ignoreCollisions: true,
  drawer: new KnifeTurret(),
  draw: drawEntity,
  onload: function(game, x,y,width,height, world,ii,jj) {
    game.addEntity(new KnifeTurret(x + width/2,y + height/2));
  },
}});
class BigSaw extends Mover{
  constructor(x,y){
    super(x,y);
    //BigSaw reverses directions when it detects a solid block or specified non-solid blocks
    this.nonSolidCollisions = ["Byrd"]
    this.w = 70;
    this.h = 70;
    this.rotAngle = 0;
    this.rotSpeed = .25;
    this.mx = 1;
    this.killPlayer = true;
    this.grav = 0;
    this.speed = 6;
    this.isBigSaw = true;
  }   
  getHitByEntity(player) {
  }
  update(dt,frameCount){
    this.rotAngle = (frameCount*this.rotSpeed)%(Math.PI*2);
    if(this.wallcolliding == true) {
			this.mx = this.mx*-1;
		}
		super.update(dt, frameCount);       
		var enemyBox = this.getHitBox();	// Perforamnce effeciency issue
		var playerBox = this.game.player.getHitBox();
		if(rectangleCollision(enemyBox, playerBox) == true) {
      this.game.player.getHitByEntity(this);
		} 
  }

  draw(canvas){
    
    var w = this.w;
    var h = this.h;
    canvas.save();
    canvas.translate(this.x,this.y);
    canvas.rotate(this.rotAngle);
    canvas.lineWidth = 2;
    w=w*.9;
    h=h*.9;
    
    canvas.fillStyle="white";
    canvas.strokeStyle = "#000";
    for(var i=0;i<3;i++){
    canvas.rotate(Math.PI/8);
    canvas.fillRect(-w/2,-h/2,w,h);           
    canvas.strokeRect(-w/2,-h/2,w,h);
    }
    w=w*.8;
    h=h*.8;
    canvas.rotate(-3*Math.PI/8);
    canvas.fillStyle="grey";
    canvas.fillRect(-w/2,-h/2,w,h);   
    canvas.fillStyle='black';
    canvas.fillRect(-w/8,-h/8,w/4,h/4);   
    canvas.restore();
    
  }
  
  interactWithBlock(gridX,gridY){
    if(this.x < 0 || this.x >= this.game.world.w*this.game.world.s) 
      return true;
    if(gridX < 0 || gridX > CELLMAP.length)
      return true;
    var block = CELLMAP[this.game.world.world[gridY][gridX]];
    if(block.solid)
      return true;
    for(var i = 0; i < this.nonSolidCollisions.length; i++){
      if(block.name === this.nonSolidCollisions[i])
        return true;
    }
    return false;
  }
  getHitBox() {
    return {x:this.x-.5*this.w, y:this.y-.5*this.h, w:this.w, h:this.h};
  }
  
}addBlock(function() { return {
  name: "TrunkWall",
  solid: true,
  groundBlock: false,
  trunk: true,
  platform: true,
  safe: true,
  treeWall: true,
  id: BLOCKS.length,
  draw: function(canvas, x,y,w,h, world,i,j) {
    //CELLMAP[18].draw(canvas,x,y, w, h, world, i,j);  
    canvas.lineWidth = 4;
    x+=w*.05;
    w*=.9;
    
    //x+=w/2;
    var color1 = "#805940";
    var color2 = "#531";
    // var color1 = "#754";
    // var color2 = "#532";
    // color1 = "#555";
    // color2 = "#777";
    // color3 = "#000";
    canvas.fillStyle=color2;
    canvas.fillRect(x,y,w/2,h);
    canvas.strokeStyle="#000";
    var s = Math.max(w,h);
    // canvas.strokeRect(x,y,w,h);
    canvas.fillStyle=color1;
    canvas.fillRect(x+w/4,y,w/4,h);
    var ww = s/3;
    var hh = ww;
    var spacing = 10;
    // for(var ii=0;ii<3;ii++) {
    //   var r1 = psuedoRandom(x,y,ii,1);
    //   var r2 = psuedoRandom(x,y,ii,2);
    //   var xx = Math.floor(r1*(w-ww)/spacing) * spacing;
    //   var yy = Math.floor(r2*(h-hh)/spacing) * spacing;
    //   canvas.fillRect(xx+x,yy+y,ww,hh);
    // }
    // if(world.getCell(i,j-1).id!=this.id) {
      //canvas.strokeRect(x+w,y,0,h);
    // }


    canvas.fillStyle=color1;
    canvas.fillRect(x+w/2,y,w/2,h);
    canvas.strokeStyle="#000";
    s = Math.max(w,h);

    canvas.fillStyle=color2;
    canvas.fillRect(x+w*3/4,y,w/4,h);
    ww = s/3;
    hh = ww;
    spacing = 10;
    // for(var ii=0;ii<3;ii++) {
    //   var r1 = psuedoRandom(x,y,ii,1);
    //   var r2 = psuedoRandom(x,y,ii,2);
    //   var xx = Math.floor(r1*(w-ww)/spacing) * spacing;
    //   var yy = Math.floor(r2*(h-hh)/spacing) * spacing;
    //   canvas.fillRect(xx+x,yy+y,ww,hh);
    // }
    // if(world.getCell(i,j-1).id!=this.id) {
    if(!world)
        return;
    //if(!world.getCell(i+1,j).treeWall) {
      canvas.strokeRect(x+w,y,0,h);
    //}
    //if(!world.getCell(i-1,j).treeWall) {
      canvas.strokeRect(x,y,0,h);
    //}
           
    if(!world.getCell(i,j+1).treeWall) {
    canvas.strokeRect(x,y+h*.95,w,0);
    }
    if(!world.getCell(i,j-1).treeWall) {
    canvas.strokeRect(x,y,w,0);
    }
  
    canvas.lineWidth = 1;
  },
  isColliding: function(entity, pos, dx, dy, cellPos) {
    if(entity.apple)
      return false;
    //if(Math.abs(dx)>0){//&&Math.abs(entity.x-cellPos.x)<this.w/2) {
    return true;
    //}
    return false;
  },
}});
class Grass {
	constructor(x,y,i,j) {
    x+=(Math.random()*2-1)*20;
    this.x = x;
    this.y = y;
		// super(x,y);
		this.w = 10+Math.random()*10;
		this.h = 10+Math.random()*20;
		this.height = this.h;
		this.width = this.w; 
    this.color = "#070";
    this.color2 = "#191";
    this.isColliding = false;
    this.angle = 0;
    this.timeFromCollision = 100 + this.x/15;
    this.swayTime = 18+Math.random()*8;
    this.tangle = 0;
    this.i=i;
    this.j=j-1;
    this._angle = Math.PI/20*(Math.random()*2-1);
    if(Math.random()>.7) this.drawShape = this.drawShape2;
	}
	getHitByEntity(player) {
    this.timeFromCollision = 0;
    this.tangle = Math.PI/3*(player.flipped ? -1 : 1);
  }
  
  playerInCell() {
    var p = this.game.player.matrixPosition;
    return p&&p.x == this.i && (p.y == this.j || p.y == this.j-1);
  }

	update(dt, frameCount) {
    var w = this.w;
		var mbox = {
      x: this.x-w/2,
      y: this.y-this.h,
      w,
      h: this.h,
    }	// Perforamnce effeciency issue
    var player = this.game.player;
		var playerBox = player.getHitBox();
		if(rectangleCollision(mbox, playerBox) == true) {
    // if(this.playerInCell()) {
      if(!this.isColliding||player.mx||player.vy<0) {
        this.getHitByEntity(this.game.player);
        this.isColliding = true;
      }
		} else {
      this.isColliding = false;
    }
    this.timeFromCollision+=1;
    var div = 10;
    var dif = 10;
    if(this.timeFromCollision<dif) {
      this.angle += (this.tangle - this.angle)/div;
    } else if(this.timeFromCollision<dif*2){
      this.angle += (-this.tangle - this.angle)/div;
    } else if(this.timeFromCollision<dif*3) {
      this.angle += (0 - this.angle)/div;
    } else {
      this.angle = Math.cos(this.timeFromCollision/this.swayTime)/10;
    }
	}
  draw(canvas) {
    var h = this.height;
    var w = this.width;
    canvas.save();
    canvas.translate(this.x,this.y);
    canvas.rotate(this.angle+this._angle);
    if(this.flipped) {
      canvas.scale(-1,1);
    }
    this.drawShape(canvas,w,h);
    canvas.restore();
  }
  drawShape(canvas,w,h) {
    canvas.fillStyle = this.color;    
    // canvas.strokeStyle = 'black';
    // canvas.lineWidth = 1;    
    // canvas.strokeRect(-w/2,-h, w,h);
    canvas.fillRect(-w/2,-h, w,h);
    canvas.fillStyle = this.color2;    
    canvas.fillRect(-w/2,-h, w,h/2);
  }
  drawShape2(canvas,w,h) {
    canvas.fillStyle = this.color;    
    // canvas.strokeStyle = 'black';
    // canvas.lineWidth = 1;    
    // canvas.strokeRect(-w/2,-h, w,h);
    canvas.fillRect(-w/2,-h, w,h);
    canvas.fillStyle = this.color2;    
    canvas.fillRect(-w/2,-h, w,h/2);
    canvas.fillStyle = '#3a8';
    canvas.fillRect(-w*.6,-h-w*.3,w*1.2,w*.6);
    canvas.fillRect(-w*.3,-h-w*.6,w*.6,w*1.2);
    canvas.fillStyle = '#ab4';
    canvas.fillRect(-w*.2,-h-w*.2,w*.4,w*.4);
  }
}addBlock(function() { return {
  //Enemy Block
  id: BLOCKS.length,
  name: "KingByrd",
  hide: true,   
  ignoreCollisions: true,
  drawer: new Enemy(),
  draw: drawEntity,
  onload: function(game, x,y,width,height, world,ii,jj) {
    game.addEntity(new KingByrdPoint(x + width/2,y + height/2));
  },
}});
class Butterfly {
	constructor(x,y,i,j) {
    this.x = x;
    this.y = y;
		this.w = 2;
		this.h = 15;
		this.height = this.h;
		this.width = this.w; 
    this.color = "#000";
    this.color2 = "#139";
    this.color3 = "#17d";
    this.angle = 0;
    this.timeFromCollision = 0;
    this._angle = Math.PI/3;
    this.i=i;
    this.j=j-1;
    this.vx = 0;
    this.vy = 0;
    this.startX = x;
    this.startY = y;
    this.flapTime = 0;
    this.flipped = Math.random()>.5;
	}

	update(dt, frameCount) {
    this.x += this.vx;
    this.y += this.vy;
    // var tvx = (Math.random()*2-1) * 4;
    // var tvy = (Math.random()*2-1) * 4;
    // this.vx += (tvx - this.vx)/10;
    // this.vy += (tvy - this.vy)/10;
    this.vx += (Math.random()-0.5)/10;
    this.vy += (Math.random()-0.5)/10;
    var max = 0.5;
    if(this.vx>max)this.vx=max;
    if(this.vx<-max)this.vx=-max;
    if(this.vy>max)this.vy=max;
    if(this.vy<-max)this.vy=-max;

    // this.flapTime += this.vy*5;//Math.abs(this.vx) + Math.abs(this.vy);
    this.flapTime += (this.startY-this.y)/40;
    this.flap = Math.abs(Math.sin(this.flapTime/10));
    this.angle += (this.vx/10 - this.angle)/10;
    if(this.y>this.startY) {
      this.y=this.startY;
      this.vy = 0;
    }
    if(this.y<this.startY-60) {
      this.y=this.startY-60;
      this.vy*=0.8;
    }
    var bxr = this.startX + 15;
    if(this.x>bxr) {
      this.x = bxr;
      this.vx = 0;
    }
    var bxl = this.startX - 15;
    if(this.x<bxl) {
      this.x = bxl;
      this.vx = 0;
    }

    this.angle = this.vy;
	}
  draw(canvas) {
    var h = this.height;
    var w = this.width;
    canvas.save();
    canvas.translate(this.x,this.y);
    if(this.flipped) {
      canvas.scale(-1,1);
    }
    canvas.rotate(this.angle+this._angle);
    this.drawShape(canvas,w,h);
    canvas.restore();
  }
  drawShape(canvas,w,h) {
    canvas.fillStyle = this.color;    
    // canvas.strokeStyle = 'black';
    // canvas.lineWidth = 1;    
    // canvas.strokeRect(-w/2,-h, w,h);
    canvas.fillRect(0,-h, w,h);

    var w2 = this.w * 10 * this.flap;
    canvas.fillStyle = this.color3;  
    canvas.strokeStyle = this.color3;  
    canvas.lineWidth = 2;
    canvas.fillRect(-w2/2,-h, w2/4,h*.6);
    canvas.strokeRect(-w2/2,-h, w2/4,h*.6);
    w2*=.8;
    canvas.fillRect(-w2/2,-h*.9, w2/2,h*.8);
    canvas.strokeRect(-w2/2,-h*.9, w2/2,h*.8);

  }
}addBlock(function() { return {
  //Enemy Block
  id: BLOCKS.length,
  name: "ButcherTurret",
  hide: true,   
  ignoreCollisions: true,
  drawer: new ButcherTurretPoint(),
  draw: drawEntity,
  onload: function(game, x,y,width,height, world,ii,jj) {
    game.addEntity(new ButcherTurretPoint(x + width/2,y + height/2));
  },
}});
addBlock(function() { return {
    /*
    X Y point is the top left corner of the saw.
    
    */
    id: BLOCKS.length,
    name: "BigSawSpawner",
    solid: false,
    angle: 0,
    redraws: false,
    hide: true,   
    drawer: new BigSaw(),
    draw: function(canvas, x,y,w,h, world,i,j) {
      canvas.fillStyle = 'green';
      canvas.fillRect(x,y,w,h);
    },
    
    onload: function(game, x,y,width,height, world,ii,jj) {
      var gridX = Math.floor(x/game.world.s);
      var gridY = Math.floor(y/game.world.s);
      var blockBelow = CELLMAP[game.world.world[gridY+1][gridX]];
      /*
      if(blockBelow.solid){
        //move saw upwards if no room below
        game.addEntity(new BigSaw(x,y-game.world.s));
      } else {
        game.addEntity(new BigSaw(x,y));
      }
      */
      game.addEntity(new BigSaw(x,y));
    },
    // isColliding: function(entity, pos,dx,dy,cellPos) {
    //   if (pos.y-dy >= cellPos.y + 1) return { y: cellPos.y + 1};
    // }
}});