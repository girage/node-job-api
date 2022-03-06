require('dotenv').config();
require('express-async-errors');

const express = require('express');

// extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const app = express();

const connectDB = require('./db/connect');
const authenticateUser = require('./middleware/authentication');

const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');

// Error Handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHanddlerMiddleware = require('./middleware/error-handler');

const PORT = process.env.PORT || 3500;
const URI = process.env.MONGO_URI

app.set('trust proxy', 1);
app.use(limiter({
  windowMs: 60 * 1000, // 1 minutes
  max: 60, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
}));

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.get('/', (req, res) => {
  res.send('<h1>JOBS API</h1>');
})
// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);

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
