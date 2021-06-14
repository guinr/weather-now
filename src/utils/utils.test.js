import { addMinutes, convertKelvinToCelsius, formatAMPM } from "./utils";

test('Test kelvin conversion to celsius', () => {
  const result = convertKelvinToCelsius(293);

  expect(result).toBe(20);
});

test('Test date conversion to PM format', () => {
  const result = formatAMPM(new Date(2021, 5, 13, 17, 22, 42));
  
  expect(result).toBe('5:22:42 PM');
});

test('Test date conversion to AM format', () => {
  const result = formatAMPM(new Date(2021, 5, 13, 10, 12, 42));
  
  expect(result).toBe('10:12:42 AM');
});

test('Test addMinutes can increase the minutes of a date object', () => {
  const result = addMinutes(new Date(2021, 5, 13, 10, 12, 42), 10);

  expect(result).toStrictEqual(new Date(2021, 5, 13, 10, 22, 42));
})