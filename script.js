function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}


let score = 0; 
let passive = {
    moons: 0,
    marses: 0
};
let passiveIncr = 0;

let cursorStage = 0;
const cursorStages = [1,2,10,15,20,25,30,50]
const cursorPrices = [0,10,100,1000,5000,10000]

let x, y;

function updatePassiveIncr() {
    passiveIncr = passive.moons * 2;
    passiveIncr += passive.marses * 25;

    passiveElement.innerText = `+${passiveIncr}`;
}

const scoreElement = document.getElementById('score-field');
const passiveElement = document.getElementById('passive-field');
const planetElement = document.getElementById('planet');
const cursorPriceElement = document.getElementById('cursor-price');
const cursorIncrElement = document.getElementById('cursor-incr');


function iterPassive() {
    score += passiveIncr;
}

function updateScore() {
    scoreElement.innerText = score.toString();
}


document.getElementById('planet').addEventListener('click', function() {
    score += cursorStages[cursorStage];

    clickTooltipElement = document.createElement('div');
    clickTooltipElement.classList = 'click-tooltip';
    clickTooltipElement.innerText = `+${cursorStages[cursorStage]}`;
    clickTooltipElement.style.top = `calc(${y}% + ${getRandomInt(-100,100)}px - 20px)`;
    clickTooltipElement.style.left = `calc(${x}% + ${getRandomInt(-100,100)}px - 20px)`;

    document.body.appendChild(clickTooltipElement);

    setTimeout(function() {
        try {
            const elems = Array(document.getElementsByClassName('click-tooltip'));
            elems[elems.length - 1].remove();
        } catch {}
    }, 1000);
});



function addPlanet(type) {
    updatePassiveIncr();
    const element = document.createElement('div')
    element.classList = `rotating-planet ${type}-planet`
    element.style = `animation: rotate-planet-${type} ${getRandomInt(10, 50) / 10}s linear infinite`;
    planetElement.appendChild(element);
}

document.getElementById('cursor-buy').addEventListener('click', function() {
    const price = cursorPrices[cursorStage + 1];
    if (score < price)
        return;

    score -= price;

    cursorStage += 1;

    cursorPriceElement.innerText = cursorPrices[cursorStage + 1].toString();
    cursorIncrElement.innerText = `+${cursorStages[cursorStage + 1]}`
});

document.getElementById('moon-buy').addEventListener('click', function() {
    if (score < 100)
        return;

    score -= 100;

    passive.moons += 1;
    addPlanet('moon');
});

document.getElementById('mars-buy').addEventListener('click', function() {
    if (score < 1000)
        return;

    score -= 1000;

    passive.marses += 1;
    addPlanet('mars');
});

document.addEventListener('mousemove', evt => {
    x = evt.clientX / innerWidth * 100;
    y = evt.clientY / innerHeight * 100;
});


setInterval(iterPassive, 1000);
setInterval(updateScore, 1000 / 30);
