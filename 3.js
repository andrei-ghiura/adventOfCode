const fs = require("fs");
const content = fs.readFileSync("./3", "utf8");


const matrix = content
    .split('\r\n')
    .map(e => e.split(""))

const parts = content
    .split('\n')
    .reduce((a, row, i) =>
    ([...a,
    ...row.match(new RegExp('(\\d)+', 'gi'))
        ? [...row.matchAll(new RegExp('(\\d)+', 'gi'))]
            .reduce((a, e) =>

            (
                [...a, {
                    number: e[0],
                    position: { x: e.index, y: i },
                    l: e[0].length
                }]
            )
                ,
                []
            )
        : []
    ]),
        [])

// console.log(parts.reduce((a,e=)))

const getNeighbours = ({ position: { x, y }, l }) => [
    { x: x - 1, y: y - 1 }, { x: x - 1, y: y }, { x: x - 1, y: y + 1 }, { x: x + l, y: y - 1 }, { x: x + l, y: y }, { x: x + l, y: y + 1 },
    ...Array(l).fill().map((e, i) => ({ x: x + i, y: y - 1 })),
    ...Array(l).fill().map((e, i) => ({ x: x + i, y: y + 1 }))
].filter(e => e.x > -1 & e.y > -1 & e.x < matrix[0].length & e.y < matrix.length)

const checkNeighbour = ({ x, y }) => !!(matrix[y][x].replaceAll(/(\d)|\./g, '').length > 0)


const checkIfValid = (part) => !!getNeighbours(part).reduce((a, e) => a | checkNeighbour(e), false)

parts.map(part => console.log(part.number, checkIfValid(part)))

const result = parts
    .reduce((a, e) => checkIfValid(e) ? [...a, parseInt(e.number)] : a, [])
    // .reduce((a, e) => a.indexOf(e) === -1 ? [...a, e] : a, [])
    .reduce((a, e) => a + e, 0)

console.log(result)

