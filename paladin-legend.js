class Paladin {

    constructor(){
        this.preferences ={
            palHeigth:100,
            palWidth:100,
            palDefaultSpeed:10, // px/frames
            palColor:'rgb(0,0,255)',
            palSpriteFacingRight:"sprites/paladin_facing_right_100x100.png",
            palSpriteAttackFacingRight:"sprites/paladin_facing_right_attack_100x100.png",
            palSpriteFacingLeft:"sprites/paladin_facing_left_100x100.png",
            palSpriteAttackFacingLeft:"sprites/paladin_facing_left_attack_100x100.png",
            palSpriteSword:"sprites/sword_tall.png" // length:21   heigth:57
        }
        this.position ={
            x:480,
            y:310,
            facing:"right"
        }
        this.attack={
            couldown: 20, //frames
            frameRemaining:0
        
        }
        this.spriteImgFacingRight = document.createElement("img");
        this.spriteImgFacingRight.src=this.preferences.palSpriteFacingRight;

        this.spriteImgFacingLeft = document.createElement("img");
        this.spriteImgFacingLeft.src=this.preferences.palSpriteFacingLeft;

        this.spriteImgAttackFacingRight = document.createElement("img");
        this.spriteImgAttackFacingRight.src=this.preferences.palSpriteAttackFacingRight;

        this.spriteImgAttackFacingLeft = document.createElement("img");
        this.spriteImgAttackFacingLeft.src=this.preferences.palSpriteAttackFacingLeft;

        
        
       
    }
    
    rePaint=function(context){;
       let  displayAttackSprite = this.attack.frameRemaining !== 0 && this.attack.frameRemaining > 10;
       if(this.position.facing === "right"){
        if(displayAttackSprite){
            context.drawImage(this.spriteImgAttackFacingRight, this.position.x,this.position.y)
        }else{
            context.drawImage(this.spriteImgFacingRight, this.position.x,this.position.y)
        }

            
       }
       else {
        if(displayAttackSprite){
            context.drawImage(this.spriteImgAttackFacingLeft, this.position.x,this.position.y);
        }else{
            context.drawImage(this.spriteImgFacingLeft, this.position.x,this.position.y);
        }
           
        
       }
       
            
        }
    recalcul=function(game){
        if(game.attackPressed && this.attack.frameRemaining === 0 ){
            console.log("Attaque")
            this.attack.frameRemaining = this.attack.couldown;
        }else if(this.attack.frameRemaining !== 0){
            this.attack.frameRemaining-=1;
        }

        if(game.leftPressed){
            this.position.facing="left";
            this.position.x-=this.preferences.palDefaultSpeed;
        }
        if(game.rightPressed){
            this.position.facing="right";
            this.position.x+=this.preferences.palDefaultSpeed;
        }
    }
        
        
        
    }
  class Wall  {
      constructor(){

      }
      repaint(){

      } 
      recalcul(){

      }
  }
    

class Game {
    constructor(canvas){
        this.walls=
        this.context = canvas.getContext('2d');
          this.preferences = {
            bgWidth: 1000,
            bgHeigth: 700,
            bgColor: 'rgb(117,160,234)',

          };

          this.leftPressed=false;
          this.rightPressed=false;
          this.attackPressed=false;

          this.paladin=new Paladin();
          this.rePaint();
    }
    recalcul = function(){
        this.paladin.recalcul(this)
    }
    rePaint=function(){
        this.paintBackGround(this.context);
        this.paladin.rePaint(this.context);
      
    }

    paintBackGround=function(context){
        context.fillStyle = this.preferences.bgColor;
        context.fillRect(
            0,
            0,
            this.preferences.bgWidth,
            this.preferences.bgHeigth
          );
    }
}

window.onload=()=>{
    var canvas= document.getElementById("paladin-legend")
    var g = new Game(canvas);

    window.addEventListener("keydown",(ev)=>{
        switch(ev.code){
            
            case 'ArrowLeft':
                g.leftPressed=true;
                break;

            case 'ArrowRight':
                g.rightPressed=true;
                break;
            case 'KeyV':
                g.attackPressed=true;
            break;
                
        }
        //console.log(ev);
    });

    window.addEventListener("keyup",(ev)=>{

        switch(ev.code){
            case 'ArrowLeft':
                g.leftPressed=false;
                break;

            case 'ArrowRight':
                g.rightPressed=false;
                break;
            case 'KeyV':
                g.attackPressed=false;
                
        }
        //console.log(ev);
    });

    var fpsDIV= document.createElement("div");
    document.getElementsByTagName("body")[0].appendChild(fpsDIV); 
    let startDate=new Date();
    console.log(startDate.getDate());
    let countFrame=0;
    setInterval(()=>{
        g.recalcul()
        g.rePaint();
        countFrame++;
        let now = new Date();
        let duration = now.getTime() - startDate.getTime();
        if( duration > 1000){
            fpsDIV.innerHTML=(countFrame *1000/duration).toString()+" FPS";
            countFrame=1;
            startDate=now;
        }
    },1000/60);
}
