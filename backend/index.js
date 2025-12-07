var express = require("express");
var app = express();

const cookieParser = require('cookie-parser');
const cors = require('cors');
require("dotenv").config();

const PORT = process.env.PORT || 5000

app.use(cors({
    origin: 'http://localhost:3000',   //its my react app url
    credentials: true
}))

app.use(cookieParser());
app.use(express.json());
require('./Connection/conn');

const AuthRoutes = require('./Routes/user');
const videoRoutes = require('./Routes/video');
const Commentroutes = require('./Routes/comment');



app.use('/auth', AuthRoutes);
app.use('/api', videoRoutes);
app.use('/commentApi', Commentroutes);


app.listen(PORT, () => { console.log(`Backend running on port ${PORT}`) })