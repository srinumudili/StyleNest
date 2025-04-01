const mongoose = require("mongoose");
const User = require("./models/User");
const Product = require("./models/Product");
const Cart = require("./models/Cart");
const products = require("./data/products");
const dotenv = require("dotenv");

dotenv.config();

//Connect to mongoDb

mongoose.connect(process.env.MONGO_URI);

//Function to seedData
const seedData = async () => {
  try {
    //clear existing data
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    //Create a default admin User
    const createdUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "admin@123",
      role: "admin",
    });

    //Assign the default user Id for each product
    const userId = createdUser._id;

    const sampleProducts = products.map((product) => ({
      ...product,
      user: userId,
    }));

    //Insert products into Db
    await Product.insertMany(sampleProducts);

    console.log("Products data seeded successfully...");
    process.exit();
  } catch (error) {
    console.log("Error seeding the data:", error);
    process.exit(1);
  }
};
seedData();
