const fs = require("fs");
const content = fs.readFileSync("./2", "utf8");

let initialCubes = { red: 0, blue: 0, green: 0 }
// Part1
// -------------------------------------------------------------------------------------------------------------------------------------------
// let maxCubes = { red: 12, blue: 14, green: 13 }
// -------------------------------------------------------------------------------------------------------------------------------------------

require("util").inspect.defaultOptions.depth = 3;
const getFromRound = (round, color) => parseInt(round.match(new RegExp(`(\\d)+ ${color}`, "gi"))?.[0]?.split(" ")[0] ?? 0)

const calculatePower = (game) => game.rounds.red * game.rounds.blue * game.rounds.green

const result = content
    .split('\n')
    .map((e) => ({ game: parseInt(e.split("Game ")[1].split(":")[0]), rounds: e.split(": ")[1] }))
    .map(e => e.rounds.split(';').reduce((a, round) =>
    ({
        game: a.game,
        rounds: {

            red: Math.max(a.rounds.red, getFromRound(round, "red")),
            blue: Math.max(a.rounds.blue, getFromRound(round, "blue")),
            green: Math.max(a.rounds.green, getFromRound(round, "green"))
        }
    }), { game: e.game, rounds: initialCubes })
    )
    .reduce((a, e) => a + calculatePower(e), 0)

// Part1
// -------------------------------------------------------------------------------------------------------------------------------------------
// .reduce((a, e) => e.rounds.red <= maxCubes.red & e.rounds.blue <= maxCubes.blue & e.rounds.green <= maxCubes.green ? a + e.game : a, 0)
// -------------------------------------------------------------------------------------------------------------------------------------------

console.log(result)