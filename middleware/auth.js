import jwt from 'jsonwebtoken';


export function loginRequired (req, res, next) {
  try {
    var token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (decoded) {
        next();
      } else {
        res.status(401).json({ message: 'Please log in first' })
      }
    });
  } catch (e) {
    res.status(401).json({ message: 'Please log in first' })
  }
}

export function ensureCorrectUser (req, res, next) {
  try {
    var token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (decoded && decoded.userId === req.params.id) {
        next();
      } else {
        res.status(401).json({ message: 'Unauthorized' })
      }
    });
  } catch (e) {
    res.status(401).json({ message: 'Unauthorized' })
  }
}

