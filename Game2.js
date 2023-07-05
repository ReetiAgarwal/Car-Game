const score = document.querySelector('.score');
const StartScreen = document.querySelector('.StartScreen');
const CarArea = document.querySelector('.CarArea');
const playArea = document.querySelector('.playArea');

document.addEventListener('keydown',keyDown)
document.addEventListener('keyup',keyUp)

const keys = {
    ArrowUp : false,
    ArrowDown : false,
    ArrowLeft : false,
    ArrowRight : false
}

const player={speed:5, score:0}

const color = ['red','yellow','green']

function keyDown(e)
{
    e.preventDefault();
    keys[e.key] = true;
    if(e.key===" ")
    {
        let car = document.createElement('div');
        car.setAttribute('class','car');
        let roadLine;
        if(StartScreen.classList.contains('hide'))
        {
            if(CarArea.hasChildNodes())
                CarArea.removeChild(CarArea.children[0]);
            for(i=0;i<5;i++)
            {
                if(CarArea.hasChildNodes())
                    CarArea.removeChild(CarArea.children[0]);
            }
            for(i=0;i<3;i++)
            {
                if(CarArea.hasChildNodes())
                    CarArea.removeChild(CarArea.children[0]);
            }
            StartScreen.classList.remove('hide');
            CarArea.classList.add('hide');
            player.start = false;
        }
        else
        {
            player.start = true;
            StartScreen.classList.add('hide');
            CarArea.classList.remove('hide');
            window.requestAnimationFrame(gameplay);
            CarArea.appendChild(car);
            for(i=0;i<5;i++)
            {
                roadLine = document.createElement('div');
                roadLine.setAttribute('class','lines');
                roadLine.y = (i*140);
                roadLine.style.top = roadLine.y+"px";
                CarArea.append(roadLine);
            }
            for(i=0;i<3;i++)
            {
                enemyCar = document.createElement('div');
                enemyCar.setAttribute('class','enemyCar');
                enemyCar.y = (i+1)*350*-1;
                enemyCar.style.top = enemyCar.y+"px";
                enemyCar.style.left = Math.floor(Math.random()*350)+"px";
                enemyCar.style.backgroundColor = color[i];
                CarArea.append(enemyCar);
            }
        }
        player.y = car.offsetTop;
        player.x = car.offsetLeft;

    }
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
            if(CarArea.hasChildNodes())
                CarArea.removeChild(CarArea.children[0]);
            for(i=0;i<5;i++)
            {
                if(CarArea.hasChildNodes())
                    CarArea.removeChild(CarArea.children[0]);
            }
            for(i=0;i<3;i++)
            {
                if(CarArea.hasChildNodes())
                    CarArea.removeChild(CarArea.children[0]);
            }
            StartScreen.classList.remove('hide');
            CarArea.classList.add('hide');
            player.start = false;
            score.innerHTML = "<p> Game Over! <br> Your final Score : " + player.score + "</p>";
            player.score = 0;
        }
        if(enemy.y>=600)
        {
            enemy.y -= 900;
            enemy.x = Math.floor(Math.random()*350);
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
        moveLines();
        //accessible due to property of closure
        let c = document.querySelector('.car');
        moveCars(c);
        window.requestAnimationFrame(gameplay);
        score.innerText = "Score : "+player.score;
        player.score = player.score+1;
        
        let road = playArea.getBoundingClientRect();
        let car = document.querySelector('.car');
        if(keys.ArrowUp==true && (player.y>road.y+70))
            player.y = player.y - player.speed;
        if(keys.ArrowDown==true && (player.y<(road.height-80)))
            player.y = player.y + player.speed;
        if(keys.ArrowLeft==true && (player.x>0))
            player.x = player.x - player.speed;
        if(keys.ArrowRight==true && (player.x<(road.width-50)))
            player.x = player.x + player.speed;
        car.style.top = player.y+"px";
        car.style.left = player.x+"px";
    }
}