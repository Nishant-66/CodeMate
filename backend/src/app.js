const express = require('express');
const app = express();
const dotenv=require('dotenv');
dotenv.config();
const connectDB=require('./config/database.js');
app.use((req,res)=>{
    res.send("Hello from server ");
})
connectDB().then(()=>{
    console.log('Database connection established...')
    app.listen(3000,()=>{
    console.log('Server is Successfully listening on Port 3000 ');
})
}).catch((err)=>{
    console.error('Database cannot be connected !! ',err);

})
