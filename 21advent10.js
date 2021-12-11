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
  return [true, expr];
  // return openarr.length === 0;
}

let result = 0;

puzzle
  .map(line => brackets(line))
  .filter(r => r[0] === false)
  .map(l => l[1])
  .forEach(ch => {
    if (ch === ")") {
      result += 3;
    }

    if (ch === "]") {
      result += 57;
    }

    if (ch === "}") {
      result += 1197;
    }

    if (ch === ">") {
      result += 25137;
    }
  });

console.log("Score: ", result); //?
