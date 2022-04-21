const multer=require("multer")
const { GetAllProduct, CreateProdcut, GetProductById, EditProduct, GetAllProductByUserId, DeleteProduct, GetAllProductCatagory, GetProductByBrand, RateProduct, GetHighRatedProduct, GetLowPricedProduct, GetHighPricedProduct, GetRelatedProducts, GetTrendingProducts, GetHeroProducts, RemoveTrendingProduct, RemoveHeroProduct, CreateHeroProduct, CreateTrendingProduct, GetCatagoryList, CreateCatagoryList, UpdateCatagoryList, DeleteCatgoryList } = require('../controllers/productController')
const path=require('path')
const router=require('express').Router()
const express=require('express')


const {authenticatePackage}=require("../middleware/authenticatePakage")
const { autheticateUser } = require("../middleware/authnticateUsers")
const authnticateUsers = require("../middleware/authnticateUsers")
const {authenticateAdmin} = require("../middleware/authenticateAdmin")
const storage=multer.diskStorage({
    destination:"./src/images/",
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})  
const upload=multer({
    storage:storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        var respo={
            status:404,
            message:'Only images are allowed'
        }
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(JSON.stringify(respo))
            
        }
        callback(null, true)
    },
    limits:{
        fileSize: 1024 * 1024 *1024
    }
})


router.use('/images',express.static('./src/images/'))

router.post('/',GetAllProduct)

router.post('/create',upload.array('images'),authenticatePackage,CreateProdcut)

router.post("/catagory",GetAllProductCatagory)

router.post("/brand",GetProductByBrand)
router.post("/rate",RateProduct)

router.post("/getproduct",GetProductById)
router.delete("/delete/:productid",autheticateUser,DeleteProduct)

router.post("/user",GetAllProductByUserId)

router.post("/edit",autheticateUser,EditProduct)

router.post("/highrated",GetHighRatedProduct)
router.post("/lowpriced",GetLowPricedProduct)
router.post("/highpriced",GetHighPricedProduct)
router.post("/related",GetRelatedProducts)


router.post("/trendingproduct",GetTrendingProducts)
router.post("/settrendingproduct",authenticateAdmin,CreateTrendingProduct)
router.delete("/trendingproduct",authenticateAdmin,RemoveTrendingProduct)

router.get("/heroproducts",GetHeroProducts)
router.post("/heroproducts",upload.single('image'),authenticateAdmin,CreateHeroProduct) 
router.delete("/heroproducts",authenticateAdmin,RemoveHeroProduct)

router.get("/catagorylist",GetCatagoryList)
router.post("/catagorylist",authenticateAdmin,CreateCatagoryList) 
router.patch("/catagorylist",authenticateAdmin,UpdateCatagoryList)
router.delete("/catagorylist",authenticateAdmin,DeleteCatgoryList)



router.use('/*',(req,res)=>{
    res.json({
        status:404,
        message:"Requested Route not Found"
    })
})
module.exports=router