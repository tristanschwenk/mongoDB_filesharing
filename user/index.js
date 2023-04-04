const router = require('express').Router()

const register = require('./register')
const login = require('./login')
const update = require('./update')
const del = require('./delete')
const all = require('./all')

router.post("/register", register)
router.post("/login", login)
router.patch("/update", update)
router.delete("/delete/:id", del)
router.get("/all", all)

module.exports = router