const authMiddleware = (req) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error("Unauthorized - No Authorization Header");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new Error("Unauthorized - Malformed Token");
  }

  if (token === "admin") {
    return { role: "admin" };
  }

  if (token === "user") {
    return { role: "user" };
  }

  throw new Error("Forbidden - Invalid Token");
};

module.exports = { authMiddleware };
