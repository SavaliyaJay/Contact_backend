const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        // console.log(token);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedData) => {
        // console.log(err);
        if (!token) {
            const error = new Error("Token Missed");
            error.status = 401;
            return next(error); 
        }
        if (err) {
            const error = new Error("User Not Authorized");
            error.status = 401;
            return next(error);
        }
        req.user = decodedData.user;
        next();
    })
})

module.exports = validateToken;