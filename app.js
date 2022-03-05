const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./db/connect');
const Router = require('./routes/auth');

const PORT = process.env.PORT || 3500;
const URI = process.env.MONGO_URI

// Error Handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHanddlerMiddleware = require('./middleware/error-handler');

app.use(express.json());

// Routes

app.use(notFoundMiddleware);
app.use(errorHanddlerMiddleware);

async function start() {
  try {
    await connectDB(URI);
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

start();
