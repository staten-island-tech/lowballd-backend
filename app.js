const express = require("express"); // this file requires express server
const port = process.env.PORT || 3000; // use external server port OR local 3000
const app = express(); //instantiate express
const routes = require("./Routes/index");

app.use("/", routes);
app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
