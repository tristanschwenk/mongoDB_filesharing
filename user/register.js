const User = require('../../models/User')
const registerValidation = require('../../validation/register')
const bcrypt = require('bcrypt')

module.exports = async (req,res) => {
    const {error} = registerValidation.validate(req.body)

    if (error) {
        res.send(error.details[0].message)
    }
    //Check if mail isn't already use in db

    const emailExist = await User.find({email : req.body.email})
    console.log(emailExist);
    if (emailExist.length) {
        res.send("User already used")
        return
    }

    //Encrypt password

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    // Add User

    const newUser = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashPassword,
    })
    res.json(newUser)
    console.log("New User : ", newUser)
}