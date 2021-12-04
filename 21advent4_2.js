({
  babel: true
});

import _ from "lodash";

const input = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`;

const puzzle = input.split("\n");
const drawnumbers = puzzle.slice(0, 1).flatMap(str => str.split(","));
const boardsinput = puzzle
  .slice(1)
  .filter(el => el !== "")
  .map(str => str.trim().split(" "))
  .map(arr => arr.filter(str => str !== ""));
let boards = _.chunk(boardsinput, 5);
const totalboards = boards.length;
let winningboards = [];
let lastboard;
let lastwinningnumber;

function checkwinnerboard(board) {
  //check by row
  let winner = false;
  for (const row of board) {
    if (row.every(el => el === "")) {
      winner = true;
    }
  }
  //check by column
  for (let i = 0; i < 5; i++) {
    let rownums = [];
    for (const row of board) {
      rownums.push(row[i]);
    }
    if (rownums.every(el => el === "")) {
      winner = true;
    }
  }

  return winner;
}

loop: {
  for (const number of drawnumbers) {
    // draw and mark number
    boards = boards.map(bd =>
      bd.map(row =>
        row.map(n => {
          if (number === n) {
            return "";
          }
          return n;
        })
      )
    );
    //check for winner board

    for (let i = 0; i < boards.length; i++) {
      const bd = boards[i];
      if (checkwinnerboard(bd)) {
        lastboard = bd;
        lastwinningnumber = Number(number);
        boards.splice(i, 1);
        winningboards.push(bd);
        if (totalboards === winningboards.length) {
          break loop;
        }
      }
    }
  }
}

console.log(
  lastboard
    .flatMap(el => el)
    .filter(el => el !== "")
    .map(n => Number(n))
    .reduce((acc, cur) => acc + cur) * lastwinningnumber //?
);
