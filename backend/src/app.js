const express = require('express');
const app = express();
const dotenv=require('dotenv');
dotenv.config();
const connectDB=require('./config/database.js');
const cookieParser=require('cookie-parser');
const {signup, login, logout}=require('./controllers/auth.js');
app.use(cookieParser());
app.use(express.json());

const port=process.env.PORT||3000;

app.post('/signup',signup);
app.post('/login',login);
app.post('/logout',logout);
connectDB().then(()=>{
    console.log('Database connection established...')
    app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
})
}).catch((err)=>{
    console.error('Database cannot be connected !! ',err);

})
