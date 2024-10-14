const year = 'MCMXCIV';
const arrYear = year.split('');
console.log(arrYear);

const times = {
  'M': 1000,
  'CM': 900,
  'D': 500,
  'CD': 400,
  'C': 100,
  'XC': 90,
  'L': 50,
  'XL': 40,
  'X': 10,
  'IX': 9,
  'V': 5,
  'IV': 4,
  'I': 1
};

function romanToArabic(year) {
//   const arrYear = year.split('');
//   let total = 0;

  //   for (let i = 0; i < arrYear.length; i++) {
  //     for (let j = 0; j < Object.keys(times).length; j++) {
  //       if (arrYear[i] === Object.keys(times)[j]) {
  //         total += times[arrYear[i]];
  //       }
  //     }
  //   }
  //   return total;
  const arrYear = year.split('');
  let total = 0
  for (let i = 0; i < arrYear.length; i++) {
    const currentValue = times[arrYear[i]];
    const nextValue = times[arrYear[i + 1]];
    if (nextValue && currentValue < nextValue) {
      total -= currentValue;
    } else {
      total += currentValue;
    }
  }

  return total;
}

console.log(romanToArabic('MCMXCIV')); // 1994