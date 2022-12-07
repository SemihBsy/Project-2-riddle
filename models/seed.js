require('dotenv').config()
const mongoose = require('./connection')
const Riddle = require('./riddle')

///////////////////////////////////////////
// Seed Code
////////////////////////////////////////////

mongoose.connection.on('open', () => {

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
          { riddle: "If you know me, you’ll want to share me. If you share me, I’ll be gone. What am I?", answer: "A secret!", image: "https://i.imgur.com/9jzqRLI.jpeg" },
          { riddle: "I have no hands but can knock on your door, and you must open if I do. What am I?", answer: "Opportunity.", image: "https://i.imgur.com/9jzqRLI.jpeg" },
        ];
      
        // Delete all riddles
        Riddle.deleteMany({}, (err, data) => {
          // Seed Starter Riddles
          Riddle.create(startRiddles, (err, data) => {
            // send created riddles as response to confirm creation
        // log the create fruits to confirm
        console.log("--------FRUITS CREATED----------");
        console.log(data);
        console.log("--------FRUITS CREATED----------");
  
        // close the DB connection
        mongoose.connection.close();
      });
    });
  
    ///////////////////////////////////////////////
    // Write your Seed Code Above
    //////////////////////////////////////////////
  
  });