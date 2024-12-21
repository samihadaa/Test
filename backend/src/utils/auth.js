const authMiddleware = (req) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (token === "admin") return { role: "admin" };
    if (token === "user") return { role: "user" };
    throw new Error("Unauthorized");
  };
  
  module.exports = { authMiddleware };
  