w.xD = !1; w.yD = !1;
w.Swipe = function(){
  var S=this; S.e,
  S.onUp = function(cb) { S.onUp = cb; return S },
  S.onDown = function(cb) { S.onDown = cb; return S },
  S.onLeft = function(cb) { S.onLeft = cb; return S },
  S.onRight = function(cb) { S.onRight = cb; return S },
  S._a = function(e){
    w.xD = e.touches[0].clientX;
    w.yD = e.touches[0].clientY;
  },
  S._b = function(e){
    if ( ! w.xD || ! w.yD ) return;
    var xU = e.touches[0].clientX;
    var yU = e.touches[0].clientY;
    var xC = w.xD - xU;
    var yC = w.yD - yU;
    if ( Math.abs( xC ) < Math.abs( yC ) ) {
      ( yC > 0 ) ? S.onUp() : S.onDown();
    } else {
      ( xC > 0 ) ? S.onLeft() : S.onRight();
    } w.xD = w.yD = void 0;
  },
  S.invoke = function(e){
    S.e = e;
    if (e.type === 'touchstart') {
      S._a(e);
    } else if (e.type === 'touchmove') {
      S._b(e);
    } return S;
  }
};

w.Modal=function(){
  var M=this, _df = { id:"Modal", status:0, className:"Modal", header:"Header", body:"Body goes here" }
  function _on(f,u,n) { f.addEventListener?f.addEventListener(u,n):f.attachEvent?f.attachEvent("on"+u,n):0 }
  function _id(e,d){ return(d||document).getElementById(e) }
  M.close=function(e){ e&&e.parentNode.removeChild(e); },
  M.invoke=function(e,onClose,callback){
    var n,t,i,m;
    n=Object.assign({},_df);
    e=e||{}; for(t in e)n[t]=e[t];
    M.close(_id(n.id));
    if(!_id(n.id)){
      i=document.createElement("div");
      i.id=n.id;
      i.className+=n.id+" "+n.className;
      i.innerHTML=''+
        '<h1 id="'+n.id+'_Header" class="header">'+n.header+'</h1>'+
        '<div id="'+n.id+'_Body" class="body">'+
        '<div>'+n.body+'</div>'+
        '</div>'+
        '<button id="'+n.id+'_Close" class="close">Close</button>';
      document.body.appendChild(i);
      _on(_id(n.id+"_Close"),"click",function(){
        M.close(_id(n.id)),onClose&&onClose()
      });
      _on(document,"keydown",function(e){
        (27==e.keyCode||!1)&&(M.close(_id(n.id)),onClose&&onClose())
      });
      callback&&callback();
    }
  }
};
w.DropZone=function(ctrl, face, eventHandler) {
  this.files = [];
  this.ctrl = ctrl;
  this.face = face;
  this.eventHandler = eventHandler;
  var readFile = function(F, C, beforeRead, afterRead) {
    if (beforeRead && beforeRead(F, C)) {
      var r; function isDone(F) { if (F.dataTXT && F.dataB64) { C.push(F); afterRead && afterRead(F, C); } }
      r=new FileReader(); r.onload=function(F){return function(D){ F.dataTXT=D.target.result;isDone(F) }}(F); r.readAsText(F);
      r=new FileReader(); r.onload=function(F){return function(D){ F.dataB64=D.target.result;isDone(F) }}(F); r.readAsDataURL(F);
    }
  };
  this.fileHandler = function(e, beforeRead, afterRead) {
    this.eventHandler && this.eventHandler(e);
    if (e.type === 'dragend') { e.dataTransfer.clearData();
    } else
    if (e.type === 'drop') { var files = e.dataTransfer.files;
      for (var i = 0, f; f = files[i]; i++) { readFile(f, this.files, beforeRead, afterRead) }
    } else
    if (e.type === 'change') { var files = e.target.files;
      for (var i = 0, f; f = files[i]; i++) { readFile(f, this.files, beforeRead, afterRead) }
      e.target.value = '';
    }
  };
};
