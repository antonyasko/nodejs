
const { program } = require('commander')
const fs = require('fs')

const decoder = require('../modules/decoder')
const shiftValidation = require('../modules/shiftValidation')
const actionValidation = require('../modules/actionValidation')

const englishAlphabet = 'abcdefghijklmnopqrstuvwxyz'

program
  .option('-s, --shift <num>', 'a shift')
  .option('-i, --input <filename>', 'an input file')
  .option('-o, --output <filename>', 'an output file')
  .option('-a, --action <action>', 'an action encode/decode')
  .parse(process.argv)

const outputArrayOfChar = []

let inputText

const options = {
  shift: null,
  action: null
}

const shiftStatus = shiftValidation(program.shift, options)
const actionStatus = actionValidation(program.action, options)

if (program.input && shiftStatus && actionStatus) {
  try {
    inputText = fs.readFileSync(program.input, 'utf-8')

    inputText.split('').forEach(char => {
      outputArrayOfChar.push(decoder(options.shift, program.action, char, englishAlphabet))
    })

    program.output
      ? fs.writeFileSync(program.output, outputArrayOfChar.join(''), 'utf-8')
      : process.stdout.write(`Your ${program.action} data: ${outputArrayOfChar.join('')}`)
  } catch (error) {
    process.on('exit', () => {
      process.stderr.write(('Incorrect input. Enter the correct input and try again.'))
    })
  }
} else if (!program.input && shiftStatus && actionStatus) {
  process.stdin.setEncoding('utf8')
  process.stdout.write(`Enter the data you need to ${program.action}: `)

  process.stdin.on('readable', () => {
    while ((inputText = process.stdin.read()) !== null) {
      inputText.split('').forEach(char => {
        outputArrayOfChar.push(decoder(options.shift, program.action, char, englishAlphabet))
      })

      program.output
        ? fs.writeFileSync(program.output, outputArrayOfChar.join(''), 'utf-8')
        : process.stdout.write(`Your ${program.action} data: ${outputArrayOfChar.join('')}`)

      outputArrayOfChar.length = 0
    }
    process.stdout.write(`Enter the data you need to ${program.action}: `)
  })
} else if (!shiftStatus || !actionStatus) {
  if (!shiftStatus) {
    process.on('exit', () => {
      process.stderr.write((`${options.shift}`))
    })
  }
  if (!actionStatus) {
    process.on('exit', () => {
      process.stderr.write((`${options.action}`))
    })
  }
}
