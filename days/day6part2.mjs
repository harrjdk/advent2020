import fs from 'fs'

export default function() {
    const maxF = 127
    const maxR = 7
        // load the data
    fs.readFile('data/day6.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
        } else {
            const lines = data.split(/\r?\n/)
            const groups = []
            var currGroup = []
            lines.forEach((line) => {
                const trimmed = line.trim()
                if (trimmed.length < 1) {
                    groups.push(currGroup)
                    currGroup = []
                } else {
                    currGroup.push(new Set(trimmed.split('')))
                }
            })
            console.log("Day 6 Part 2:", groups.map(group =>
                group.reduce((a, b) => new Set([...a].filter(x => b.has(x)))).size
            ).reduce((a, b) => a + b))
        }
    })
}