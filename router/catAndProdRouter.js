const router = require("./userRouter");
const {verifyUser}=require("../middleware/userValidation")
const catAndProd=require("../controller/catAndProd")

router.post("/add_categories",verifyUser,catAndProd.addCategories)
router.get("/categories",catAndProd.allCategories)
router.post("/add_product",verifyUser,catAndProd.addProduct)
router.get("/products",catAndProd.showAllProduct)
router.get("/product/:categoryId",catAndProd.getProductByCategoryId)
router.get("/singleProduct/:productId",catAndProd.productDetails)
router.put("/product/:productId",verifyUser,catAndProd.updateProduct)

module.exports=router