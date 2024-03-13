const jwt = require("jsonwebtoken");
const USER = require("../models/userSchema");
const secretKey = process.env.KEY;

const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.Farmerapp;

        if (!token) {
            throw new Error("Token not found in cookies");
        }

        console.log("Received token:", token);

        const verifyToken = jwt.verify(token, secretKey);
        console.log("Verified token:", verifyToken);

        const rootUser = await USER.findOne({ _id: verifyToken._id, "tokens.token": token });
        console.log("Root user:", rootUser);

        if (!rootUser) {
            throw new Error("User not found");
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();
    } catch (error) {
        res.status(401).send("Unauthorized: no token provided");
        console.error("Authentication error:", error);
    }
}

module.exports = authenticate;
