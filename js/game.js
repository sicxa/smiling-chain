const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

const backgroundImage = new Image();
backgroundImage.src = 'assets/bg-blockchain.png';

const playerImage = new Image();
playerImage.src = 'assets/smiling-chain.png';

const blockImage = new Image();
blockImage.src = 'assets/eth-block.png';

let player = {
    x: 100,
    y: 400,
    width: 64,
    height: 64,
    speed: 4
};

let block = {
    x: Math.random() * (canvas.width - 64),
    y: Math.random() * (canvas.height - 64),
    width: 48,
    height: 48
};

let score = 0;
let keys = {};

document.addEventListener('keydown', function (e) {
    keys[e.key] = true;
});
document.addEventListener('keyup', function (e) {
    keys[e.key] = false;
});

function isColliding(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

function update() {
    if (keys['ArrowLeft']) player.x -= player.speed;
    if (keys['ArrowRight']) player.x += player.speed;
    if (keys['ArrowUp']) player.y -= player.speed;
    if (keys['ArrowDown']) player.y += player.speed;

    player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));
    player.y = Math.max(0, Math.min(canvas.height - player.height, player.y));

    if (isColliding(player, block)) {
        score++;
        block.x = Math.random() * (canvas.width - block.width);
        block.y = Math.random() * (canvas.height - block.height);
    }
}

function draw() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
    ctx.drawImage(blockImage, block.x, block.y, block.width, block.height);

    ctx.fillStyle = '#ffffff';
    ctx.font = '24px Arial';
    ctx.fillText('Blocks Collected: ' + score, 20, 30);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

backgroundImage.onload = function () {
    gameLoop();
};
