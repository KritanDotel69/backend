const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');


app.use(express.json());

mongoose.connect('mongodb+srv://dotelkritan8:sirhoraa888@cluster0.tybi7uf.mongodb.net/').then((val) => {
  app.listen(port, () => {
    console.log('connected');
  });
}).catch((err) => {
  console.log(err);
});


app.use(authRoutes);

app.use((req, res) => {
  return res.status(404).json("not found");
})


