const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

mongoose
  .connect(`${process.env.DATABASE}`, {
    useNewURLParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to DB"));

mongoose.connection.on("error", (err) => {
  console.log(`${err.message}`);
});
