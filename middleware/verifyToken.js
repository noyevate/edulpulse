const jwt = require('jsonwebtoken');
const User = require("../models/users");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
            if (err){
                return res.status(403).json({status: false, message: "invalid token"});
            } 
            req.user = user;
            next()       
        })
    } else {
        return res.status(401).json({status: false, message: "You are not authenticated"});
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        // 'Regular', 'Patient', 'Physician', Admin
        if(req.user.userType === 'Teacher' || req.user.userType === 'Parent'){
            next();
        } else {
            return res.status(403).json({status: false, message: "You are not allowed to access the routes"});
        }
    })
}

const verifyTeacher = (req, res, next) => {
    verifyToken(req, res, () => {
       
        if( req.user.userType === 'Teacher' ){
            next();
        } else {
            return res.status(403).json({status: false, message: "You are not allowed to access the routes"});
        }
    })
}

const verifyParent = (req, res, next) => {
    verifyToken(req, res, () => {
        // 'Regular', 'Patient', 'Physician', Admin
        if(req.user.userType === 'Parent' ){
            next();
        } else {
            return res.status(403).json({status: false, message: "You are not allowed to access the routes"});
        }
    })
}


module.exports = {verifyToken, verifyTokenAndAuthorization, verifyTeacher, verifyParent }