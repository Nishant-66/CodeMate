const express = require('express');
const app = express();
const dotenv=require('dotenv');
dotenv.config();
const connectDB=require('./config/database.js');
const cookieParser=require('cookie-parser');
const cors=require('cors')
app.use(cookieParser());
app.use(express.json());

const port=process.env.PORT||3000;
const authRouter = require("./routes/auth");
const requestRouter = require("./routes/request");
const profileRouter = require("./routes/profile");
const userRouter = require("./routes/user");
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB().then(()=>{
    console.log('Database connection established...')
    app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
})
}).catch((err)=>{
    console.error('Database cannot be connected !! ',err);

})
