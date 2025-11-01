const express = require('express');
require('dotenv').config();
const app = express();


const authRouter = require('./routes/authRoutes')
const PORT = process.env.PORT || 5001;
const connectDb = require('./conn')
const {authenticateToken} = require('./middlewares/authMiddleware')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDb()

app.use('/auth',authRouter)

app.get('/note',authenticateToken,(req,res)=>{
    res.send(`${req.user.userid},${req.user.username}`)
})

try {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
} catch (error) {
    console.error('Error starting the server:', error); 
}
