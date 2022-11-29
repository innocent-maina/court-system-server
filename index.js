const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Connect mongoDB
mongoose
.connect(
  `mongodb+srv://innocent:wahome2020@timetracker.elei8.mongodb.net/courts?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
)
.then(() => {
  const connectionValue = mongoose.connection.readyState;
  if (connectionValue === 1) {
    console.log('MongoDB connected ✨');
  } else if (connectionValue === 2) {
    console.log('MongoDB connecting');
  } else if (connectionValue === 3) {
    console.log('MongoDB disconnecting ❌');
  } else if (connectionValue === 4) {
    console.log('MongoDB disconnected ❌');
  }
});
const caseRoute = require('./routes/case.route')
const userRoute = require('./routes/user.route')
const judgeRoute = require('./routes/judge.route')
const app = express()
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
)
app.use(cors())

// API
app.use('/api', caseRoute)
app.use('/api', userRoute)
app.use('/api', judgeRoute)

// Create port
const port = process.env.PORT || 4000
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
  
})

// Find 404
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message)
  if (!err.statusCode) err.statusCode = 500
  res.status(err.statusCode).send(err.message)
})
