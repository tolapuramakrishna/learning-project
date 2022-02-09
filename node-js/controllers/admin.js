const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editable: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product({
    title,
    imageUrl,
    description,
    price,
    userId: req.user,
  });
  product
    .save()
    .then((resp) => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.postUpdateProduct = (req, res, next) => {
  const id = req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.updateOne(
    { _id: id },
    { title, imageUrl, description, price, userId: req.user }
  )
    .then((resp) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const prodId = req.params.productId;
  const edit = req.query.editable;
  if (!edit) {
    res.redirect("/");
  }
  Product.findById(prodId).then((product) => {
    if (!product) {
      res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editable: true,
      product: product,
    });
  });
};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByIdAndRemove(prodId).then(() => {
    res.redirect("/");
  });
};

exports.getProducts = (req, res, next) => {
  Product.find()
    // .populate("userId").exec()
    .then((data) => {
      console.log(data)
      res.render("admin/products", {
        prods: data,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};
