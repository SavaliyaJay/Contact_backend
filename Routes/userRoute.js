const express = require("express");

const router = express.Router();

const {
    // userRegister,
    userLogin,
    userCurrent
} = require("../Controllers/userController");
const validateToken = require("../Middleware/validateTokenHandler");

// router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
router.route("/current").get(validateToken,userCurrent);

module.exports = router