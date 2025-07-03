import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IEnv } from '../../interfaces/env.interface';
import { IUser, IUserCreate } from '../../models/user.model';
import { USER_REPOSITORY } from '../repository/user/user.repository.constants';
import { IUserRepository } from '../repository/user/user.repository.interface';
import { IAuthJwtPayload, IAuthRefresh, IAuthTokens } from './auth.types';
import { CryptoService } from '../crypto/crypto.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<IEnv>,
    private readonly cryptoService: CryptoService,
  ) {}

  private readonly refreshTokenConfig = {
    secret:
      this.configService.get('JWT_SECRET_REFRESH_KEY', { infer: true }) ??
      'refreshsecret123123',
    expiresIn:
      this.configService.get('TOKEN_REFRESH_EXPIRE_TIME', { infer: true }) ??
      '1d',
  };

  private async generateTokens(payload: IAuthJwtPayload): Promise<IAuthTokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshTokenConfig),
    ]);

    return { accessToken, refreshToken };
  }

  parsePayload(token: string, isRefresh = false): IAuthJwtPayload | undefined {
    try {
      return this.jwtService.verify(
        token,
        isRefresh ? this.refreshTokenConfig : undefined,
      );
    } catch (error) {
      console.log(error, error.stack);
      return;
    }
  }

  async isUserExists(userId: string): Promise<boolean> {
    return this.userRepository.existsById(userId);
  }

  async signup(loginData: IUserCreate): Promise<IUser> {
    const hashedPassword = await this.cryptoService.hash(loginData.password);

    return this.userRepository.create({
      ...loginData,
      password: hashedPassword,
    });
  }

  async login(loginData: IUserCreate) {
    const errors = {
      notFound: false,
      wrongPassword: false,
    };

    const user = await this.userRepository.findOne({ login: loginData.login });

    if (!user) {
      errors.notFound = true;
      return { errors };
    }

    const isPasswordValid = await this.cryptoService.compare(
      loginData.password,
      user.password,
    );

    if (!isPasswordValid) {
      errors.wrongPassword = true;
      return { errors };
    }

    const tokens = await this.generateTokens({
      userId: user.id,
      login: user.login,
    });

    return { errors, tokens };
  }

  async refresh(data: IAuthRefresh) {
    const errors = {
      invalidToken: false,
      notFound: false,
    };

    const payload = this.parsePayload(data.refreshToken, true);

    if (!payload) {
      errors.invalidToken = true;
      return { errors };
    }

    const user = await this.userRepository.findById(payload.userId);

    if (!user) {
      errors.notFound = true;
      return { errors };
    }

    const tokens = await this.generateTokens({
      userId: user.id,
      login: user.login,
    });

    return { errors, tokens };
  }
}
