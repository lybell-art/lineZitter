var L;
function setup() { 
  createCanvas(windowWidth,windowHeight);
	background(255);
	noFill();
	stroke(0,30);
	strokeWeight(0.75);
	L=new zitterLine();
	L.create();
} 

function draw() { 
	if(focused)
	{
		L.zitter();
		L.render();
	}
}

function mousePressed()
{
	L.create();
}
function keyPressed()
{
	if(key==' ') background(255);
}
function windowResized()
{
  resizeCanvas(windowWidth,windowHeight);
}
function zitterLine()
{
	this.resol=25;
	this.center=createVector();
	this.points=[];
	for(var i=0;i<this.resol;i++) this.points[i]=createVector();
	this.create=function()
	{
		this.center.set(mouseX,mouseY);
		var angle=random(TWO_PI);
		var length=dist(0,0,width,height)*2;
		var delta=p5.Vector.random2D();
		delta.mult(length/(this.resol-1));
		this.points[0]=p5.Vector.mult(delta,-this.resol/2);
		for(var i=1;i<this.resol;i++)
		{
			this.points[i]=p5.Vector.add(this.points[i-1],delta);
		}
	}
	this.zitter=function()
	{
		var mouse=createVector(mouseX,mouseY);
		this.center=p5.Vector.lerp(this.center,mouse,0.01);
		for(var i=0;i<this.resol;i++)
		{
			var zit=p5.Vector.random2D();
			zit.mult(random(1));
			this.points[i].add(zit);
		}
	}
	this.render=function()
	{
		var resol=this.resol;
		push();
		translate(this.center.x,this.center.y);
		beginShape();
		curveVertex(this.points[0].x,this.points[0].y);
		for(var i=0;i<resol;i++)
		{
			curveVertex(this.points[i].x,this.points[i].y);
		}
		curveVertex(this.points[resol-1].x,this.points[resol-1].y);
		endShape();
		pop();
	}
}
