import { Router } from "express"
import { checkPermission } from "../middleware/rbac.middleware.js"

import {
    getAllUsers,
    loginUser,
    logoutUser,
    registerUser,
} from "../controllers/user.controller.js"
import { upload } from "../middleware/multer.middleware.js"
import verifyJWT from "../middleware/auth.middleware.js"
const router = Router()

router.route("/register").post(upload.single("profilepic"), registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT, logoutUser)
// router.route("/getuser").get(checkPermission('view_all_users'),getAllUsers)

router
    .route("/getallusers")
    .get(verifyJWT, checkPermission("view_all_users"), getAllUsers)
export default router
