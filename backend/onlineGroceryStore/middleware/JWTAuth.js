const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  const parts = token.split(" ");
  const jwtoken = parts[1];
  console.log("jwt", jwtoken);
  console.log("token secert", process.env.JWT_SECERT_KEY);
  jwt.verify(jwtoken, process.env.JWT_SECERT_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json("Unauthorized");
    } else {
      console.log("next ", next);
      next();
    }
  });
}
module.exports = verifyToken;
