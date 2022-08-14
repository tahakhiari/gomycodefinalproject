const express = require('express')
const router = express.Router()
const User = require("../models/user")

router.post("/adduser", (req, res) => {
    const newUser = new User({ ...req.body })
    newUser.save()
        .then(res.status(200).json(newUser))
        .catch(err => res.status(4000).json(err))
})
router.post('/login', async (req, res) => {
    const { name, password } = req.body
    const user = await User.findOne({ name })
    console.log(user)

    if (user && user.password == password) {
        res.json({ name: user.name, email: user.email, phone: user.phone })
    } else {
        res.status(404).json({ message: 'User not found!' })
    }
})

router.get('/', (req, res) => {
    User.find()
        .then(users => res.status(200).json(users))
        .catch(err => res.status(400).json(err))
})

router.get('/:id', async (req, res) => {


    const user = await User.findById(req.params.id)
    if (user) {
        res.json(user)
    } else {
        res.status(404).json({ message: 'User not found!' })
    }

})

router.delete('/:id', async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        console.log(user)
        await User.findByIdAndDelete(req.params.id)
        res.json({ message: 'User deleted successfully!' })
    } else {
        res.status(404).json({ message: 'user doesnt exist!' })
    }
})


router.put('/:id', async (req, res) => {
    //1.find user if he exists or not
    const user = await User.findById(req.params.id)
    //if he exists:
    if (user) {
        user.name = req.body.name
        user.email = req.body.email
        user.phone = req.body.phone
        user.password = req.body.password
        await user.save()
        res.json(user)

    } else {

        res.status(404).json({ message: 'user doesnt exist!' })

    }


})


module.exports = router 