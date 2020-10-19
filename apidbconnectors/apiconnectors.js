const express = require("express"),
            Q = require("q"),
    mysqlqueries= require("../connection/mysql"),
    con = require("../connection/dbconnection"),
     bodyParser = require('body-parser');

     
exports.checkProduct = (name,id)=>{
    strQuery = mysqlqueries.mysqlqueries("checkProduct")
    var deferred = Q.defer();
    query = con.query(strQuery, [name,id], deferred.makeNodeResolver())
    return deferred.promise;
}
exports.insertProduct = (productData)=>{
    strQuery = mysqlqueries.mysqlqueries("insertProduct")
    var deferred = Q.defer();
    query = con.query(strQuery, productData, deferred.makeNodeResolver())
    return deferred.promise;
}
exports.addProductOptions = (prodOptionsData)=>{
    strQuery = mysqlqueries.mysqlqueries("InsertProdOption")
    var deferred = Q.defer();
    query = con.query(strQuery, prodOptionsData, deferred.makeNodeResolver())
    return deferred.promise;
}
exports.selectProduct = (productId)=>{
    strQuery = mysqlqueries.mysqlqueries("selectProduct")
    var deferred = Q.defer();
    query = con.query(strQuery, productId, deferred.makeNodeResolver())
    return deferred.promise;
}
exports.addVariants = (value)=>{
    strQuery = mysqlqueries.mysqlqueries("addVariants")
    var deferred = Q.defer();
    query = con.query(strQuery, value, deferred.makeNodeResolver())
    return deferred.promise;
}
exports.addVariantOptions = (varOptions)=>{
    strQuery = mysqlqueries.mysqlqueries("addVariantOptions")
    var deferred = Q.defer();
    query = con.query(strQuery, [varOptions], deferred.makeNodeResolver())
    return deferred.promise;
}
exports.selectProductwithVar = (productId)=>{
    strQuery = mysqlqueries.mysqlqueries("selectProductwithVar")
    var deferred = Q.defer();
    query = con.query(strQuery, productId, deferred.makeNodeResolver())

    return deferred.promise;
}
exports.selectVariants = (productId)=>{
    strQuery = mysqlqueries.mysqlqueries("selectVariants")
    var deferred = Q.defer();
    query = con.query(strQuery, productId, deferred.makeNodeResolver())
    return deferred.promise;
}
exports.checkProductId = (productId)=>{
    strQuery = mysqlqueries.mysqlqueries("checkProductId")
    var deferred = Q.defer();
    query = con.query(strQuery, productId, deferred.makeNodeResolver())
    return deferred.promise;
}
exports.addProductwithVar = (prod_data)=>{
    strQuery = mysqlqueries.mysqlqueries("addProductwithVar")
    var deferred = Q.defer();
    query = con.query(strQuery, prod_data, deferred.makeNodeResolver())
    return deferred.promise;
}
exports.selectProductwithOpt = (prod_data)=>{
    strQuery = mysqlqueries.mysqlqueries("selectProductwithOpt")
    var deferred = Q.defer();
    query = con.query(strQuery, prod_data, deferred.makeNodeResolver())
    return deferred.promise;
}