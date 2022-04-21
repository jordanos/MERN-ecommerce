
const pool =require('../dbConnection');
const { createNotification } = require('./notificationModel');
 
module.exports={
    createProdcut: async (data,req,callback)=>{
        
        if(data.postedby==undefined || data.name==undefined || data.price==undefined || data.quantity==undefined|| data.description==undefined|| req.files==undefined|| data.category==undefined|| data.condition==undefined|| data.brand==undefined){
            return callback("please send data with along correct attribute")
         }
         var filename=""
         req.files.forEach(file => {
            filename=filename+file.filename+","
        });
         
        var queryStatment=`insert into products set ?`
        var values={
            postedby:data.postedby,
            name:data.name,
            price:data.price,
            quantity:data.quantity,
            description:data.description,
            image:filename,
            category:data.category,
            productcondition:data.condition,
            brand:data.brand,
        
        }
       
        try{await pool.query(queryStatment,values,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
                    var querystatment2=`update subscriptions set postleft=postleft-1 where userid=?  `
                    var value2=[
                                data.postedby
                            ]
                            pool.query(querystatment2,value2,(err,res)=>{
                                if(err){
                                    return callback("something went wrong")
                                }
                                else{
                                    var querystatment3=`select * from follow where following=?`
                                    var value3=[
                                        data.postedby
                                    ]
                                        pool.query(querystatment3,value3,(err,ress)=>{
                                            if(err){
                                                return callback("something went wrong")
                                            }
                                            else{
                                                for(let i=0;i<ress.length;i++){
                                                    
                                                    createNotification({touser:ress[i].follower,sentfrom:data.postedby,text:`posted a product`},(error,result)=>{
                                                        if(error){}else{}
                                                    })
                                                };
                                                return callback(null,result)
                                            }
                                        })
                        
                    } 
                })
                
                
            }
        })}catch(error){
            console.error(error);
        }
    },
    getAllProduct: async (data,callback)=>{
        if(data.userid!=undefined){
            var queryStatment=`SELECT  users.fullname,users.phonenumber, products.* ,COUNT(rating.productid) as ratecount ,AVG(rating.ratescore) as  rate,CASE WHEN l.rateid IS NULL THEN 'false' ELSE 'true'END as israted FROM products INNER JOIN USERS ON users.userid=products.postedby LEFT JOIN rating l ON l.userid =${data.userid} and l.productid =products.productid Left JOIN rating on rating.productid=products.productid GROUP BY products.productid ORDER by products.date DESC;`
        
        }
        else{
            var queryStatment=`SELECT  users.fullname,users.phonenumber, products.* ,COUNT(rating.productid) as ratecount ,AVG(rating.ratescore) as  rate FROM products INNER JOIN USERS ON users.userid=products.postedby Left JOIN rating on rating.productid=products.productid GROUP BY products.productid ORDER by products.date DESC`
        }
        
        try{await pool.query(queryStatment,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
                var i=0
                for( i=0;i<result.length;i++){
                    if(result[i].rate==null){
                        result[i].rate=0
                    }
                    if(result[i].image!=undefined){
                        
                     const images= result[i].image.split(","); 
                   
                    for (var j=0;j<images.length;j++){
                        if(images[j]=='') {
                        
                        }else{
                         images[j]=process.env.APP_HOST+"/feed/images/"+images[j]
                        }
                        
                         

                    }
                    result[i].image=images
                }


                    
                }
                return callback(null,result)
            }
        })}catch(error){
            console.error(error);
        }
    },
    getProductByID: async (data,callback)=>{
        if(data.userid!=undefined){
            var queryStatment=`SELECT  users.fullname,users.phonenumber, products.* ,COUNT(rating.productid) as ratecount ,AVG(rating.ratescore) as  rate,CASE WHEN l.rateid IS NULL THEN 'false' ELSE 'true'END as israted FROM products INNER JOIN USERS ON users.userid=products.postedby LEFT JOIN rating l ON l.userid =? and l.productid =products.productid Left JOIN rating on rating.productid=products.productid where products.productid=? GROUP BY products.productid ;`
            var values=[data.userid,data.productid]
        }
        else{
            var queryStatment=`SELECT users.fullname,users.phonenumber, products.* ,COUNT(rating.productid) as ratecount ,AVG(rating.ratescore) as rate FROM products INNER JOIN USERS ON users.userid=products.postedby Left JOIN rating on rating.productid=products.productid where products.productid=?`
            var values=[productid=data.productid]
        }
       
        try{await pool.query(queryStatment,values,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
                for(var i=0;i<result.length;i++){
                   if(result[i].image!=undefined){
                    const images= result[i].image.split(","); 
                  
                   for (var j=0;j<images.length;j++){
                    if(images[j]=='') {
                        
                    }else{
                     images[j]=process.env.APP_HOST+"/feed/images/"+images[j]
                    }
                        

                   }


                   result[i].image=images
                }
               }
                return callback(null,result)
            }
        })}catch(error){
            console.error(error);
        }
    },
    editProduct: async (data,req,callback)=>{
        
        if(data.productid==undefined  || data.price==undefined || data.description==undefined|| data.quantity==undefined){
            return callback("please send data with along correct attribute")
         }
         
         var queryStatment=`UPDATE products SET price=? , description=? , quantity=? WHERE productid=?`

            var values =[
                data.price,
                data.description, 
                data.quantity,
                data.productid,
                

            ]
        

        try{await pool.query(queryStatment,values,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
                return callback(null,result)
            }
        })}catch(error){
            console.error(error);
        }
    
    },
    getAllproductBYUserId: async (data,callback)=>{
       
        if(data.userid==undefined ){
            return callback("please send data with along correct attribute")
         }
         if(data.visitorid!=undefined){
            var querystatement=`SELECT  users.fullname,users.phonenumber, products.* ,COUNT(rating.productid) as ratecount ,AVG(rating.ratescore) as  rate,CASE WHEN l.rateid IS NULL THEN 'false' ELSE 'true'END as israted FROM products INNER JOIN USERS ON users.userid=products.postedby LEFT JOIN rating l ON l.userid =? and l.productid =products.productid Left JOIN rating on rating.productid=products.productid where products.postedby=? GROUP BY products.productid ORDER by products.date DESC;`
            var values=[data.visitorid,data.userid]
        }
        else{
            var querystatement=`SELECT users.fullname,users.phonenumber, products.* ,COUNT(rating.productid) as ratecount ,AVG(rating.ratescore) as rate FROM products INNER JOIN USERS ON users.userid=products.postedby Left JOIN rating on rating.productid=products.productid WHERE products.postedby=? GROUP BY products.productid ORDER by products.date DESC`
            var values=[data.userid]
        }
        

        try{await pool.query(querystatement,values,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
                for(var i=0;i<result.length;i++){
                    if(result[i].image!=undefined){
                    const images= result[i].image.split(","); 
                   
                   for (var j=0;j<images.length;j++){
                    if(images[j]=='') {
                        
                    }else{
                     images[j]=process.env.APP_HOST+"/feed/images/"+images[j]
                    }
                        

                   }


                   result[i].image=images}
               }
                return callback(null,result)
            }
        })}catch(error){
            console.error(error);
        }

    },
    getProductByCatagory: async (data,callback)=>{
        
        if(data.catagory==undefined ){
            return callback("please send data with along correct attribute")
         }
         if(data.userid!=undefined){
            var querystatement=`SELECT  users.fullname,users.phonenumber, products.* ,COUNT(rating.productid) as ratecount ,AVG(rating.ratescore) as  rate,CASE WHEN l.rateid IS NULL THEN 'false' ELSE 'true'END as israted FROM products INNER JOIN USERS ON users.userid=products.postedby LEFT JOIN rating l ON l.userid =? and l.productid =products.productid Left JOIN rating on rating.productid=products.productid where products.category=? GROUP BY products.productid ORDER by products.date DESC;`
            var values=[data.userid,data.catagory]
        }
        else{
            var querystatement=`SELECT users.fullname,users.phonenumber, products.* ,COUNT(rating.productid) as ratecount ,AVG(rating.ratescore) as rate FROM products INNER JOIN USERS ON users.userid=products.postedby Left JOIN rating on rating.productid=products.productid where products.category=? GROUP BY products.productid ORDER by products.date DESC`
        var values=[data.catagory]
        }
        
        
        try{await pool.query(querystatement,values,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
                for(var i=0;i<result.length;i++){
                   
                    if(result[i].image!=undefined){const images= result[i].image.split(","); 
                   
                   for (var j=0;j<images.length;j++){
                    if(images[j]=='') {
                        
                    }else{
                     images[j]=process.env.APP_HOST+"/feed/images/"+images[j]
                    }
                        

                   }


                   result[i].image=images}
               }
                return callback(null,result)
            }
        })}catch(error){
            console.error(error);
        }
    },
    deleteProduct: async (data,callback)=>{
      
        if(data.productid==undefined ){
            return callback("please send data with along correct attribute")
         }
        var querystatement=`Delete from products where productid=?`
        var values=[data.productid]

        try{await pool.query(querystatement,values,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
                return callback(null,result)
            }
        })}catch(error){
            console.error(error);
        }
    },
    getProductByBrand: async (data,callback)=>{
        
        if(data.brand==undefined ){
            return callback("please send data with along correct attribute")
         }
         if(data.userid!=undefined){
            
            var querystatment=`SELECT  users.fullname,users.phonenumber, products.* ,COUNT(rating.productid) as ratecount ,AVG(rating.ratescore) as  rate,CASE WHEN l.rateid IS NULL THEN 'false' ELSE 'true'END as israted FROM products INNER JOIN USERS ON users.userid=products.postedby LEFT JOIN rating l ON l.userid =? and l.productid =products.productid Left JOIN rating on rating.productid=products.productid where products.brand=? GROUP BY products.productid ORDER by products.date DESC;`
            var value=[data.userid,data.brand]
        }
        else{
            var querystatment=`SELECT users.fullname,users.phonenumber, products.* ,COUNT(rating.productid) as ratecount ,AVG(rating.ratescore) as rate FROM products INNER JOIN USERS ON users.userid=products.postedby Left JOIN rating on rating.productid=products.productid where products.brand=? ORDER by products.date DESC`
            var value=[data.brand]
        }
        
        
        try{await pool.query(querystatment,value,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
                for(var i=0;i<result.length;i++){
                   
                   if(result[i].image!=undefined){ const images= result[i].image.split(","); 
                   
                   for (var j=0;j<images.length;j++){
                    if(images[j]=='') {
                        
                    }else{
                     images[j]=process.env.APP_HOST+"/feed/images/"+images[j]
                    }
                        

                   }


                   result[i].image=images}
               }
                return callback(null,result)
            }
        })}catch(error){
            console.error(error);
        }
    },
    rateProduct: async (data,callback)=>{
        if(data.productid==undefined|| data.userid==undefined|| data.ratescore==undefined){
            return callback("please send data with along correct attribute")
         }
        var querystatment=`INSERT INTO rating SET userid=?,productid=?,ratescore=?`
        
        var value=[
            data.userid,
            data.productid,
            data.ratescore,
        ]
        
        try{await pool.query(querystatment,value,(error,result)=>{
            if(error){
                if(error.code=='ER_DUP_ENTRY'){
                    return callback("you already rated the product")
                }else{
                    return callback(error)
                }   
            }
            else{
                
                return callback(null,result)
            }
        })}catch(error){
            console.error(error);
        }
    },
    getHighRatedProduct: async (data,callback)=>{
        if(data.userid!=undefined){
            var querystatement=`SELECT  users.fullname,users.phonenumber, products.* ,COUNT(rating.productid) as ratecount ,AVG(rating.ratescore) as  rate,CASE WHEN l.rateid IS NULL THEN 'false' ELSE 'true'END as israted FROM products INNER JOIN USERS ON users.userid=products.postedby LEFT JOIN rating l ON l.userid =${data.userid} and l.productid =products.productid Left JOIN rating on rating.productid=products.productid  where rating.ratescore>4 GROUP BY products.productid;`
           
        }
        else{   
            var querystatement=`SELECT  users.fullname,users.phonenumber, products.* ,COUNT(rating.productid) as ratecount ,AVG(rating.ratescore) as  rate from products INNER JOIN USERS ON users.userid=products.postedby  Left JOIN rating on rating.productid=products.productid  where rating.ratescore>4 GROUP BY products.productid;`
       
        }
        
        try{await pool.query(querystatement,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
                for(var i=0;i<result.length;i++){
                   
                    if(result[i].image!=undefined){const images= result[i].image.split(","); 
                   
                   for (var j=0;j<images.length;j++){
                    if(images[j]=='') {
                        
                    }else{
                     images[j]=process.env.APP_HOST+"/feed/images/"+images[j]
                    }
                        

                   }


                   result[i].image=images}
               }
                return callback(null,result)
            }
        })}catch(error){
            console.error(error);
        }

    },
    getHighPricedProducts: async (data,callback)=>{
        if(data.userid!=undefined){
            var querystatement=`SELECT  users.fullname,users.phonenumber, products.* ,COUNT(rating.productid) as ratecount ,AVG(rating.ratescore) as  rate,CASE WHEN l.rateid IS NULL THEN 'false' ELSE 'true'END as israted FROM products INNER JOIN USERS ON users.userid=products.postedby LEFT JOIN rating l ON l.userid =${data.userid} and l.productid =products.productid Left JOIN rating on rating.productid=products.productid  where products.price>7000 GROUP BY products.productid;`
           
        }
        else{
           var querystatement=`SELECT  users.fullname,users.phonenumber, products.* ,COUNT(rating.productid) as ratecount ,AVG(rating.ratescore) as  rate from products INNER JOIN USERS ON users.userid=products.postedby  Left JOIN rating on rating.productid=products.productid  where products.price>7000 GROUP BY products.productid;`
       
        }
        

        try{await pool.query(querystatement,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
                for(var i=0;i<result.length;i++){
                   
                   if(result[i].image!=undefined){ const images= result[i].image.split(","); 
                   
                   for (var j=0;j<images.length;j++){
                    if(images[j]=='') {
                        
                    }else{
                     images[j]=process.env.APP_HOST+"/feed/images/"+images[j]
                    }
                        

                   }


                   result[i].image=images}
               }
                return callback(null,result)
            }
        })}catch(error){
            console.error(error);
        }

    },
    getLowPricedProdcuts: async (data,callback)=>{
        if(data.userid!=undefined){
            var querystatement=`SELECT  users.fullname,users.phonenumber, products.* ,COUNT(rating.productid) as ratecount ,AVG(rating.ratescore) as  rate,CASE WHEN l.rateid IS NULL THEN 'false' ELSE 'true'END as israted FROM products INNER JOIN USERS ON users.userid=products.postedby LEFT JOIN rating l ON l.userid =${data.userid} and l.productid =products.productid Left JOIN rating on rating.productid=products.productid  where products.price<1000 GROUP BY products.productid;`
           
        }
        else{
           var querystatement=`SELECT  users.fullname,users.phonenumber, products.* ,COUNT(rating.productid) as ratecount ,AVG(rating.ratescore) as  rate from products INNER JOIN USERS ON users.userid=products.postedby  Left JOIN rating on rating.productid=products.productid  where products.price<1000 GROUP BY products.productid;`
       
        }
        

        try{await pool.query(querystatement,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
                for(var i=0;i<result.length;i++){
                   
                   if(result[i].image!=undefined){ const images= result[i].image.split(","); 
                   
                   for (var j=0;j<images.length;j++){
                    if(images[j]=='') {
                        
                    }else{
                     images[j]=process.env.APP_HOST+"/feed/images/"+images[j]
                    }
                        

                   }


                   result[i].image=images}
               }
                return callback(null,result)
            }
        })}catch(error){
            console.error(error);
        }

    },
    getRelatedProducts: async (data,callback)=>{
        
        
        if(data.catagory==undefined){
            return callback("please send data with along correct attribute")
         }
         if(data.userid!=undefined){
            var querystatement=`SELECT  users.fullname,users.phonenumber, products.* ,COUNT(rating.productid) as ratecount ,AVG(rating.ratescore) as  rate,CASE WHEN l.rateid IS NULL THEN 'false' ELSE 'true'END as israted FROM products INNER JOIN USERS ON users.userid=products.postedby LEFT JOIN rating l ON l.userid =? and l.productid =products.productid Left JOIN rating on rating.productid=products.productid where products.category=? GROUP BY products.productid ORDER by products.date DESC;`
            var values=[data.userid,data.catagory]
        }
        else{
            var querystatement=`SELECT users.fullname,users.phonenumber, products.* ,COUNT(rating.productid) as ratecount ,AVG(rating.ratescore) as rate FROM products INNER JOIN USERS ON users.userid=products.postedby Left JOIN rating on rating.productid=products.productid where products.category=? GROUP BY products.productid`
        var values=[data.catagory]
        }
        
        try{await pool.query(querystatement,values,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
                for(var i=0;i<result.length;i++){
                   
                    if(result[i].image!=undefined){const images= result[i].image.split(","); 
                   
                   for (var j=0;j<images.length;j++){
                    if(images[j]=='') {
                        
                    }else{
                     images[j]=process.env.APP_HOST+"/feed/images/"+images[j]
                    }
                        

                   }


                   result[i].image=images}
               }
                return callback(null,result)
            }
        })}catch(error){
            console.error(error);
        }

    },
    createTrendingProducts: async (data,req,callback)=>{
        if(data.trendingproductid==undefined ){
            return callback("please send data with along correct attribute")
         }
        var querystatement=`update products SET istrendingproduct=1 WHERE productid =?`
        var values=[data.trendingproductid]

        try{await pool.query(querystatement,values,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
                return callback(null,result)
            }
        })}catch(error){
            console.error(error);
        }
    },
    removeTrendingProducts: async (data,callback)=>{
        if(data.trendingproductid==undefined ){
            return callback("please send data with along correct attribute")
         }
        var querystatement=`update products SET istrendingproduct=0 WHERE productid =?`
        var values=[data.trendingproductid]

        try{await pool.query(querystatement,values,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
                return callback(null,result)
            }
        })}catch(error){
            console.error(error);
        }
    },
    getTrendingProducts: async (data,callback)=>{
       
        if(data.userid!=undefined){
            var querystatement=`SELECT  users.fullname,users.phonenumber, products.* ,COUNT(rating.productid) as ratecount ,AVG(rating.ratescore) as  rate,CASE WHEN l.rateid IS NULL THEN 'false' ELSE 'true'END as israted FROM products INNER JOIN USERS ON users.userid=products.postedby LEFT JOIN rating l ON l.userid =${data.userid} and l.productid =products.productid Left JOIN rating on rating.productid=products.productid  where products.istrendingproduct=1 GROUP BY products.productid;`
           
        }
        else{
           var querystatement=`SELECT  users.fullname,users.phonenumber, products.* ,COUNT(rating.productid) as ratecount ,AVG(rating.ratescore) as  rate from products INNER JOIN USERS ON users.userid=products.postedby  Left JOIN rating on rating.productid=products.productid  where products.istrendingproduct=1 GROUP BY products.productid;`
       
        }
        
       
        
        try{await pool.query(querystatement,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
                var i=0
                for( i=0;i<result.length;i++){
                    if(result[i].rate==null){
                        result[i].rate=0
                    }
                    if(result[i].image!=undefined){
                        
                     const images= result[i].image.split(","); 
                   
                    for (var j=0;j<images.length;j++){
                        if(images[j]=='') {
                        
                        }else{
                         images[j]=process.env.APP_HOST+"/feed/images/"+images[j]
                        }
                        
                         

                    }
                    result[i].image=images
                }


                    
                }
                return callback(null,result)
            }
        })}catch(error){
            console.error(error);
        }
    },
    createHeroProducts: async (data,req,callback)=>{
       
        if( data.name==undefined || data.description==undefined|| req.file==undefined ){
            return callback("please send data with along correct attribute")
         }
        
        var queryStatment=`insert into heroproducts set ?`
        var values={
            name:data.name,
            image:req.file.filename,
            description:data.description,  
        }
        try{await pool.query(queryStatment,values,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
                return callback(null,result)
            }
        })}catch(error){
            console.error(error);
        }
    },
    removeHeroProducts: async (data,callback)=>{
        if(data.heroproductid==undefined ){
            return callback("please send data with along correct attribute")
         }
        var querystatement=`Delete from heroproducts where heroproductid=?`
        var values=[data.heroproductid]

        try{await pool.query(querystatement,values,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
                return callback(null,result)
            }
        })}catch(error){
            console.error(error);
        }
    },
    getHeroProducts: async (data,callback)=>{
        var querystatement=`SELECT * FROM heroproducts `
      
       
        
        try{await pool.query(querystatement,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
                for(var i=0;i<result.length;i++){
                    result[i].image=process.env.APP_HOST+"/product/images/"+result[i].image
                }
                return callback(null,result)
            }
        })}catch(error){
            console.error(error);
        }
    },
    createCatagoryList: async (data,callback)=>{
        if(data.catagory==undefined ){
            return callback("please send data with along correct attribute")
         }
        var querystatement=`INSERT INTO catagories (catagory) VALUES (?);`
        var value=[data.catagory.toLowerCase()]
        try{await pool.query(querystatement,value,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
               
                return callback(null,result)
            }
        })}catch(error){
            console.error(error);
        }
    },
   getCatagoryList: async (data,callback)=>{
        var querystatement=`SELECT * FROM catagories `
      
       
        
        try{await pool.query(querystatement,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
                return callback(null,result)
            }
        })}catch(error){
            console.error(error);
        }
    },
  updateCatagoryList: async (data,callback)=>{
    if(data.catagory==undefined ||data.catagoryid==undefined){
        return callback("please send data with along correct attribute")
     }
        var querystatement= `update catagories set catagory=? where catagoryid=?`

        var value=[data.catagory,data.catagoryid]
        try{await pool.query(querystatement,value,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
               
                return callback(null,result)
            }
        })}catch(error){
            console.error(error);
        }
    },
    deleteCatagoryList: async (data,callback)=>{
        console.log(data);
        if(data.catagoryid==undefined){
            return callback("please send data with along correct attribute")
         }
        var querystatement=`delete from catagories where catagoryid=? `
      
        var value=[data.catagoryid]
        try{await pool.query(querystatement,value,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
                return callback(null,result)
            }
        })}catch(error){
            console.error(error);
        }
    },
}
