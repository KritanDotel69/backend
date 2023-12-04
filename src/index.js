const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const fileUpload = require('express-fileupload');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect('mongodb+srv://dotelkritan8:sirhoraa888@cluster0.tybi7uf.mongodb.net/Shop').then((val) => {
  app.listen(port, () => {
    console.log('connected');
  });
}).catch((err) => {
  console.log(err);
});


app.use(authRoutes);

app.use(fileUpload({
  limits: { fileSize: 15 * 1024 * 1024 },
  abortOnLimit: true
}));

app.use(productRoutes);

app.use((req, res) => {
  return res.status(404).json("not found");
})



