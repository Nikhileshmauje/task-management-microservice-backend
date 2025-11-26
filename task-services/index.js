const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const amqp = require('amqplib');

const app = express();
const port = 3001;

app.use(bodyParser.json());

mongoose.connect('mongodb://mongo:27017/tasks')
  .then(()=> console.log("MongoDB connected"))
  .catch(err => console.log("MongosDb connection error", err));

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  userId: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Task = mongoose.model('Task', taskSchema);

let channel, connection;

async function connectRabbitMQWithRetry(retries = 20, delay = 3000) {
  while (retries) {
    try {
      connection = await amqp.connect("amqp://rabbitmq");
      channel = await connection.createChannel();
      await channel.assertQueue("task_created");
      console.log("Connected to RabbitMQ");
      return;
    } catch (error) {
      console.log("RabbitMQ connection error:", error.message);
      retries--;
      console.log("Retrying again:", retries);
      await new Promise(res => setTimeout(res, delay));
    }
  }
}

app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/task', async (req, res) => {
  const { title, description, userId } = req.body;

  try {
    const task = new Task({ title, description, userId });
    await task.save();

    const message = { taskId: task._id, userId, title };

    if (!channel) {
      return res.status(503).json({ error: "RabbitMQ not connected" });
    }

    channel.sendToQueue(
      "task_created",
      Buffer.from(JSON.stringify(message))
    );

    res.status(201).json(task);
  } catch (error) {
    console.error("Error saving:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Task service listening on port ${port}`);
  connectRabbitMQWithRetry();
});
