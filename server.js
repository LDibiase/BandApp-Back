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

// // Connect to DB
// mongoose.connect(process.env.DATABASE_URL, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
// });
// // .then(() => console.log('MongoDB is connected'))
// // .catch(error => console.log(error));

// const db = mongoose.connection;
// db.on('error', (error) => console.log(error));
// db.once('open', () => console.log('Connection to database established'));

app.use(express.json());

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

// Listen from process.env.PORT
app.listen(process.env.PORT, () =>
  console.log(`Server started on port: http://localhost:${process.env.PORT}, DB: ${process.env.DATABASE_URL}`)
);