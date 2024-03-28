import { Context, Next } from "koa";

export async function checkToken(ctx: Context, next: Next) {
  const token = ctx.headers.token;

  if (!token) {
    ctx.body = { status: 401, message: "token must be required!" };
    ctx.status = 401;

    return;
  }

  await next();
}
