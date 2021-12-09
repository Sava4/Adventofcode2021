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

console.log("Low Points", lowPoints); // [ [ 0, 1, 1 ], [ 0, 9, 0 ], [ 2, 2, 5 ], [ 4, 6, 5 ] ]

const basins = [];

lowPoints.forEach((lpt, idx) => {
  basins[idx] = [lpt];
  let neighbors = [lpt];
  const pointNeighbors = [];
  const visitedCoords = [];

  while (neighbors.length > 0) {
    let _neighbors = [];

    neighbors.forEach(([y, x, val]) => {
      //   console.log('Neib', y,x,val);
      const searchCoords = [];

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
        searchCoords.push(
          [vertical, horizontal - 1],
          [vertical - 1, horizontal]
        );
      }

      // top right corner
      if (x === horizontal && y === 0) {
        searchCoords.push([0, horizontal - 1], [1, x]);
      }
      const _searchCoords = searchCoords.filter(([yS, xS]) => {
        return !visitedCoords.some(([yV, xV]) => yV === yS && xV === xS);
      });
      _searchCoords.forEach(([y, x]) => {
        const num = puzzle[y][x];
        visitedCoords.push([y, x]);
        if (num < 9) {
          _neighbors.push([y, x, num]);
          pointNeighbors.push([y, x, num]);
        }
      });
    });
    neighbors = _neighbors;
  }
  basins[idx].push(...pointNeighbors);
});

let result = [];

basins.forEach(basin => {
  result.push(basin.length - 1);
});

console.log(
  "Result",
  result
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((ac, cur) => {
      ac = ac * cur;
      return ac;
    }, 1)
); // 1134
