import express from "express";
import connectDB from "./db.js";
import cors from "cors";
import userRouter from "./routes/user.js";
import productRouter from "./routes/product.js";
import isAuthenticated from "./midelw/isAuthenticated.js";

const app = express();

app.listen(7000, () => {
  console.log("Your server is running at PORT 7000");
});

connectDB();
app.use(express.json());
app.use(cors());

app.get("/secret/", [isAuthenticated], (req, res) => {
  res.send({
    message: "Welcome to this private route",
  });
  S;
});

app.use("/user", userRouter);
app.use("/product", productRouter);
