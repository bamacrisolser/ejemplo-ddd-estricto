import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import error from '../helpers/error-constructor.js';
dotenv.config();

const AuthToken = (req, res, next) => {
  const Headers = req.headers;
  const Token = Headers.authorization;
  const Secret = process.env.SECRETJWT;
  try {
    if (!Token) throw error('Bearer token is mandatory ', null, 401);
    if (!Token.startsWith('Bearer ')) throw error('Bearer token invalid', null, 401);

    const CorrectToken = Token.substring(7, Token.length);
    const Jwtdecoded = jwt.verify(CorrectToken, Secret);
    req.user = Jwtdecoded.admin;
    req.user_permissions = Jwtdecoded.permissions;
    next();
  } catch (error) {
    if (!error.statusCode) error.statusCode = 401;
    next(error);
  }
};

export const methods = {
  AuthToken,
};
