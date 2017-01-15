(function() {
    var Painter = function(c)
    {
    	var canvas = c;
		var id = myContext.createImageData(1,1);
		var d  = id.data;

		var drawPixel = function(x,y,r,g,b,a)
		{
			if(a === undefined)
				a = 255;
			d[0] = r;
			d[1] = g;
			d[2] = b;
			d[3] = a;
			canvas.putImageData(id,x,y);
		}
    }

    var init = function() {
        var c = document.getElementById("myCanvas");
        c.width = Math.min(document.body.clientWidth, document.body.clientHeight);
        c.height = c.width;
        var controlsCol = document.getElementById("controlsColumn");
        controlsCol.style.width = (document.body.clientWidth - c.width) + "px";
        canvas = c.getContext('2d');
    }

    init();

    var roundUp = function(n) {
        var int = Math.round(n);
        if (n > int)
            int += 1;
        return int;
    }

    var getAdjacentCellValue = function(thisCell, maxValue) {
        return roundUp((thisCell - maxValue) / 4);
    }
})();