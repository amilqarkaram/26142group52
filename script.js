const stats = document.querySelectorAll('.stat');
const costs = document.querySelectorAll('.cost');
const powers = document.querySelectorAll('.power');
const builds = document.querySelectorAll('.build');
const nextYear = document.querySelector('#progress');

builds.forEach(build => addEventListener('click', buildPlant));
nextYear.addEventListener('click', update);


// These are all currently placeholder values
// statData: year, budget, population, co2, approval, total required energy
const statData = [1999, 100000, 300, 320, 95];
const costData = [108, 117, 55, 64, 100, 65];
const powerData = [531, 412, 423, 442, 304, 312];

let r = 250;
let g = 250;
let b = 210;


function update() {
    let i = 0;
    statData[0]++;
    statData[1];
    statData[2]; 
    statData[3];
    statData[4];
    statData[5];
    stats.forEach(stat => updateStat(stat.firstElementChild, i++));    
    

    nextYear.firstElementChild.textContent = statData[0] + 1;



    i = 0;
    costs.forEach(cost => updateStat())

}

function updateStat(stat, i) {
    stat.textContent = statData[i];
}

function updateStat(stat, i) {
    stat.textContent = statData[i];
}


function buildPlant(e) {
    console.log(e.srcElement.parentNode.parentNode.getAttribute('id'));
    let i = 0;
    powers.forEach(power => stat(power, i++));
}

update();