####canvas的知识
#####基础知识
* cavans元素只有两个属性：width和height,如果没有指定这两个属性的值，默认width=300px，height=150px;

#####绘制直线
* beginPath():开始绘制一个新的图形
* moveTo(x, y)：移动画笔的位置
* lineTo(x,y):从当前位置绘制到指定的位置
* stroke():绘制形状的轮廓
* fill():填充内容区域
* closePath:绘制一条从当前点到开始点的直线来闭合图形

#####绘制矩形
* fillRect(x,y,width,height):绘制填充矩形
* strokeRect(x,y,width,height):绘制矩形边框

#####判断点是否在图形上
* isPointInPath(x,y):判断点是否在图形区域内
* isPointInStroke(x,y):判断点是否在图形的边线上

#####绘制圆形
* arc(x, y, radius, startAngle, endAngle, antiClockwise):绘制圆形

#####样式填充
* fillStyle = color:设置图形填充颜色
* strokeStyle = color:设置图形轮廓的颜色
> 支持的color应该是css3颜色标准值，例如
> "orange","#FFA500","rgb(255,165,0)","rgba(255,165,0,1)"

#####图片绘制
* 获取HTMLImageElement对象，例如
> ```
> var img = new Image();
> img.src = "image/img.png";
> img.onload = function(){ //图片装载完成后调用
>    context.drawImage(img, 0, 0); 
> }  
> ```

* drawImage(image, x, y)/drawImage(image, x, y, width, height):绘制图片，x/y为绘制的起点，width/height为绘制图片的宽高
