if (process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}
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
const genresRouter = require('./routes/genres');
app.use('/users', usersRouter);
app.use('/genres', genresRouter);

// Listen from process.env.PORT

app.listen(process.env.PORT || 3000, () =>
  console.log(`Server started on port: http://localhost:${process.env.PORT}, DB: ${process.env.DATABASE_URL}`)
);