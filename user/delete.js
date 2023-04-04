const User = require('../../models/User')

module.exports = async (req, res) => {
    User.findByIdAndRemove(req.params.id, req.body, function (err, data) {
        if (!err) {
            console.log("Deleted", data);
            res.json(data)
        }
    });
}