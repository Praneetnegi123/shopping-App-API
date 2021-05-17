const router = require("./userRouter");
const cart=require("../controller/cart")
const {verifyUser}=require("../middleware/userValidation")

router.post("/cart",verifyUser,cart.addToCart)
router.get("/cart",verifyUser,cart.displayAllProduct)
router.delete("/cart",verifyUser,cart.deleteProduct)
router.put("/cart",verifyUser,cart.updateProduct)

module.exports=router