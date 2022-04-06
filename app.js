const express = require("express"); // this file requires express server
const port = process.env.PORT || 3001; // use external server port OR local 3000

const app = express(); //instantiate express
const cors = require("cors");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
require("./DB/mongoose"); //ensures mongoos connects and runs
const posts = require("./Routes/api/post");
app.use("/api/posts", posts);
const user = require("./Routes/api/user");
app.use("/api/user", user);

//takes the raw requests and turns them into usable properties on req.body
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-5t61kzw2.us.auth0.com/.well-known/jwks.json`,
  }),

  // Validate the audience and the issuer
  audience: "http://localhost:3001/api", //replace with your API's audience, available at Dashboard > APIs
  issuer: "https://dev-5t61kzw2.us.auth0.com/",
  algorithms: ["RS256"],
});

app.get("/authorized", checkJwt, async function (req, res) {
  try {
    console.log(req.user);
    res.json(req.user.sub);
  } catch (error) {
    console.log(error);
  }
});
const { auth, requiresAuth } = require("express-openid-connect");
const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  secret: process.env.SECRET,
};

app.use(auth(config));
app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? `${req.oidc.user}` : "Logged out");
  console.log(req.oidc.user);
});

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
