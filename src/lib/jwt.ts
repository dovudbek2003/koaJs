import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../common/config/index";

export interface ITokenData {
  id: number
}

export const generateToken = (data: ITokenData): string => {
  return jwt.sign(data, config.jwtKey, { expiresIn: '10h' })

};

export const verifyToken = (token: string): JwtPayload | ITokenData | string => {
  return jwt.verify(token, config.jwtKey);
};
