const input = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263]; // Example input from the puzzle
const result = [];

for (let i = 1; i < input.length; i++) {
  const a = input.slice(i - 1, i + 2).reduce((acc, num) => acc + num);
  const b = input.slice(i, i + 3).reduce((acc, num) => acc + num);
  if (a < b) {
    result.push("increased");
  }
}

// result; //?
console.log(result.length); //?
