const express = require('express');
const app = express();
const http = require("http");
const dotenv=require('dotenv');
dotenv.config();
const connectDB=require('./config/database.js');
const cookieParser=require('cookie-parser');
const cors=require('cors')
app.use(cookieParser());
app.use(express.json());
const initializeSocket = require('./utlis/socket.js');
const port=process.env.PORT||3000;
const authRouter = require("./routes/auth");
const requestRouter = require("./routes/request");
const profileRouter = require("./routes/profile");
const userRouter = require("./routes/user");
const chatRouter = require('./routes/chat.js');


app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
require('./utlis/cronjob.js');
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", chatRouter);


const server = http.createServer(app);
initializeSocket(server);
connectDB().then(()=>{
    console.log('Database connection established...')
    server.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
})
}).catch((err)=>{
    console.error('Database cannot be connected !! ',err);

})
