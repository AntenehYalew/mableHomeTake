const express = require("express"),
            Q = require("q"),
   bodyParser = require('body-parser'),
          con = require("../connection/dbconnection"),
  mysqlqueries= require("../connection/mysql"),
  apiconnectors= require ("../apidbconnectors/apiconnectors")
       router = express.Router();


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.route("/getnovariant/:id")
    .get((req,res)=>{
        var productId = req.params.id
        apiconnectors.selectProduct(productId)
        .then(results=>{
            res.json(
                {
                    "success":"no",
                    "data": results[0]
                })
            console.log(results[0])
        })

    })
  

router.route("/postnovariant")
    .post((req,res)=>{
        if(req.body!= "undefined"){
           var reqBody = {
             productName : "Tropical Honey",
             productDesc : "is a sweet, viscous food substance made by honey bees and some related insects.",
             sellerId: "002",
             retailPrice:"140.50",
             shelfLife:"15",
             status:"available"
           }
        }
        var productData = [
            (typeof(reqBody.productName) != "undefined" ) ? reqBody.productName : "New Product",
            (typeof(reqBody.productDesc) != "undefined" ) ? reqBody.productDesc : "New Description",
            reqBody.sellerId
        ]


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
                        var prodOptionsData = [
                            prodId,
                            (typeof(reqBody.retailPrice) != "undefined" ) ? reqBody.retailPrice : "",
                            (typeof(reqBody.shelfLife) != "undefined" ) ? reqBody.shelfLife : "",
                            (typeof(reqBody.status) != "undefined" ) ? reqBody.status : "Unknown",
                        ]
                        console.log(prodId)
                        apiconnectors.addProductOptions(prodOptionsData)
                            .then(results=>{
                                res.json(
                                    {
                                        "success":"yes",
                                        "data":"New Product Added with its product Option"
                                    }) 
                                    res.end()
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