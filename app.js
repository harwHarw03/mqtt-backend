const express = require('express');
const path = require('path');
const mqtt = require('mqtt');
const dashboardRouter = require('./routes/dashboard');

const app = express();
app.set("view engine", "ejs");

// express middleware
app.set('views', path.join(__dirname, 'pages'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'pages')));

app.use('/', dashboardRouter);

const PORT = process.env.PORT || 2827;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
