const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
require('dotenv').config();
const app = express();


const authRouter = require('./routes/authRoutes');
const noteRouter = require('./routes/noteRoutes');
const PORT = process.env.PORT || 5001;
const connectDb = require('./conn');

app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

connectDb();

app.use('/api/auth',authRouter);
app.use('/api/note',noteRouter);

try {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
} catch (error) {
    console.error('Error starting the server:', error); 
}
