const Product = require("../models/Product");

// @desc Create a new Product
// @route POST /api/products
// @access Private/Admin
const createProduct = async (req, res) => {
  try {
    const product = new Product({ ...req.body, user: req.user._id });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

// @desc Update an existing product
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product)
      return res.status(404).json({ message: "Product not found." });

    Object.keys(req.body).forEach((key) => {
      product[key] = req.body[key];
    });

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found." });

    await product.deleteOne();
    res.json({ message: "Product removed." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

// @desc Get all products (with filters)
// @route GET /api/products
// @access Public
const getProducts = async (req, res) => {
  try {
    const {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      category,
      search,
      material,
      brand,
      limit,
    } = req.query;

    let query = {};
    if (collection && collection.toLowerCase() !== "all")
      query.collection = collection;
    if (category && category.toLowerCase() !== "all") query.category = category;
    if (material) query.material = { $in: material.split(",") };
    if (brand) query.brand = { $in: brand.split(",") };
    if (size) query.sizes = { $in: size.split(",") };
    if (color) query.colors = { $in: [color] };
    if (gender) query.gender = gender;
    if (minPrice || maxPrice)
      query.price = {
        ...(minPrice && { $gte: Number(minPrice) }),
        ...(maxPrice && { $lte: Number(maxPrice) }),
      };
    if (search)
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];

    let sort = {};
    const sortOptions = {
      priceAsc: { price: 1 },
      priceDesc: { price: -1 },
      popularity: { popularity: -1 },
    };
    sort = sortOptions[sortBy] || {};

    const products = await Product.find(query)
      .sort(sort)
      .limit(Number(limit) || 0);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// @desc Get best-selling product
// @route GET /api/products/best-seller
// @access Public
const getBestSeller = async (req, res) => {
  try {
    const bestSeller = await Product.findOne().sort({ rating: -1 });
    if (!bestSeller)
      return res
        .status(404)
        .json({ message: "Best Seller Product Not Found." });

    res.json(bestSeller);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// @desc Get new arrival products
// @route GET /api/products/new-arrivals
// @access Public
const getNewArrivals = async (req, res) => {
  try {
    const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8);
    res.json(newArrivals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// @desc Get a single product by ID
// @route GET /api/products/:id
// @access Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found." });

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// @desc Get similar products
// @route GET /api/products/similar/:id
// @access Public
const getSimilarProducts = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found." });

    const similarProducts = await Product.find({
      _id: { $ne: req.params.id },
      gender: product.gender,
      category: product.category,
    }).limit(4);
    res.json(similarProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getBestSeller,
  getNewArrivals,
  getProductById,
  getSimilarProducts,
};
