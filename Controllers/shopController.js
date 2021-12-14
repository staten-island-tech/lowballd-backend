exports.homepage = async (req, res) => {
  const brands = ["Gucci", "Armani", "Tommy Hilfiger", "Polo"];

  try {
    res.send(brands);
  } catch (error) {
    console.log(error);
  }
};
