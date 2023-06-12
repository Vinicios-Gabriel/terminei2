require('dotenv').config();
const express = require('express');
const cors = require('cors');
const loggedRoutes = require('./Routers/logged');
const notLogged = require('./Routers/notLogged');

const app = express();

app.use(cors());
app.use(express.json());

app.use(notLogged);
app.use(loggedRoutes);

app.listen(process.env.PORT);
