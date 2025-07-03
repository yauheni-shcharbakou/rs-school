import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from '../../decorators/auth.decorator';
import { ApiExceptions } from '../../decorators/swagger.decorator';
import { IdFieldDto } from '../../dto/id-field.dto';
import { UserCreateDto } from './dto/user.create.dto';
import { UserDto } from '../../dto/models/user.dto';
import { UserUpdatePasswordDto } from './dto/user.update-password.dto';
import { UserService } from './user.service';
import { plainToInstance } from 'class-transformer';

@ApiTags('User')
@Controller('user')
@Auth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ description: 'Users list', type: [UserDto] })
  async findAll(): Promise<UserDto[]> {
    const result = await this.userService.findAll();
    return result.map((user) => plainToInstance(UserDto, user));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiOkResponse({ description: 'User', type: UserDto })
  @ApiExceptions({
    entityName: 'User',
    statusCodes: [HttpStatus.NOT_FOUND, HttpStatus.BAD_REQUEST],
  })
  async findByIdOrException(@Param() params: IdFieldDto): Promise<UserDto> {
    const user = await this.userService.findById(params.id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return plainToInstance(UserDto, user);
  }

  @Post()
  @ApiOperation({ summary: 'Get user by id' })
  @ApiCreatedResponse({ description: 'User', type: UserDto })
  @ApiExceptions({ statusCodes: [HttpStatus.BAD_REQUEST] })
  async create(@Body() body: UserCreateDto): Promise<UserDto> {
    const user = await this.userService.create(body);
    return plainToInstance(UserDto, user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user by id' })
  @ApiOkResponse({ description: 'User', type: UserDto })
  @ApiExceptions({
    entityName: 'User',
    statusCodes: [
      HttpStatus.NOT_FOUND,
      HttpStatus.BAD_REQUEST,
      HttpStatus.FORBIDDEN,
    ],
  })
  async updateByIdOrException(
    @Param() params: IdFieldDto,
    @Body() body: UserUpdatePasswordDto,
  ): Promise<UserDto> {
    const { errors, updatedUser } = await this.userService.updatePassword(
      params.id,
      body,
    );

    if (errors.notFound) {
      throw new NotFoundException('User not found');
    }

    if (errors.invalidPassword) {
      throw new ForbiddenException('Invalid password');
    }

    return plainToInstance(UserDto, updatedUser);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete user by id' })
  @ApiNoContentResponse({ description: 'Success request' })
  @ApiExceptions({
    entityName: 'User',
    statusCodes: [HttpStatus.NOT_FOUND, HttpStatus.BAD_REQUEST],
  })
  async deleteByIdOrException(@Param() params: IdFieldDto): Promise<void> {
    const result = await this.userService.deleteById(params.id);

    if (!result) {
      throw new NotFoundException('User not found');
    }
  }
}
