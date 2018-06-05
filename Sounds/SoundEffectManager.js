var AUDIOCONTEXT;
var DESTINATION;
var BUFFERBUFFER = [];
function initializeSound() {
  // console.log('a');
  if('webkitAudioContext' in window) {
    AUDIOCONTEXT = new webkitAudioContext();
  } else {
    AUDIOCONTEXT = new AudioContext();
  }
  AUDIOCONTEXT.resume();
  var GAIN = AUDIOCONTEXT.createGain();
  GAIN.gain.setValueAtTime(.5, 0);
  GAIN.connect(AUDIOCONTEXT.destination);
  DESTINATION = GAIN;
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
    return;
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
    url = "./SoundAssets/" + url;    
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
  play() {
    var audioContext= AUDIOCONTEXT;
    var destination = DESTINATION;
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
    this.lastSound = source;
    return source;
  }
}

class SoundTag {
  constructor(url, playbackRate, volume) {
    url = "./SoundAssets/" + url;
    this.url = url;
    this.playbackRate = playbackRate || 1;
    if(volume>1)volume=1;
    this.volume = volume || 1;
    this.createAudio();
  }
  createAudio() {
    var audioElement = document.createElement("audio");
    audioElement.src = this.url;
    this.audioElement = audioElement;
    audioElement.playbackRate = this.playbackRate;
    audioElement.volume = this.volume;
  }
  play() {
    this.audioElement.play();
    this.audioElement.currentTime = 0;
    return this;
  }
  stopSound() {
    this.audioElement.pause();
  }
}

var OnFile = (window.location.protocol == "file:");
if(OnFile) SoundSource = SoundTag;

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
  }
  onloadBuffer(buffer) {
    this.buffer=buffer;
    this.loaded = true;
    this.play();
    // setInterval(() => {
    //   this.setPitch();
    // }, 4000)
    this.setPitch();
  }
  setPitch() {
    // var v = 1 + (Math.random()-0.5)/2;
    var v = 1;
    if(Math.random()>.5)v = 2;
    this.lastSound.playbackRate.setValueAtTime(v, AUDIOCONTEXT.currentTime);
    setTimeout(() => {
      this.setPitch();
    }, 4000/v);
  }
}
