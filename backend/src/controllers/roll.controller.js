const { findAllRolls } = require('../helpers/roll.helper')

exports.findAllRolls = async (req, res) => {
  const rolls = await findAllRolls()

  return res.json({
    success: true,
    error: '',
    data: rolls
  })
}
