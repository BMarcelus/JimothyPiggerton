addBlock(function() { 
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
    drawTypes: {
      0: drawTypes.grass,
      1: drawTypes.grass,
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
*/