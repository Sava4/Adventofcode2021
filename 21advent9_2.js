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

console.log("Low Points", lowPoints); // [ [ 0, 1, 1 ], [ 0, 9, 0 ], [ 2, 2, 5 ], [ 4, 6, 5 ] ]

const basins = [];

lowPoints.forEach((lpt, idx) => {
  basins[idx] = [lpt];
  let neighbors = [lpt];
  const pointNeighbors = [];
  const visitedCoords = [];

  while (neighbors.length > 0) {
    let _neighbors = [];

    neighbors.forEach(([y, x, _]) => {
      //   console.log('Neib', y,x,_);
      const searchCoords = [
        [y, x - 1],
        [y, x + 1],
        [y + 1, x],
        [y - 1, x]
      ];

      const _searchCoords = searchCoords.filter(([yS, xS]) => {
        return !visitedCoords.some(([yV, xV]) => yV === yS && xV === xS);
      });
      _searchCoords.forEach(([y, x]) => {
        const num = puzzle?.[y]?.[x];
        if (num !== undefined) {
          visitedCoords.push([y, x]);
          if (num < 9) {
            _neighbors.push([y, x, num]);
            pointNeighbors.push([y, x, num]);
          }
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
