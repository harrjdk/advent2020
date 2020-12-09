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
            const matcher = /^([ a-z]+) contain ([a-z0-9, ]+)\.$/
            const colorMap = {}
            lines.forEach(line => {
                const matches = line.match(matcher)
                matches.shift()
                var key = matches.shift()
                key = key.substring(0, key.length - 1).trim()
                const rawVals = matches.shift().split(', ')
                const vals = rawVals.filter(x => x != null).map(x => x.trim()).map(x => {
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
                    //console.log(key, "=>", vals)
            })
            const getHoldCount = (selColor) => {
                var count = 0
                var currentColors = [selColor]
                const colorSet = new Set(selColor)
                while (currentColors.length > 0) {
                    //console.log(currentColors)
                    //console.log(count)
                    const buffer = []
                    for (const [key, vals] of Object.entries(colorMap)) {
                        const filtered = vals.filter(x => {
                            if (x.count > 0) {
                                return currentColors.filter(y => x.color === y).length > 0
                            }
                            return false
                        })
                        if (filtered.length > 0 && !colorSet.has(key)) {
                            buffer.push(key)
                            colorSet.add(key)
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