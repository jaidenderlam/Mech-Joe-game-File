//initial display of the screen
function drawStart() {
    drawMainStuff();
    //Press start to Play
    shapes.fillStyle = "rgba(37,59,93,0.65)";
    shapes.fillRect(c.width / 4, c.height / 4 + 50, 400, 150);
    // Title
    shapes.font = "bold 180% Times New Roman";
    shapes.fillStyle = "#DB9DC2";
    shapes.fillText("Press play to start!", c.width / 4 + 75, c.height * 0.5);
}
// while the game is operating
function drawrunGame() {
    cartoon();
    distanceCount();
    distanceConversion();
    bestdistanceConversion();
    checkCollision();
    moveSludges();
    movePow();
    jump();

    drawIt();
}
//when  the game is over
function drawgameover() {
    cartoon();
    gameOver();
if (yout){
    willhelm.play();
    yout = false;
    setTimeout(() => {
        yout = true;
    },3000)
} 
    //game over line
    shapes.fillStyle = "#8E0909";
    shapes.fillText(" Game Over", c.width / 4 + 150, c.height / 4 + 130);
}

//draw th main component and character
function cartoon() {
    drawMainStuff();
    drawPerson();
}
//draws main components
function drawMainStuff() {
    // background heading
    shapes.fillStyle = "#253B5D";
    shapes.fillRect(0, 0, c.width, 80);
    // Title
    shapes.font = "bold 180% Times New Roman";
    shapes.fillStyle = "red";
    shapes.fillText("The Mechanic Man Game", c.width / 2 - 150, c.height * 0.1);

    // scores bar
    shapes.fillStyle = "#253B5D";
    shapes.fillRect(0, c.height - 80, c.width, 80);
    // distance
    shapes.font = "bold 180% Times New Roman";
    shapes.fillStyle = "red";
    shapes.fillText(
        "Distance: " + distanceConversion(),
        c.width / 2 - 250,
        c.height * 0.93,
    );
    shapes.fillText(
        "Best Distance: " + bestdistanceConversion(),
        c.width / 2 + 40,
        c.height * 0.93,
    );

    // health
    shapes.drawImage(
        healthbarImg,
        healthbar.x,
        healthbar.y,
        healthbar.w,
        healthbar.h,
    );

    // landscape base
    shapes.fillStyle = "#535E60";
    shapes.fillRect(0, c.height - 120, c.width, 40);
}

let bestDistance = 0;
function reset() {
    distances = 0;
    health = 100;
    canTakeDamage = true;
    healingIspossible = true;
    yout = true;
    character = MaleJoeImg;


    game = "start";
    healthbarImg = healthbarFull;
    keyIspressed = true;
    pow1 = {
        x: c.width + 150,
        y: c.height - 200,
        w: 50,
        h: 50,
        visible: true,
    };

    pow2 = {
        x: c.width + 150,
        y: c.height - 200,
        w: 50,
        h: 50,
        visible: true,
    };
    healthbar = {
        x: c.width - 120,
        y: c.height * 0.2 - 10,
        w: 50,
        h: 80,
    };

    person = {
        x: c.width / 4 - 90,
        y: c.height - 230,
        w: 86,
        h: 110,
    };

    sludge1 = {
        x: Math.random() * 800 + 400,
        y: c.height - 135,
        w: 80,
        h: 20,
    };

    sludge2 = {
        x: Math.random() * 800 + 800,
        y: c.height - 135,
        w: 80,
        h: 20,
    };

    sludge3 = {
        x: Math.random() * 800 + 1200,
        y: c.height - 135,
        w: 80,
        h: 20,
    };

    // Play menu music when user first clicks anywhere
    document.addEventListener(
        "click",
        () => {
            if (game === "start" && initialScreenmusic.paused) {
                initialScreenmusic.play();
            }
        },
        { once: true },
    );
}

function gameOver() {

    if (distances > bestDistance) {
        bestDistance = distances;
        distances = 0;
    }
    character = MaleJoeImgDead;
    musicgameOn.pause();
    musicgameOn.currentTime = 0;

    game = "gameover";
    drawIt();
    setTimeout(reset, 3000);
}

function distanceCount() {
    distances += 0.5;
}

function distanceConversion() {
    if (distances >= 1000) {
        return (distances / 1000).toFixed(1) + " km";
    }
    return distances.toFixed(1) + " m";
}

