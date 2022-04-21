const { json } = require('express/lib/response')
const {createProdcut,getAllProduct, getProductByID, editProduct, getAllproductBYUserId, getProductByCatagory, deleteProduct, getProductByBrand, rateProduct, getHighRatedProduct, getHighPricedProducts, getLowPricedProdcuts, getRelatedProducts, getTrendingProducts, createTrendingProducts, removeTrendingProducts, getHeroProducts, createHeroProducts, removeHeroProducts, createCatagoryList, getCatagoryList, updateCatagoryList, deleteCatagoryList}=require('../models/productModel')
   
module.exports={
    CreateProdcut:(req,res)=>{
        
        createProdcut(req.body,req,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
            else {res.status(200).json({
                status:200,
                message:"Product created sucessfully",
                data:result
            })}
        })
    },
    GetAllProduct:(req,res)=>{
        getAllProduct(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
            else {
                //setTimeout(function() {
                    res.status(200).json({
                        status:200,
                        message:"success",
                        data:result
        
                    })
                  //}, 5000);
               
        }
        })
    },
    GetProductById:(req,res)=>{
        getProductByID(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
            else {res.status(200).json({
                status:200,
                message:"success",
                data:result

            })}
        })
    },
    EditProduct:(req,res)=>{
        editProduct(req.body,req,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
            else {res.status(200).json({
                status:200,
                message:"product updated successfully",
                data:result

            })}
        })
    },
    GetAllProductByUserId:(req,res)=>{
        getAllproductBYUserId(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
            else {res.status(200).json({
                status:200,
                message:"fetching data success",
                data:result

            })}
        })
    },
    GetAllProductCatagory:(req,res)=>{
       getProductByCatagory(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
            else {res.status(200).json({
                status:200,
                message:"fetching data success",
                data:result

            })}
        })
    },
    DeleteProduct:(req,res)=>{
        deleteProduct(req.params,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
            else {res.status(200).json({
                status:200,
                message:"deleting successfull",
                

            })}
        })
    },
    GetProductByBrand:(req,res)=>{
        getProductByBrand(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
            else {res.status(200).json({
                status:200,
                message:"fetchning product by brand successfull",
                data:result
                

            })}
        })
    },
    RateProduct:(req,res)=>{
        rateProduct(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
            else {res.status(200).json({
                status:200,
                message:"rating successfull"
                
                

            })}
        })
    },
    GetHighRatedProduct:(req,res)=>{
        getHighRatedProduct(req.body,(error,result)=>{
            if(error){
                res.json({
                    status:404,
                    message:error
                })
            }
            else {res.status(200).json({
                status:200,
                message:"fetching high rated product successfull",
                data:result
                
        })}
    })
  },
  GetHighPricedProduct:(req,res)=>{
    getHighPricedProducts(req.body,(error,result)=>{
        if(error){
            res.json({
                status:404,
                message:error
            })
        }
        else {res.status(200).json({
            status:200,
            message:"fetching high priced product successfull",
            data:result
            
    })}
})
},
GetLowPricedProduct:(req,res)=>{
    getLowPricedProdcuts(req.body,(error,result)=>{
        if(error){
            res.json({
                status:404,
                message:error
            })
        }
        else {res.status(200).json({
            status:200,
            message:"fetching low priced product successfull",
            data:result
            
    })}
})
},
GetRelatedProducts:(req,res)=>{
    getRelatedProducts(req.body,(error,result)=>{
        if(error){
            res.json({
                status:404,
                message:error
            })
        }
        else {res.status(200).json({
            status:200,
            message:"fetching related product successfull",
            data:result
            
    })}
})
}, 
GetTrendingProducts:(req,res)=>{
  getTrendingProducts(req.body,(error,result)=>{
        if(error){
            res.json({
                status:404,
                message:error
            })
        }
        else {res.status(200).json({
            status:200,
            message:"fetching trending  products successful",
            data:result
            
    })}
})
},
CreateTrendingProduct:(req,res)=>{
  createTrendingProducts(req.body,req,(error,result)=>{
        if(error){
            res.json({
                status:404,
                message:error
            })
        }
        else {res.status(200).json({
            status:200,
            message:"creating trending product successful",
            
            
    })}
})
},
RemoveTrendingProduct:(req,res)=>{
    removeTrendingProducts(req.body,(error,result)=>{
        if(error){
            res.json({
                status:404,
                message:error
            })
        }
        else {res.status(200).json({
            status:200,
            message:"removing trending product successful",
            
            
    })}
})
},

GetHeroProducts:(req,res)=>{
    getHeroProducts(req.body,(error,result)=>{
          if(error){
              res.json({
                  status:404,
                  message:error
              })
          }
          else {res.status(200).json({
              status:200,
              message:"fetching Hero  products successful",
              data:result
              
      })}
  })
  },
  CreateHeroProduct:(req,res)=>{
    createHeroProducts(req.body,req,(error,result)=>{
          if(error){
              res.json({
                  status:404,
                  message:error
              })
          }
          else {res.status(200).json({
              status:200,
              message:"creating Hero product successful",
              
              
      })}
  })
  },
  RemoveHeroProduct:(req,res)=>{
      removeHeroProducts(req.body,(error,result)=>{
          if(error){
              res.json({
                  status:404,
                  message:error
              })
          }
          else {res.status(200).json({
              status:200,
              message:"removing Hero product successful",
              
              
      })}
  })
  },
  CreateCatagoryList:(req,res)=>{
    createCatagoryList(req.body,(error,result)=>{
        if(error){
            res.json({
                status:404,
                message:error
            })
        }
        else {res.status(200).json({
            status:200,
            message:"creating catagory list successful",
            
            
    })}
})
},
GetCatagoryList:(req,res)=>{
    getCatagoryList(req.body,(error,result)=>{
        if(error){
            res.json({
                status:404,
                message:error
            }) 
        }
        else {res.status(200).json({
            status:200,
            message:"fetching data successful",
            data:result
            
            
    })}
})
},
UpdateCatagoryList:(req,res)=>{
    updateCatagoryList(req.body,(error,result)=>{
        if(error){
            res.json({
                status:404,
                message:error
            })
        }
        else {res.status(200).json({
            status:200,
            message:"updating catgory list successful",
            
            
    })}
})
},
DeleteCatgoryList:(req,res)=>{
    deleteCatagoryList(req.body,(error,result)=>{
        if(error){
            res.json({
                status:404,
                message:error
            })
        }
        else {res.status(200).json({
            status:200,
            message:"removing catagory list successful",
            
            
    })}
})
},
}