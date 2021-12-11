// ({
//   babel: true
// });

// import _, { after, cloneDeep } from "lodash";

const input = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;

const puzzle = input.split("\n").map(str => str.split("").map(Number));

const steps = 100;
let result = 0;

let afterStep = puzzle;

for (let i = 1; i <= steps; i++) {
  //increase each by one
  const newStep = afterStep.map(ar => ar.map(n => n + 1)); //?
  // find all Octopi at energy > 9 for initial search.
  const flashedThisStep = [];
  for (let y = 0; y <= 9; y++) {
    for (let x = 0; x <= 9; x++) {
      if (newStep[y][x] > 9) {
        flashedThisStep.push([y, x]);
      }
    }
  }
  // Start with initial array for flashed this step
  let newFlashesAr = flashedThisStep;
  // Search until newFlashesAr contains Zero new Flashed octopi
  while (newFlashesAr.length > 0) {
    const _newflash = [];

    newFlashesAr.forEach(([y, x]) => {
      //neighbors including diagonals
      const searchNeighborCoords = [
        [y + 1, x - 1],
        [y + 1, x],
        [y + 1, x + 1],
        [y, x - 1],
        [y, x + 1],
        [y - 1, x - 1],
        [y - 1, x],
        [y - 1, x + 1]
      ];
      //check diagonal from flashed this step until no more flashes
      //update newstep update _newflash check for flashedThisStep
      searchNeighborCoords.forEach(([yNeighbor, xNeighbor]) => {
        const energy = newStep?.[yNeighbor]?.[xNeighbor];
        if (energy !== undefined) {
          const newEnergy = energy + 1;
          newStep[yNeighbor][xNeighbor] = newEnergy;
          if (
            newEnergy > 9 &&
            !flashedThisStep.some(
              ([yFlashed, xFlashed]) =>
                yFlashed === yNeighbor && xFlashed === xNeighbor
            )
          ) {
            flashedThisStep.push([yNeighbor, xNeighbor]);
            _newflash.push([yNeighbor, xNeighbor]);
          }
        }
      });
    });
    //update newFlashesAr for next search
    newFlashesAr = _newflash;
  }
  // newstep all that flashed this step are reset to 0 for next step
  flashedThisStep.forEach(([y, x]) => {
    newStep[y][x] = 0;
  });
  result += flashedThisStep.length;
  afterStep = newStep;
}

console.log(`Total flashes after ${steps} steps:`, result); //?
