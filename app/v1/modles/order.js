const mongoose = require('mongoose'); // ייבוא mongoose לצורך עבודה עם MongoDB

// יצירת סכמת הזמנות
const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, // מזהה ייחודי להזמנה
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // קשר למשתמש שהזמין (הפניה למודל של משתמש)
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // מוצר בהזמנה (הפניה למודל של מוצר)
            quantity: { type: Number, required: true }, // כמות המוצר בהזמנה
        },
    ], // רשימת מוצרים בהזמנה
    totalPrice: { type: Number, required: true }, // מחיר כולל של ההזמנה
    orderDate: { type: Date, default: Date.now }, // תאריך ביצוע ההזמנה (ברירת מחדל היא התאריך הנוכחי)
});

// יצירת מודל הזמנה על פי הסכימה שנוצרה
const Order = mongoose.model('Order', orderSchema);

// ייצוא המודל לשימוש בקבצים אחרים
module.exports = Order;
