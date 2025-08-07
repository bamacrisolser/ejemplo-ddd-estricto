import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const createJWT = (admin,permissions) => {
    const token = jwt.sign(
        {
            admin,
            permissions,
            exp: Math.floor(Date.now() / 1000) + 60 * 10, // 10 minutes
        },
        process.env.SECRETJWT
    );
    return token
}

export default createJWT