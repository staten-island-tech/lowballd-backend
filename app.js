const express = require("express"); // this file requires express server
const port = process.env.PORT || 3000; // use external server port OR local 3000
const app = express(); //instantiate express
require("./DB/mongoose"); //ensures mongoos connects and runs

const cors = require("cors");
//takes the raw requests and turns them into usable properties on req.body
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

const posts = require("./Routes/api/post");
app.use("/api", posts);

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
