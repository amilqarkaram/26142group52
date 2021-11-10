function moneyCalc(population,approval){
	return Math.trunc(population * (approval/100));
}

function powerCalc(powerData,requiredPower){
	return Math.round(powerData * (1/100) * requiredPower);
}

function exponentialIncrease(obj) {
	obj.reincrease++;
	obj.peopleIncrease += obj.reincrease;
	return obj.peopleIncrease;
}

function requiredPowerCalc(population) {
	return Math.round(population * 0.893);
}

module.exports = {moneyCalc, powerCalc, exponentialIncrease, requiredPowerCalc};
