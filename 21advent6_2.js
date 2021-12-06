// ({
//   babel: true
// });

import _ from "lodash";

const input = `3,4,3,1,2`;

const puzzle = input.split(",").map(n => Number(n)); //?

let leslieMatrix = puzzle.reduce((acc, cycleday) => {
  acc[cycleday] += 1;
  return acc;
}, new Array(9).fill(0));

const days = 256;

for (let i = 0; i < days; i++) {
  let newM = new Array(9).fill(0);
  const head = leslieMatrix.shift();
  leslieMatrix.forEach((fish, idx) => {
    newM[idx] += fish;
  });

  //spawn new fishes and reset main 0-day fish cycle to 6 days
  newM[8] += head;
  newM[6] += head;

  leslieMatrix = newM;
}

console.log("Total", _.sum(leslieMatrix)); //?
