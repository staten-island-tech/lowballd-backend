exports.middlewareSample = (req, res, next) => {
  req.name = "TEST";
  next();
};

exports.homepage = async (req, res) => {
  const brands = ["Gucci", "Armani", "Tommy Hilfiger", "Polo"];

  try {
    res.send(brands);
    console.log(req.name);
  } catch (error) {
    console.log(error);
  }
};

exports.authMiddleware = (req, res, next) => {
  if (req.body.user) {
    next();
  } else {
    res.json("you must be signed in");
  }
};

exports.authPage = async (req, res) => {
  try {
    res.json(req.body.user);
  } catch (error) {
    console.log(error);
  }
};
