addBlock(function() { return {
      //Fire
      id: BLOCKS.length,
      name: "Fire",
      solid: false,
      angle: 0,
      fire: true,
      // redraws: true,
      draw: function(canvas, x,y,w,h, world,i,j) {
        //h*=.5;
        var color1 = "#f00";
        var color2 = "#fa0";
        var color3 = "#ff0";
        
  
        var s = Math.max(w,h);
        var ww = s/3;
        var hh = ww;
        var spacing = 3;
        // canvas.strokeRect(x,y,w,h);
        canvas.fillStyle=color1;
  
        //var edge = false;

  
        var we = w;
        var he = h;
        var xe = x;
        var ye = y;
        if(!world)
          return;
        if(world.getCell(i,j-1).air) {
          ye += he;
        }
        if(!world.getCell(i,j+1).fire) {
          he /= 2;
        } 
        if(world.getCell(i-1,j).air) {
          we /= 2;
          xe += we;
        }
        if(world.getCell(i+1,j).air) {
          we /= 2;
        }

        this.flameTime++;
        if (this.flameTime >= 600)
        {
          this.flameTime = 0;
          this.flameIndex++;
        }

        canvas.fillRect(xe,ye,we,he);

        canvas.fillStyle=color2;
        for(var ii=0;ii<10;ii++) {
            var r1 = psuedoRandom(x,y,ii,this.flameIndex+1);
            var r2 = psuedoRandom(x,y,ii,this.flameIndex+2);
            var xx = Math.floor(r1*(w-ww)/spacing) * spacing;
            var yy = Math.floor(r2*(h-hh)/spacing) * spacing;
            canvas.fillRect(xx+x,yy+y,ww,hh);
        }

        canvas.fillStyle=color3;
        for(var ii=0;ii<10;ii++) {
            var r1 = psuedoRandom(x,y,ii,this.flameIndex+3);
            var r2 = psuedoRandom(x,y,ii,this.flameIndex+4);
            var xx = Math.floor(r1*(w-ww)/spacing) * spacing;
            var yy = Math.floor(r2*(h-hh)/spacing) * spacing;
            canvas.fillRect(xx+x,yy+y,ww,hh);
        }
  
      },
           drawSpike: function(canvas, x,y,w,h, world,i,j) {
        canvas.fillStyle="white";
        canvas.strokeStyle = "#000";
        canvas.save();
        canvas.translate(x+w/2,y+h/2);
        canvas.rotate(this.angle);
        // this.angle += Math.PI/20*1.5;
        // this.angle = frameCount * Math.PI/20*1.5;
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
