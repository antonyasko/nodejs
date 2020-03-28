function shiftValidation (action, options) {
  if (action === undefined) {
    options.shift = 'Shift not specified!'
    return false
  } else if (isNaN(action * 1)) {
    options.shift = 'Shift must be a number!'
    return false
  } else if (action * 1 < 1) {
    options.shift = 'Shift must be greater than zero!'
    return false
  } else if (Math.trunc(action * 1) !== (action * 1)) {
    options.shift = 'Shift must be integer!'
    return false
  } else {
    options.shift = (action * 1)
    return true
  }
}

module.exports = shiftValidation
