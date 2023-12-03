const fs = require("fs");
const content = fs.readFileSync("./2", "utf8");

let maxCubes = { red: 0, blue: 0, green: 0 }

const redRegex = new RegExp(/(\d) red/, "gi");
const blueRegex = new RegExp(/(\d) blue/,);
const greenRegex = new RegExp(/(\d) green/,);
const color = 'red'
const getFromRound = (round, color) => round.match(new RegExp(`(\\d) ${color}`, "gi")?.[0].split(" ")[0] ?? 0)

console.log(new RegExp(`(\\d) ${color}`, "gi"))
console.log(getFromRound("Game 1: 3 blue, 4 red", "red"))

const result = content
    .split('\n')
    .map(e => e.split(';').reduce((a, e) => ({
        red: a.red + e.match(redRegex)?.[0] ?? a.red,
        blue: a.blue + e.match(blueRegex)?.[0] ?? a.blue,
        green: a.green + e.match(greenRegex)?.[0] ?? a.green
    }, maxCubes)))

console.log(JSON.stringify(result))