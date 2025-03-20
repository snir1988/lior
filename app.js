const express = require("express"); // ייבוא ספריית express, משמשת לבניית אפליקציות ווב
const morgan = require("morgan"); // ייבוא ספריית morgan, לצורך לוגים של בקשות HTTP
const app = express(); // יצירת אובייקט express עבור האפליקציה
const bcrypt = require("bcryptjs"); // במקום bcrypt, השתמש ב-bcryptjs
const mongoose = require("mongoose"); // ייבוא ספריית mongoose, לצורך חיבור למונגו דטהבייס
const productRouter = require("./app/v1/routs/product"); // ייבוא הנתיב לטיפול במוצרים
const categoryRouter = require("./app/v1/routs/category"); // ייבוא הנתיב לטיפול בקטגוריות
const authRouter = require("./app/v1/routs/auth"); // ייבוא הנתיבים של האימות
const orderRouter = require("./app/v1/routs/order"); // ייבוא הנתיבים של הזמנות

app.use(express.json()); // מאפשר לאפליקציה לקבל בקשות מסוג JSON
app.use(morgan("dev")); // שימוש ב-morgan כדי לעקוב אחרי בקשות HTTP (לוגים בפורמט פיתוח)
app.use(express.urlencoded({ extended: true })); // מאפשר לאפליקציה לקבל בקשות מסוג URL-encoded (כולל נתונים בטפסים)

// חיבור למונגו DB עם חיבור מחבר בסביבה
const mongoConnStr = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@curd-demo-two-cluster.8pd7zcn.mongodb.net/'webpharm`;

// חיבור למונגו באמצעות המחרוזת שמספקת את פרטי הגישה
mongoose
  .connect(mongoConnStr)
  .then(() => {
    console.log("connected to mongo"); // הצגת הודעה ב-console במקרה של חיבור מוצלח
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err); // טיפול בשגיאות אם החיבור נכשל
  });

app.use("/auth", authRouter); // שימוש בנתיבים של הרשמה והתחברות תחת הנתיב '/auth'

// הגדרת הנתיבים, כל נתיב מקשר לפונקציות שנמצאות בקבצי ה-controller
app.use("/product", productRouter); // כל בקשה לנתיב '/product' תועבר ל-router של המוצרים
app.use("/category", categoryRouter); // כל בקשה לנתיב '/category' תועבר ל-router של הקטגוריות
app.use("/auth", authRouter); // שימוש בנתיבים של הרשמה והתחברות תחת הנתיב '/auth'
app.use("/order", orderRouter); // שימוש בנתיב הזמנות תחת '/order'

// טיפול במקרה של בקשות שלא מצאו נתיב מתאים
app.all("*", (req, res) => {
  return res.status(404).json({ Msg: "not found 404" }); // מחזיר תשובת שגיאה 404 עם הודעה
});

module.exports = app; // יצוא האפליקציה למודול אחר שישתמש בה
