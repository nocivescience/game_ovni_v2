const game=document.getElementById('game');
const ctx= game.getContext('2d');
game.width=window.innerWidth;
game.height=window.innerHeight;
class Background{
    constructor(){
        this.x=0;
        this.y=0;
        this.width=game.width;
        this.height=game.height;
        this.image=new Image();
        this.image.src='./images/terreno.png'
    }
    draw(){
        this.x--;
        if (this.x < -game.width) this.x = 0;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(
            this.image,
            this.x + this.width,
            this.y,
            this.width,
            this.height
        );
    }
}
class Ship{
    constructor(){
        this.x=game.width/4;
        this.y=game.height/4;
        this.dx=0.1;
        this.dy=0.1;
        this.image=new Image();
        this.image.src='./images/nave_1.png';
        this.lasers=[];
        this.canShoot=true;
        this.maxLasers=20;
    }
    shootLaser(){
        if(this.canShoot){
            this.lasers.push({
                x:this.x+110,
                vx:2,
                y:this.y+85,
            })
        }
        this.canShoot=false;
    }
    newShip(){
        return {
            
        }
    }
    draw(){
        ctx.drawImage(
            this.image,
            this.x,
            this.y,
            100,
            100,
        );
    }
    drawLaser(){
        for(let i=0;i<this.lasers.length;i++){
            ctx.fillStyle='rgb(95, 218, 255)';
            ctx.beginPath();
            ctx.arc(
                this.lasers[i].x+=this.lasers[i].vx,
                this.lasers[i].y,
                10*Math.random()<8?8:10*Math.random(),
                0,2*Math.PI
            )
            if(this.lasers[i].x800){
                this.lasers.splice(this.lasers[i],1)
            }
            ctx.closePath();
            ctx.fill();
        }
    }
}
const background= new Background();
const ship=new Ship();
let frames=0;
window.onload=function(){
    function update(){
        frames++;
        ctx.clearRect(0,0,game.width,game.height)
        background.draw();
        ship.draw();
    }
    function startGame(){
        setInterval(()=>{
            update();
            ship.drawLaser()
        },10)
    }
    startGame();
}
document.addEventListener('keydown',(e)=>{
    e.preventDefault();
    if(ship.x>game.width-100){
        ship.x=game.width-100
    }
    if(ship.x<0){
        ship.x=0
    }
    if(ship.y>game.height-100){
        ship.y=game.height-100
    }
    if(ship.y<0){
        ship.y=0
    }
    switch(e.key){
        case 'a':
            ship.x-=5;
            break;
        case 'd':
            ship.x+=5;
            break;
        case 'w':
            ship.y-=5;
            break
        case 's':
            ship.y+=5;
            break
        case 'p':
            ship.canShoot=true;
            ship.shootLaser()
            break;
    }
});
document.addEventListener('keyup',(e)=>{
    switch(e.key){
        case 'p':
            ship.canShoot=true;
            console.log('aca no pasa nada')
            break;
    }
})