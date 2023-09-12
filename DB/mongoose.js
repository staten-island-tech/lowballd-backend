const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });
console.log(process.env.DATABASE);

mongoose
  .connect(`${process.env.DATABASE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

    autoIndex: true,
  })
  .then(() => console.log("connected to DB"));

mongoose.connection.on("error", (err) => {
  console.log(`${err.message}`);
});
