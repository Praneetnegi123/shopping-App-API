const wishlist=require("../controller/wishlist")
const router = require("./userRouter")
const {verifyUser}=require("../middleware/userValidation")

router.post("/add_wishlist",verifyUser,wishlist.addToWishlist)
router.get("/wishlist",verifyUser,wishlist.showWishlistForParticularUser)
router.delete("/wishlist",verifyUser,wishlist.deleteProduct)

module.exports=router