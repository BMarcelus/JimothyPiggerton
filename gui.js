function pointContainsRect(x,y,rect) {
  return x>= rect.x && x<=rect.x+rect.w && y>=rect.y && rect<=rect.y-rect.h;
}
class Button {
  constructor(x,y,w,h,text) {
    this.x=x;this.y=y;
    this.w=w;this.h=h;
    this.text=text;
  }
  contains (x,y){
    return pointContainsRect(x,y);
  }
  draw(canvas) {
    canvas.textAlign='center';
    canvas.fillRect(this.x,this.y,this.w,this.h);
    canvas.fillText(this.textd, this.x+this.w/2,this.y+this.h/2);
  }
}