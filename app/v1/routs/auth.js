const express = require("express"); // ייבוא express ליצירת נתיבים חדשים
const bcrypt = require("bcrypt"); // ייבוא bcrypt לאחסון סיסמאות בצורה מאובטחת
const jwt = require("jsonwebtoken"); // ייבוא jsonwebtoken ליצירת token להתחברות
const User = require("../modles/user"); // ייבוא מודל המשתמשים מתוך הקובץ models/user
const mongoose = require("mongoose"); // ייבוא mongoose כדי ליצור מזהי ObjectId

const router = express.Router(); // יצירת ראוטר חדש עבור נתיבים אלו

// נתיב הרשמה - משתמשים יכולים להירשם לחשבון חדש
// נתיב הרשמה - משתמשים יכולים להירשם לחשבון חדש
router.post("/register", async (req, res) => {
    console.log("Request body:", req.body); // מדפיס את הגוף של הבקשה
    console.log("Registration request received"); // מדפיס שהבקשה התקבלה
    
    try {
      const { email, password, name } = req.body;
      console.log("Email:", email); // לוג לבדיקת הערכים
  
      if (!email || !password || !name) {
        console.log("Missing fields: email, password, or name");
        return res
          .status(400)
          .json({ message: "Missing fields: email, password, or name" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("Hashed password:", hashedPassword); // מדפיס את הסיסמה המהודרת
  
      const user = new User({
        email,
        password: hashedPassword,
        name,
      });
  
      console.log("User object created:", user); // הדפסת אובייקט המשתמש שנוצר
  
      const savedUser = await user.save();
      console.log("User saved:", savedUser); // מדפיס את המשתמש שנשמר
  
      res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      console.error("Error during registration:", err); // הדפסת שגיאה אם קרתה
      res.status(500).json({ message: "Error registering user", error: err.message });
    }
  });
  
  

// נתיב התחברות - משתמשים יכולים להתחבר לחשבון קיים
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body; // קבלת דוא"ל וסיסמה מה-body של הבקשה

    const user = await User.findOne({ email }); // חיפוש משתמש במסד הנתונים לפי דוא"ל
    if (!user) {
      return res.status(400).json({ message: "User not found" }); // אם לא נמצא משתמש, החזרת שגיאה
    }

    const isMatch = await bcrypt.compare(password, user.password); // השוואת הסיסמה שהוזנה לסיסמה המאובטחת במסד
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" }); // אם הסיסמה לא תואמת, החזרת שגיאה
    }

    // יצירת token חדש (מזהה ייחודי למשתמש) עם JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token }); // החזרת ה-token למשתמש
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err }); // החזרת שגיאה אם קרתה בעיה
  }
});

module.exports = router; // ייצוא הראוטר לשימוש בקבצים אחרים
