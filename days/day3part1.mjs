import fs from 'fs'

export default function() {
    const vel = [3, 1]
        // load the data
    fs.readFile('data/day3.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
        } else {
            var field = []
            const lines = data.split(/\s+/)
            lines.forEach((line, index) => {
                    field[index] = line.split('')
                })
                // get first open square on top row
            const topRow = field[0]
            var startPos = [0, 0]
            for (var i = 0; i < topRow.length; i++) {
                if (topRow[i] === '.') {
                    startPos = [i, 0]
                    break
                }
            }
            const treeCounter = (field, vel, startPos) => {
                var treeCount = 0
                while (startPos[1] < field.length) {
                    // shift by velocity
                    const newPos = [startPos[0] + vel[0], startPos[1] + vel[1]]
                        // check we're not overflowing on y axis
                    if (newPos[1] >= field.length) {
                        break
                    }
                    // check we're not overflowing on the x axis and if so, wrap around
                    if (newPos[0] >= field[0].length) {
                        newPos[0] = newPos[0] % field[0].length
                    }
                    // check if we hit a tree
                    if (field[newPos[1]][newPos[0]] === '#') {
                        treeCount += 1
                    }
                    startPos = newPos
                }
                return treeCount
            }
            const treeCount1 = treeCounter(field, vel, startPos)
            console.log("Day 3 Part 1", treeCount1)
            const treeCount2 = treeCounter(field, [1, 1], [0, 0])
            const treeCount3 = treeCounter(field, [5, 1], [0, 0])
            const treeCount4 = treeCounter(field, [7, 1], [0, 0])
            const treeCount5 = treeCounter(field, [1, 2], [0, 0])
            console.log("Day 3 Part 2", treeCount1 * treeCount2 * treeCount3 * treeCount4 * treeCount5)
        }
    })
}