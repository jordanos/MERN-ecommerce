const pool=require('../dbConnection')

module.exports={
    getNumberOfusers:(data,callback)=>{
        var queryStatment=`select count(userid) as numberofallusers from users`
        pool.query(queryStatment,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
                return callback(null,result)
            }
        })
    },
    getNumberOfProdcuts:(data,callback)=>{
        var queryStatment=`select count(productid) as numberofallproducts from products`
        pool.query(queryStatment,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
                return callback(null,result)
            }
        })
    },
    getNumberOfFeeds:(data,callback)=>{
        var queryStatment=`select count(feedid) as numberofAllFeeds from feeds`
        pool.query(queryStatment,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
                return callback(null,result)
            }
        })
    },
    getNumberOfpackageBought:(data,callback)=>{
        var queryStatment=`select count(subscriptionid) as numberofsubscriptionbought from subscriptions`
        pool.query(queryStatment,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
                return callback(null,result)
            }
        })
    },
    getAllStat:(data,callback)=>{
        var queryStatment=`SELECT count(DISTINCT users.userid) as users ,count(DISTINCT feeds.feedid) as feeds, count(DISTINCT products.productid) as products ,count(DISTINCT subscriptions.subscriptionid=2) as packages FROM users JOIN feeds JOIN products JOIN subscriptions;`
        pool.query(queryStatment,(error,result)=>{
            if(error){
                return callback(error)
            }
            else{
                return callback(null,result[0])
            }
        })
    },
}