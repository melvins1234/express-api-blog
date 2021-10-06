if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect(process.env.DB_CONNECTION);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.on("open", () => console.log(`Connected to Database`));

app.get("/", (req, res) => {
  res.send(process.env.NODE_ENV !== "production");
});

// Middleware
app.use(express.json());
app.use(cors());

const blogRouter = require("./routes/blogs");
app.use("/blogs", blogRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started`);
});
