import mongoose from "./db";

const CartSchema = new mongoose.Schema({
    UserId:String,
    productId: Array,
},
{
  timestamps: true,
});

const Cart = mongoose.models.CartSchema || mongoose.model("CartSchema", CartSchema);

export default Cart;
