import { MemberTypeEnum } from './member-type.enums.js';

export interface IMemberType {
  id: MemberTypeEnum;
  discount: number;
  postsLimitPerMonth: number;
}
