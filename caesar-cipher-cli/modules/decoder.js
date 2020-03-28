
function decoder (shift, action, char, alphabet) {
  alphabet = action.toLowerCase() === 'decode'.toLowerCase()
    ? alphabet.split('').reverse().join('') : alphabet

  if (!alphabet.includes(char.toLowerCase())) return char

  let position = alphabet.indexOf(char.toLowerCase()) + shift
  position = position >= alphabet.length ? position - alphabet.length : position

  return char === char.toUpperCase() ? alphabet[position].toUpperCase() : alphabet[position]
}

module.exports = decoder
