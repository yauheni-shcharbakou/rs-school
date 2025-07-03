import { Transform } from 'class-transformer';

export const TransformToNullableId = () => {
  return Transform(({ value }) => value ?? null);
};
