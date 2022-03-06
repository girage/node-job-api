const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./db/connect');
const Router = require('./routes/auth');

const PORT = process.env.PORT || 3500;
const URI = process.env.MONGO_URI


const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');

// Error Handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHanddlerMiddleware = require('./middleware/error-handler');

app.use(express.json());


// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobsRouter);

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