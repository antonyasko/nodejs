function actionValidation (action, options) {
  if (action === undefined) {
    options.action = 'Action not specified!'
    return false
  } else if (action.toLowerCase() !== 'decode'.toLowerCase() &&
  action.toLowerCase() !== 'encode'.toLowerCase()) {
    options.action = 'Incorrect action value!'
    return false
  } else {
    options.action = action
    return true
  }
}

module.exports = actionValidation
