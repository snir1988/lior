const express = require("express"); // ייבוא express
const authMiddleware = require("../middelewares/auth"); // ייבוא המידלוור לאימות משתמשים
const Order = require("../modles/order"); // ייבוא מודל הזמנה מתוך מונגו

const router = express.Router(); // יצירת ראוטר חדש

// נתיב לביצוע הזמנה (רק למשתמשים מחוברים)
router.post("/order", authMiddleware, async (req, res) => {
  try {
    const { products, totalPrice } = req.body; // קבלת נתוני ההזמנה מה-body של הבקשה

    // יצירת הזמנה חדשה
    const order = new Order({
      _id: new mongoose.Types.ObjectId(), // יצירת מזהה ייחודי להזמנה
      userId: req.user._id, // המשתמש המחובר שהזמין
      products, // המוצרים בהזמנה
      totalPrice, // מחיר ההזמנה
    });

    await order.save(); // שמירת ההזמנה במסד הנתונים

    res.status(201).json({ message: "Order placed successfully", order }); // החזרת תשובה על הצלחה
  } catch (err) {
    res.status(500).json({ message: "Error placing order", error: err }); // החזרת שגיאה אם קרתה בעיה
  }
});

// נתיב לקבלת הזמנות של משתמש מסוים
router.get("/orders", authMiddleware, async (req, res) => {
  try {
    // שליפה של כל ההזמנות של המשתמש המחובר
    const orders = await Order.find({ userId: req.user._id }).populate(
      "products.productId"
    ); // populating המוצר בתוך ההזמנה

    res.json(orders); // החזרת ההזמנות למשתמש
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders", error: err }); // החזרת שגיאה אם קרתה בעיה
  }
});

module.exports = router; // ייצוא הראוטר לשימוש ב-app.js
