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
/*   .get((req,res)=>{
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
                index[data.variant_id].variant_options.push({
                    option_name:data.prod_variant_name
                })
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

 */
router.route("/productoptions/:id")
    .get((req,res)=>{
        var productId = req.params.id
        Q.all([apiconnectors.selectProductwithOpt(productId),apiconnectors.selectVariants(productId)])
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
                    "success":"no",
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
    .post((req,res)=>{
        var productId = req.params.id
        if(req.body!= "undefined"){
            var reqBody = {
                prod_variant_id : 11,
                variant_id : 65,
                price_retail : 195.5,
                shelf_live : 10,
                status : "available"      
         }
        }
var prod_data = [productId, reqBody.prod_variant_id, reqBody.variant_id, reqBody.price_retail, reqBody.shelf_live, reqBody.status]

 
 apiconnectors.checkProductId(productId)
     .then((results) => {     
        apiconnectors.addProductwithVar(prod_data)
            .then(results=>{
                res.json(
                    {
                        "success":"yes",
                        "data":"New Product with options added"
                    }) 
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


module.exports=router