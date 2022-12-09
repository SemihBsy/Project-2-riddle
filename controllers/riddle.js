////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require('express') // bring this in so we can make our router
const Riddle = require('../models/riddle');


/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();


////////////////////////////////////////
// Router Middleware
////////////////////////////////////////
router.use((req, res, next) => {
    if (req.session.loggedIn) {
      next();
    } else {
      res.redirect("/user/login");
    }
});

/////////////////////////////////////////
// Routes
/////////////////////////////////////////
router.get("/seed", (req, res) => {
       // define data we want to put in the database
    const startRiddles = [
        { riddle: "I can be cracked. I can be made. I can be told. I can be played. What am I?", answer: "A joke!", image: "https://i.imgur.com/9jzqRLI.jpeg" },
        { riddle: "If you are justice, please do not lie. What is the price for your blind eye?", answer: "Bribe", image: "https://i.imgur.com/9jzqRLI.jpeg"},
        { riddle: "The less of them you have, the more one is worth?", answer: "A friend", image: "https://i.imgur.com/9jzqRLI.jpeg" },
        { riddle: "What Does A Liar Do When He's Dead?", answer: "He lies still", image: "https://i.imgur.com/9jzqRLI.jpeg" },
        { riddle: "What is it that no one wants to have, but no one wants to lose, either?", answer: "A lawsuit!", image: "https://i.imgur.com/9jzqRLI.jpeg" },
        { riddle: "What belongs to you, but others will use it?", answer: "Your name", image: "https://i.imgur.com/9jzqRLI.jpeg" },
        { riddle: "What gets harder to catch the faster you run?", answer: "Your Breath!", image: "https://i.imgur.com/9jzqRLI.jpeg" },
        { riddle: "What has two hands, a round face, always runs, yet always stays in place, too?", answer: "A clock!", image: "https://i.imgur.com/9jzqRLI.jpeg" },
        { riddle: "What is always on its way but never arrives?", answer: "Tomorrow", image: "https://i.imgur.com/9jzqRLI.jpeg" },
        { riddle: "The more there is of me, the less you see. What am I?", answer: "I\’m darkness!", image: "https://i.imgur.com/9jzqRLI.jpeg" },
        { riddle: "If you know me, you\’ll want to share me. If you share me, I\’ll be gone. What am I?", answer: "A secret!", image: "https://i.imgur.com/9jzqRLI.jpeg" },
        { riddle: "I have no hands but can knock on your door, and you must open if I do. What am I?", answer: "Opportunity.", image: "https://i.imgur.com/9jzqRLI.jpeg" },
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
router.get("/", (req, res) => {
    Riddle.find({username: req.session.username}, (err, riddles) => {
      res.render("riddles/index.ejs", { riddles });
    });
  });
  
  //new route
  router.get("/new", (req, res) => {
    res.render("riddles/new.ejs");
  });
  
  // create route
  router.post("/", (req, res) => {
    // add username to req.body to track related user
    req.body.username = req.session.username
    // create the new fruit
    Riddle.create(req.body, (err, riddle) => {
      // redirect the user back to the main fruits page after riddle created
      res.redirect("/riddles");
    });
});
  
  // edit route
  router.get("/:id/edit", (req, res) => {
    // get the id from params
    const id = req.params.id;
    // get the riddle from the database
    Riddle.findById(id, (err, riddle) => {
      // render template and send it riddle
      res.render("riddles/edit.ejs", { riddle });
    });
  });
  
  //update route
  router.put("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id;
    // update the riddle
    Riddle.findByIdAndUpdate(id, req.body, { new: true }, (err, riddle) => {
      // redirect user back to main page when riddle
      res.redirect("/riddles");
    });
  });
  
  router.delete("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id;
    // delete the riddle
    Riddle.findByIdAndRemove(id, (err, riddle) => {
      // redirect user back to index page
      res.redirect("/riddles");
    });
  });
  
  // show route
  router.get("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id;
  
    // find the particular riddle from the database
    Riddle.findById(id, (err, riddle) => {
      // render the template with the data from the database
      res.render("riddles/show.ejs", { riddle });
    });
  });
  
  //////////////////////////////////////////
  // Export the Router
  //////////////////////////////////////////
  module.exports = router; 