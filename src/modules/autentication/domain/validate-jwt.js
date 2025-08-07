import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const validateJWT = async (token) => {
    return jwt.verify(token, process.env.SECRETJWT);
}

export default validateJWT;
