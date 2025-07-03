import {
  Body,
  Controller,
  Delete,
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
import { plainToInstance } from 'class-transformer';
import { Auth } from '../../decorators/auth.decorator';
import { ApiExceptions } from '../../decorators/swagger.decorator';
import { AlbumDto } from '../../dto/models/album.dto';
import { IdFieldDto } from '../../dto/id-field.dto';
import { AlbumService } from './album.service';
import { AlbumCreateDto } from './dto/album.create.dto';

@ApiTags('Album')
@Controller('album')
@Auth()
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @ApiOperation({ summary: 'Get all albums' })
  @ApiOkResponse({ description: 'Albums list', type: [AlbumDto] })
  async findAll(): Promise<AlbumDto[]> {
    const result = await this.albumService.findAll();
    return result.map((album) => plainToInstance(AlbumDto, album));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get album by id' })
  @ApiOkResponse({ description: 'Album', type: AlbumDto })
  @ApiExceptions({
    entityName: 'Album',
    statusCodes: [HttpStatus.NOT_FOUND, HttpStatus.BAD_REQUEST],
  })
  async findByIdOrException(@Param() params: IdFieldDto): Promise<AlbumDto> {
    const album = await this.albumService.findById(params.id);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return plainToInstance(AlbumDto, album);
  }

  @Post()
  @ApiOperation({ summary: 'Create album' })
  @ApiCreatedResponse({ description: 'Album', type: AlbumDto })
  @ApiExceptions({
    entityName: 'Artist',
    statusCodes: [HttpStatus.NOT_FOUND, HttpStatus.BAD_REQUEST],
  })
  async create(@Body() body: AlbumCreateDto): Promise<AlbumDto> {
    const { errors, createdAlbum } =
      await this.albumService.validateAndCreate(body);

    if (errors.artistNotFound) {
      throw new NotFoundException('Artist not found');
    }

    return plainToInstance(AlbumDto, createdAlbum);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update album by id' })
  @ApiOkResponse({ description: 'Album', type: AlbumDto })
  @ApiExceptions({
    statusCodes: [HttpStatus.NOT_FOUND, HttpStatus.BAD_REQUEST],
  })
  async updateByIdOrException(
    @Param() params: IdFieldDto,
    @Body() body: AlbumCreateDto,
  ): Promise<AlbumDto> {
    const { errors, updatedAlbum } = await this.albumService.updateById(
      params.id,
      body,
    );

    if (errors.artistNotFound) {
      throw new NotFoundException('Artist not found');
    }

    if (errors.albumNotFound) {
      throw new NotFoundException('Album not found');
    }

    return plainToInstance(AlbumDto, updatedAlbum);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete album by id' })
  @ApiNoContentResponse({ description: 'Success request' })
  @ApiExceptions({
    entityName: 'Album',
    statusCodes: [HttpStatus.NOT_FOUND, HttpStatus.BAD_REQUEST],
  })
  async deleteByIdOrException(@Param() params: IdFieldDto): Promise<void> {
    const result = await this.albumService.deleteById(params.id);

    if (!result) {
      throw new NotFoundException('Album not found');
    }
  }
}
