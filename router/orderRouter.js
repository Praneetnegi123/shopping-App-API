const { verifyUser } = require("../middleware/userValidation");
let order=require("../controller/order")
const router = require("./userRouter");

router.post("/order",verifyUser,order.createOrder)
router.put("/order/:id",verifyUser,order.updateOrder)
router.delete("/order/:id",verifyUser,order.cancelOrder)
router.post("/pay/:id",verifyUser,order.pay)
router.get("/success/:id",order.success)
router.get("/cancel",order.cancel)

module.exports=router