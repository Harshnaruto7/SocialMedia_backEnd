require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const userRouts = require("./routes/userRoute");
const postRoutes = require("./routes/postRoute");
const bodyPraser = require("body-parser");
const bodyParser = require("body-parser");

const app = express();

// connecting to the dataBase

connectDB();

// MiddleWare
app.use(bodyParser.json());

// Routes

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// Starting the server.

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
