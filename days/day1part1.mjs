import fs from 'fs'

export default function() {
    const goal = 2020;
    // load the data
    fs.readFile('data/1.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
        } else {
            const numbers = data.split(/\s+/)
            numbers.sort((a, b) => a - b)
            var upper = numbers.length - 1
            var lower = 0
            while (true) {
                const x = parseInt(numbers[lower])
                const y = parseInt(numbers[upper])
                const z = x + y
                if (z === goal) {
                    console.log("Day 1 Part 1:", x * y)
                    return;
                } else if (z > goal) {
                    upper -= 1
                } else {
                    lower += 1
                }
            }
        }
    })
}