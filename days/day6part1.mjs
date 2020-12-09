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
            var currGroup = new Set()
            lines.forEach((line) => {
                const trimmed = line.trim()
                if (trimmed.length < 1) {
                    groups.push(currGroup)
                    currGroup = new Set()
                } else {
                    const answers = trimmed.split('')
                    answers.forEach((answer) => currGroup.add(answer))
                }
            })
            console.log("Day 6 Part 1:", groups.map((group) => group.size).reduce((a, b) => a + b))
        }
    })
}