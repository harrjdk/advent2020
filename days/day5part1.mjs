import fs from 'fs'

export default function() {
    const maxF = 127
    const maxR = 7
        // load the data
    fs.readFile('data/day5.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
        } else {
            const lines = data.split(/\s+/)
            const getNewRange = (d1, d2, upper) => {
                const n = parseInt(Math.ceil((d2 - d1) / 2))
                if (upper) {
                    return [n + d1, d2]
                } else {
                    return [d1, d2 - n]
                }
            }
            const getPos = (line) => {
                var f = [0, maxF]
                var r = [0, maxR]
                line.split('').forEach(v => {
                    switch (v) {
                        case 'F':
                            f = getNewRange(f[0], f[1], false)
                            break
                        case 'B':
                            f = getNewRange(f[0], f[1], true)
                            break
                        case 'R':
                            r = getNewRange(r[0], r[1], true)
                            break
                        case 'L':
                            r = getNewRange(r[0], r[1], false)
                            break
                        default:
                            break
                    }

                })
                const row = Math.min(...f)
                const seat = Math.min(...r)
                return row * 8 + seat
            }
            const ids = lines.map((l) => getPos(l))
            console.log("Day 5 Part 1", Math.max(...ids))
            ids.sort((a, b) => a - b)
            var prev = -1
            var i = 0
            while (i < ids.length) {
                const id = ids[i]
                if (prev !== -1) {
                    if (id - prev === 2) {
                        console.log("Day 5 Part 2:", (id - 1))
                        break
                    }
                }
                prev = id
                i += 1
            }
        }
    })
}