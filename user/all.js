const User = require('../models/User')

module.exports = async (req, res) => {
    const users = await User.find()

    res.status(200).json(users)
}