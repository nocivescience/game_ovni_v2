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
        this.image=new Image();
        this.image.src='./images/nave_1.png';
        this.lasers=[];
        this.canShoot=true;
        this.maxLasers=20;
    }
    newShip(){
        return {
            x:game.width/4,
            y:game.height/4,
            canShoot:true,
        }
    }
    drawShip(){
        ctx.drawImage(
            this.image,
            this.newShip()['x'],
            this.newShip()['y'],
            100,
            100,
        );
    }
    shootLaser(){
        if(this.canShoot){
            this.lasers.push({
                x:this.newShip()['x']+110,
                vx:2,
                y:this.newShip()['y']+85,
            })
        }
        this.canShoot=false;
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
        ship.drawShip();
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
    if(ship.newShip()['x']>game.width-100){
        ship.newShip()['x']=game.width-100
    }
    if(ship.newShip()['x']<0){
        ship.newShip()['x']=0
    }
    if(ship.newShip()['y']>game.height-100){
        ship.newShip()['y']=game.height-100
    }
    if(ship.newShip()['y']<0){
        ship.newShip()['y']=0
    }
    switch(e.key){
        case 'a':
            ship.newShip()['x']-=5;
            break;
        case 'd':
            ship.newShip()['x']+=5;
            break;
        case 'w':
            ship.newShip()['y']-=5;
            break
        case 's':
            ship.newShip()['y']+=5;
            break
        case 'p':
            ship.newShip()['canShoot']=true;
            ship.shootLaser()
            break;
    }
});
document.addEventListener('keyup',(e)=>{
    switch(e.key){
        case 'p':
            ship.newShip()['canShoot']=true;
            console.log('aca no pasa nada')
            break;
    }
})