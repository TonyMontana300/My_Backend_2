import { Router } from "express";
import { registorUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/mutler.middleware.js";

const router = Router();

router.route("/register").post(
    upload.fields([
        { 
            name: "avatar",
            maxCount: 1 
        },
        { 
            name: "images",
            maxCount: 1
        }
    ]),
    registorUser
);


export default router;