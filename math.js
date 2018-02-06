function linearMove(a,b,s) {
  if(Math.abs(a-b)<=s)return b;
  if(a>b)return a-s;
  if(a<b)return a+s;
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