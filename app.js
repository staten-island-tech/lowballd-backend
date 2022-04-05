const express = require("express"); // this file requires express server
const port = process.env.PORT || 3001; // use external server port OR local 3000
const app = express(); //instantiate express
const cors = require("cors");
const authController = require("./Controllers/authController");
require("./DB/mongoose"); //ensures mongoos connects and runs
const posts = require("./Routes/api/post");
app.use("/api/posts", posts);
const user = require("./Routes/api/user");
app.use("/api/user", user);

//takes the raw requests and turns them into usable properties on req.body
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

const { auth } = require("express-openid-connect");

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: "http://localhost:3000",
  clientID: "ZxpmPPmMWimzX2lIp5NmoTNkzb0Q3TTN",
  issuerBaseURL: "https://dev-5t61kzw2.us.auth0.com",
  secret: "SwzqN_DZpqNDahEKLRgC7GlKa0eZXL_7SYPRejZpLVCJLTQSHIuW2ezUpjxwMFot",
};

app.use(auth(config));
app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? `${req.oidc.user.name}` : "Logged out");
  console.log(req.oidc.user);
});

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
