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

const puzzle = input.split("\n").map(el => el.split("")); //?
const size = puzzle.length; //?
const result = {};

for (let j = 0; j < size; j++) {
  for (let i = 0; i < puzzle[0].length; i++) {
    if (puzzle[j][i] === "1") {
      result[i] ??= 0;
      result[i] += 1;
    }
  }
}
const gamma = [];
const beta = [];

for (const position in result) {
  if (result[position] > puzzle.length / 2) {
    gamma.push(1);
    beta.push(0);
  } else {
    gamma.push(0);
    beta.push(1);
  }
}

console.log("result", parseInt(gamma.join(""), 2) * parseInt(beta.join(""), 2)); //?
