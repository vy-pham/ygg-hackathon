import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Args, GqlExecutionContext } from '@nestjs/graphql';
import { validateOrReject } from 'class-validator';
import { PaginationInput } from 'src/input-output/pagination.input';

export const Pagination = createParamDecorator(
  async (_: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const { page, pageSize } = (ctx.getArgs().pagination ||
      {}) as PaginationInput;
    try {
      await validateOrReject(
        Object.assign(new PaginationInput(), { page, pageSize }),
      );
    } catch (error) {
      throw new BadRequestException(error, 'Invalid pagination');
    }

    let skip = 0;
    let limit = pageSize || Number.MAX_SAFE_INTEGER;
    if (page && pageSize) {
      skip = (page - 1) * pageSize;
    }
    return { skip, limit };
  },
  [Args({ name: 'pagination', type: () => PaginationInput, nullable: true })],
);
