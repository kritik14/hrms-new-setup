const constants=require ("../helpers/constant");
const jwt = require("jsonwebtoken");

//  jwt generating token when user login first time
exports.signinToken = (email) => {
    return jwt.sign({ email: email}, config.get("server.JWT.jwtPrivateKey"),{
      expiresIn: config.get("server.JWT.jwtexpiresIn"),
    }
    );
};