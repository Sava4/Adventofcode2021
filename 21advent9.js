({
  babel: true
});

import _ from "lodash";

const input = `2199943210
3987894921
9856789892
8767896789
9899965678`;

const puzzle = input.split("\n").map(str => str.split("").map(n => Number(n))); //
const verticalIdx = puzzle.length - 1;
const horizontalIdx = puzzle[0].length - 1;

const lowPoints = [];

for (let y = 0; y <= verticalIdx; y++) {
  for (let x = 0; x <= horizontalIdx; x++) {
    const searchCoords = [
      [y, x - 1],
      [y, x + 1],
      [y + 1, x],
      [y - 1, x]
    ];
    const searchNumbers = [];
    const mainNumber = puzzle[y][x];

    searchCoords.forEach(([y, x]) => {
      const num = puzzle?.[y]?.[x];
      if (num !== undefined) {
        searchNumbers.push(num);
      }
    });
    if (searchNumbers.every(n => mainNumber < n)) {
      lowPoints.push([y, x, mainNumber]);
    }
  }
}

console.log("Low Points: ", lowPoints); // [ [ 0, 1, 1 ], [ 0, 9, 0 ], [ 2, 2, 5 ], [ 4, 6, 5 ] ]
console.log(
  "Low Points Sum: ",
  lowPoints.reduce((ac, [, , height]) => {
    ac += height + 1;
    return ac;
  }, 0)
); // 15
