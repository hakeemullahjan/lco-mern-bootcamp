require("dotenv").config()

const express = require("express")
const app = express()
const mongoose = require("mongoose")

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED")
}).catch(() => console.log("DB GOT OOPS..."))

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`App is running at port:${port}`)
})