addBlock({
    //Ground
      id: BLOCKS.length,
      name: "Ground",
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
});
