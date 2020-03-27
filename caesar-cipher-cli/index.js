const { program } = require('commander')
const fs = require('fs')

const englishAlphabet = 'abcdefghijklmnopqrstuvwxyz'

program
  .option('-s, --shift <num>', 'a shift')
  .option('-i, --input <filename>', 'an input file')
  .option('-o, --output <filename>', 'an output file')
  .option('-a, --action <action>', 'an action encode/decode')
  .parse(process.argv)

function decoder (shift, action, char, alphabet) {
  alphabet = action === 'decode' ? alphabet.split('').reverse().join('') : alphabet

  if (!alphabet.includes(char.toLowerCase())) return char

  let position = alphabet.indexOf(char.toLowerCase()) + shift
  position = position >= alphabet.length ? position - alphabet.length : position

  return char === char.toUpperCase() ? alphabet[position].toUpperCase() : alphabet[position]
}

const outputArrayOfChar = []
const shift = Number(program.shift.slice(0, 2))
let inputText

if (program.input) {
  inputText = fs.readFileSync(program.input, 'utf-8')

  inputText.split('').forEach(char => {
    outputArrayOfChar.push(decoder(shift, program.action, char, englishAlphabet))
  })

  if (program.output) {
    fs.writeFileSync(program.output, outputArrayOfChar.join(''), 'utf-8')
  } else {
    process.stdout.write(`Your ${program.action} data: ${outputArrayOfChar.join('')}`)
  }
} else {
  process.stdin.setEncoding('utf8')
  process.stdout.write(`Enter the data you need to ${program.action}: `)

  process.stdin.on('readable', () => {
    while ((inputText = process.stdin.read()) !== null) {
      inputText.split('').forEach(char => {
        outputArrayOfChar.push(decoder(shift, program.action, char, englishAlphabet))
      })
      if (program.output) {
        fs.writeFileSync(program.output, outputArrayOfChar.join(''), 'utf-8')
      } else {
        process.stdout.write(`Your ${program.action} data: ${outputArrayOfChar.join('')}`)
        process.stdout.write(`Enter the data you need to ${program.action}: `)
      }
      outputArrayOfChar.length = 0
    }
  })
}

// process.stdin.on('end', () => {
//   process.stdout.write('end');
// })
