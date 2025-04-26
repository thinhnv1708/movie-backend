import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMovieDto {
  @ApiProperty({
    description: 'Whether the movie is a single movie or a series',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isSingle?: boolean;

  @ApiProperty({ description: 'Name of the movie', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Slug for the movie', required: false })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty({ description: 'Original name of the movie', required: false })
  @IsString()
  @IsOptional()
  originName?: string;

  @ApiProperty({ description: 'Description of the movie', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'ID of the category', required: false })
  @IsString({ each: true })
  @ArrayMinSize(1)
  @IsArray()
  @IsOptional()
  categoryIds?: string[];

  @ApiProperty({ description: 'Whether the movie is active', required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({ description: 'Poster image URL', required: false })
  @IsString()
  @IsOptional()
  poster?: string;

  @ApiProperty({ description: 'Thumbnail image URL', required: false })
  @IsString()
  @IsOptional()
  thumbnail?: string;

  @ApiProperty({
    description: 'Duration of the movie in minutes',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  duration?: number;

  @ApiProperty({ description: 'Trailer URL', required: false })
  @IsString()
  @IsOptional()
  trailer?: string;

  @ApiProperty({ description: 'Source URL for the movie', required: false })
  @IsString()
  @IsOptional()
  source?: string;

  @ApiProperty({ description: 'Current episode number', required: false })
  @IsNumber()
  @IsOptional()
  currentEpisode?: number;

  @ApiProperty({ description: 'Total number of episodes', required: false })
  @IsNumber()
  @IsOptional()
  totalEpisode?: number;

  @ApiProperty({ description: 'ID of the country', required: false })
  @IsString()
  @IsOptional()
  countryId?: string;
}
