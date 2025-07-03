import { IIdField } from '../id/id.types.js';
import { MemberTypeEnum } from '../member-type/member-type.enums.js';
import { IMemberType } from '../member-type/member-type.types.js';

export interface IProfile extends IIdField {
  isMale: boolean;
  yearOfBirth: number;
  memberTypeId: MemberTypeEnum;
  memberType?: IMemberType;
  userId: string;
}

export interface ICreateProfile {
  dto: Omit<IProfile, 'id' | 'memberType'>;
}

export interface IChangeProfile extends IIdField {
  dto: Partial<Pick<IProfile, 'isMale' | 'yearOfBirth' | 'memberTypeId'>>;
}
