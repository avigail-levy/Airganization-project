import "../css/About.css";

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">אודות Airganization</h1>
      <p className="about-paragraph">
        <strong>Airganization</strong> היא חברת תיירות ותעופה חדשנית ומובילה, המציעה חוויות תיירות בלתי נשכחות ברחבי העולם.
        מייסדי החברה ומנהליה הם מבין אנשי המקצוע הבולטים והוותיקים בתיירות היוצאת מישראל.
      </p>

      <p className="about-paragraph">
        כחלק מקבוצת תיירות ישראלית גדולה, Airganization פועלת בזירה הגלובלית בשילוב טכנולוגיות מתקדמות, תשתיות פיננסיות יציבות ושירות ברמה הגבוהה ביותר.
      </p>

      <p className="about-subtitle">✨ החזון שלנו:</p>
      <p className="about-paragraph">
        "ליצור תיירות שמגשימה חלומות" – מתוך תשוקה אמיתית לחבר בין אנשים, תרבויות וחוויות. אנו נגישים, מקצועיים ומאמינים שתיירות איכותית לא חייבת להיות יקרה.
      </p>

      <p className="about-subtitle">🧳 שירותי התיירות שלנו:</p>
      <ul className="about-list">
        <li>חבילות נופש ליעדים אקזוטיים: זנזיבר, סיישל, קורפו, האיים המלדיביים ועוד</li>
        <li>טיולים מאורגנים למזרח הרחוק, אמריקה, אירופה ואפריקה</li>
        <li>טיולים מוסיקליים ותרבותיים – Airganization Harmony</li>
        <li>טיולי תמריץ ואירועים עסקיים – לחברות, ארגונים ומוסדות גדולים</li>
      </ul>

      <p className="about-subtitle">👥 קהל היעד שלנו:</p>
      <p className="about-paragraph">
        מטיילים יחידים, קבוצות חברים, ועדי עובדים, חברות וארגונים – כל אחד ימצא אצלנו חוויה מותאמת אישית ומרגשת.
      </p>

      <p className="about-subtitle">💼 צוות ההנהלה:</p>
      <ul className="about-list">
        <li><strong>אביטל בורץ</strong> – מייסד ומנכ"ל: חזון, ניסיון והגשמת חלומות</li>
        <li><strong>אביגיל לוי</strong> – סמנכ"לית שיווק: אסטרטגיה, דיגיטל ויצירתיות</li>
        <li><strong>איריס כהן</strong> – סמנכ"לית מכירות ופרויקטים: מקצועיות, תשוקה ואהבת אדם</li>
      </ul>

      <p className="about-subtitle">📍 פרטי יצירת קשר:</p>
      <p className="about-paragraph">
        כתובת: בר כוכבא 4, בני ברק<br />
        טלפון: <a href="tel:037156681">03-7156681</a><br />
        מייל: <a href="mailto:info@airganization.co.il">info@airganization.co.il</a>
      </p>
    </div>
  );
};

export default About;
