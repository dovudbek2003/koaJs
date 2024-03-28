import { Context, Next } from "koa";
import { AuthorizationTokenRequiredException } from "./exception/middleware.exception";
import { ITokenData, verifyToken } from "../lib/jwt";

export class AuthorizationMiddleware {
    async checkToken(ctx: Context, next: Next) {
        const token = ctx.headers.token as string;
        if (!token) {
            throw new AuthorizationTokenRequiredException()
        }

        const { id } = verifyToken(token) as ITokenData
        await next()
    }

    async checkUser() {
        // ...
    }

    async checkAdminRole() {
        // ...
    }

    async checkClientRole() {
        // ...
    }
}