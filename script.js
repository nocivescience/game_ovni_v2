const game=document.getElementById('game');
const ctx= game.getContext('2d');
game.width=window.innerWidth;
game.height=window.innerHeight;
let frames=0;
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
        this.images=[]
        for(let i of [1,2,3]){
            this.image=new Image();
            this.image.src=`./images/nave_${i}.png`;
            this.images.push(this.image)
        }
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
    draw(){
        this.image=this.images[0]
        if(frames%8==0){
            if(this.image==this.images[0]){
                this.image=this.images[1]
            }else{
                if(this.image==this.images[1]){
                    this.image=this.images[2]
                }else{
                    if(this.image==this.images[2]){
                        this.image=this.images[0]
                    }
                }
            }
        }
        ctx.drawImage(
            this.image,
            this.x,
            this.y,
            100,
            100,
        );
        ctx.strokeStyle='red';
        ctx.strokeRect(this.x,this.y,100,100);
        ctx.beginPath();
        ctx.fillStyle='yellow'
        ctx.moveTo(this.x,this.y+80)
        ctx.lineTo(this.x,this.y+50+40);
        ctx.lineTo(this.x-60*Math.random(),this.y+85);
        ctx.fill();
        ctx.closePath();
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
class EnemyYellow{
    constructor(){
        this.enemiesYellow=[];
        this.coordEnemies=[];
        this.x=game.width-100;
        this.y=game.height;
        for(let i of [1,2]){
            let enemy=new Image();
            enemy.src=`./images/monster_a_${i}.png`;
            this.enemiesYellow.push(enemy);
        }
        this.enemy=this.enemiesYellow[0];
    }
    coordsYellow(){
        this.coordEnemies.push({
            x:this.x,
            y:this.y,
            random: Math.random(),
        })
    }
    drawEnemiesYellow(){
        if(frames%1000==0){
            this.enemy=this.enemy==this.enemiesYellow[0]?this.enemiesYellow[1]:this.enemiesYellow[0]
        }
        for(let i=0;i<this.coordEnemies.length;i++){
            ctx.drawImage(
                this.enemy,
                this.coordEnemies[i]['x']--,
                this.coordEnemies[i]['y']*this.coordEnemies[i]['random'],
                30,
                50,
            )
            ctx.strokeStyle='blue'
            ctx.strokeRect(
                this.coordEnemies[i].x,
                this.coordEnemies[i].y*this.coordEnemies[i]['random'],
                30,
                50,
            )
        }
    }
}
class EnemyBlue{
    constructor(){
        this.enemiesBlue=[];
        this.coordEnemiesBlue=[];
        this.x=game.width-150;
        this.y=game.height;
        for(let i of [1,2]){
            let enemy=new Image();
            enemy.src=`./images/monster_b_${i}.png`;
            this.enemiesBlue.push(enemy);
        }
        this.enemy=this.enemiesBlue[0];
    }
    coordsBlue(){
        this.coordEnemiesBlue.push({
            x:this.x,
            y:this.y,
            random: Math.random(),
        })
    }
    drawEnemiesBlue(){
        if(frames%1000==0){
            this.enemy=this.enemy==this.enemiesBlue[0]?this.enemiesBlue[1]:this.enemiesBlue[0]
        }
        for(let i=0;i<this.coordEnemiesBlue.length;i++){
            ctx.drawImage(
                this.enemy,
                this.coordEnemiesBlue[i]['x']--,
                this.coordEnemiesBlue[i]['y']*this.coordEnemiesBlue[i]['random'],
                30,
                50,
            );
            ctx.strokeStyle='red'
            ctx.strokeRect(
                this.coordEnemiesBlue[i]['x'],
                this.coordEnemiesBlue[i]['y']*this.coordEnemiesBlue[i]['random'],
                30,
                50
            )
        }
    }
}
class Lifes{
    constructor(num){
        this.num=num;
        this.images=[];
    }
    draw(){
        
    }
}
const background= new Background();
const ship=new Ship();
const enemiesYellow= new EnemyYellow();
const enemiesBlue= new EnemyBlue();
const lifes=new Lifes(3);
window.onload=function(){
    function update(){
        frames+=10;
        ctx.clearRect(0,0,game.width,game.height)
        background.draw();
        ship.draw();
        ship.drawLaser()
        enemiesYellow.drawEnemiesYellow();
        enemiesBlue.drawEnemiesBlue();
        lifes.draw();
        enemiesYellow.coordEnemies.forEach(enemy=>{
            if(Math.abs(ship.x+200-enemy['x']+30)<200&&Math.abs(ship.y+100-enemy['y']+40)<200){
                console.log('collision')
            }
        });
        enemiesBlue.coordEnemiesBlue.forEach(enemy=>{
            if(Math.abs(ship.x+100-enemy['x'+30])<200&&Math.abs(ship.y+100-enemy['y']+40)<200){
                console.log('collision')
            }
        })
    }
    function startGame(){
        setInterval(()=>{
            if(frames%1000==0){
                enemiesYellow.coordsYellow();
                enemiesBlue.coordsBlue();
            }
            update();
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
            break;
    }
})