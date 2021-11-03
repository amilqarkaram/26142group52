const stats = document.querySelectorAll('.stat');
const powers = document.querySelectorAll('.power');
const costs = document.querySelectorAll('.cost');
const inputs = document.querySelectorAll('input');
//const outputs = document.querySelectorAll('output');
const getmoney = document.querySelector('#moneyclick');
const button1owned = document.querySelector('.getbutton1');
const button2owned = document.querySelector('.getbutton2');
const button3owned = document.querySelector('.getbutton3');
const button4owned = document.querySelector('.getbutton4');
const button5owned = document.querySelector('.getbutton5');
const button6owned = document.querySelector('.getbutton6');

getmoney.addEventListener('click', updateBudget);
button1owned.addEventListener('click', updateButtonOne);
button2owned.addEventListener('click', updateButtonTwo);
button3owned.addEventListener('click', updateButtonThree);
button4owned.addEventListener('click', updateButtonFour);
button5owned.addEventListener('click', updateButtonFive);
button6owned.addEventListener('click', updateButtonSix);

// These are all currently placeholder values
// statData: year, budget, population, co2, approval, total required energy
let statData = [2009, 0, 300, 320, 90, 30000];
let costData = new Array(6);
let powerData = [0,0,0,0,0,0];
let plantData = [0,0,0,0,0,0];

let seconds = 0;
let el = document.getElementById('seconds-counter');
let cancel = setInterval(incrementSeconds, 5000);

let obj = {
    peopleIncrease: 1,
    reincrease: 1
}

let sumEnergy = 0;

let i = 0;
inputs.forEach(input => {
    input.setAttribute('value', powerData[i++]);
});

function updateAllStats() {
    sumEnergy = 0;
    i = 0;
    costs.forEach(cost => {
        sumEnergy += powerData[i++];
    });
    sumEnergy *= seconds;

    statData[1] -= sumEnergy;
    statData[2] += exponentialIncrease(obj);
    statData[3] += plantData[0] + plantData[1];
    statData[4] -= statData[3] / 320 - 1;
    statData[5] = requiredPowerCalc(statData[2]);

    updateBudget();

    i = 0;
    powers.forEach(power => {
        powerData[i] = plantData[i] * costData[i++];
    });

    i = 0;
    powers.forEach(power => {
        power.textContent = (powerData[i++]).toLocaleString("en-US");
    });

    i = 0;
    costs.forEach(cost => {
        cost.firstElementChild.textContent = costData[i++];
    });
    /*
    i = 0;
    outputs.forEach(output => {
        output.textContent = powerData[i++];
    });
    */
}


function updateCostData() {
    if (statData[0] == 2010) {
        costData = [111, 82, 96, 107, 248, 124];
    } else if (statData[0] == 2011) {
        costData = [111, 83, 95, 104, 157, 71];
    } else if (statData[0] == 2012) {
        costData = [102, 75, 96, 116, 125, 72];
    } else if (statData[0] == 2013) {
        costData = [105, 74, 104, 116, 98, 70];
    } else if (statData[0] == 2014) {
        costData = [109, 74, 112, 116, 79, 59];
    } else if (statData[0] == 2015) {
        costData = [108, 65, 117, 100, 64, 55];
    } else if (statData[0] == 2016) {
        costData = [102, 63, 117, 98, 55, 47];
    } else if (statData[0] == 2017) {
        costData = [102, 60, 148, 97, 50, 45];
    } else if (statData[0] == 2018) {
        costData = [102, 58, 151, 91, 43, 42];
    } else if (statData[0] == 2019) {
        costData = [109, 56, 168, 91, 40, 41];
    } else {
        costData = [112, 58, 163, 80, 36, 40];
    }
}


function updateBudget() {
    statData[1] += moneyCalc(statData[2] , statData[4]);

    i = 0;
    stats.forEach(stat => {
        if (i == 0) {
            stat.lastElementChild.textContent = statData[i++];
        }
        else if (i == 5) {
             stat.lastElementChild.textContent = Math.round(statData[i++]).toLocaleString("en-US");
        } else {
             stat.lastElementChild.textContent = statData[i++].toLocaleString("en-US"); // sebhastian.com/javascript-format-number-commas

        }
    });

    //getmoney.firstElementChild.textContent = (statData[2] * (statData[4] / 100));
    getmoney.firstElementChild.textContent = moneyCalc(statData[2],statData[4]).toLocaleString("en-US");
    //getmoney.firstElementChild.textContent = Math.trunc(getmoney.firstElementChild.textContent).toLocaleString("en-US");
}

function updateButtonOne() {
    plantData[0]++;
    button1owned.firstElementChild.textContent = plantData[0];
}

function updateButtonTwo() {
    plantData[1]++;
    button2owned.firstElementChild.textContent = plantData[1];
}

function updateButtonThree() {
    plantData[2]++;
    button3owned.firstElementChild.textContent = plantData[2];
}

function updateButtonFour() {
    plantData[3]++;
    button4owned.firstElementChild.textContent = plantData[3];
}

function updateButtonFive() {
    plantData[4]++;
    button5owned.firstElementChild.textContent = plantData[4];
}

function updateButtonSix() {
    plantData[5]++;
    button6owned.firstElementChild.textContent = plantData[5];
}

function incrementSeconds() {
    seconds += 1;
    let month;
    if (seconds % 12 == 1) {
        month = "January";
        statData[0]++;
        updateCostData();
    } else if (seconds % 12 == 2) {
        month = "February";
    } else if (seconds % 12 == 3) {
        month = "March";
    } else if (seconds % 12 == 4) {
        month = "April";
    } else if (seconds % 12 == 5) {
        month = "May";
    } else if (seconds % 12 == 6) {
        month = "June";
    } else if (seconds % 12 == 7) {
        month = "July";
    } else if (seconds % 12 == 8) {
        month = "August";
    } else if (seconds % 12 == 9) {
        month = "September";
    } else if (seconds % 12 == 10) {
        month = "October";
    } else if (seconds % 12 == 11) {
        month = "November";
    } else if (seconds % 12 == 0) {
        month = "December";
    }
    el.innerText = month;

    updateAllStats();
}

button1owned.firstElementChild.textContent = plantData[0];
button2owned.firstElementChild.textContent = plantData[1];
button3owned.firstElementChild.textContent = plantData[2];
button4owned.firstElementChild.textContent = plantData[3];
button5owned.firstElementChild.textContent = plantData[4];
button6owned.firstElementChild.textContent = plantData[5];
incrementSeconds();
updateBudget();
updateAllStats();
