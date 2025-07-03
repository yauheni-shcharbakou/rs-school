import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ApiExceptions } from '../../decorators/swagger.decorator';
import { UserDto } from '../../dto/models/user.dto';
import { IAuthRefresh } from './auth.types';
import { AuthLoginDto } from './dto/auth.login.dto';
import { AuthRefreshDto } from './dto/auth.refresh.dto';
import { AuthTokensDto } from './dto/auth.tokens.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Sign up' })
  @ApiCreatedResponse({
    description: 'Success response',
    type: UserDto,
  })
  @ApiExceptions({ statusCodes: [HttpStatus.BAD_REQUEST] })
  async signup(@Body() body: AuthLoginDto): Promise<UserDto> {
    const user = await this.authService.signup(body);
    return plainToInstance(UserDto, user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login' })
  @ApiOkResponse({
    description: 'Success response',
    type: AuthTokensDto,
  })
  @ApiExceptions({
    statusCodes: [HttpStatus.BAD_REQUEST, HttpStatus.FORBIDDEN],
  })
  async login(@Body() body: AuthLoginDto): Promise<AuthTokensDto> {
    const { errors, tokens } = await this.authService.login(body);

    if (errors.notFound) {
      throw new ForbiddenException('User not found');
    }

    if (errors.wrongPassword) {
      throw new ForbiddenException('Wrong password');
    }

    return plainToInstance(AuthTokensDto, tokens);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh' })
  @ApiBody({ type: AuthRefreshDto })
  @ApiOkResponse({
    description: 'Success response',
    type: AuthTokensDto,
  })
  @ApiExceptions({
    statusCodes: [HttpStatus.UNAUTHORIZED, HttpStatus.FORBIDDEN],
  })
  async refresh(@Body() body: IAuthRefresh): Promise<AuthTokensDto> {
    try {
      const mapped = plainToInstance(AuthRefreshDto, body);
      const validationErrors = await validate(mapped);

      if (validationErrors.length) {
        throw new Error();
      }
    } catch (error) {
      throw new UnauthorizedException('RefreshToken should be not empty');
    }

    const { errors, tokens } = await this.authService.refresh(body);

    if (errors.invalidToken) {
      throw new ForbiddenException('Refresh token is expired or invalid');
    }

    if (errors.notFound) {
      throw new ForbiddenException('User not found');
    }

    return plainToInstance(AuthTokensDto, tokens);
  }
}
