const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

let canvasW = canvas.getBoundingClientRect().width;
let canvasH = canvas.getBoundingClientRect().height;

let countBlocks = 36;
let score = 0;

let blocks = [];

let player = {
    width: 200,
    height: 25,
    x: canvasW / 2,
    y: 650,
    color: '#2271b3',
    xr: false,
    xl: false,
}
let brick = {
    x: 20,
    y: 20,
    width: 130,
    height: 25,
    color: '#aa303f',
}

let ball = {
    x: canvasW / 2,
    y: canvasH / 2,
    color: '#ff1c30',
    xl: false,
    xr: false,
    yu: false,
    yd: true,
}

function drawBall() {
    if(ball.yd) {
        ball.y += 5;
    } else if(ball.yu) {
        ball.y -= 5;
    }
    if(ball.xr) {
        ball.x += 5;
    } else if (ball.xl) {
        ball.x -= 5;
    }

    ctx.beginPath();
    ctx.arc(ball.x, ball.y, 13, 0, Math.PI * 2, );
    ctx.closePath();
    ctx.fillStyle = ball.color;
    ctx.fill();
}

function drawPlayer() {
    if(player.xr) {
        player.x += 5;
    } else if(player.xl) {
        player.x -= 5;
    }
    if(player.x <= 0) {
        player.x = 0;
    } else if(player.x >= 1120) {
        player.x = 1120;
    }

    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}
function addBlock() {
    for (let i = 0; i < countBlocks; i++) {
        let block = {
            x: brick.x,
            y: brick.y,
        };
        brick.x += 135;
        if (brick.x >= 1140) {
            brick.x = 20;
            brick.y += 40;
        }
        blocks.push(block);
    }
}
addBlock();
function drawBlocks() {
    for(let value of blocks) {
        ctx.fillStyle = '#aa303f';
        ctx.fillRect(value.x, value.y, brick.width, brick.height);
    }
}
window.onkeydown = (e) => {
    if(e.keyCode === 39) {
        player.xr = true;
    } else if(e.keyCode === 37) {
        player.xl = true;
    }
}
window.onkeyup = (e) => {
    if(e.keyCode === 39) {
        player.xr = false;
    } else if(e.keyCode === 37) {
        player.xl = false
    }
}


function Game(timestamp) {

    ctx.clearRect(0, 0, canvasW, canvasH);
    drawPlayer();
    drawBall();
    drawBlocks();

    // Draw score
    ctx.fillStyle = '#000';
    ctx.font = "15pt Arial";
    ctx.fillText(`Score: ${score}`, 20, canvasH - 20, 100);

    // Hit block
    for(let i = 0; i < blocks.length; i++) {
        if(ball.y - 20 === blocks[i].y && ball.x >= blocks[i].x && ball.x <= blocks[i].x + 140) {
            score += 100;
            blocks.splice(i,1);
            ball.yu = !ball.yu;
            ball.yd = !ball.yd;
        }
    }


    if(ball.x <= 0) {
        ball.xl = false;
        ball.xr = true;
    }
    if(ball.x >= 1240) {
        ball.xl = true;
        ball.xr = false;
    }

    if(ball.y >= 720 || ball.y <= 0) {
        ball.yd = !ball.yd;
        ball.yu = !ball.yu;
    }
    if(ball.y >= player.y && ball.x <= player.x + player.width && ball.x >= player.x) {
        if(ball.x <= player.x + 50) {
            ball.yd = !ball.yd;
            ball.yu = !ball.yu;
            ball.xl = !ball.xl;
        } else if(ball.x >= player.x + 60) {
            ball.yd = !ball.yd;
            ball.yu = !ball.yu;
            ball.xr = !ball.xr;
        } else {
            ball.yd = !ball.yd;
            ball.yu = !ball.yu;
        }
    }

    // Final
    if(score >= countBlocks * 100) {
        ctx.fillStyle = '#000';
        ctx.font = "15pt Arial";
        ctx.fillText('You win', canvasW / 2, canvasH / 2, 80);
    }
    requestAnimationFrame(Game);
}
requestAnimationFrame(Game);