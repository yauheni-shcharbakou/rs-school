import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { IS_NEED_AUTH } from '../constants/metadata.constants';

export const Auth = () => {
  return applyDecorators(SetMetadata(IS_NEED_AUTH, true), ApiBearerAuth());
};
