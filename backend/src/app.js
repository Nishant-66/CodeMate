const express = require('express');
const app = express();
const dotenv=require('dotenv');
dotenv.config();
const connectDB=require('./config/database.js');
const cookieParser=require('cookie-parser');

app.use(cookieParser());
app.use(express.json());

const port=process.env.PORT||3000;
const authRouter = require("./routes/auth");
const requestRouter = require("./routes/request");
app.use("/", authRouter);

app.use("/", requestRouter);

connectDB().then(()=>{
    console.log('Database connection established...')
    app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
})
}).catch((err)=>{
    console.error('Database cannot be connected !! ',err);

})
