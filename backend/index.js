var express = require("express");
var app = express ();
var port = 4000;
const cookieParser = require('cookie-parser');
const cors = require('cors');

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



app.use('/auth',AuthRoutes);
app.use('/api', videoRoutes);
app.use('/commentApi', Commentroutes);


app.listen(port,() =>{console.log(`Backend running on port ${port}`)})