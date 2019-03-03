require('../models/employee.model');

const express=require("express");
var router=express.Router();
const mongoose=require("mongoose");

const Employee = mongoose.model('Employee');


router.get("/",(req,res)=>{
    res.render("employee/addOrEdit",{viewTitle:"INSERT"});
})

router.get('/list',(req,res)=>{
    Employee.find((err,docs)=>{
        if(!err)
        {
            res.render("employee/list",
            {
                list:docs
            })
        }
        else
        {
            console.log("Hata oldu.");
        }
    })
})

router.post("/",(req,res)=>{
    console.log(req.body);
    if(req.body._id=='')
    {
        console.log("insert");
        InsertRecord(req,res);
    }
    else
    {
        console.log("update");

        UpdateRecord(req,res);
    }
})

router.get('/list',(req,res)=>{
    res.json('list page');
})
router.get("/:id",(req,res)=>{
    Employee.findById(req.params.id,(err,doc)=>{
        if(!err)
        {
            res.render("employee/addOrEdit",{viewTitle:"UPDATE",employee:doc});

        }
        else
        {
            console.log("error");
        }
    })
   
})
router.get("/delete/:id",(req,res)=>{
    Employee.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err)
        {
            res.redirect('/employee/list');

        }
        else
        {
            console.log(error);
        }
    })
})

function InsertRecord(req,res)
{
    var employee=new Employee();
    employee.fullName=req.body.fullName;
    employee.email=req.body.email;
    employee.mobile=req.body.mobile;
    employee.city=req.body.city;
    employee.save((err,doc)=>{
        if(!err){
            res.redirect('/employee/list');
        }
        else
        {
            console.log('Error during record insertion : '+err);
        }
    });

    
}
function UpdateRecord(req,res)
{
    console.log(req.body._id);
    Employee.findOneAndUpdate({_id:req.body._id},req.body,{new:true},(err,doc)=>{
        if(!err)
        {
            res.redirect('/employee/list');
        }
        else
        {
            console.log("Update Error");
        }
    })
}
module.exports=router;