const router=require("express").Router()
const user=require("../controller/user")
const {verifyUser,passwordValidation}=require("../middleware/userValidation")


router.post("/register",user.register)
router.get("/verify/:id",user.verifyUser)
router.post("/login",user.login)
router.post("/generate_reset_pass_link",verifyUser,user.generate_reset_pass_link)
router.post("/reset/:id",passwordValidation,user.reset)


module.exports=router