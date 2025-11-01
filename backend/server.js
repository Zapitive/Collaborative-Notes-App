const express = require('express');
require('dotenv').config();
const app = express();


const authRouter = require('./routes/authRoutes')
const noteRouter = require('./routes/noteRoutes')
const PORT = process.env.PORT || 5001;
const connectDb = require('./conn')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDb()

app.use('/auth',authRouter)
app.use('/note',noteRouter)

try {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
} catch (error) {
    console.error('Error starting the server:', error); 
}
