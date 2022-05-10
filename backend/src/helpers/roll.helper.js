const Roll = require('../models/Roll')

exports.findAllRolls = async () => {
  const rolls = await Roll.find()
  return rolls
}

exports.addRoll = async roll => {
  const date = new Date().toISOString()
  const newRoll = new Roll({
    user: roll.user,
    dateTime: date,
    roll: roll.roll
  })

  const savedRoll = await newRoll.save()

  return savedRoll
}
