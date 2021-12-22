const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

mongoose.connect(`${process.env.DATABASE}`, {
  useNewURLParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", (err) => {
  console.log(`${err.message}`);
});
