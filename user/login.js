const User = require('../../models/User')
const registerValidation = require('../../validation/login')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


module.exports = async (req,res) => {
    const {error} = registerValidation.validate(req.body)

    if (error) {
        res.send(error.details[0].message)
    }
    //Check if user match

    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send("No such mail")

    //Compare password

    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).send("Incorrect Password or wrong mail")

    // Create JWT

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)

    //Add token

    User.findByIdAndUpdate(user.id, {accessToken: token},{ upsert: true }, (err, result) => {
        res.json(result)
    })

    console.log(user)
    // res.header('auth-token', token).json(updatedUser)

    
}