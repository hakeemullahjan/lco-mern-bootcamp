require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRouter = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const orderRoutes = require("./routes/order");
const productRoutes = require("./routes/product");

//DB connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch(() => console.log("DB GOT OOPS..."));

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes
app.use("/api", authRouter);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", orderRoutes);
app.use("/api", productRoutes);

//PORT
const port = process.env.PORT || 8000;

//Starting server
app.listen(port, () => {
  console.log(`App is running at port:${port}`);
});
