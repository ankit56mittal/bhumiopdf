const mongodb=require('mongodb')
const dbname='Pdf_editor'
const dburl=`mongodb+srv://Ankit56:0AdBv2SlzhxufMPj@cluster0.wxyttbt.mongodb.net/${dbname}?retryWrites=true&w=majority`
// `mongodb+srv://<sample>:<sample>@cluster0.z04td13.mongodb.net/${dbname}`


module.exports={mongodb,dbname,dburl}