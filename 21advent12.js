({
  babel: true
});

import _, { find } from "lodash";

const input = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`;

const input2 = `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`;

const input3 = `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`;

const puzzle = input.split("\n").map(str => str.split("-"));
// const puzzle = input2.split("\n").map(str => str.split("-"));
// const puzzle = input3.split("\n").map(str => str.split("-"));

const smallReg = /[a-z]/g;

const result = [];

const connections = puzzle.reduce((acc, [first, second]) => {
  acc[first] ??= [];
  acc[second] ??= [];

  // do not push if it points to start
  if (second !== "start") {
    acc[first].push(second);
  }
  // do not push in reverse if it points to start
  if (first !== "start") {
    acc[second].push(first);
  }
  return acc;
}, {});

// Delete all connecitons that point from end back to the puzzle caves
delete connections["end"];
console.log("All connections: ", connections); //?
connections["start"].forEach(con => findPaths(con, ["start"]));

function findPaths(cave, path) {
  // Avoid modifying the argument path
  const _path = path.slice();
  if (cave === "end") {
    result.push(_path);
    return;
  }
  if (_path.includes(cave) && cave.search(smallReg) === 0) {
    // no result for a duplicate entry
    return;
  }
  _path.push(cave);
  // find new connections for current element and call recuresively
  connections[cave].forEach(newConn => findPaths(newConn, _path));
}

// console.log('Result: ', result, result.length)
console.log(result.length); //? input = 10, input2 = 19, input3 = 226
