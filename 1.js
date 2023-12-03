const fs = require("fs");
const content = fs.readFileSync("./1.txt", "utf8");
const nrDict = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9 };

const reverse = (e) => e.split("").reduce((a, e) => e + a, "")
const replace = (e) => Object.keys(nrDict).reduce((a, e) => a.replace(e, nrDict[e]), e)

const fwRegex = new RegExp(`${[...Object.keys(nrDict), ...Object.values(nrDict)].join("|")}`)
const bkRegex = new RegExp(`${reverse([...Object.keys(nrDict), ...Object.values(nrDict)].join("|"))}`)

const result = content
    .split("\r\n")
    .map(e => ({ first: e.match(fwRegex)[0], last: reverse(reverse(e).match(bkRegex)[0]) }))
    .map(e => replace(e.first) + replace(e.last))
    .reduce((a, e) => a + parseInt(e), 0)

console.log(result)