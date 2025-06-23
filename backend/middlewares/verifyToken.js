import jwt from 'jsonwebtoken';

// export function verifyToken(req, res, next) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1]; // Bearer token

//   if (!token) {
//     return res.status(401).json({ message: 'Access token is missing' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // שמירה של id וכו' ב־req
//     next();
//   } catch (err) {
//     return res.status(403).json({ message: 'Invalid token' });
//   }
// }
// import jwt from 'jsonwebtoken';

// export function verifyToken(req, res, next) {
//   let roles = "";
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ message: 'Access token is missing' });
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       // אם פג תוקף
//       if (err.name === 'TokenExpiredError') {
//         const payload = jwt.decode(token);
//         if (!payload) {
//           return res.status(403).json({ message: 'Invalid token' });
//         }

//         const newToken = jwt.sign(
//           { id: payload.id, role: payload.role },
//           process.env.JWT_SECRET,
//           { expiresIn: process.env.JWT_EXPIRES }
//         );

//         console.log("🔁 שרת יצר טוקן חדש לאחר פקיעה:", newToken);

//         // שליחה ללקוח — רק כאן!
//         res.setHeader('x-new-token', newToken);
//         req.user = payload;
//         console.log(req.user, "req.user", roles);
//         if (roles && !roles.includes(payload.role)) {
//           console.log('aaaaa bbbbbb',payload.role)
//           return res.status(403).json({ message: 'Access denied. Managers only.' });
//         }
//         next();
//       } else {
//         return res.status(403).json({ message: 'Invalid token' });
//       }
//     } else {
//       // הטוקן עדיין בתוקף — אין צורך לחדש
//       console.log("✅ Token is still valid – no refresh needed");
//       req.user = decoded;
//       console.log(req.user, "req.user", roles);
//       if (roles && !roles.includes(decoded.role)) {
//         console.log('aaaaa')
//         return res.status(403).json({ message: 'Access denied. Managers only.' });
//       }
//       next();
//     }
//   });
// }
export function verifyToken(roles = []) {
  return function (req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token, "token");
    if (!token) {
      return res.status(401).json({ message: 'Access token is missing' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          const payload = jwt.decode(token);
          if (!payload) {
            return res.status(403).json({ message: 'Invalid token' });
          }

          const newToken = jwt.sign(
            { id: payload.id, role: payload.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES }
          );

          res.setHeader('x-new-token', newToken);
          req.user = payload;

          if (roles.length && !roles.includes(payload.role)) {
            return res.status(403).json({ message: 'Access denied. Insufficient role.' });
          }

          return next();
        } else {
          return res.status(403).json({ message: 'Invalid token' });
        }
      } else {
        req.user = decoded;

        if (roles.length && !roles.includes(decoded.role)) {
          return res.status(403).json({ message: 'Access denied. Insufficient role.' });
        }

        return next();
      }
    });
  }
  
}
