const cors = require('cors')
const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const searchRoutes = require('./routes/search')
const app = express()
const {static} = require('express');
const path = require('path');


app.use(cors({ origin : "http://localhost:3000"})); 
app.use(cookieParser())

dotenv.config({path:'./config.env'})
require('./db/db_connect')

app.use(express.json())
app.use(express.urlencoded({ extended: false}));
app.use(require('./routes/auth'))
app.use("/api", searchRoutes);  
// app.use(express.static(path.join(__dirname + '../server/assets/images')));
 
const port = 5000;



app.listen(port ,() => {
    console.log(`server running at ${port}`);
})  