function bestdistanceConversion() {
    if (bestDistance >= 1000) {
        return (bestDistance / 1000).toFixed(1) + " km";
    }
    return bestDistance.toFixed(1) + " m";
}

function moveSludges() {
    //sludge 1
    sludge1.x += -7;
    if (sludge1.x + sludge1.w < 0) {
        sludge1.x = Math.random() * 100 + 800;
    }
    //sludge 2
    sludge2.x += -7;
    if (sludge2.x + sludge2.w < 0) {
        sludge2.x = Math.random() * 100 + 1800;
    }
    //sludge 3
    sludge3.x += -7;
    if (sludge3.x + sludge3.w < 0) {
        sludge3.x = Math.random() * 100 + 3500;
    }
}

function movePow() {
    //pow 1
    pow1.x += -3;
    if (pow1.x + pow1.w < -10) {
        pow1.x = Math.random() * 300 + 700;
    }

    //pow 2
    pow2.x += -3;
    if (pow2.x + pow2.w < -10) {
        pow2.x = Math.random() * 1000 + 700;
    } 
}

function drawIt() {
    drawSludge();
    drawPow();
}
function drawSludge() {
    shapes.drawImage(oilsludge, sludge1.x, sludge1.y, sludge1.w, sludge1.h);
    shapes.drawImage(oilsludge, sludge2.x, sludge2.y, sludge2.w, sludge2.h);
    shapes.drawImage(oilsludge, sludge3.x, sludge3.y, sludge3.w, sludge3.h);
}

// person altributes
function drawPerson() {
    shapes.drawImage(character, person.x, person.y, person.w, person.h);
}

function drawPow() {
    // draw pow
    if (pow1.visible) {
        shapes.drawImage(powerup, pow1.x, pow1.y, pow1.w, pow1.h);
    }
    if (pow2.visible) {
        shapes.drawImage(powerup, pow2.x, pow2.y, pow2.w, pow2.h);
    }
}

function checkCollision() {
    // declare global variable
    let personRight = person.x + person.w;
    let personBottom = person.y + person.h;

    // if jump to the top of canva
    if (person.y <= 130) {
        person.y = 130;
    }
    function checksludgeCollision(s) {
        let sludgeRight = s.x + s.w;
        let sludgeBottom = s.y + s.h;

        if (
            person.x < sludgeRight &&
            personRight > s.x &&
            person.y < sludgeBottom &&
            personBottom > s.y
        ) {
            if (canTakeDamage) {
                health -= 25;
                updateHealthBar();
                if (health <= 0 && game !== "gameover") {
                    gameOver();
                }
                canTakeDamage = false;
                setTimeout(() => {
                    canTakeDamage = true;
                }, 1000);
            }
        }
    }
    // sludge collision
    checksludgeCollision(sludge1);
    checksludgeCollision(sludge2);
    checksludgeCollision(sludge3);

    // if collect these power up (gain xp)
    CollectpowerUp(pow1);
    CollectpowerUp(pow2);

    function CollectpowerUp(P) {
        let pRight = P.x + P.w;
        let pBottom = P.h + P.y;

        if (
            person.x < pRight &&
            personRight > P.x &&
            person.y < pBottom &&
            personBottom > P.y
        ) { 
            if (healingIspossible){
            health += 25;
            updateHealthBar();
            healing.currentTime = 0;
            healing.play(); 
                healingIspossible = false;
                setTimeout(() => {
                     healingIspossible = true;
                }, 1000)
            }
            if (health > 100) {
                health = 100;
            }


            P.visible = false;

            setTimeout(() => {
                P.x = Math.random() * 500 + 700;
                P.visible = true;
            }, 3000);
        }
    }
}

// health bar indication for arising
function updateHealthBar() {
    if (health <= 0) {
        healthbarImg = healthbarempty;
    } else if (health === 25) {
        healthbarImg = healthbarquarter;
    } else if (health === 50) {
        healthbarImg = healthbarhalf;
    } else if (health === 75) {
        healthbarImg = healthbar3quarter;
    } else {
        healthbarImg = healthbarFull;
    }
}

function jump() {
    if (person.y < c.height - 230) {
        person.y += 3;
        character = MaleJoeImgJump;
    } else {
        character = MaleJoeImg;
    }
}
