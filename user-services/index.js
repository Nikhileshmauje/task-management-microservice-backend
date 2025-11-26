const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')


const app = express()
const port = 3000

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

mongoose.connect('mongodb://mongo:27017/users').then(()=> console.log("MongoDB connected"))
.catch(err => console.log("MongosDb connection error",err));

const userSchema = new mongoose.Schema({
    name: String,
    email: String
});

const User = mongoose.model('User', userSchema);

app.get('/users', async(req,res) => {
    const users = await User.find();
    res.json(users);
})


app.post('/users', async(req,res)=>{
  const {name, email} = req.body;

  try {
    const user = new User({name, email});
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error("Error saving: ", error);
    res.status(500).json({error: "Internal Server Error"});
  }
})


app.listen(port, () => {
  console.log(`user service listening on port ${port}`)
})
