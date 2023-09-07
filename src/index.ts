export function parse(input: string) {
  if (input.length > 5) return null

  // check if octave is a number
  let octave = input.charCodeAt(input.length - 1) - 48
  if (octave < 0 || octave > 9) return null

  // toLowerCase but for the first char only
  const ch = input.charCodeAt(0) + +(input.charCodeAt(0) < 97) * 32

  // Check if first letter is in range of a - g
  if (ch < 97 || ch > 103) return null

  let note = 0
  if (input.length > 2) {
    if (input.charAt(1) === "#") note++
    else if (input.charAt(1) === "b") note--
    else if (input.charAt(1) === "-") note
    else return null
  }
  if (input.length > 3) {
    // this is mundane but it's faster than using .slice()
    if (input.charAt(1) === "#" && input.charAt(2) === "#") note++
    else if (input.charAt(1) === "b" && input.charAt(2) === "b") note--
    else if (input.charAt(2) === "-") note
    else return null
  }

  // check if the input is valid
  if (input.charAt(input.length - 2) === "-") {
    if (input.charAt(input.length - 1) !== "1") return null
    octave = -1
  }

  // (note - 97 - 2 + 7) set the note number acordingly to each letter
  // with a -2 shift so "c" = 0 "d" = 1 ... "b" = 11
  const notePre = (ch - 92) % 7

  // multiply by 2 because sharps
  // subtract 1 if note is higher than D
  // const note = notePre * 2 - (notePre > 2 ? 1 : 0)
  note += notePre * 2 - (notePre > 2 ? 1 : 0)

  // add everything toghether
  const tone = 12 + octave * 12 + note

  if (tone < 0 || tone > 127) return null
  return tone
}
