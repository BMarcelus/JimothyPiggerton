function linearMove(a,b,s) {
  if(Math.abs(a-b)<=s)return b;
  if(a>b)return a-s;
  if(a<b)return a+s;
}