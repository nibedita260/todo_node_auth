const router = require('express').Router()
const Todo_model=require('../modals/todoModal');
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', ensureGuest ,(req, res) => {
    res.render('login')
  })

router.get("/log",ensureAuth, async(req,res)=>{
   //res.send("HI");
    const alldata =await Todo_model.find({});
    console.log(alldata);
    const user=await Todo_model.find({_email:req.user.email},{todo:alldata});
    console.log(user.todo);
    res.render('index',{todo:user,userinfo:req.user});


})
module.exports=router;