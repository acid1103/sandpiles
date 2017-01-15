(function(){
var c = document.getElementById("myCanvas");
c.width = Math.min(c.parentElement.clientWidth, c.parentElement.clientHeight);
c.height = c.width;
})();
