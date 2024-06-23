require('dotenv').config();
const express = require('express')
const cors = require('cors')

require('./connection/db')

const userRoute = require('./routes/userRoutes')

const app = express()

app.use(express.json());
app.use(cors());

app.use('/user', userRoute);


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log('app is running in Port' +PORT);
})

