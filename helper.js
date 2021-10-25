function moneyCalc(population,approval){
  return population * (approval/100);
}

function powerCalc(powerData,requiredPower){
  return Math.round(powerData * (1/100) * requiredPower);
}
module.exports = {moneyCalc, powerCalc};
