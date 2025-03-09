import jwt, { JwtPayload } from "jsonwebtoken";

export const generateJWT = (payload: JwtPayload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "180d",
    });
    console.log(payload);
    return token;
};

export const verifyJWT = (token: string) => {
    const secret = process.env.JWT_SECRET;
    return jwt.verify(token, secret);
};
