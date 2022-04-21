const { BuyPackage, ApprovePackage, DenyPackage, PackageStatus, GetPackageByUserId, CheckIfuserPackageStatus, DeletePackage, GetPackageDetail, UpdatePackage, BuyPackageWithRicaCoin } = require("../controllers/packageController")
const {authenticateAdmin} = require("../middleware/authenticateAdmin")

const router=require("express").Router()
 
router.post('/buy',BuyPackage)
router.post('/buywithricacoin',BuyPackageWithRicaCoin)

router.post("/approve",authenticateAdmin,ApprovePackage)
router.post("/deny",authenticateAdmin,DenyPackage)

router.post("/status",authenticateAdmin,PackageStatus)

router.delete("/delete",authenticateAdmin,DeletePackage)

router.post("/getbyuserid",GetPackageByUserId)
router.post("/checkstatus",CheckIfuserPackageStatus)
router.get("/detail",GetPackageDetail)
router.post("/updatepackage",UpdatePackage)





module.exports=router