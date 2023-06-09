import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MemberEntity } from '../ochapter/entities/member.entity';
import { MemberService } from '../ochapter/services/member.service';
import { validateHash } from '../../common/utils';
import { TokenType } from '../../constants';
import { UserNotFoundException } from '../../exceptions';
import { ApiConfigService } from '../../shared/services/api-config.service';
import { MemberLoginDto } from './dto/MemberLoginDto';
import { TokenPayloadDto } from './dto/TokenPayloadDto';


@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ApiConfigService,
    private memberService: MemberService,
  ) {}

  async createAccessToken(data: {
    memberId: number;
  }): Promise<TokenPayloadDto> {

    return new TokenPayloadDto({
      expiresIn: this.configService.authConfig.jwtExpirationTime,
      accessToken: await this.jwtService.signAsync({
        memberId: data.memberId,
        type: TokenType.ACCESS_TOKEN,
      }),
    });
  }

  async validateMember(memberLoginDto: MemberLoginDto): Promise<MemberEntity> {
    const member = await this.memberService.authenticateMember({
      email: memberLoginDto.email,
    });

    const isPasswordValid = await validateHash(
      memberLoginDto.password,
      member?.password,
    );

    if (!isPasswordValid) {
      throw new UserNotFoundException();
    }

    return member!;
  }
}
