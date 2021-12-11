({
  babel: true
});

import _, { trim } from "lodash";

const input = `[({(<(())[]>[[{[]{<()<>>
  [(()[<>])]({[<{<<[]>>(
  {([(<{}[<>[]}>{[]{[(<()>
  (((({<>}<{<{<>}{[]{[]{}
  [[<[([]))<([[{}[[()]]]
  [{[{({}]{}}([{[{{{}}([]
  {<[[]]>}<{[{[{[]{()[[[]
  [<(<(<(<{}))><([]([]()
  <{([([[(<>()){}]>(<<{{
  <{([{{}}[<[[[<>{}]]]>[]]`;

const puzzle = input.split("\n").map(trim); //?

function brackets(expr) {
  const ar = Array.from(expr);
  const ALLOPENBR = ["(", "[", "{", "<"];
  const ALLCLOSEBR = [")", "]", "}", ">"];
  const closeIdx = ar.findIndex(bracket => ALLCLOSEBR.includes(bracket));
  const openarr = ar.slice(0, closeIdx);
  const closearr = ar.slice(closeIdx);
  for (const br of closearr) {
    if (ALLCLOSEBR.includes(br)) {
      const lastOpen = openarr.pop();
      if (ALLOPENBR.indexOf(lastOpen) !== ALLCLOSEBR.indexOf(br)) {
        return [false, br, expr];
      }
    }
    if (ALLOPENBR.includes(br)) {
      openarr.push(br);
    }
  }

  // add characters that complete the line from openarr
  const complete = openarr
    .reverse()
    .map(ch => ALLCLOSEBR[ALLOPENBR.indexOf(ch)]);
  return [true, complete, expr];
  // return openarr.length === 0;
}

let result = [];

const parseBr = puzzle.map(line => brackets(line)).filter(r => r[0] === true); //?

parseBr
  .map(l => l[1])
  .forEach(ar => {
    let lineresult = 0;
    ar.forEach(ch => {
      if (ch === ")") {
        lineresult = lineresult * 5;
        lineresult += 1;
      }

      if (ch === "]") {
        lineresult = lineresult * 5;
        lineresult += 2;
      }

      if (ch === "}") {
        lineresult = lineresult * 5;
        lineresult += 3;
      }

      if (ch === ">") {
        lineresult = lineresult * 5;
        lineresult += 4;
      }
    });
    result.push(lineresult);
  });

result.sort((a, b) => a - b); //?

console.log("Result: ", result[Math.floor(result.length / 2)]); //? 288957
