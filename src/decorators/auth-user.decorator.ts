import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const AuthMember = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const member = request.user;
    return data ? member?.[data] : member;
  }
);
