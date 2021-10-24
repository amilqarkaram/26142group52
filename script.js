const stats = document.querySelectorAll('.stat');
const powers = document.querySelectorAll('.power');
const costs = document.querySelectorAll('.cost');
const inputs = document.querySelectorAll('input');
const outputs = document.querySelectorAll('output');
const builds = document.querySelectorAll('.build');
const nextYear = document.querySelector('#progress');
const getmoney = document.querySelector('#moneyclick');

builds.forEach(build => addEventListener('click', buildPlant));
nextYear.addEventListener('click', updateAllStats);
getmoney.addEventListener('click', updateBudget);

// These are all currently placeholder values
// statData: year, budget, population, co2, approval, total required energy
let statData = [2009, 0, 300, 320, 95, 222];
let costData = new Array(6);
let powerData = [29, 44, 10, 2, 5, 10]; // TEMPORARY VALUES 

let r = 250;
let g = 250;
let b = 210;

let seconds = 0;
let el = document.getElementById('seconds-counter');
let cancel = setInterval(incrementSeconds, 5000);





function updateAllStats() {
    nextYear.firstElementChild.textContent = statData[0] + 1;
    getmoney.firstElementChild.textContent = statData[2] * (statData[4]/100);

    i = 0;
    stats.forEach(stat => {
        stat.firstElementChild.textContent = statData[i];
    });
    
    i = 0;
    powers.forEach(power => {
        power.textContent = powerData[i++];
    });

    i = 0;
    costs.forEach(cost => {
        cost.firstElementChild.textContent = costData[i];
    });  

    i = 0;
    inputs.forEach(input => {
        input.setAttribute('value', powerData[i++]);
    });

    i = 0;
    outputs.forEach(output => {
        output.textContent = powerData[i++];
    });
}


function updateCostData() {
     if (statData[0] == 2010) {
        costData = [111, 82, 96, 107, 248, 124];
    } else if (statData[0] == 2011) {
        costData = [111,83,95,104,157,71];
    } else if (statData[0] == 2012) {
        costData = [102,75,96,116,125,72];
    } else if (statData[0] == 2013) {
        costData = [105,74,104,116,98,70];
    } else if (statData[0] == 2014) {
        costData = [109,74,112,116,79,59];
    } else if (statData[0] == 2015) {
        costData = [108,65,117,100,64,55];
    } else if (statData[0] == 2016) {
        costData = [102,63,117,98,55,47];
    } else if (statData[0] == 2017) {
        costData = [102,60,148,97,50,45];
    } else if (statData[0] == 2018) {
        costData = [102,58,151,91,43,42];
    } else if (statData[0] == 2019) {
        costData = [109,56,168,91,40,41];
    } else {
        costData = [112,58,163,80,36,40];
    }
}


function updateBudget() {
    statData[1] = statData[1] + statData[2] * (statData[4]/100);
    updateAllStats();
}

function incrementSeconds() {
    seconds += 1;
    let month;
    if (seconds%12 == 1) {
        month = "January";
        statData[0]++;
        updateCostData();
    } else if (seconds%12 == 2) {
        month = "February";
    } else if (seconds%12 == 3) {
        month = "March";
    } else if (seconds%12 == 4) {
        month = "April";
    } else if (seconds%12 == 5) {
        month = "May";
    } else if (seconds%12 == 6) {
        month = "June";
    } else if (seconds%12 == 7) {
        month = "July";
    } else if (seconds%12 == 8) {
        month = "August";
    } else if (seconds%12 == 9) {
        month = "September";
    } else if (seconds%12 == 10) {
        month = "October";
    } else if (seconds%12 == 11) {
        month = "November";
    } else if (seconds%12 == 0) {
        month = "December";
    }
    el.innerText = month;
    
    updateAllStats();
}

function buildPlant(e) {
    console.log(e);
}

incrementSeconds();
updateAllStats();