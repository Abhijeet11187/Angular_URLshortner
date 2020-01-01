const mongoose=require("mongoose");

const UserSchema=mongoose.Schema({

    userName:String,
    password:String,
    urlData:[{ type: mongoose.Schema.Types.ObjectId, ref: 'URLShorten' }]
})



module.exports=mongoose.model('UserURLshorten',UserSchema);