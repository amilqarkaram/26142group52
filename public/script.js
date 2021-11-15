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
const deletebutton1 = document.querySelector('.deletebutton1');
const deletebutton2 = document.querySelector('.deletebutton2');
const deletebutton3 = document.querySelector('.deletebutton3');
const deletebutton4 = document.querySelector('.deletebutton4');
const deletebutton5 = document.querySelector('.deletebutton5');
const deletebutton6 = document.querySelector('.deletebutton6');
const events = document.querySelector('#events');

getmoney.addEventListener('click', updateBudget);
button1owned.addEventListener('click', updateButtonOne);
button2owned.addEventListener('click', updateButtonTwo);
button3owned.addEventListener('click', updateButtonThree);
button4owned.addEventListener('click', updateButtonFour);
button5owned.addEventListener('click', updateButtonFive);
button6owned.addEventListener('click', updateButtonSix);

deletebutton1.addEventListener('click', destroyButtonOne);
deletebutton2.addEventListener('click', destroyButtonTwo);
deletebutton3.addEventListener('click', destroyButtonThree);
deletebutton4.addEventListener('click', destroyButtonFour);
deletebutton5.addEventListener('click', destroyButtonFive);
deletebutton6.addEventListener('click', destroyButtonSix);

// Get the modal
var modal = document.getElementById("myModal");

// These are all currently placeholder values
// statData: year, budget, population, co2, approval, total required energy
let statData = [2009, 1000, 300, 320, 90, 0, 0];
let costData = new Array(6);
let powerData = [0,0,0,0,0,0];
let plantData = [0,0,0,0,0,0];

let seconds = 0;
let el = document.getElementById('seconds-counter');
let cancel = setInterval(incrementSeconds, 7500);

let obj = {
	peopleIncrease: 1,
	reincrease: 1
}

let sumEnergy = 0;
let sumOfAllEnergy = 0;

let i = 0;
inputs.forEach(input => {
	input.setAttribute('value', powerData[i++]);
});

function updateAllStats() {

	i = 0;
	powers.forEach(power => {
		powerData[i] = plantData[i++] * 100;
	});

	i = 0;
	powers.forEach(power => {
		power.textContent = (powerData[i++]).toLocaleString("en-US");
	});

	i = 0;
	costs.forEach(cost => {
		cost.firstElementChild.textContent = costData[i++];
	});

	sumEnergy = 0;
	sumOfAllEnergy = 0;
	i = 0;
	costs.forEach(cost => {
		sumEnergy += powerData[i];
		sumOfAllEnergy += powerData[i++];
	});
	sumEnergy *= seconds;

	statData[1] -= sumEnergy;
	statData[2] += exponentialIncrease(obj);
	statData[3] += plantData[0] + plantData[1];
	statData[4] -= statData[3] / 320 - 1;
	if (statData[5] != 0 && statData[6] > statData[5]) {
		statData[4] -= statData[6] / statData[5];
	} else if (statData[5] != 0 && statData[6] < statData[5]) {
		statData[4] += statData[5] / statData[6];
	} else {
		statData[4] -= statData[6] / 300;
	}
	if (statData[4] >= 100) {
		statData[4] = 100;
	}
	statData[5] = sumOfAllEnergy;
	statData[6] = requiredPowerCalc(statData[2]);

	updateBudget();

	if (statData[4] <= 50 || statData[1] <= 0) {
		modal.style.display = "block";
	}

	/*
	i = 0;
	outputs.forEach(output => {
		output.textContent = powerData[i++];
	});
	*/

	naturalDisaster();

	
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

function decrementBudget() {
	let prevBudget = statData[1];
	statData[1] -= moneyCalc(statData[2] , statData[4]);
	addEvent("Budget has gone down", `$${prevBudget - statData[1]} has been lost!`);

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

function destroyButtonOne() {
	if (plantData[0] > 0) {
		plantData[0]--;
	}
	decrementBudget();
	button1owned.firstElementChild.textContent = plantData[0];
	addEvent("Destroyed a plant", "Less coal power");
}

function updateButtonTwo() {
	plantData[1]++;
	button2owned.firstElementChild.textContent = plantData[1];
}

function destroyButtonTwo() {
	if (plantData[1] > 0) {
		plantData[1]--;
	}
	decrementBudget();
	button2owned.firstElementChild.textContent = plantData[1];
	addEvent("Destroyed a plant", "Less gas power");
}

function updateButtonThree() {
	plantData[2]++;
	button3owned.firstElementChild.textContent = plantData[2];
}

function destroyButtonThree() {
	if (plantData[2] > 0) {
		plantData[2]--;
	}
	decrementBudget();
	button3owned.firstElementChild.textContent = plantData[2];
	addEvent("Destroyed a plant", "Less nuclear power");
}

function updateButtonFour() {
	plantData[3]++;
	button4owned.firstElementChild.textContent = plantData[3];
}

function destroyButtonFour() {
	if (plantData[3] > 0) {
		plantData[3]--;
	}
	decrementBudget();
	button4owned.firstElementChild.textContent = plantData[3];
	addEvent("Destroyed a plant", "Less geothermal power");
}

function updateButtonFive() {
	plantData[4]++;
	button5owned.firstElementChild.textContent = plantData[4];
}

function destroyButtonFive() {
	if (plantData[4] > 0) {
		plantData[4]--;
	}
	decrementBudget();
	button5owned.firstElementChild.textContent = plantData[4];
	addEvent("Destroyed a plant", "Less solar power");
}

function updateButtonSix() {
	plantData[5]++;
	button6owned.firstElementChild.textContent = plantData[5];
}

function destroyButtonSix() {
	if (plantData[5] > 0) {
		plantData[5]--;
	}
	decrementBudget();
	button6owned.firstElementChild.textContent = plantData[5];
	addEvent("Destroyed a plant", "Less wind power");
}

function incrementSeconds() {
	seconds += 1;
	let month;
	if (seconds % 12 == 1) {
		month = "January";
		statData[0]++;
		updateCostData();
		addEvent("Happy New Year!", "The costs of each of the power plants have changed, make sure to account for this when building new plants.");
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

function addEvent(name, description) {
	console.log(events);

	// if too many events;
	while (events.childElementCount > 5) {
		events.removeChild(events.firstChild);
	}

	const event = document.createElement('div');
	event.classList.add('event');

	const eventName = document.createElement('div');
	eventName.classList.add('eventName');
	eventName.textContent = name;

	const eventDescription = document.createElement('div');
	eventDescription.classList.add('eventName');
	eventDescription.textContent = description;

	event.appendChild(eventName);
	event.appendChild(eventDescription);
	events.appendChild(event);

	
}

function naturalDisaster() {
	let disasterRandom = Math.random() * 100;
	let disasterChance = statData[3] / 100;

	if (disasterRandom < disasterChance) { 
		let random = Math.floor(Math.random() * 5);
		addEvent("NATURAL DISASTER HAS STRUCK", "Approval, budget, and population have all gone down.");	
		statData[1]*=.75;
		statData[2]*=.99;
		statData[4]*=.9;
		
	}
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
