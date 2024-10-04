function changeYearWithParsing(jsonStr, newYear) {
  const data = JSON.parse(jsonStr);
  data.year = newYear;
  return JSON.stringify(data);
}
function changeYearWithRegex(jsonStr, newYear) {
  return jsonStr.replace(/"year":\s*\d+/, `"year": ${newYear}`);
}
function testPerformance() {
  const jsonString = '{"month":"October", "year": 2024, "date": 12 }';
  const newYear = 2030;
  const iterations = 100000;
  console.time('JSON Parsing');
  for (let i = 0; i < iterations; i++) {
    changeYearWithParsing(jsonString, newYear);
  }
  console.timeEnd('JSON Parsing');

  console.time('RegEx');
  for (let i = 0; i < iterations; i++) {
    changeYearWithRegex(jsonString, newYear);
  }
  console.timeEnd('RegEx');
}
testPerformance();