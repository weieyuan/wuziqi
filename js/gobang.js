var Gobang = function(options) {
	this.options = Object.assign({
		canvasId: undefined,
		imgUrl: undefined
	}, options);
	this.grid = new Array(15);
	//0表示下白棋，1表示下黑棋
	this.wOrB = options.whiteFirst === true ? 0 : 1;
};
Gobang.prototype.init = function() {
	this.initParams();
	this.drawBackgroundImg(function() {
		this.drawBoard();
	}.bind(this));
	this.bindEvent();
}
Gobang.prototype.initParams = function() {
	var canvas = document.getElementById(this.options.canvasId);
	this.canvasWidth = canvas.width;
	this.canvasHeight = canvas.height;
	//min表示棋盘的宽高
	this.min = Math.min(this.canvasWidth, this.canvasHeight);
	//横竖画15条线，步长表示每个格子的宽度
	this.step = this.min / 15;
	this.canvas = canvas;
	this.context = canvas.getContext("2d");
	for (var i = 0; i < 15; i++) {
		var xGrid = new Array(15);
		for (var j = 0; j < 15; j++) {
			xGrid[j] = 0;
		}
		this.grid[i] = xGrid;
	}
};
Gobang.prototype.drawBackgroundImg = function(oAfterLoadImg) {
	var img = new Image();
	img.src = this.options.imgUrl;
	img.onload = function() {
		this.context.drawImage(img, 0, 0, this.canvasWidth, this.canvasHeight);
		oAfterLoadImg();
	}.bind(this);
};
Gobang.prototype.drawBoard = function() {
	var padding = this.step / 2;
	this.context.fillStyle = "#6B6B6B";
	for (var i = 0; i < 15; i++) {
		//横向画15条线
		this.context.beginPath();
		this.context.moveTo(padding, padding + i * this.step);
		this.context.lineTo(padding + this.step * 14, padding + i * this.step);
		this.context.stroke();
		//竖向画15条线
		this.context.beginPath();
		this.context.moveTo(padding + i * this.step, padding);
		this.context.lineTo(padding + i * this.step, padding + this.step * 14);
		this.context.stroke();
	}
};
Gobang.prototype.bindEvent = function() {
	this.canvas.addEventListener("click", function(e) {
		var x = e.offsetX;
		var y = e.offsetY;
		if (this.isInBorder(x, y)) {
			var i = Math.floor(x / this.step);
			var j = Math.floor(y / this.step);
			//处理在最大边界上的情况
			if (i == 15) {
				i = 14;
			}
			if (j == 15) {
				j = 14;
			}
			this.drawChessman(i, j);
		}
	}.bind(this));
};
Gobang.prototype.drawChessman = function(i, j) {
	//判断该点是否已经画过棋子
	if (this.grid[i][j]) {
		return;
	}
	//设置棋子的颜色,更新内存
	if (this.wOrB) {
		this.context.fillStyle = "#000000";
		this.context.strokeStyle = "#4F4F4F";
		this.grid[i][j] = 2;
	} else {
		this.context.fillStyle = "#FFFFFF";
		this.context.strokeStyle = "#F8F8F8";
		this.grid[i][j] = 1;
	}
	//画棋子
	var centerX = this.step / 2 + i * this.step;
	var centerY = this.step / 2 + j * this.step;
	this.context.beginPath();
	this.context.arc(centerX, centerY, this.step / 2, 0, 2 * Math.PI);
	this.context.fill();
	this.context.beginPath();
	this.context.arc(centerX, centerY, this.step / 2, 0, 2 * Math.PI);
	this.context.stroke();
	//更新wOrB变量
	this.wOrB = 1 - this.wOrB;
};
Gobang.prototype.isInBorder = function(x, y) {
	var backgroundColor = WUtils.getCssPropValue(this.options.canvasId, "backgroundColor");
	this.context.beginPath();
	this.context.strokeStyle = backgroundColor;
	this.context.rect(0, 0, this.min, this.min);
	this.context.stroke();
	return this.context.isPointInPath(x, y);
};