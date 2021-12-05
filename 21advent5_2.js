({
  babel: true
});

import _ from "lodash";

const input = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;

const puzzle = input
  .split("\n")
  .map(el => el.split(" -> ").map(pair => pair.split(",").map(n => Number(n)))); //?
const points = [];

puzzle.forEach(ln => {
  const [[x1, y1], [x2, y2]] = ln;
  // vertical line
  if (x1 === x2) {
    const ys = [y2, y1].sort((a, b) => a - b);
    _.range(ys[0], ys[1] + 1).forEach(y => points.push([x1, y]));
  }
  // horizontal line
  if (y1 === y2) {
    const xs = [x2, x1].sort((a, b) => a - b);
    _.range(xs[0], xs[1] + 1).forEach(x => points.push([x, y1]));
  }

  // diagonal line at 45 degrees
  if (Math.abs(x1 - x2) === Math.abs(y1 - y2)) {
    //  console.log('diagonal', x1,y1,x2,y2)
    let xs;
    let ys;
    if (x1 > x2 && y1 > y2) {
      xs = _.range(x2, x1 + 1);
      ys = _.range(y2, y1 + 1);
    }
    if (x1 < x2 && y1 < y2) {
      xs = _.range(x1, x2 + 1);
      ys = _.range(y1, y2 + 1);
    }

    if (x1 > x2 && y1 < y2) {
      xs = _.range(x2, x1 + 1);
      ys = _.range(y2, y1 - 1, -1);
    }

    if (x1 < x2 && y1 > y2) {
      xs = _.range(x1, x2 + 1);
      ys = _.range(y1, y2 - 1, -1);
    }
    _.zip(xs, ys).forEach(point => points.push(point));
  }
});

const output = points.reduce((acc, curr) => {
  const [x, y] = curr;
  acc[`${x}.${y}`] ??= 0;
  acc[`${x}.${y}`] += 1;
  return acc;
}, {});

console.log(output);
console.log(
  Object.entries(output).filter(([_, v]) => v > 1).length //?
);
