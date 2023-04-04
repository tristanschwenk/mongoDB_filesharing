const User = require('../../models/User')

module.exports = async (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, (err, result) => {
        res.json(result)
    })
}