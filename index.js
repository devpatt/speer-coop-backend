const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// Import routes
const authRoute = require("./routes/auth");
const dataRoute = require("./routes/data");

dotenv.config();

//connect to db
mongoose.connect(
	process.env.DB_CONNECT,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => console.log("connected to db!")
);

// Middleware
app.use(express.json());
// Route Middlewares
app.use("/api/user", authRoute);
app.use("/api/data", dataRoute);

app.listen(process.env.PORT || 3000, () =>
	console.log("Server up and running")
);
