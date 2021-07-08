const router=require('express').Router();
const todos=require('../modals/todoModal');


router.get('/',(req,res)=>{
    //res.send("HI universe thanks for making me genius coder");
    var mytodos='';
    todos.find({},(err,todo)=>
    {
         if(err){
        console.log(err);
    }
        if(todo){
            mytodos=todo;
        }
    
    res.render('index',{todo:mytodos});
});
});

router.post('/add',(req,res)=>{
// const todo=req.body.todo;
// const email=req.user.email;
// todos({todo:todo},{_email:email}).save(function(err,doc){
//     if(err){
//         console.log(err);
//     }
//     res.redirect('/');
// })

const {todo}=req.body;
    const _email=req.user.email;
    const newTodo=new todos({todo,_email:req.user.email})
    if(todo==""){
        res.redirect('/')
    }
    newTodo.save()
    .then(()=>{
        console.log("added",_email)
        console.log(_email,todo)
        res.redirect('/')
    })
    .catch(err=>console.log(err))

});

// router.post('/delete',(req,res)=>{
//     const id=req.body.id;
//     todos.findOneAndRemove({_id:id},(err,doc)=>{
//         res.redirect('/');
//     })
    
// });

// router.post('/update',(req,res)=>{
//     const id=req.body.id;
//     todos.findOneAndUpdate({_id:id},{status:true},(err,doc)=>{
//         if(err){
//             console.log(err);
//         }
//         res.redirect('/');
//     })
// })


router.get("/delete/todo/:_id",(req,res)=>{
    const {_id}=req.params;
    todos.deleteOne({_id})
    .then(()=>{
        console.log("deleted")
        res.redirect('/')
    })
    .catch((err)=>console.log(err));
})

.get("/update/todo/:_id",(req,res)=>{
    const {_id}=req.params;
    const info=todos.find();
    console.log(info)
    todos.updateOne({_id}, { status:true})
    .then(()=>{
        console.log("deleted")
        res.redirect('/')
    })
    .catch((err)=>console.log(err));
});


module.exports=router;