var express = require('express');
var router = express.Router();
const fs = require('fs');

 var pdf = './routes/example.pdf'
var {pdfmodel, Pdfmodel}=require('../public/DB/Db_Schema')
var {dburl}=require('../public/DB/db')
const mongoose = require('mongoose');
mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })

router.get('/pdf',async(req,res)=>{
  try{
    let original_Pdf=await Pdfmodel.findOne();
   
    if(original_Pdf){
      let buffer = Buffer.from(original_Pdf.Pdf , 'base64')
      console.log(buffer)
      res.status(200).contentType('application/pdf').send(buffer)
     // res.status(200).send(original_Pdf)
    }
    else{
      let buffer = fs.readFileSync(pdf); 
      let base64data = buffer.toString('base64');
      let data={"Pdf":base64data}
      let add_Pdf=await Pdfmodel.create(data)
      res.status(201).send(add_Pdf)
    }
  }
  catch{
   res.status(500).send("Internal server error")
  }
})



router.post('/save',async(req,res)=>{
  try{
    fs.writeFileSync(pdf,req.body.Pdf,{encoding: 'base64'})
    let pdfdata=await Pdfmodel.findAndUpdateOne({_id:req.body.id 
    },{
      $set:{Pdf:req.body.Pdf}
    })
   // res.status(200).send("Saved successfully")
    res.status(200).send(pdfdata)
  }
  catch{
    console.log(req.body)
    res.status(500).send("Internal server error")
  }
})
module.exports = router;
