import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const createRefreshJWT = (admin) => {
    let refreshToken = jwt.sign(
        {
          admin,
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 3, // 3 days
        },
        process.env.SECRETJWT
      );
    return refreshToken
}

export default createRefreshJWT