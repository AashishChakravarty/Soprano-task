//MAIN ROUTING
//FROM HERE ALL THE ROUTES DIVIDED
var router = require("express").Router();
var jwt = require("jsonwebtoken");

module.exports = function () {
  router.use("/users", require("./users.routes")());

  router.use("/post", validateUser, require("./post.routes")());

  function validateUser(req, res, next) {
    const authorization = req.headers['authorization']

    verifyToken(authorization ? authorization.split(" ")[1] : '').then(decoded => {
      req.userData = decoded;
      next();
    }).catch(err => {
      res.status(401).json({
        status: false,
        message: err.message,
      });
    })
  }

  return router;
};