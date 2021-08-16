class Squirrel extends Enemy {
    constructor(x,y) {
        super(x,y);
        this.w = 30;
        this.h = 30;
        this.width = this.w;
        this.height = this.h;
        this.jumpPower = 10;
        this.killPlayer = false;
        this.isSquirrel = true;
        this.wallJumps = true;  
		this.color1 = "#c60";
        this.color2 = "#420";
        this.color3 = "#a42";
        this.turnsAroundAtWall = false;
        this.speed = 7;
        this.d=1;
        this.jumpTimer = 0;
        this.shouldJump = true;
    }
    getHitByEntity(player) {
        player.bounceOffEntity(this);
        this.height/=4;
        this.width*=.8;
            // this.h=this.h/2;
            // this.die();
            this.d=-this.d;
    }
	update(dt, frameCount) {
        var dx = this.game.player.x-this.x;
        var dy = this.game.player.y-this.y;
        var jt = 10;
        if(!this.grounded)jt=4;
        if(Math.abs(dy)>400)this.shouldJump=false;
        if(this.grounded)this.shouldJump=true;
        if(Math.abs(dx)<200&&this.shouldJump) {
            // this.mx = -Math.sign(dx);
            this.mx=this.d;
            if(!this.grounded||Math.abs(dx)<60) {
                this.jumpTimer += dt;
                if(this.jumpTimer>jt) {
                    this.jump();
                    this.jumpTimer = 0;
                }
            }
        } else {
            this.mx = 0;
            this.jumpTimer = 0;
        }
        super.update(dt,frameCount);
    }
    
    drawShape(canvas, w,h) {
        canvas.fillStyle = this.color1;    
        canvas.strokeStyle = this.color2;
        canvas.lineWidth = 6;
        canvas.strokeRect(-w/2,-h, w,h);
        canvas.fillRect(-w/2,-h, w,h);
        this.drawTail(canvas, w,h);
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
          canvas.strokeStyle = "white";
        }  
        canvas.stroke();

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
}