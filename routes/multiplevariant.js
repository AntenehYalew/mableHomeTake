const express = require("express"),
            Q = require("q"),
   bodyParser = require('body-parser'),
          con = require("../connection/dbconnection"),
  mysqlqueries= require("../connection/mysql"),
  apiconnectors= require ("../apidbconnectors/apiconnectors")
       router = express.Router();


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

  router.route("/variants/:id")
  .get((req,res)=>{
      var productId = req.params.id
      Q.all([apiconnectors.selectProductwithVar(productId), apiconnectors.selectVariants(productId)])
        .then(results=>{
            var variantResult = [], index = {}
            results[1][0].forEach(data => {
                if(!(data.variant_id in index)){
                    index[data.variant_id] = {
                        variant_id :data.variant_id,
                        variant_name:  data.variant_name,
                        variant_options: []
                    };
                    variantResult.push(index[data.variant_id]) 
                }
                index[data.variant_id].variant_options.push(data.prod_variant_name)
            });
            res.json(
                {
                    "success":"yes",
                    "data": {
                        "product":results[0][0],
                        "variants":variantResult
                    }
                })
        })
        .catch(error=>{
            console.log(error)
            res.json(
                {
                    "success":"no",
                    "data":"Something went wrong, Please check your data"
                }) 
        })

  })


router.route("/postvariants")
    .post((req,res)=>{
        if(req.body!= "undefined"){
           var reqBody = {
             productName : "Test Shay",
             productDesc : "Coffee aroma descriptors include Flowery, nutty, smoky, herby, while taste descriptors include acidity, bitterness, sweetness, saltiness and sourness ",
             sellerId: "002",
             retailPrice:"140.50",
             shelfLife:"15",
             status:"available",
             variants:{
                 color:["red", "yellow", "green"],
                 taste:["strawberry", "banana", "honey"]
             }
           }
        }
        var productData = [
            (typeof(reqBody.productName) != "undefined" ) ? reqBody.productName : "New Product",
            (typeof(reqBody.productDesc) != "undefined" ) ? reqBody.productDesc : "New Description",
            reqBody.sellerId
        ]
        var variantData = Object.keys(reqBody.variants)
console.log("variantData")
console.log(variantData)

apiconnectors.checkProduct(reqBody.productName,reqBody.sellerId)
    .then((results) => {     
        console.log(results[0].length)
        if(results[0].length > 0){
            console.log("no data found")
            res.json(
                {
                    "success":"no",
                    "data":"Product Already Exists"
                })
            res.end()
        }else{
            
            apiconnectors.insertProduct(productData)
            .then(results=>{
                var prodId = results[0].insertId
                var variantValues = []
                variantData.map(m=>{
                    variantValues.push([m,prodId])
                })
                variantValues.map(value=>{
                    apiconnectors.addVariants(value)
                    .then(results=>{
                        var varId = results[0].insertId
                        var varOptions = []
                        var newvarData = Object.keys(reqBody.variants).filter( key => key === value[0])
                        reqBody.variants[newvarData].map(m=>{
                            varOptions.push([varId,m])
                        })
                        apiconnectors.addVariantOptions(varOptions)
                            .then(results=>{
                                res.json(
                                    {
                                        "success":"no",
                                        "data":"New Product Added with its Variant"
                                    })
                            
                            })
                    })
                })
                    
            })
        }

    })
    .catch(error=>{
        console.log(error)
        res.json(
            {
                "success":"no",
                "data":"Something went wrong, Please check your data"
            }) 
    })

})


module.exports=router