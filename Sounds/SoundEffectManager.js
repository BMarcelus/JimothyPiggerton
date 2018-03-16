var AUDIOCONTEXT;
if('webkitAudioContext' in window) {
  AUDIOCONTEXT = new webkitAudioContext();
} else {
  AUDIOCONTEXT = new AudioContext();
}
var GAIN = AUDIOCONTEXT.createGain();
GAIN.gain.setValueAtTime(1, 0);
GAIN.connect(AUDIOCONTEXT.destination);
var DESTINATION = GAIN;
// var DESTINATION = AUDIOCONTEXT.destination;
class SoundEffect {
  constructor(rate, frq, vol, len, inBetweens) {
    this.type = 'triangle';
    this.sampleRate = rate;
    this.inBetweens = inBetweens || 0;
    this.frqData=frq;
    this.volData=vol;
    this.length = this.sampleRate*len;
  }
  play(entity) {
    var volume = 1;
    if(!entity.player) {
      // var d = distanceBetweenEntities(entity, entity.game.player);
      // console.log(d);
      // volume = 1/(d+1);
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
    oscillator.stop(time+this.length);
    oscillator.type=this.type;
    oscillator.frequency.setValueAtTime(this.frqData[0], time);
    gain.gain.setValueAtTime(this.volData[0]*volume, time);
    oscillator.connect(gain);
    gain.connect(destination);
    this.applyData(oscillator, gain, time, volume);
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
