const Cart = require("../models/Cart");
const Product = require("../models/Product");

const getCart = async (userId, guestId) => {
  if (userId) return await Cart.findOne({ user: userId });
  if (guestId) return await Cart.findOne({ guestId });
  return null;
};

// @desc   Add a product to the cart
// @route  POST /api/cart
// @access Public
const addToCart = async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product)
      return res.status(404).json({ message: "Product not found." });

    let cart = await getCart(userId, guestId);

    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({
          productId,
          name: product.name,
          image: product.images?.[0]?.url || "",
          price: product.price,
          size,
          color,
          quantity,
        });
      }
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await cart.save();
      return res.status(200).json(cart);
    } else {
      const newCart = await Cart.create({
        user: userId || undefined,
        guestId: guestId || "guest_" + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images?.[0]?.url || "",
            price: product.price,
            size,
            color,
            quantity,
          },
        ],
        totalPrice: product.price * quantity,
      });
      return res.status(201).json(newCart);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error." });
  }
};

// @desc   Update product quantity in cart
// @route  PUT /api/cart
// @access Public
const updateCart = async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  try {
    let cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart not found." });

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );

    if (productIndex > -1) {
      if (quantity > 0) {
        cart.products[productIndex].quantity = quantity;
      } else {
        cart.products.splice(productIndex, 1);
      }
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Product not found in cart." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error." });
  }
};

// @desc   Remove product from cart
// @route  DELETE /api/cart
// @access Public
const deleteFromCart = async (req, res) => {
  const { productId, size, color, guestId, userId } = req.body;

  try {
    let cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart not found." });

    cart.products = cart.products.filter(
      (p) =>
        !(
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color
        )
    );

    cart.totalPrice = cart.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    await cart.save();
    return res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error." });
  }
};

// @desc   Get user's or guest's cart
// @route  GET /api/cart
// @access Public
const getCartDetails = async (req, res) => {
  const { userId, guestId } = req.query;

  try {
    let cart = await getCart(userId, guestId);
    if (cart) {
      return res.json(cart);
    } else {
      return res.status(404).json({ message: "Cart not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error." });
  }
};

// @desc   Merge Guest cart into User Cart on login
// @route  POST /api/cart/merge
// @access Private
const mergeGuestCart = async (req, res) => {
  const { guestId } = req.body;

  try {
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: req.user._id });

    if (guestCart) {
      if (!guestCart.products.length)
        return res.status(400).json({ message: "Guest cart is empty." });

      if (userCart) {
        guestCart.products.forEach((guestItem) => {
          const productIndex = userCart.products.findIndex(
            (item) =>
              item.productId.toString() === guestItem.productId.toString() &&
              item.size === guestItem.size &&
              item.color === guestItem.color
          );

          if (productIndex > -1) {
            userCart.products[productIndex].quantity += guestItem.quantity;
          } else {
            userCart.products.push(guestItem);
          }
        });

        userCart.totalPrice = userCart.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        await userCart.save();
        await Cart.findOneAndDelete({ guestId });
        return res.status(200).json(userCart);
      } else {
        guestCart.user = req.user._id;
        guestCart.guestId = undefined;
        await guestCart.save();
        return res.status(200).json(guestCart);
      }
    } else {
      if (userCart) return res.status(200).json(userCart);
      return res.status(404).json({ message: "Guest Cart not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error." });
  }
};

module.exports = {
  addToCart,
  updateCart,
  deleteFromCart,
  getCartDetails,
  mergeGuestCart,
};
