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
import { TrackCreateDto } from './dto/track.create.dto';
import { TrackDto } from '../../dto/models/track.dto';
import { TrackService } from './track.service';
import { plainToInstance } from 'class-transformer';

@ApiTags('Track')
@Controller('track')
@Auth()
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tracks' })
  @ApiOkResponse({ description: 'Tracks list', type: [TrackDto] })
  async findAll(): Promise<TrackDto[]> {
    const result = await this.trackService.findAll();
    return result.map((track) => plainToInstance(TrackDto, track));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get track by id' })
  @ApiOkResponse({ description: 'Track', type: TrackDto })
  @ApiExceptions({
    entityName: 'Track',
    statusCodes: [HttpStatus.NOT_FOUND, HttpStatus.BAD_REQUEST],
  })
  async findByIdOrException(@Param() params: IdFieldDto): Promise<TrackDto> {
    const track = await this.trackService.findById(params.id);

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return plainToInstance(TrackDto, track);
  }

  @Post()
  @ApiOperation({ summary: 'Create track' })
  @ApiCreatedResponse({ description: 'Track', type: TrackDto })
  @ApiExceptions({
    statusCodes: [HttpStatus.NOT_FOUND, HttpStatus.BAD_REQUEST],
  })
  async create(@Body() body: TrackCreateDto): Promise<TrackDto> {
    const { errors, createdTrack } =
      await this.trackService.validateAndCreate(body);

    if (errors.albumNotFound) {
      throw new NotFoundException('Album not found');
    }

    if (errors.artistNotFound) {
      throw new NotFoundException('Artist not found');
    }

    return plainToInstance(TrackDto, createdTrack);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update track by id' })
  @ApiOkResponse({ description: 'Track', type: TrackDto })
  @ApiExceptions({
    statusCodes: [HttpStatus.NOT_FOUND, HttpStatus.BAD_REQUEST],
  })
  async updateByIdOrException(
    @Param() params: IdFieldDto,
    @Body() body: TrackCreateDto,
  ): Promise<TrackDto> {
    const { errors, updatedTrack } = await this.trackService.updateById(
      params.id,
      body,
    );

    if (errors.trackNotFound) {
      throw new NotFoundException('Track not found');
    }

    if (errors.albumNotFound) {
      throw new NotFoundException('Album not found');
    }

    if (errors.artistNotFound) {
      throw new NotFoundException('Artist not found');
    }

    return plainToInstance(TrackDto, updatedTrack);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete track by id' })
  @ApiNoContentResponse({ description: 'Success response' })
  @ApiExceptions({
    entityName: 'Track',
    statusCodes: [HttpStatus.NOT_FOUND, HttpStatus.BAD_REQUEST],
  })
  async deleteByIdOrException(@Param() params: IdFieldDto): Promise<void> {
    const result = await this.trackService.deleteById(params.id);

    if (!result) {
      throw new NotFoundException('Track not found');
    }
  }
}
