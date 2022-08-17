const express = require('express');
const morgan = require('morgan');
const { Pool } = require('pg');
const operationRoutes = require('./routes/operationRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const cookieParser = require('cookie-parser');


const app = express();
app.use(cors({
    origin: "http://127.0.0.1:5173"
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", operationRoutes);
app.use("/api/v1", userRoutes);



app.listen(5000, () => console.log("http://localhost:" + 5000));