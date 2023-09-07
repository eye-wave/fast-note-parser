import { parse as myParser } from "."
import { midi as noteParser } from "note-parser"
import { toMidi as tonalParser } from "@tonaljs/midi"

const colors = {
  red: "\x1b[31m",
  green: "\x1b[32m",
  black: "\x1b[30m",
  yellow: "\x1b[33m",
  _: "\x1b[0m",
}

const fns = [
  [myParser, "my-parser"],
  [noteParser, "note-parser"],
  [tonalParser, "tonal-midi"],
]

const testData = [
  ["C4", 60],
  ["D5", 74],
  ["D#5", 75],
  ["G#2", 44],
  ["F#3", 54],
  ["A#6", 94],
  ["B1", 35],
  ["E6", 88],
  ["Cb2", 35],
  ["D##4", 64],
  ["Abb3", 55],
  ["b0", 23],
  ["f-1", 5],
  ["gb-1", 6],
  ["a##-1", 11],
  ["g#9", null],
  ["a##9", null],
  ["gb#1", null],
  ["g##-2", null],
  ["cbb-1", null],
  ["CC", null],
  ["X5", null],
  ["G#", null],
  ["H5", null],
  ["G44", null],
  ["Hello World!", null],
  ["V7", null],
]

function run(fn: Function, count: number, arg: string) {
  const start = performance.now()

  let i = -1
  while (++i < count) fn.apply(null, [arg])

  return performance.now() - start
}

fns.forEach(([fn, name]) => {
  let failed = false
  testData.forEach(([data, expected]) => {
    const value = fn.apply(null, [data])
    console.log(
      `${value === expected ? colors.green : colors.red}received: ${data}, got: ${value}. expected: ${expected}${
        colors._
      }`
    )

    if (!failed) failed = value !== expected
  })

  console.log(`${name}: ${!failed ? colors.green + "passed" : colors.red + "failed"}${colors._}`)
  console.log()
})

fns.forEach(([fn, name]) => {
  const numbers = testData.map(([data]) => run(fn, 1_000_000, data))

  console.log(`${name}: [MIN] ${Math.min(...numbers)}`)
  console.log(`${name}: [MAX] ${Math.max(...numbers)}`)
  console.log(`${name}: [AVG] ${numbers.reduce((acc, v) => acc + v, 0) / numbers.length}`)
  console.log()
})
