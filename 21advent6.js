const input = `3,4,3,1,2`;

const puzzle = input.split(",").map(n => Number(n)); //?

const days = 80;
let fishArr = puzzle.slice();

for (let i = 0; i < days; i++) {
  let newFish = [];
  fishArr = fishArr.map(f => {
    if (f === 0) {
      newFish.push(8);
      return 6;
    } else {
      return f - 1;
    }
  });
  fishArr.push(...newFish);
}

console.log("Answer", fishArr.length); //?
