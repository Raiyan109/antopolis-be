const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
require('dotenv').config()
const Animal = require('./models/animal/animalModel.js')

const app = express()

app.use(express.json())
app.use(cors())


app.get('/', async (req, res) => {
    const animals = await Animal.find()

    if (!animals) {
        return res.status(400).json({ msg: 'No Animal found' })
    }

    res.status(200).json({
        success: true,
        data: animals
    })
})

app.post('/create', async (req, res) => {
    const { name, status, desc, dueTask } = req.body

    try {
        const task = await Task.create({ name, status, desc, dueTask })

        if (!task) {
            return res.status(400).json({ msg: 'No Task can be created' })
        }

        res.status(200).json({
            success: true,
            data: task
        })
    } catch (error) {

        return res.status(400).json({ msg: error.message })
    }
})

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        app.listen(process.env.PORT, (req, res) => {
            console.log(`Server listening on ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })
