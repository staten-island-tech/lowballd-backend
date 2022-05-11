const express = require("express"); // this file requires express server
const port = process.env.PORT || 3001; // use external server port OR local 3000

const app = express();

const cors = require("cors");
require("./DB/mongoose"); //ensures mongoos connects and runs

//takes the raw requests and turns them into usable properties on req.body
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
const posts = require("./Routes/api/post");
app.use("/api/posts", posts);
const user = require("./Routes/api/user");
app.use("/api/user", user);

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
