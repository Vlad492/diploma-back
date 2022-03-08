import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthorizedUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) =>
    ctx.switchToHttp().getRequest().user,
);
