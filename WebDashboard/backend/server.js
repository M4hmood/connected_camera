require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const dbConnect = require('./mongoDB/db');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/api/userRoute');

//connection to mongoDB
dbConnect();

//built-in middlewares
app.use(express.json());
app.use(cors());

//routes
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);


const listener = app.listen(process.env.PORT || 3001, () => {
    console.log(`App listening on port ${listener.address().port}`);
});
