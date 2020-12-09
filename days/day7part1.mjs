import fs from 'fs'

export default function() {
    const maxF = 127
    const maxR = 7
        // load the data
    fs.readFile('data/day7.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
        } else {
            const lines = data.split(/\r?\n/)
            const matcher = /^([ a-z]+) contain (no other bags|[0-9]+ [a-z ]+)(, [0-9]+ [a-z ]+)*?.$/
            const colorMap = {}
            lines.forEach(line => {
                const matches = line.match(matcher)
                matches.shift()
                var key = matches.shift()
                key = key.substring(0, key.length - 1).trim()
                const vals = matches.filter(x => x != null).map(x => x.replace(',', '').trim()).map(x => {
                    if (x === 'no other bags') {
                        return {
                            count: 0,
                            color: null
                        }
                    } else {
                        const index = x.indexOf(' ')
                        const trimEnd = x.slice(-1) === 's'
                        return {
                            count: parseInt(x.substring(0, index)),
                            color: x.substring(index, x.length - (trimEnd ? 1 : 0)).trim()
                        }
                    }
                })
                colorMap[key] = vals
            })
            const getHoldCount = (selColor) => {
                var count = 0
                var currentColors = [selColor]
                while (currentColors.length > 0) {
                    console.log(currentColors)
                    console.log(count)
                    const buffer = []
                    for (const [key, vals] of Object.entries(colorMap)) {
                        const filtered = vals.filter(x => {
                            if (x.count > 0) {
                                return currentColors.filter(y => x.color === y).length > 0
                            }
                            return false
                        })
                        if (filtered.length > 0 && currentColors.filter(z => z === key).length === 0) {
                            buffer.push(key)
                        }
                    }
                    count += buffer.length
                    currentColors = buffer
                }
                return count
            }
            console.log("Day 7 Part 1:", getHoldCount('shiny gold bag'))
        }
    })
}