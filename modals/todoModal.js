const mongoose=require('mongoose');


const todoSchema=mongoose.Schema({
    todo:{
    type:String,
    required:true
    },
    _email:{
        type:String,
        required:true
    },
    status:{
    type:Boolean,
    default:false
    }
});

module.exports=mongoose.model('todo',todoSchema)