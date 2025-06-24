import { useState } from "react";
import "../css/ContactForm.css";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    topic: "",
    message: "",
    subscribe: false,
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("שולח...");

    try {
      const res = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setStatus(res.ok ? "ההודעה נשלחה בהצלחה!" : "שגיאה: " + data.error);
    } catch {
      setStatus("שגיאה בחיבור לשרת.");
    }
  };

  return (
    <div className="form-wrapper" dir="rtl">
      <div className="form-header">
        <h2 className="title">צור קשר</h2>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="grid">
          <div className="field">
            <label>שם</label>
            <input name="name" onChange={handleChange} required />
          </div>
          <div className="field">
            <label>טלפון</label>
            <input name="phone" onChange={handleChange} />
          </div>
          <div className="field">
            <label>מייל</label>
            <input name="email" type="email" onChange={handleChange} required />
          </div>
          <div className="field">
            <label>נושא</label>
            <select name="topic" onChange={handleChange} required>
              <option value="">בחר נושא</option>
              <option>טיולים מאורגנים</option>
              <option>חבילות נופש</option>
              <option>שינוי/ביטול הזמנה</option>
              <option>אחר</option>
            </select>
          </div>
          <div className="field full message-field">
            <label>תוכן הפנייה</label>
            <textarea name="message" onChange={handleChange} required />
          </div>
        </div>

        <button type="submit" className="submit-btn">שליחה</button>
        <p className="status">{status}</p>
      </form>
    </div>
  );
}
