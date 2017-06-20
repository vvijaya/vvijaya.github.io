var SWIPE = function(){
  return SWIPE={
    xD:0, yD:0, e:0, this:0,
    onUp:function(cb){ cb ? SWIPE.onUp = cb:0; return SWIPE; },
    onDown:function(cb){ cb ? SWIPE.onDown = cb:0; return SWIPE; },
    onLeft:function(cb){ cb ? SWIPE.onLeft = cb:0; return SWIPE; },
    onRight:function(cb){ cb ? SWIPE.onRight = cb:0; return SWIPE; },
    _a:function(e){
      SWIPE.xD = e.touches[0].clientX;
      SWIPE.yD = e.touches[0].clientY;
    },
    _b:function(e){
      if ( ! SWIPE.xD || ! SWIPE.yD ) return;
      var xU = e.touches[0].clientX;
      var yU = e.touches[0].clientY;
      var xC = SWIPE.xD - xU;
      var yC = SWIPE.yD - yU;
      if ( Math.abs( xC ) < Math.abs( yC ) ) {
        ( yC > 0 ) ? SWIPE.onUp() : SWIPE.onDown();
      } else {
        ( xC > 0 ) ? SWIPE.onLeft() : SWIPE.onRight();
      } SWIPE.xD = SWIPE.yD = null;
    },
    invoke:function(e){
      SWIPE.e = e; SWIPE.this = this;
      if (e.type === 'touchstart') {
        SWIPE._a(e);
      } else if (e.type === 'touchmove') {
        SWIPE._b(e);
      } return SWIPE;
    }
  }
}();

var MODAL=function(){
  function _on(f,u,n) { f.addEventListener?f.addEventListener(u,n):f.attachEvent?f.attachEvent("on"+u,n):0 }
  function _id(e,d){ return(d||document).getElementById(e) }
  var _df = { status:0, className:"", header:"Header", body:"Body goes here" }
  return MODAL={ Q:"MODAL",
    close:function(){ var e=_id(MODAL.Q); e&&e.parentNode.removeChild(e); },
    invoke:function(e,onClose,callback){
      var n,t,i;
      MODAL.close();
      n=Object.assign({},_df);
      e=e||{};
      for(t in e)n[t]=e[t];
      if(!_id(MODAL.Q)){
        i=document.createElement("div");
        i.id=MODAL.Q;
        i.className+=MODAL.Q+" "+n.className;
        i.innerHTML=''+
          '<h1 id="'+MODAL.Q+'_Header" class="header">'+n.header+'</h1>'+
          '<div id="'+MODAL.Q+'_Body" class="body">'+
          '<div>'+n.body+'</div>'+
          '</div>'+
          '<button id="'+MODAL.Q+'_Close" class="close">Close</button>';
        document.body.appendChild(i);
        _on(_id(MODAL.Q+"_Close"),"click",function(){
          MODAL.close(),onClose&&onClose()
        });
        _on(document,"keydown",function(e){
          (27==e.keyCode||!1)&&(MODAL.close(),onClose&&onClose())
        });
        callback&&callback();
      }
    }
  }
}();
