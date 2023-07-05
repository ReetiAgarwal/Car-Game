const score = document.querySelector('.score');
const StartScreen = document.querySelector('.StartScreen');
const CarArea = document.querySelector('.CarArea');
const playArea = document.querySelector('.playArea');

document.addEventListener('keydown',keyDown)
document.addEventListener('keyup',keyUp)
StartScreen.addEventListener('click',StartGame)

const keys = {
    ArrowUp : false,
    ArrowDown : false,
    ArrowLeft : false,
    ArrowRight : false,
    a : false
}

const player={speed:8, sc:0}

function StartGame(){
    player.start = true;
    player.sc = 0;
    StartScreen.classList.add('hide');
    score.classList.remove('hide');
    let car = document.createElement('div');
    car.setAttribute('class','car');
    CarArea.appendChild(car);
    for(i=0;i<5;i++)
    {
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class','lines');
        roadLine.y = (i*140);
        roadLine.style.top = roadLine.y+"px";
        CarArea.append(roadLine);
    }
    for(i=0;i<3;i++)
    {
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class','enemyCar');
        enemyCar.y = (i+1)*350*-1;
        enemyCar.style.top = enemyCar.y+"px";
        enemyCar.style.left = Math.floor(Math.random()*350)+"px";
        enemyCar.style.backgroundImage = "url('car"+i+".png')";
        CarArea.append(enemyCar);
    }
    player.y = car.offsetTop;
    player.x = car.offsetLeft;
    window.requestAnimationFrame(gameplay);    
}

function keyDown(e)
{
    e.preventDefault();
    keys[e.key] = true;
}

function keyUp(e)
{
    e.preventDefault();
    keys[e.key] = false;
}

function moveLines()
{
    let lines = document.querySelectorAll('.lines');
    lines.forEach(function(line){
        if(line.y>=600)
            line.y -= 680;
        line.y += player.speed;
        line.style.top = line.y+"px";
    })
}

function isCollide(a,b)
{
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();
    return !((aRect.top>bRect.bottom)||(aRect.left>bRect.right)||(aRect.bottom<bRect.top)||(aRect.right<bRect.left))
}

function moveCars(car)
{
    let enemies = document.querySelectorAll('.enemyCar');
    enemies.forEach(function(enemy){
        if(isCollide(car,enemy))
        {
            CarArea.innerHTML = "";
            StartScreen.classList.remove('hide');
            score.classList.add('hide');
            StartScreen.innerHTML = "<p> Game Over! <br> Your final Score : " + player.sc + " <br> Click here to play again</p>";
            player.start = false;
        }
        if(enemy.y>=600)
        {
            enemy.y -= 900;
            enemy.x = Math.floor(Math.random()*400);
        }
        enemy.y += player.speed;
        enemy.style.top = enemy.y+"px";
        enemy.style.left =enemy.x+"px";
    })
}

let a = 0;
function gameplay(){
    if(player.start==true)
    {
        if(keys.a===true)
            player.speed = 15;
        else
            player.speed = 8;
        moveLines();
        let c = document.querySelector('.car');
        moveCars(c);
        score.innerText = "Score : "+player.sc;
        player.sc = player.sc+1;
        window.requestAnimationFrame(gameplay);
        let road = playArea.getBoundingClientRect();
        if(keys.ArrowUp==true && (player.y>road.y+70))
            player.y = player.y - player.speed;
        if(keys.ArrowDown==true && (player.y<(road.height-85)))
            player.y = player.y + player.speed;
        if(keys.ArrowLeft==true && (player.x>7.5))
            player.x = player.x - player.speed;
        if(keys.ArrowRight==true && (player.x<(road.width-55)))
            player.x = player.x + player.speed;
        c.style.top = player.y+"px";
        c.style.left = player.x+"px";
    }
}