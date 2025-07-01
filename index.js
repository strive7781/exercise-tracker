const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

// mongoose configuration
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)

app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// mongoose schemas
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true, index: true },
});

const User = mongoose.model("User", userSchema);

const exerciseSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  username: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, required: true },
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

// actual project endpoints
app.get('/api/users', async (req, res) => {
  try {
    users = await User.find();
    if (users) {
      res.json(users)
    } else {
      res.send("No users yet")
    }
    
  } catch (err) {
    console.log(err)
  }
});

app.post('/api/users', async (req, res) => {
  console.log(req.body);
  try {
    const existingUser = await User.findOne({username: req.body.username}).exec();
    if (existingUser) {
      res.json(existingUser)
    } else {
      const userObj = new User({ username: req.body.username })      
      const user = await userObj.save()
      res.json(user)
    }
  } catch (err) {
    console.log(err)
  }
});

app.post('/api/users/:_id/exercises', async (req, res) => {
  console.log(req.body);
  const id = req.params._id
  try {
    const user = await User.findById(id)
    if (user === null) {
      res.send("Could not find user")
    } else {      
      const exerciseObj = new Exercise({
        user_id: user.id,
        username: user.username,
        description: req.body.description,
        duration: req.body.duration,
        date: req.body.date ? new Date(req.body.date) : new Date()
      })
      const exercise = await exerciseObj.save()
      res.json({_id: exercise.user_id,
        username: exercise.username,
        description: exercise.description,
        duration: exercise.duration,
        date: exercise.date.toDateString()
      })
    }
  } catch (err) {
    console.log(err)
  }
});

app.get("/api/users/:_id/logs", async (req, res) => {
  const { from, to, limit } = req.query;
  const id = req.params._id;
  const user = await User.findById(id);
  
  if(user === null){
    res.send("Could not find user")
  }

  const filter = { user_id: id }
  const exercises = await Exercise.find(filter).limit(+limit)
  
  const log = exercises.map(exercise => ({
    description: exercise.description,
    duration: exercise.duration,
    date: exercise.date.toDateString()
  }))
  
  if (from || to){
    const startDate = from ? new Date(from) : null;
    const endDate = to ? new Date(to) : null;
    if (startDate && endDate) {
      filter.date = { $gte: startDate, $lte: endDate };
    } else if (startDate) {
      filter.date = { $gte: startDate };
    } else if (endDate) {
      filter.date = { $lte: endDate };
    }
  }
  
  res.json({
    username: user.username,
    count: exercises.length,
    _id: user.id,
    log: log
  })
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
