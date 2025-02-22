import { Args, type ArgsOptions } from '@nestjs/graphql';

export const Input = (options?: ArgsOptions) => {
  if (options) return Args('input', options);
  return Args('input');
};
