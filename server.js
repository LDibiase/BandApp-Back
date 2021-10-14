require('dotenv').config();
const express = require('express');
const db = require('./db');

const app = express();
db.configDataBase();

// Enable CORS
app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

// Listen from process.env.PORT

var server_port = 3000 || process.env.PORT || 80;
var server_host = '0.0.0.0';
app.listen(server_port, server_host, function() {
  console.log(`Server started on port: http://localhost:${process.env.PORT}, DB: ${process.env.DATABASE_URL}`)
});

/*
app.listen(process.env.PORT || 3000, () =>
  console.log(`Server started on port: http://localhost:${process.env.PORT}, DB: ${process.env.DATABASE_URL}`)
);
*/