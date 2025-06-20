var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var hostRouter = require('./routes/hostuser')
const cartRoute = require('./routes/Cart')
const orderSellerRouter = require('./routes/orderseller');

var app = express();
const connectDB = require('./config/Connectdb')

const allowedOrigins=[
  'http://localhost:5173',
  'https://pizzasellingweb.vercel.app',
  'https://pizzasellingweb-2.onrender.com'
]
app.use(cors({
  origin:(origin,cb)=>{
    if(!origin||allowedOrigins.includes(origin)) cb(null,true)
      else cb(new Error('Cors not allowed for this origin: '+origin))
  },
  credentials:true
}))
connectDB()


app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/host',hostRouter)
app.use('/cart',cartRoute)
app.use('/orderseller', orderSellerRouter);


module.exports = app;
