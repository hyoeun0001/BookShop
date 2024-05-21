//express 모듈
const express = require('express');
const app = express();

//dotenv모듈
const dotenv = require('dotenv');
dotenv.config();

app.listen(process.env.PORT);

const userRouter = require('./routes/users');
const bookRouter = require('./routes/books');
const likeRouter = require('./routes/books');
const cartRouter = require('./routes/books');
const orderRouter = require('./routes/books');

app.use("/users",userRouter);
app.use("/books",bookRouter);
app.use("/likes",likeRouter);
app.use("/carts",cartRouter);
app.use("/orders",orderRouter);