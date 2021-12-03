const input = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;

const puzzle = input.split("\n").map(el => el.split(""));

let oxygen = puzzle.slice();

for (let position = 0; position < oxygen[0].length; position++) {
  if (oxygen.length === 1) {
    break;
  }
  let mostcommon = {};
  for (let j = 0; j < oxygen.length; j++) {
    for (let i = 0; i < oxygen[0].length; i++) {
      if (oxygen[j][i] === "1") {
        mostcommon[i] ??= 0;
        mostcommon[i] += 1;
      }
    }
  }

  if (mostcommon[position] >= oxygen.length / 2) {
    oxygen = oxygen.filter(arr => arr[position] === "1");
    // console.log('Oxygen', position, oxygen)
  } else {
    if (mostcommon[position] < oxygen.length / 2) {
      oxygen = oxygen.filter(arr => arr[position] === "0");
    }
  }
}

let co2 = puzzle.slice();

for (let position = 0; position < co2[0].length; position++) {
  if (co2.length === 1) {
    break;
  }
  let mostcommon = {};
  for (let j = 0; j < co2.length; j++) {
    for (let i = 0; i < co2[0].length; i++) {
      if (co2[j][i] === "1") {
        mostcommon[i] ??= 0;
        mostcommon[i] += 1;
      }
    }
  }

  if (mostcommon[position] >= co2.length / 2) {
    co2 = co2.filter(arr => arr[position] === "0");
    // console.log("CO2", position, co2);
  } else {
    if (mostcommon[position] < co2.length / 2) {
      co2 = co2.filter(arr => arr[position] === "1");
    }
  }
}

console.log(
  "result",
  parseInt(co2.flatMap(el => el).join(""), 2) *
    parseInt(oxygen.flatMap(el => el).join(""), 2)
); //?
