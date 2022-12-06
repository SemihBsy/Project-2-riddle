/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config(); // Load ENV Variables
const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const methodOverride = require("method-override");
const mongoose = require("mongoose");

/////////////////////////////////////////////
// Database Connection
/////////////////////////////////////////////
// Setup inputs for our connect function
const MONGO = process.env.MONGO;
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Establish Connection
mongoose.set('strictQuery', true);
mongoose.connect(MONGO, CONFIG);

// Events for when connection opens/disconnects/errors
mongoose.connection
  .on("open", () => console.log("Connected to Mongoose"))
  .on("close", () => console.log("Disconnected from Mongoose"))
  .on("error", (error) => console.log(error));

////////////////////////////////////////////////
// Our Models
////////////////////////////////////////////////
// pull schema and model from mongoose
const { Schema, model } = mongoose;

// make fruits schema
const riddlesSchema = new Schema({
  name: String,
  color: String,
  readyToEat: Boolean,
});

// make fruit model
const Riddle = model("Riddle", riddlesSchema);

/////////////////////////////////////////////////
// Create our Express Application Object
/////////////////////////////////////////////////
const app = express();

/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")); //logging
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically

////////////////////////////////////////////
// Routes
////////////////////////////////////////////
app.get("/", (req, res) => {
  res.send("Server is running.");
});

app.get("/riddles/seed", (req, res) => {
  const startRiddles = [
    { riddle: "I can be cracked. I can be made. I can be told. I can be played. What am I?", answer: "Joke", image: "" },
    { riddle: "If you are justice, please do not lie. What is the price for your blind eye?", answer: "Bribe", image: ""},
    { riddle: "The less of them you have, the more one is worth?", answer: "Friend", image: "" },
    { riddle: "What Does A Liar Do When He's Dead?", answer: "He lies still", image: "" },
    { riddle: "It Can Be Cruel, Poetic, Or Blind. But When It\’s Denied, It\’s Violence You May Find.", answer: "brown", image: "" },
  ];

  // Delete all riddles
  Riddle.deleteMany({}, (err, data) => {
    // Seed Starter Riddles
    Riddle.create(startRiddles, (err, data) => {
      // send created riddles as response to confirm creation
      res.json(data);
    });
  });
});

// index route
app.get("/riddles", (req, res) => {
    Riddle.find({}, (err, riddles) => {
      res.render("riddles/index.ejs", { riddles });
    });
  });

  //new route
app.get("/riddles/new", (req, res) => {
    res.render("riddles/new.ejs")
})

app.delete("/riddles/:id", (req, res) => {
    // get the id from params
    const id = req.params.id
    // delete the riddle
    Riddle.findByIdAndRemove(id, (err, riddle) => {
        // redirect user back to index page
        res.redirect("/riddles")
    })
})

// create route
app.post("/riddles", (req, res) => {
    // create the new riddle
    Riddle.create(req.body, (err, riddle) => {
        // redirect the user back to the main riddles page after riddle created
        res.redirect("/riddles")
    })
})

// edit route
app.get("/riddles/:id/edit", (req, res) => {
    // get the id from params
    const id = req.params.id
    // get the riddle from the database
    Riddle.findById(id, (err, riddle) => {
        // render template and send it riddle
        res.render("riddles/edit.ejs", {riddle})
    })
})

//update route
app.put("/riddles/:id", (req, res) => {
    // get the id from params
    const id = req.params.id
    // update the riddle
    Riddle.findByIdAndUpdate(id, req.body, {new: true}, (err, fruit) => {
        // redirect user back to main page when riddle
        res.redirect("/riddles")
    })
})



// show route
app.get("/riddles/:id", (req, res) => {
    // get the id from params
    const id = req.params.id

    // find the particular fruit from the database
    Riddle.findById(id, (err, riddle) => {
        // render the template with the data from the database
        res.render("riddles/show.ejs", {fruit})
    })
})

//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`));