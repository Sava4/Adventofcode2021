const input = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263]; //Example input from the puzzle
const result = [];

for (let i = 1; i < inp.length; i++) {
  if (inp[i - 1] < inp[i]) {
    result.push("increased");
  }
}

// result; //?
console.log(result.length); //?
