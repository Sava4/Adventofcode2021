const input = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;

const puzzle = input.split("\n").map(el => el.split(" ")); //?

const result = { forward: 0, down: 0 };

puzzle.forEach(([step, number]) => {
  if (step === "down") {
    result.down += +number;
  }
  if (step === "up") {
    result.down -= +number;
  }
  if (step === "forward") {
    result.forward += +number;
  }
});

result; //?
result.forward * result.down; //?
console.log(result.forward * result.down);
