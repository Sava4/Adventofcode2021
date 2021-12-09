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
const vertical = puzzle.length - 1;
const horizontal = puzzle[0].length - 1;

const lowPoints = [];

for (let y = 0; y <= vertical; y++) {
  for (let x = 0; x <= horizontal; x++) {
    const searchCoords = [];
    const searchNumbers = [];
    const mainNumber = puzzle[y][x];

    // top left corner
    if (x === 0 && y === 0) {
      searchCoords.push([0, 1], [1, 0]);
    }
    // first row
    if (y === 0 && x > 0 && x < horizontal) {
      searchCoords.push([0, x - 1], [0, x + 1], [1, x]);
    }
    // first column
    if (x === 0 && y > 0 && y < vertical) {
      searchCoords.push([y, x + 1], [y - 1, x], [y + 1, x]);
    }
    // middle of the square
    if (x > 0 && x < horizontal && y > 0 && y < vertical) {
      searchCoords.push([y, x - 1], [y, x + 1], [y - 1, x], [y + 1, x]);
    }
    // bottom left
    if (x === 0 && y === vertical) {
      searchCoords.push([y - 1, x], [y, 1]);
    }
    // bottom row
    if (x > 0 && x < horizontal && y === vertical) {
      searchCoords.push([y - 1, x], [y, x - 1], [y, x + 1]);
    }
    //last column
    if (x === horizontal && y > 0 && y < vertical) {
      searchCoords.push([y - 1, x], [y + 1, x], [y, x - 1]);
    }
    // bottom right corner
    if (x === horizontal && y === vertical) {
      searchCoords.push([vertical, horizontal - 1], [vertical - 1, horizontal]);
    }

    // top right corner
    if (x === horizontal && y === 0) {
      searchCoords.push([0, horizontal - 1], [1, x]);
    }

    searchCoords.forEach(([y, x]) => {
      const num = puzzle[y][x];
      searchNumbers.push(num);
    });
    if (searchNumbers.every(n => mainNumber < n)) {
      lowPoints.push([y, x, mainNumber]);
    }
    // console.log(searchCoords)
  }
}

console.log("Low Points: ", lowPoints); // [ [ 0, 1, 1 ], [ 0, 9, 0 ], [ 2, 2, 5 ], [ 4, 6, 5 ] ]
console.log(
  "Low Points Sum: ",
  lowPoints.reduce((ac, [x, y, height]) => {
    ac += height + 1;
    return ac;
  }, 0)
); // 15
