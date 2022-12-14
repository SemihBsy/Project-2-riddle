require("dotenv").config()
const mongoose = require("./connection")
const Riddle = require("./riddle")

///////////////////////////////////////////
// Seed Code
////////////////////////////////////////////

mongoose.connection.on("open", () => {

    // define data we want to put in the database
        const startRiddles = [
          { question: "I can be cracked. I can be made. I can be told. I can be played. What am I?", answer: "A joke!", image: "https://i.imgur.com/M4yMK99.png" },
          { question: "If you are justice, please do not lie. What is the price for your blind eye?", answer: "Bribe", image: "https://i.imgur.com/M4yMK99.png"},
          { question: "The less of them you have, the more one is worth?", answer: "A friend", image: "https://i.imgur.com/M4yMK99.png" },
          { question: "What Does A Liar Do When He's Dead?", answer: "He lies still", image: "https://i.imgur.com/M4yMK99.png" },
          { question: "What is it that no one wants to have, but no one wants to lose, either?", answer: "A lawsuit!", image: "https://i.imgur.com/M4yMK99.png" },
          { question: "What belongs to you, but others will use it?", answer: "Your name", image: "https://i.imgur.com/M4yMK99.png" },
          { question: "What gets harder to catch the faster you run?", answer: "Your Breath!", image: "https://i.imgur.com/M4yMK99.png" },
          { question: "What has two hands, a round face, always runs, yet always stays in place, too?", answer: "A clock!", image: "https://i.imgur.com/M4yMK99.png" },
          { question: "What is always on its way but never arrives?", answer: "Tomorrow", image: "https://i.imgur.com/M4yMK99.png" },
          { question: "The more there is of me, the less you see. What am I?", answer: "I\’m darkness!", image: "https://i.imgur.com/M4yMK99.png" },
          { question: "If you know me, you\’ll want to share me. If you share me, I\’ll be gone. What am I?", answer: "A secret!", image: "https://i.imgur.com/M4yMK99.png" },
          { question: "I have no hands but can knock on your door, and you must open if I do. What am I?", answer: "Opportunity.", image: "https://i.imgur.com/M4yMK99.png" },
        ];
      
        // Delete all riddles
        Riddle.deleteMany({}, (err, data) => {
          // Seed Starter Riddles
          Riddle.create(startRiddles, (err, data) => {
            // send created riddles as response to confirm creation
        // log the create fruits to confirm
        console.log("--------RIDDLES CREATED----------");
        console.log(data);
        console.log("--------RIDDLES CREATED----------");
  
        // close the DB connection
        mongoose.connection.close();
      });
    });
  
  
  });