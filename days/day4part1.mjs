import fs from 'fs'

export default function() {
    const vel = [3, 1]
        // load the data
    fs.readFile('data/day4.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
        } else {
            const validNumber = (num, min, max) => {
                if (num == null) {
                    return false
                }
                const intNum = parseInt(num)
                return (intNum >= min && intNum <= max)
            }
            const validUnit = (unit) => {
                if (unit == null || unit.length < 3) {
                    return false
                }
                // get the last 2 chars
                const unitType = unit.slice(-2)
                if (unitType === 'cm') {
                    return validNumber(unit.substring(0, unit.length - 2), 150, 193)
                } else if (unitType === 'in') {
                    return validNumber(unit.substring(0, unit.length - 2), 59, 76)
                } else {
                    return false
                }
            }
            const validColor = (color) => {
                return /^#[a-zA-Z0-9]{6}$/.test(color)
            }
            const validEye = (eye) => {
                switch (eye) {
                    case 'amb':
                    case 'blu':
                    case 'brn':
                    case 'gry':
                    case 'grn':
                    case 'hzl':
                    case 'oth':
                        return true
                    default:
                        return false
                }
            }
            const validPid = (pid) => {
                return /^[0-9]{9}$/.test(pid)
            }
            const checkPassportPart2 = (passport) => {
                if (validEye(passport['ecl']) &&
                    validPid(passport['pid']) &&
                    validNumber(passport['eyr'], 2020, 2030) &&
                    validColor(passport['hcl']) &&
                    validNumber(passport['byr'], 1920, 2002) &&
                    validNumber(passport['iyr'], 2010, 2020) &&
                    validUnit(passport['hgt'])) {
                    return true
                } else {
                    return false
                }
            }
            const checkPassport = (passport) => {
                if (passport['ecl'] != null &&
                    passport['pid'] != null &&
                    passport['eyr'] != null &&
                    passport['hcl'] != null &&
                    passport['byr'] != null &&
                    passport['iyr'] != null &&
                    passport['hgt'] != null) {
                    return true
                } else {
                    return false
                }
            }
            const lines = data.split(/\r?\n/)
            var tmpPassport = {}
            var validCount = 0
            var validCount2 = 0
            lines.forEach((line) => {
                    const trimmed = line.trim()
                    if (trimmed.length === 0) {
                        if (checkPassport(tmpPassport)) {
                            validCount += 1
                        }
                        if (checkPassportPart2(tmpPassport)) {
                            validCount2 += 1
                        }
                        tmpPassport = {}
                        return
                    }
                    trimmed.split(/\s+/).forEach((kv) => {
                        const keyVal = kv.split(':')
                        tmpPassport[keyVal[0]] = keyVal[1]
                    })
                })
                // check the last passport
            if (checkPassport(tmpPassport)) {
                validCount += 1
            }
            if (checkPassportPart2(tmpPassport)) {
                validCount2 += 1
            }
            console.log('Day 4 Part 1', validCount)
            console.log('Day 4 Part 2', validCount2)
        }
    })
}