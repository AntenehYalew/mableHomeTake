exports.mysqlqueries = function(row){
    k = mysqlqueries[row];
return k
}


var mysqlqueries = []


mysqlqueries["checkProduct"] = "select * from product where product_name = ? AND seller_id = ?"
mysqlqueries["insertProduct"] = "insert into product (product_name, product_description,seller_id) VALUES (?,?,?)"
mysqlqueries["InsertProdOption"] = "insert into product_options (product_id, price_retail, shelf_life, status) VALUES (?,?,?,?)"
mysqlqueries["selectProduct"] = "SELECT p.product_id, p.product_description, p.seller_id, p.created_at, po.prod_variant_id, po.variant_id, po.price_retail, po.shelf_life, po.status from product p INNER JOIN product_options po ON p.product_id = po.product_id where p.product_id = ?"
mysqlqueries["addVariants"] = "INSERT into variants (variant_name, product_id) VALUES (?,?)"
mysqlqueries["addVariantOptions"] = "INSERT into product_variant (variant_id, prod_variant_name) VALUES ?"
mysqlqueries["selectProductwithVar"] = "SELECT * FROM product WHERE product_id = ?"
mysqlqueries["selectVariants"] = "SELECT v.variant_id, v.variant_name, pv.prod_variant_name FROM variants v INNER JOIN product_variant pv ON v.variant_id = pv.variant_id WHERE v.product_id = ?"
mysqlqueries["checkProductId"] = "SELECT * FROM product WHERE product_id = ?"
mysqlqueries["addProductwithVar"] = "insert into product_options (product_id, prod_variant_id, variant_id, price_retail, shelf_life, status) VALUES (?,?,?,?,?,?)"
mysqlqueries["selectProductwithOpt"] = "SELECT p.product_id, p.product_description, p.seller_id, p.created_at, po.prod_variant_id, po.variant_id, po.price_retail, po.shelf_life, po.status from product p INNER JOIN product_options po ON p.product_id = po.product_id where p.product_id = ?"

