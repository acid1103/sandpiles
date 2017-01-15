(function(){
  var c = document.getElementById("myCanvas");
  c.width = Math.min(document.body.clientWidth, document.body.clientHeight);
  c.height = c.width;
  var controlsCol = document.getElementById("controlsColumn");
  controlsCol.style.width = (document.body.clientWidth - c.width)+"px";
})();
