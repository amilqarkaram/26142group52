const {moneyCalc, powerCalc, exponentialIncrease, requiredPowerCalc} = require('./helper.js');

test('money calculated should equal population * approval/100, test for success', () => {
	expect(moneyCalc(300, 95)).toBe(285);
})

test('money calculated should equal population * approval/100, test for truncating 1', () => {
	expect(moneyCalc(333333, 92)).toBe(306666);
})

test('money calculated should equal population * approval/100, test for truncating 2 (should not round)', () => {
	expect(moneyCalc(333333, 93)).toBe(309999);
})

test('power calculated should equal powerData * requiredPower * 1/100, test for success', () => {
	expect(powerCalc(29,20000000 * 11)).toBe(63800000);
})

test('power calculated should equal powerData * requiredPower * 1/100, test for rounding up', () => {
	expect(powerCalc(33,53535)).toBe(17667);
})

test('power calculated should equal powerData * requiredPower * 1/100, test for rounding down', () => {
	expect(powerCalc(33,53531)).toBe(17665);
})

test('people should increase by an increasing amount, 0 & 0 -> 1', () => {
	let obj = {
		reincrease: 0,
		peopleIncrease: 0
	}
	expect(exponentialIncrease(obj)).toBe(1);
})

test('people should increase by an increasing amount, 1 & 1 -> 3', () => {
	let obj = {
		reincrease: 1,
		peopleIncrease: 1
	}
	expect(exponentialIncrease(obj)).toBe(3);
})

test('people should increase by an increasing amount, 5 & 5 -> 11', () => {
	let obj = {
		reincrease: 5,
		peopleIncrease: 5
	}
	expect(exponentialIncrease(obj)).toBe(11);
})

test('people should increase by an increasing amount, 11 & 111 -> 123', () => {
	let obj = {
		reincrease: 11,
		peopleIncrease: 111
	}
	expect(exponentialIncrease(obj)).toBe(123);
})

test('required power is directly proportional to population, test for success', () => {
	expect(requiredPowerCalc(1000)).toBe(893);
})

test('required power is directly proportional to population, test for rounding down', () => {
	expect(requiredPowerCalc(12579)).toBe(11233);
})

test('required power is directly proportional to population, test for rounding up', () => {
	expect(requiredPowerCalc(13468)).toBe(12027);
})
