const jwt = require('jsonwebtoken');

// המידלוור שמאמת את המשתמש בעזרת JWT
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }

  try {
    // אימות טוקן בעזרת המפתח הסודי
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // שימור פרטי המשתמש בה request
    next(); // אם הטוקן תקין, נמשיך לפעולה הבאה
  } catch (err) {
    return res.status(400).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
