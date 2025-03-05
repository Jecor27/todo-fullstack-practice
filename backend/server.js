import express from "express"
import cors from 'cors'
import 'dotenv/config'

import connectDB from "./db.js"

const app = express()


const port = 8080

app.use(cors())

app.get('/test', (req, res) => {
    res.json('hello (from server)')
})

app.listen(port, () => {
    console.log('connected from server on port: ', port)
    connectDB()
})