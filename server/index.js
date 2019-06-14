const fs = require("fs")
const path = require("path")

const express = require("express")
const cors = require("cors")
const compression = require("compression")

const app = express()

const data = require("./data")

app.use(cors())
app.use(compression())

app.get("/data", (req, res) => {
  res.send(data)
})

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
