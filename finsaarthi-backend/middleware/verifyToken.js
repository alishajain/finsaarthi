const jwt = require("jsonwebtoken");
const JWT_SECRET = '8200dd45dc0960bc87b98c0b6f86948cdb1defc5d18b6416c4aae12e31f49ace1311597e3a4c1c57ff5c6a113cfbfe90dfac4d2eed036e379bbed9a157257f24';

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({
        success: false,
        message: "No token provided or format incorrect.",
      });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;

    next(); // Proceed to the next middleware
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token." });
  }
};

module.exports = { verifyToken };
