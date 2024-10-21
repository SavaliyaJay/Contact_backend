const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

require('dotenv').config();
const port = process.env.PORT || 5000;
const errorHandler = require("./Middleware/errorHandler");
const connectDB = require("./Config/dbConnection");

app.use(express.json());

app.use("/api/", require("./Routes/contactRoute"));
app.use("/api/users/", require("./Routes/userRoute"));
app.use(errorHandler);

connectDB();

app.get("/", (req, res) => {
    res.status(201).json({ message: "Jay Savaliya" });
});

app.listen(port, () => console.log(`Listening on port ${port}`));