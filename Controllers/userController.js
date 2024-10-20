const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const userSchema = require("../Models/userModel");
const jwt = require("jsonwebtoken")

//@desc register user
//@route post /api/users/register
//@access public
const userRegister = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        const error = new Error("All fields are required");
        error.status = 400;
        return next(error);
    }

    const userAvailable = await userSchema.findOne({ email })
    if (userAvailable) {
        const error = new Error("User already available.");
        error.status = 400;
        return next(error);
    }

    const hasedPassword = await bcrypt.hash(password, 10)
    // console.log(hasedPassword);

    const user = userSchema.create({ username, email, password: hasedPassword })
    if (user) {
        res.status(201).json({ user })
    } else {
        const error = new Error("User not vaild.");
        error.status = 400;
        return next(error);
    }
})

//@desc login user
//@route post /api/users/login
//@access public
const userLogin = asyncHandler(async (req, res, next) => {
    // console.log(req.body);
    const { email, password } = req.body;

    const userAvailable = await userSchema.findOne({ email });

    if (!userAvailable) {
        const error = new Error("User not exists.");
        error.status = 400;
        return next(error);
    }

    const passwordMatch = await bcrypt.compare(password, userAvailable.password);

    if (passwordMatch) {
        const accesssToken = jwt.sign({
            user: {
                username: userAvailable.username,
                email: userAvailable.email,
                id: userAvailable._id
            }
        },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "1m"
            }
        )
        // console.log(accesssToken);
        res.status(200).json({accesssToken:accesssToken});
    } else {
        const error = new Error("Invalid password.");
        error.status = 400;
        return next(error);
    }
});

//@desc current user
//@route get /api/users/current
//@access private
const userCurrent = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "current" })
})

module.exports = {
    userRegister,
    userLogin,
    userCurrent
}