const { program } = require('commander')
const fs = require('fs')

const englishAlphabet = 'abcdefghijklmnopqrstuvwxyz'

program
  .option('-s, --shift <num>', 'a shift')
  .option('-i, --input <filename>', 'an input file')
  .option('-o, --output <filename>', 'an output file')
  .option('-a, --action <action>', 'an action encode/decode')
  .parse(process.argv)

const inputText = fs.readFileSync(program.input, 'utf-8') || ''
const outputArrayOfChar = []

const shift = Number(program.shift)

inputText.split('').forEach(char => {
  outputArrayOfChar.push(decoder(shift, program.action, char, englishAlphabet))
})

if (outputArrayOfChar.length === 0) outputArrayOfChar.push('ERROR_MESSAGE')

fs.writeFileSync(program.output, outputArrayOfChar.join(''), 'utf-8')

function decoder (shift, action, char, alphabet) {
  alphabet = action === 'decode' ? alphabet.split('').reverse().join('') : alphabet

  if (!alphabet.includes(char.toLowerCase())) return char

  let position = alphabet.indexOf(char.toLowerCase()) + shift
  position = position >= alphabet.length ? position - alphabet.length : position

  return char === char.toUpperCase() ? alphabet[position].toUpperCase() : alphabet[position]
}
