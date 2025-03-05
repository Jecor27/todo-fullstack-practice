import express from "express"

const app = express()


const port = 8080
app.get('/', (req, res) => {
    res.json('hello (from server)')
})

app.listen(port, () => {
    console.log('connected from server on port: ', port)
})