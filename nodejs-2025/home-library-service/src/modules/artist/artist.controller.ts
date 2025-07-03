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
import { Auth } from '../../decorators/auth.decorator';
import { ApiExceptions } from '../../decorators/swagger.decorator';
import { IdFieldDto } from '../../dto/id-field.dto';
import { ArtistCreateDto } from './dto/artist.create.dto';
import { ArtistDto } from '../../dto/models/artist.dto';
import { ArtistService } from './artist.service';
import { plainToInstance } from 'class-transformer';

@ApiTags('Artist')
@Controller('artist')
@Auth()
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @ApiOperation({ summary: 'Get all artists' })
  @ApiOkResponse({ description: 'Artists list', type: [ArtistDto] })
  async findAll(): Promise<ArtistDto[]> {
    const result = await this.artistService.findAll();
    return result.map((artist) => plainToInstance(ArtistDto, artist));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get artist by id' })
  @ApiOkResponse({ description: 'Artist', type: ArtistDto })
  @ApiExceptions({
    entityName: 'Artist',
    statusCodes: [HttpStatus.NOT_FOUND, HttpStatus.BAD_REQUEST],
  })
  async findByIdOrException(@Param() params: IdFieldDto): Promise<ArtistDto> {
    const artist = await this.artistService.findById(params.id);

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return plainToInstance(ArtistDto, artist);
  }

  @Post()
  @ApiOperation({ summary: 'Create artist' })
  @ApiCreatedResponse({ description: 'Artist', type: ArtistDto })
  @ApiExceptions({ statusCodes: [HttpStatus.BAD_REQUEST] })
  async create(@Body() body: ArtistCreateDto): Promise<ArtistDto> {
    const artist = await this.artistService.create(body);
    return plainToInstance(ArtistDto, artist);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update artist by id' })
  @ApiOkResponse({ description: 'Artist', type: ArtistDto })
  @ApiExceptions({
    entityName: 'Artist',
    statusCodes: [HttpStatus.NOT_FOUND, HttpStatus.BAD_REQUEST],
  })
  async updateByIdOrException(
    @Param() params: IdFieldDto,
    @Body() body: ArtistCreateDto,
  ): Promise<ArtistDto> {
    const { errors, updatedArtist } = await this.artistService.updateById(
      params.id,
      body,
    );

    if (errors.notFound) {
      throw new NotFoundException('Artist not found');
    }

    return plainToInstance(ArtistDto, updatedArtist);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete artist by id' })
  @ApiNoContentResponse({ description: 'Success response' })
  @ApiExceptions({
    entityName: 'Artist',
    statusCodes: [HttpStatus.NOT_FOUND, HttpStatus.BAD_REQUEST],
  })
  async deleteByIdOrException(@Param() params: IdFieldDto): Promise<void> {
    const result = await this.artistService.deleteById(params.id);

    if (!result) {
      throw new NotFoundException('Artist not found');
    }
  }
}
