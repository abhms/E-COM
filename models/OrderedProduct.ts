import mongoose from "mongoose";

const OrderedProductSchema = new mongoose.Schema({
  UserId: String,
  ProductId: [String], 
  Address: {
    mobileNo: Number,
    address: String,
    name: String,
    pincode: String,
    city: String,
    state: String,
  },
  Payment:String
}, {
  timestamps: true,
});

const OrderedProduct = mongoose.models.OrderedProduct || mongoose.model("OrderedProduct", OrderedProductSchema);

export default OrderedProduct;
