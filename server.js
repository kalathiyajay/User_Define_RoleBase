require('dotenv').config();
const express = require('express');
const server = express();
let port = process.env.PORT || 6000;

const mongoose = require('mongoose');
const userRoutes = require('./Routes/user.Routes');
const productRoutes = require('./Routes/product.Routes');

mongoose
    .connect(process.env.MONGO_DB_PATH)
    .then(() => console.log("DB IS CONNECTED"))
    .catch((Error) => console.log(Error));

server.use(express.json());
server.use('/api/users', userRoutes);
server.use('/api/products',productRoutes);

server.listen(port, () => {
    console.log(`Server is Connected to ${port}`);
})