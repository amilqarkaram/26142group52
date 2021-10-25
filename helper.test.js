const {moneyCalc, powerCalc} = require('./helper.js');

test('money calculated should equal population * approval/100', () => {
    expect(moneyCalc(300, 95)).toBe(285);
})

test('power calculate should equal powerData * requiredPower * 1/100', () => {
    expect(powerCalc(29,20000000 * 11)).toBe(63800000);
})
