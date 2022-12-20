var canvas, stage;
var update = true;

function init() {
   canvas = document.getElementById("testCanvas");
   stage= new createjs.Stage(canvas);
   createjs.Touch.enable(stage);
   stage.enableMouseOver(10);
   stage.mouseMoveOutside = true;
   for(var i = 0; i < 100; i++){
      stage.addChild(new Shape());
    }
   createjs.Ticker.addEventListener("tick",tick);
}

function tick(event){
   if(update){
      update = false;
      stage.update(event);

   }
}

function Shape(){
   this.x = canvas.width * Math.random()| 0;
   this.y = canvas.height * Math.random()| 0;

   this.scaleX = this.scaleY = this.scale = Math.random()*0.4 + 0.4;

   this.addEventListener("mouseover", this)
   this.addEventListener("mouseout", this)
   this.addEventListener("mousedown", this)

}

//Shape class inheritance
// -----------------------
Shape.prototype = Object.create(
   createjs.Shape.prototype,{
     constructor: {value:Shape}
     ,graphics: {value: new createjs.Graphics()
       .setStrokeStyle(5)
       .s("#fff").f("#f70")
       .dc(0,0,40)
     }
     // Event handlers.
     ,handleEvent: {value: function (e) { this[e.type](e) }} 
     ,mousedown: {value: function (e) {
       this.parent.addChild(this);
       var offset = {x: this.x-e.stageX, 
                     y: this.y-e.stageY};
       e.addEventListener("mousemove", function(event) {
         event.target.x = event.stageX+offset.x;
         event.target.y = event.stageY+offset.y;
         // updated on the next tick.
         update = true;
       });
     }}
     ,mouseover: {value: function (e) {
       this.scaleX = this.scaleY = this.scale*1.2;
       update = true;
     }}
     ,mouseout: {value: function (e) {
       this.scaleX = this.scaleY = this.scale;
       update = true;
     }}
 });