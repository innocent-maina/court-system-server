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
const app = express();

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
)

app.use('/api', caseRoute)
app.use('/api', userRoute)
app.use('/api', judgeRoute)

//  required middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = parseInt(process.env.PORT, 10) || 4000;

// port listening
app.listen(port, () => {
  try {
    console.log(`Server is running on port: ${port}`);
  } catch (error) {
    console.error('error is here', error);
  }
});