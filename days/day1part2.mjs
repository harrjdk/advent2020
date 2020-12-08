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
            var i = 0
            while (i < numbers.length) {
                var lower = i + 1
                var upper = numbers.length - 1
                while (lower < upper) {
                    const x = parseInt(numbers[i])
                    const y = parseInt(numbers[lower])
                    const z = parseInt(numbers[upper])
                    const sum = x + y + z
                    if (sum === goal) {
                        console.log("Day 1 Part 2", x * y * z)
                        return
                    } else if (sum < goal) {
                        lower += 1
                    } else {
                        upper -= 1
                    }
                }
                i += 1
            }
        }
    })
}