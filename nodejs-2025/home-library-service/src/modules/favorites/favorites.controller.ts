import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  UnprocessableEntityException,
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
import { MessageFieldDto } from '../../dto/message-field.dto';
import { FavoritesDto } from '../../dto/models/favorites.dto';
import { FavoritesService } from './favorites.service';
import { plainToInstance } from 'class-transformer';

@ApiTags('Favorites')
@Controller('favs')
@Auth()
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({ summary: 'Get favorites' })
  @ApiOkResponse({ description: 'Favorites', type: FavoritesDto })
  async find(): Promise<FavoritesDto> {
    const result = await this.favoritesService.find();
    return plainToInstance(FavoritesDto, result);
  }

  @Post('album/:id')
  @ApiOperation({ summary: 'Add album to favorites by id' })
  @ApiCreatedResponse({
    description: 'Success response',
    type: MessageFieldDto,
  })
  @ApiExceptions({
    entityName: 'Album',
    statusCodes: [HttpStatus.UNPROCESSABLE_ENTITY, HttpStatus.BAD_REQUEST],
  })
  async addAlbum(@Param() params: IdFieldDto): Promise<MessageFieldDto> {
    const result = await this.favoritesService.addAlbum(params.id);

    if (!result) {
      throw new UnprocessableEntityException('Album not found');
    }

    return plainToInstance(MessageFieldDto, {
      message: 'Album added to favorites',
    });
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete album from favorites by id' })
  @ApiNoContentResponse({ description: 'Success response' })
  @ApiExceptions({
    entityName: 'Album',
    statusCodes: [HttpStatus.NOT_FOUND, HttpStatus.BAD_REQUEST],
  })
  async deleteAlbum(@Param() params: IdFieldDto): Promise<void> {
    const result = await this.favoritesService.deleteAlbum(params.id);

    if (!result) {
      throw new NotFoundException('Album not found');
    }
  }

  @Post('artist/:id')
  @ApiOperation({ summary: 'Add artist to favorites by id' })
  @ApiCreatedResponse({
    description: 'Success response',
    type: MessageFieldDto,
  })
  @ApiExceptions({
    entityName: 'Artist',
    statusCodes: [HttpStatus.UNPROCESSABLE_ENTITY, HttpStatus.BAD_REQUEST],
  })
  async addArtist(@Param() params: IdFieldDto): Promise<MessageFieldDto> {
    const result = await this.favoritesService.addArtist(params.id);

    if (!result) {
      throw new UnprocessableEntityException('Artist not found');
    }

    return plainToInstance(MessageFieldDto, {
      message: 'Artist added to favorites',
    });
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete artist from favorites by id' })
  @ApiNoContentResponse({ description: 'Success response' })
  @ApiExceptions({
    entityName: 'Artist',
    statusCodes: [HttpStatus.NOT_FOUND, HttpStatus.BAD_REQUEST],
  })
  async deleteArtist(@Param() params: IdFieldDto): Promise<void> {
    const result = await this.favoritesService.deleteArtist(params.id);

    if (!result) {
      throw new NotFoundException('Artist not found');
    }
  }

  @Post('track/:id')
  @ApiOperation({ summary: 'Add track to favorites by id' })
  @ApiCreatedResponse({
    description: 'Success response',
    type: MessageFieldDto,
  })
  @ApiExceptions({
    entityName: 'Track',
    statusCodes: [HttpStatus.UNPROCESSABLE_ENTITY, HttpStatus.BAD_REQUEST],
  })
  async addTrack(@Param() params: IdFieldDto): Promise<MessageFieldDto> {
    const result = await this.favoritesService.addTrack(params.id);

    if (!result) {
      throw new UnprocessableEntityException('Track not found');
    }

    return plainToInstance(MessageFieldDto, {
      message: 'Track added to favorites',
    });
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete track from favorites by id' })
  @ApiNoContentResponse({ description: 'Success response' })
  @ApiExceptions({
    entityName: 'Track',
    statusCodes: [HttpStatus.NOT_FOUND, HttpStatus.BAD_REQUEST],
  })
  async deleteTrack(@Param() params: IdFieldDto): Promise<void> {
    const result = await this.favoritesService.deleteTrack(params.id);

    if (!result) {
      throw new NotFoundException('Track not found');
    }
  }
}
