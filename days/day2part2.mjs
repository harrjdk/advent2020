import fs from 'fs'

export default function() {
    const goal = 2020;
    // load the data
    fs.readFile('data/day2.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
        } else {
            var validCount = 0
            const lines = data.split('\n')
            lines.forEach((line) => {
                const row = line.split(/\s+/)
                const minMax = row[0].split('-')
                const char = row[1].substring(0, row[1].length - 1)
                const password = row[2]
                if (password.length < minMax[1]) {
                    return
                }
                const char1 = password.charAt(parseInt(minMax[0]) - 1)
                const char2 = password.charAt(parseInt(minMax[1]) - 1)
                if ((char1 === char && char2 !== char) || (char2 === char && char1 !== char)) {
                    validCount += 1
                }
            })
            console.log("Day 2 Part 2", validCount)
        }
    })
}