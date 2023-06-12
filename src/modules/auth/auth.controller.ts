import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MemberDto } from '../example/dtos/member.dto';
import { MemberEntity } from '../example/entities/member.entity';
import { MemberService } from '../example/services/member.service';
import { Auth, AuthMember } from '../../decorators';
import { UserNotFoundException } from '../../exceptions';
import { AuthService } from './auth.service';
import { LoginPayloadDto } from './dto/LoginPayloadDto';
import { MemberLoginDto } from './dto/MemberLoginDto';


@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private memberService: MemberService,
    private authService: AuthService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: LoginPayloadDto,
    description: 'User info with access token',
  })
  @ApiException(() => [UserNotFoundException])
  async userLogin(
    @Body() memberLoginDto: MemberLoginDto,
  ): Promise<LoginPayloadDto> {
    const memberEntity = await this.authService.validateMember(memberLoginDto);

    const token = await this.authService.createAccessToken({
      memberId: memberEntity.id,
    });

    return new LoginPayloadDto(memberEntity.toDto(), token);
  }

  
  @Get('me')
  @HttpCode(HttpStatus.OK)
  @Auth()
  @ApiOkResponse({ type: MemberDto, description: 'current member info' })
  getCurrentMember(@AuthMember() member: MemberEntity): MemberDto {
    return member.toDto();
  }

}
