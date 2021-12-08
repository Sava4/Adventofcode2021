({
  babel: true
});

import _, { countBy } from "lodash";

const input = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb |
fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec |
fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef |
cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega |
efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga |
gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf |
gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf |
cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd |
ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg |
gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc |
fgae cfgab fg bagce`;

const puzzle = input.split(" |\n").flatMap(str => str.split("\n")); //?
const outputDigits = puzzle
  .filter((_, idx) => idx % 2 !== 0)
  .map(str => str.split(" ")); //?

const inputDigits = puzzle
  .filter((_, idx) => idx % 2 === 0)
  .map(str => str.split(" ")); //?

// this is for parsing input from real task
// const puzzle = input2.split("\n").flatMap(str => str.split(" | ")); //?;
// const outputDigits = puzzle
//   .filter((_, idx) => idx % 2 !== 0)
//   .map(str => str.split(" ")); //?
let count = 0;

outputDigits.forEach(ar =>
  ar.forEach(digit => {
    if (
      digit.length === 2 ||
      digit.length === 4 ||
      digit.length === 3 ||
      digit.length === 7
    ) {
      count += 1;
    }
  })
);

console.log(count); //? 26
