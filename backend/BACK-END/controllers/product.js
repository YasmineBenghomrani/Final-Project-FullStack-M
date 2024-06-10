import Product from "../models/product.js";
import Rating from "../models/rating.js";

// Create a new product
export async function createProduct(req, res) {
  const { name, qte, category, price, description, rating, picture } = req.body;
  const userId = req.userId;

  console.log(userId);

  if (
    !name ||
    !category ||
    !price ||
    !description ||
    rating === undefined ||
    rating === null ||
    rating === 0
  ) {
    res.send({
      message: "Provide all values",
    });
    return;
  }

  try {
    const ProductCreated = await Product.create({
      name,
      qte,
      category,
      userId,
      description,
      price,
      rating,
      picture,
    });

    const productId = ProductCreated._id;
    await Rating.create({
      userId: userId,
      productId: productId,
      Rating: Rating,
    });

    res.send({
      message: "Product created with success",
      Product: ProductCreated,
    });
  } catch (error) {
    res.send({
      message: error.message,
    });
  }
}

// Get all products
export async function getAllProduct(req, res) {
  const products = await Product.find({});
  res.send({ product: products });
}

// Get a product by ID
export async function getProductByID(req, res) {
  const oneproduct = await Product.findById(req.params.id);
  if (!oneproduct) {
    res.send({ message: "This product does not exist" });
  } else {
    res.send(oneproduct);
  }
}

// Update a product
export async function updateProduct(req, res) {
  const userId = req.userId;
  const ProductId = req.params.id;
  const newInfo = req.body;

  const UpdateProduct = await Product.findOneAndUpdate(
    {
      userId: userId,
      _id: ProductId,
    },
    newInfo
  );
  if (!UpdateProduct) {
    res.send({ message: "This product doent exist" });
  } else {
    res.send({ message: "Updated with success" });
  }
}

// Delete a product
export async function deleteProduct(req, res) {
  const userId = req.userId;
  const ProductId = req.params.id;

  const deleteProduct = await Product.findOneAndDelete({
    userId: userId,
    _id: ProductId,
  });
  if (!deleteProduct) {
    res.send({ message: "This product doent exist" });
  } else {
    res.send({ message: "Deleted with success" });
  }
}

export async function rateProduct(req, res) {
  const userId = req.userId;
  const productId = req.params.id;
  const { rating } = req.body;
  await Rating.create({ userId, productId, rating });
  let sumRate = 0;
  const ratingOfProduct = await Rating.find({ productId });
  for (let i = 0; i < ratingOfProduct.length; i++) {
    sumRate = sumRate + ratingOfProduct[i].rating;
  }

  const finalRate = sumRate / ratingOfProduct.length;

  console.log(finalRate);

  const updatedProduct = await Product.findByIdAndUpdate(productId, {
    rating: finalRate,
  });
  res.send(updatedProduct);
}
