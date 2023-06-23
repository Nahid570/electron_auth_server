const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dbConnect = require("./config/dbConnect");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const authRouter = require("./routes/authRoute");

let corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
// app.use(morgan("dev"));
const PORT = process.env.PORT || 4000;

dbConnect();

app.get("/", (req, res) => {
  res.send("Welcome to Electron Auth API");
});

// Routes
app.use("/api/user", authRouter);

// Error Handlers
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening at PORT ${PORT}`);
});
