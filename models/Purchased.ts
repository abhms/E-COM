import mongoose from "./db";

const PurchasedSchema = new mongoose.Schema({
    product:String,
    buyerEmail:String,
    sellerId:String,
    sold:Boolean
},
    {
      timestamps: true,
    });
    const Purchase = mongoose.models.PurchasedSchema || mongoose.model("PurchasedSchema", PurchasedSchema);

    export default Purchase;    