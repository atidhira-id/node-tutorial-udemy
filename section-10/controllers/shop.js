const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      products: products,
      docTitle: "All Products",
      path: "/",
    });
  });
};

exports.getProductDetail = (req, res) => {
  const productId = req.params.productId;

  Product.getProductById(productId, (product) => {
    res.render("shop/product-detail", {
      product: product,
      docTitle: "Products Detail",
    });
  });
};

exports.getCart = (req, res) => {
  Cart.fetchCart((cartData) => {
    Product.fetchAll((allProduct) => {
      const productsOnCart = [];
      for (const currentProduct of allProduct) {
        for (const currentProductOnCart of cartData.products) {
          if (currentProduct.id === currentProductOnCart.id) {
            productsOnCart.push({
              ...currentProduct,
              quantity: currentProductOnCart.quantity,
            });
          }
        }
      }

      res.render("shop/cart", {
        docTitle: "Your Cart",
        path: "/cart",
        totalPrice: cartData.totalPrice,
        products: productsOnCart,
      });
    });
  });
};

exports.postProductToCart = (req, res) => {
  const productId = req.body.productId;
  Product.getProductById(productId, (product) => {
    const productPrice = parseFloat(product.price);

    Cart.addProduct(productId, productPrice);
  });

  res.redirect("/cart");
};

exports.deleteProductFromCart = (req, res) => {
  const { productId, productPrice } = req.body;

  Cart.deleteProduct(productId, productPrice);

  res.redirect("/cart");
};

exports.getOrders = (req, res) => {
  res.render("shop/orders", {
    docTitle: "Your Orders",
    path: "/orders",
  });
};

exports.getCheckout = (req, res) => {
  res.render("shop/checkout", {
    docTitle: "Checkout",
    path: "/checkout",
  });
};
