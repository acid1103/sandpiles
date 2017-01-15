(function() {
    var pileSize = 200;
    var maxPile = 4;
    var painter;
    var data;
    var Painter = function(c) {
        this.canvas = c;
        this.id = c.createImageData(1, 1);
        this.d = this.id.data;

        this.drawPixel = function(x, y, r, g, b, a) {
            if (a === undefined)
                a = 255;
            this.d[0] = r;
            this.d[1] = g;
            this.d[2] = b;
            this.d[3] = a;
            canvas.putImageData(this.id, x, y);
        }
    }

    var create2dArray = function(length, depth) {
        var arr = new Array(length);
        for (var i = 0; i < length; i++)
            arr[i] = new Array(depth).fill(0);
        return arr;
    }

    var init = function() {
        var c = document.getElementById("myCanvas");
        c.width = Math.min(document.body.clientWidth, document.body.clientHeight);
        c.height = c.width;
        var controlsCol = document.getElementById("controlsColumn");
        controlsCol.style.width = (document.body.clientWidth - c.width) + "px";
        painter = new Painter(c.getContext('2d'));
        data = create2dArray(c.width, c.height);
        data[Math.round(c.width / 2)][Math.round(c.width / 2)] = pileSize;
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

    var inBounds = function(x, y) {
        return x > 0 && x < data.length && y > 0 && y < data[0].length;
    }

    var step = function() {
        var newArr = create2dArray(data.length, data[0].length);
        var reduced = true;
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[0].length; j++) {
                if (data[i][j] > maxPile) {
                    newArr[i][j] = (data[i][j] -= 4);
                    if (newArr[i][j] > maxPile) {
                        reduced = false;
                    }
                    if (inBounds(i - 1, j)) {
                        newArr[i - 1][j] = (data[i - 1][j] += 1);
                        if (newArr[i - 1][j] > maxPile) {
                            reduced = false;
                        }
                    }
                    if (inBounds(i, j - 1)) {
                        newArr[i][j - 1] = (data[i][j - 1] += 1);
                        if (newArr[i][j - 1] > maxPile) {
                            reduced = false;
                        }
                    }
                    if (inBounds(i + 1, j)) {
                        newArr[i + 1][j] = (data[i + 1][j] += 1);
                        if (newArr[i + 1][j] > maxPile) {
                            reduced = false;
                        }
                    }
                    if (inBounds(i, j + 1)) {
                        newArr[i][j + 1] = (data[i][j + 1] += 1);
                        if (newArr[i][j + 1] > maxPile) {
                            reduced = false;
                        }
                    }
                } else {
                    newArr[i][j] = data[i][j];
                }
            }
        }
        data = newArr;
        return reduced;
    }

    var reduced = step();
    while (!reduced) {
        reduced = step();
    }

    for(var i = 0; i < data.length; i++)
    {
    	for(var j = 0; j < data[0].length; j++)
    	{
    		var w = data[i][j]/maxPile*255;
    		painter.drawPixel(i,j,w,w,w);
    	}
    }
})();