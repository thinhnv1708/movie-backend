import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty({ description: 'Whether the movie is a single movie or a series' })
  @IsBoolean()
  isSingle: boolean;

  @ApiProperty({ description: 'Name of the movie' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Slug for the movie' })
  @IsString()
  slug: string;

  @ApiProperty({ description: 'Original name of the movie', required: false })
  @IsString()
  @IsOptional()
  originName?: string;

  @ApiProperty({ description: 'Description of the movie', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'ID of the genre', required: false })
  @IsString()
  @IsOptional()
  genreId?: string;

  @ApiProperty({ description: 'Whether the movie is active' })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ description: 'Poster image URL', required: false })
  @IsString()
  @IsOptional()
  poster?: string;

  @ApiProperty({ description: 'Thumbnail image URL', required: false })
  @IsString()
  @IsOptional()
  thumbnail?: string;

  @ApiProperty({ description: 'Duration of the movie in minutes', required: false })
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