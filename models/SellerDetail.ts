import mongoose from "./db";

const SellerDetailsSchema = new mongoose.Schema({
    userId:String,
    businessName:String,
    mobileNo:String,
    panNo:String,
    gstNo:String,
    aadharNo:String,
    address:String,
    businessLogo:String
},
{
  timestamps: true,
});

const SellerDetail = mongoose.models.SellerDetailsSchema || mongoose.model("SellerDetailsSchema", SellerDetailsSchema);

export default SellerDetail;
