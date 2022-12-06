// import
require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const mongoose = require("mongoose")

// create express app
const app = express()

// establish mongo connection
mongoose.connect(process.env.MONGO)

// mongoose connection events
mongoose.connection
.on("open", () => console.log("Connected to Mongo"))
.on("close", () => console.log("Disconnected to Mongo"))
.on("error", (error) => console.log(error))


////////////////////////////////////////////////
// Our Models
////////////////////////////////////////////////
// pull schema and model from mongoose
const {Schema, model} = mongoose

// make riddles schema
const riddlesSchema = new Schema({
    riddle: String,
    answer: String,
    image: String
})

// make riddle model
const Riddle = model("Riddle", riddlesSchema)

// register middleware
app.use(morgan("dev"))
app.use("/static", express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"))

//Routes and Routers
app.get("/", (req, res) => {
    res.send("<h1>Server is Working</h1>")
})



// start the server (listener)
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))