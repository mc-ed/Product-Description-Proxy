const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors())
app.use('/', express.static(path.join(__dirname, '../public')));
app.use('/:id', express.static(path.join(__dirname, '../public')));

app.listen(3000);