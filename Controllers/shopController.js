const Shop = require("../Models/shops");

exports.homePage = async (req, res) => {
  const stores = ["Gucci", "Armani", "Tommy Hilfiger", "Polo"];

  try {
    console.log(req.name);
    res.json(stores);
  } catch (error) {
    console.log(error);
  }
};

exports.createShop = async (req, res) => {
  try {
    const shop = new Shop(req.body);
    await shop.save();
    res.json(shop);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getShops = async (req, res) => {
  try {
    const Shops = await Shop.find().limit(3); //.limit is limiting how many thigns pop up upon request
    res.json(Shops);
  } catch (error) {
    console.log(error);
  }
};
