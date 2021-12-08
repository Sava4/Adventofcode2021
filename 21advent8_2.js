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

// This is for parsing input from real task

// const puzzle = input2.split("\n").flatMap(str => str.split(" | "));
// const outputDigits = puzzle
//   .filter((_, idx) => idx % 2 !== 0)
//   .map(str => str.split(" "));

// const inputDigits = puzzle
//   .filter((_, idx) => idx % 2 === 0)
//   .map(str => str.split(" ")); //?

let bigRes = [];

inputDigits.forEach((d, idx) => decodeResult(d, outputDigits[idx]));

function decodeResult(inputDg, outputDg) {
  let one;
  let four;
  let seven;
  let eight;

  inputDg.forEach(digit => {
    if (digit.length === 2) {
      one = digit;
    }
    if (digit.length === 4) {
      four = digit;
    }

    if (digit.length === 3) {
      seven = digit;
    }

    if (digit.length === 7) {
      eight = digit;
    }
  });

  let three;

  inputDg.forEach(digit => {
    if (
      digit.length === 5 &&
      digit.includes(one[0]) &&
      digit.includes(one[1])
    ) {
      three = digit;
    }
  });

  let ddgg = Array.from(three)
    .filter(ch => ch !== seven[0] && ch !== seven[1] && ch !== seven[2])
    .join("");

  let dd;
  let gg;

  if (four.includes(ddgg[0])) {
    dd = ddgg[0];
    gg = ddgg[1];
  } else {
    dd = ddgg[1];
    gg = ddgg[0];
  }

  let six;

  inputDg.forEach(digit => {
    if (
      (digit.length === 6 &&
        digit.includes(dd) &&
        digit.includes(gg) &&
        !digit.includes(one[0])) ||
      (digit.length === 6 &&
        digit.includes(dd) &&
        digit.includes(gg) &&
        !digit.includes(one[1]))
    ) {
      six = digit;
    }
  });

  let ff;
  let cc;

  if (six.includes(one[0])) {
    ff = one[0];
    cc = one[1];
  } else {
    ff = one[1];
    cc = one[0];
  }

  let nine;

  inputDg.forEach(digit => {
    if (
      digit.length === 6 &&
      digit.includes(dd) &&
      digit.includes(gg) &&
      digit.includes(ff) &&
      digit.includes(cc)
    ) {
      nine = digit;
    }
  });

  let zero;

  inputDg.forEach(digit => {
    if (digit.length === 6 && digit.includes(gg) && !digit.includes(dd)) {
      zero = digit;
    }
  });

  let two;

  inputDg.forEach(digit => {
    if (digit.length === 5 && digit.includes(cc) && digit !== three) {
      two = digit;
    }
  });

  let five;

  inputDg.forEach(digit => {
    if (digit.length === 5 && digit.includes(ff) && digit !== three) {
      five = digit;
    }
  });

  let result = "";

  outputDg.forEach(dig => {
    let sordig = Array.from(dig).sort().join("");
    if (sordig === Array.from(one).sort().join("")) {
      result += "1";
    }
    if (sordig === Array.from(two).sort().join("")) {
      result += "2";
    }
    if (sordig === Array.from(three).sort().join("")) {
      result += "3";
    }
    if (sordig === Array.from(four).sort().join("")) {
      result += "4";
    }
    if (sordig === Array.from(five).sort().join("")) {
      result += "5";
    }
    if (sordig === Array.from(six).sort().join("")) {
      result += "6";
    }
    if (sordig === Array.from(seven).sort().join("")) {
      result += "7";
    }
    if (sordig === Array.from(eight).sort().join("")) {
      result += "8";
    }
    if (sordig === Array.from(nine).sort().join("")) {
      result += "9";
    }
    if (sordig === Array.from(zero).sort().join("")) {
      result = result + "0";
    }
  });

  bigRes.push(result); //?
}

console.log(bigRes.map(n => Number(n)).reduce((pre, val) => pre + val)); //61229
