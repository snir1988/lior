const express = require("express"); // ייבוא Express ליצירת ראוטר
const { register, login } = require("../controllers/user"); // ייבוא הפונקציות מבקר המשתמשים

const router = express.Router(); // יצירת ראוטר חדש

router.post("/register", register); // יצירת נתיב POST לרישום משתמשים
router.post("/login", login); // יצירת נתיב POST להתחברות משתמשים

module.exports = router; // ייצוא הראוטר לשימוש ב-app.js
