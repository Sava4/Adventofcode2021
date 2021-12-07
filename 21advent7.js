const input = `16,1,2,0,4,2,7,1,2,14`;

const puzzle = input.split(",").map(n => Number(n)); //?
puzzle.sort((a, b) => a - b);
let length = puzzle.length;
let median = (length + 1) / 2;
const floorIdx = Math.floor(median) - 1;
const ceilIdx = Math.ceil(median) - 1;

let fuelFloor = 0;
puzzle.forEach(n => {
  fuelFloor += Math.abs(puzzle[floorIdx] - n);
});

let fuelCeil = 0;
puzzle.forEach(n => {
  fuelCeil += Math.abs(puzzle[floorIdx] - n);
});

const fuel = [fuelFloor, fuelCeil].sort((a, b) => a - b); //?

console.log("Fuel", fuel[0]); //?
