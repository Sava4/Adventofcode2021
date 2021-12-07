// ({
//   babel: true
// });

import _ from "lodash";

const input = `16,1,2,0,4,2,7,1,2,14`;

const puzzle = input.split(",").map(n => Number(n)); //?
puzzle.sort((a, b) => a - b);
const length = puzzle.length;
const average = _.sum(puzzle) / length;
const floor = Math.floor(average);
const ceil = Math.ceil(average);

let fuelFloor = 0;
puzzle.forEach(n => {
  const steps = Math.abs(floor - n);
  for (let i = 1; i <= steps; i++) {
    fuelFloor += i;
  }
});

let fuelCeil = 0;
puzzle.forEach(n => {
  const steps = Math.abs(ceil - n);
  for (let i = 1; i <= steps; i++) {
    fuelCeil += i;
  }
});

let fuel = [fuelFloor, fuelCeil].sort((a, b) => a - b);

console.log("Fuel", fuel[0]); //?
