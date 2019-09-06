let levels = [
    "Yesterday I ____ at the gas station.", "4",
    "I ____ going to be at the gas station", "1",
    "Yesterday I ____ at the mall","4"
];

let music, ding, death, wrong, dead = false, lives = livesMax = 3, failTime = 2.5*30, fail, score = 0, level = 1;

function preload() {
    soundFormats('mp3');
    music = loadSound('Music.mp3');
    ding = loadSound('Ding.mp3');
    wrong = loadSound('Wrong.mp3');
    death = loadSound('Death.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    textSize(36);
    music.setVolume(.7);
    music.playMode("untilDone");
    ding.setVolume(.3);
    wrong.setVolume(.3);
    death.setVolume(.3);
}

function draw() {
    music.play();
    background(255, map(fail, 0, failTime, 255, 0), map(fail, 0, failTime, 255, 0));
    fail = max(fail-1,0);
    if (dead && fail == 0) {dead = false;lives = livesMax;score=0;level=1;}

    textAlign(LEFT, TOP);
    text("1: Am", 0, 0);
    text("2: Are", width/5, 0);

    textAlign(CENTER);
    text("3: Is", width/2, 0);

    textAlign(RIGHT);
    text("4: Was", width/5*4, 0);
    text("5: Were", width, 0);

    textAlign(CENTER, CENTER);
    text(levels[level*2-2], width/2, height/2);
    push();
    fill(255);
    textSize(50);
    text(dead?"You died!\nScore: "+score:"", width/2, height/3);
    pop();

    textAlign(LEFT, BOTTOM);
    text("Score: "+score, 0, height);

    textAlign(RIGHT);
    text("💖".repeat(lives)+"💔".repeat(livesMax-lives), width-15, height-20);

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
    if (keyCode >= 49 && keyCode <= 53 && !dead) {
        if (key == levels[level*2-1]) {
            ding.play();
            level++;
            score += 20
        } else {
            lives--;
            dead = lives < 1;
            fail = failTime*(dead?2:1);
            (dead?death:wrong).play();
            score -= 5;
        }
    }
}
