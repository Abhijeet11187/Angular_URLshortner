const mongoose=require("mongoose");

const URLSchema=mongoose.Schema({
    original:String,
    shorten:String
})



module.exports=mongoose.model('URLShorten',URLSchema);
