import { ApiProperty } from '@nestjs/swagger';
import { MemberDto } from '../../file/dtos/member.dto';

import { TokenPayloadDto } from './TokenPayloadDto';

export class LoginPayloadDto {
  @ApiProperty({ type: MemberDto })
  member: MemberDto;

  @ApiProperty({ type: TokenPayloadDto })
  token: TokenPayloadDto;

  constructor(member: MemberDto, token: TokenPayloadDto) {
    this.member = member;
    this.token = token;
  }
}
