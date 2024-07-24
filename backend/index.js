const express = require('express');
const app = express();
const mongoose = require('mongoose'); 
const db_connection = require('./config/db');
const bodyParser = require('body-parser');
const ideaRoutes = require('./routes/idea_routes');
const cors = require('cors');

db_connection(); // Ensure this is called correctly

const hostname = "127.0.0.1";
const port = 2000;

app.use(cors());



// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use the idea routes for handling contact and signup
app.use('/api', ideaRoutes); // Adjust the base path as necessary



  
  app.listen(port, hostname, () => {
      console.log(`Server is running on http://${hostname}:${port}`);
    });
  
    
    // const successStories = [
    //     {
    //       id: 1,
    //       name: "Fati's",
    //       text: "Founded by Fatma Ahmed, this bakery specializes in handcrafted donuts in classic and unique flavors. They've taken social media by storm, particularly TikTok, becoming a go-to spot for satisfying your sweet tooth.",
    //       image: '../src/assets/img-0.9.PNG',
    //     },
    //     {
    //       id: 2,
    //       name: 'POV',
    //       text: 'POV Egypt invents clever solutions in Egypt, for Egypt. Think: phone holders that work in the heat, or innovative gadgets to tackle common hassles.',
    //       image: '../src/assets/img-0.10.PNG',
    //     },
    //     {
    //       id: 3,
    //       name: 'Cult',
    //       text: 'Cult Egypt offers a unique fusion, serving up delicious New York-style bagels alongside specialty matcha drinks. Its a trendy spot to grab a satisfying breakfast or a tasty afternoon pick-me-up.',
    //       image: '../src/assets/img-0.11.PNG',
    //     },
    //     {
    //       id: 4,
    //       name: "Fati's",
    //       text: "Founded by Fatma Ahmed, this bakery specializes in handcrafted donuts in classic and unique flavors. They've taken social media by storm, particularly TikTok, becoming a go-to spot for satisfying your sweet tooth.",
    //       image: '../src/assets/img-0.9.PNG',
    //     },
    //     {
    //       id: 5,
    //       name: 'POV',
    //       text: 'POV Egypt invents clever solutions in Egypt, for Egypt. Think: phone holders that work in the heat, or innovative gadgets to tackle common hassles.',
    //       image: '../src/assets/img-0.10.PNG',
    //     },
    //     {
    //       id: 6,
    //       name: 'Cult',
    //       text: 'Cult Egypt offers a unique fusion, serving up delicious New York-style bagels alongside specialty matcha drinks. Its a trendy spot to grab a satisfying breakfast or a tasty afternoon pick-me-up.',
    //       image: '../src/assets/img-0.11.PNG',
    //     },
    // ];
    
    // app.get('/api/successstories', (req, res) => {
    //   res.json(successStories);
    // });
