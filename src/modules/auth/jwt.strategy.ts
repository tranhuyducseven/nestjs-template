import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { MemberEntity } from '../ochapter/entities/member.entity';
import { MemberService } from '../ochapter/services/member.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenType } from '../../constants';
import { ApiConfigService } from '../../shared/services/api-config.service';



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ApiConfigService,
    private memberService: MemberService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.authConfig.publicKey,
    });
  }

  async validate(args: {
    memberId: number;
    type: TokenType;
  }): Promise<MemberEntity> {
    if (args.type !== TokenType.ACCESS_TOKEN) {
      throw new UnauthorizedException();
    }
    
    const member = await this.memberService.authenticateMember({
      id: args.memberId,
    });

    if (!member) {
      throw new UnauthorizedException();
    }

    return member;
  }
}
