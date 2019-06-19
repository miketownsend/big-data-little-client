const fs = require("fs")
const path = require("path")

const express = require("express")
const cors = require("cors")
const compression = require("compression")

const app = express()

const data = require("./data-characters")
const randomKeyData = require("./data-random-keys")

app.use(cors())

app.get("/data", (req, res) => {
  res.send(data)
})

app.get("/random-key", (req, res) => {
  res.send(randomKeyData)
})

app.get("/data-gzip", compression(), (req, res) => {
  res.send(data)
})

app.get("/random-key-gzip", compression(), (req, res) => {
  res.send(randomKeyData)
})

app.use('/images', express.static(path.join(__dirname, '../images')))

app.use((req, res) => res.status(404).send("404 Not Found"))

app.use((req, res, err) => {
  res.status(500).send({
    status: 500,
    name: err.name,
    message: err.message,
    stack: err.stack
  })
})

app.listen(3003, () => {
  console.log("Listening on http://localhost:3003")
})
