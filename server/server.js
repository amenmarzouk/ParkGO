const connectDB = require("./config/db.js");
const express = require("express");
const dotenv = require("dotenv");
const userroutes = require("./routes/user.router.js");
const carroutes = require("./routes/car.router.js");
const adminstroutes = require("./routes/administration.router.js");
const missionroutes = require("./routes/mission.router.js");
const httpStatusText = require("./utils/httpStatusText.js");

dotenv.config();
const cors = require("cors");
const app = express();
app.use(cors());
connectDB();

app.use(express.json());

const PORT = process.env.PORT || 8080;

app.use("/api/user", userroutes);
app.use("/api/car", carroutes);
app.use("/api/mission", missionroutes);
app.use("/api/administration", adminstroutes);


app.all("*", (req, res, next) => {
  return res
    .status(400)
    .json({ status: httpStatusText.ERROR, message: "API NOT FOUND" });
});


app.use((error, req, res, next) => {
  return res.status(error.statuscode || 500).json({
    status: error.statustext || httpStatusText.ERROR,
    message: error.message,
    code: error.statuscode || 500,
    data: null,
  });
});





app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
