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
                const charCount = (password.match(new RegExp(char, 'g')) || []).length
                if (charCount <= minMax[1] && charCount >= minMax[0]) {
                    validCount += 1
                }
            })
            console.log("Day 2 Part 1", validCount)
        }
    })
}