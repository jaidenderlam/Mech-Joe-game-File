const c = document.getElementById("gameCanvas");
const shapes = c.getContext("2d");
c.width = 700;
c.height = 500;

//gets the source for image and audios

// inital screen sound
const initialScreenmusic = document.createElement("audio");
initialScreenmusic.src = "sound/initialScreen.wav";
initialScreenmusic.loop = true;
initialScreenmusic.volume = 0.6;


// while game is on music
const musicgameOn = document.createElement("audio");
musicgameOn.src = "sound/GameMusic.wav";
musicgameOn.loop = true;
musicgameOn.volume = 0.6;

let jumpMusic = document.createElement("audio");
jumpMusic.src = "sound/jumpSound.wav";
jumpMusic.volume = 0.75;

let willhelm = document.createElement("audio");
willhelm.src = "sound/screamAloud.wav";
willhelm.volume = 1;

let healing = document.createElement("audio");
healing.src = "sound/healing.wav";

//character attributes
let MaleJoeImg = document.createElement("img");
MaleJoeImg.src = "img/maleMechJoe.png";

let MaleJoeImgJump = document.createElement("img");
MaleJoeImgJump.src = "img/maleMechJoeJump.png";

let MaleJoeImgDead = document.createElement("img");
MaleJoeImgDead.src = "img/maleMechJoedead.png";

let character = MaleJoeImg;

// power up
let powerup = document.createElement("img");
powerup.src = "img/powerUpImg.png";

// damages
let oilsludge = document.createElement("img");
oilsludge.src = "img/oilsludge.png";

// health bar status
let healthbarFull = document.createElement("img");
healthbarFull.src = "img/healthBar1.png";

let healthbar3quarter = document.createElement("img");
healthbar3quarter.src = "img/healthBar2.png";

let healthbarhalf = document.createElement("img");
healthbarhalf.src = "img/healthBar3.png";

let healthbarquarter = document.createElement("img");
healthbarquarter.src = "img/healthBar4.png";

let healthbarempty = document.createElement("img");
healthbarempty.src = "img/healthBar5.png";

let game;
let person;
let pow1, pow2;
let healthbar;
let healthbarImg;
let sludge1, sludge2, sludge3;
let distances;
let health;
let canTakeDamage;
let keyIspressed;
let healingIspossible;
let yout;
reset();

window.addEventListener("load", draw);

// defines a function to start game
function draw() {
    shapes.clearRect(0, 0, c.width, c.height);

    if (game === "start") {
        drawStart();
    } else if (game === "gameison") {
        drawrunGame();
    } else {
        drawgameover();
        keyIspressed = false;
    }

    //request ANIMATION FRAME
    requestAnimationFrame(draw);
}

const StartACar = document.getElementById("StartTheCar");

StartACar.addEventListener("click", function () {
    startGame();
    musicPlay();

    document.addEventListener("keydown", function (event) {
        if (event.key === "ArrowUp" && keyIspressed === true) {
            person.y -= 100;

            jumpMusic.currentTime = 0;
            jumpMusic.play();
            keyIspressed = false;

            setTimeout(() => {
                keyIspressed = true;
            }, 400);
        }
    });

    document.addEventListener("keyup", mouseUpHandler);

    function mouseUpHandler() {
        jumpMusic.pause();
    }
});

function musicPlay() {
    initialScreenmusic.pause();
    initialScreenmusic.currentTime = 0;

    musicgameOn.play().catch((e) => console.log("audio play locked:", e));
}
function startGame() {
    //start the initiation of the game
    if (game === "start") {
        game = "gameison";
    }
}
