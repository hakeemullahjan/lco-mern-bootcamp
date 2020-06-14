const express = require("express")
const app = express()

const port = 8000

app.get("/", (req, res) => {
    return res.send("Home Page")
})

app.get("/login", (req, res) => {
    return res.send("You are visiting Login route")
})

app.get("/signup", (req, res) => {
    return res.send("You are visiting Signup route")
})

app.listen(port, () => console.log("Server is up and running on port:", port))
