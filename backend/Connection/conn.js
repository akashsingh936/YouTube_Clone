require("dotenv").config();

const mongoose = require("mongoose");

//youtubeBackend 

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('DataBase connected')).catch(err =>{
        console.log(err);
    })