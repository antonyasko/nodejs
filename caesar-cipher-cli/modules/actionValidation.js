function actionValidation (action, options) {
  if (action === undefined) {
    options.action = 'Enter all parameters!'
    return false
  } else if (action !== 'decode' && action !== 'encode') {
    options.action = 'Incorrect action value!'
    return false
  } else {
    options.action = action
    return true
  }
}

module.exports = actionValidation
