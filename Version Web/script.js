const allCases = document.querySelectorAll(".container div");
const firstPlayerBoard = [140, 160, 180, 200, 220];
const secondPlayerBoard = [159, 179, 199, 219, 239];
const avanceBall = { x: 0, y: 1 };
let ball = 189;
let firstMove = 0, secondMove = 0;

document.addEventListener("keydown", (ev) => {
    switch (ev.key) {
        case "z":
            firstMove += 1;
            break;
        case "s":
            firstMove -= 1;
            break;
        case "ArrowUp":
            secondMove += 1;
            break;
        case "ArrowDown":
            secondMove -= 1;
            break;
        default:
            return;
    }
})

document.addEventListener("keyup", (ev) => {
    switch (ev.key) {
        case "z":
            firstMove -= 1;
            break;
        case "s":
            firstMove += 1;
            break;
        case "ArrowUp":
            secondMove -= 1;
            break;
        case "ArrowDown":
            secondMove += 1;
            break;
        default:
            return;
    }
})

const sleep = async (delay) => {
    return new Promise(resolve => setTimeout(resolve, delay));
}

const setupLocation = () => {
    for(let i = 0; i < 400; i++) {
        if(firstPlayerBoard.includes(i) || secondPlayerBoard.includes(i) || i == ball) {
            if(!allCases[i].classList.contains("colored")) {
                allCases[i].classList.add("colored");
            }
        } else if(allCases[i].classList.contains("colored")) {
            allCases[i].classList.remove("colored");
        }
    }
}

const setup = () => {
    setupLocation();
}

const checkLeftSide = () => {
    const temp = ball - 1;
    const locationReception = firstPlayerBoard.indexOf(temp);
    if(locationReception != -1) {
       avanceBall.y = 1;
        switch (locationReception) {
            case 0:
                avanceBall.x = -2; 
                break;

            case 1:
                avanceBall.x = -1;
                break;

            case 2:
                avanceBall.x = 0; 
                break;

            case 3:
                avanceBall.x = 1;
                break;

            case 4:
                avanceBall.x = 2;
                break;
            
            default: 
                break;
        } 
    } else {
        Serial.println("1 lose");
        // alert("1 lose");
        // window.location.reload();
    }
};

const checkRightSide = () => {
    const temp = ball + 1;
    const locationReception = secondPlayerBoard.indexOf(temp);
    if(locationReception != -1) {
        avanceBall.y = -1;
        switch (locationReception) {
            case 0:
                avanceBall.x = -2; 
                break;

            case 1:
                avanceBall.x = -1;
                break;

            case 2:
                avanceBall.x = 0; 
                break;

            case 3:
                avanceBall.x = 1;
                break;

            case 4:
                avanceBall.x = 2;
                break;
            
            default: 
                break;
        }
    } else {
        alert("2 lose");
        window.location.reload();
    }
};

const moveBall = () => {
    if((ball - 1) % 20 == 0) {
        checkLeftSide();
    } else if((ball - 18) % 20 == 0) {
        checkRightSide();
    }
    ball += avanceBall.x * 20 + avanceBall.y;
    if(parseInt(ball / 20) >= 20) {
        console.log("Bruh");
        avanceBall.x -= 2 * avanceBall.x
    } else if(ball < 0) {
        console.log("AH !");
        avanceBall.x -= 2 * avanceBall.x
        console.log(avanceBall.x);
    }
};

const readFirst = () => {
    firstMove += 0;
}

const readSecond = () => {
    secondMove += 0;
}

const moveFirstPlayer = () => {
    readFirst();
    if(firstMove == 0) return;
    if(firstMove < 0) {
        if(firstPlayerBoard[4] == 380) return;
        const tempTab = [...firstPlayerBoard]
        for (let i = 0; i < 4; i++) firstPlayerBoard[i] = tempTab[i + 1];
        firstPlayerBoard[4] += 20;
    } else {
        if(firstPlayerBoard[0] == 0) return;
        const tempTab = [...firstPlayerBoard]
        for (let i = 0; i < 4; i++) firstPlayerBoard[i + 1] = tempTab[i];
        firstPlayerBoard[0] -= 20;
    }
};

const moveSecondPlayer = () => {
    readSecond();
    if(secondMove == 0) return;
    if(secondMove < 0) {
        if(secondPlayerBoard[4] == 399) return;
        const tempTab = [...secondPlayerBoard]
        for (let i = 0; i < 4; i++) secondPlayerBoard[i] = tempTab[i + 1];
        secondPlayerBoard[4] += 20;
    } else {
        if(secondPlayerBoard[0] == 19) return;
        const tempTab = [...secondPlayerBoard]
        for (let i = 0; i < 4; i++) secondPlayerBoard[i + 1] = tempTab[i];
        secondPlayerBoard[0] -= 20;
    }
};

const loop = async () => {
    while (true) {
        await sleep(50);
        moveBall();
        moveFirstPlayer();
        moveSecondPlayer();
        setupLocation();
    }
}

const mainGame = () => {
    setup();
    loop();
}

mainGame();