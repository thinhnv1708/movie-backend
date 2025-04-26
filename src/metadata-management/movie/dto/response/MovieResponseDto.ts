import { ApiProperty } from '@nestjs/swagger';

class MovieCategoryDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;
}

class MovieCountryDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;
}

export class MovieResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  isSingle: boolean;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty({ required: false })
  originName?: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ type: [MovieCategoryDto] })
  categories: MovieCategoryDto[];

  @ApiProperty()
  isActive: boolean;

  @ApiProperty({ required: false })
  poster?: string;

  @ApiProperty({ required: false })
  thumbnail?: string;

  @ApiProperty({ required: false })
  duration?: number;

  @ApiProperty({ required: false })
  trailer?: string;

  @ApiProperty({ required: false })
  source?: string;

  @ApiProperty({ required: false })
  currentEpisode?: number;

  @ApiProperty({ required: false })
  totalEpisode?: number;

  @ApiProperty({ type: MovieCountryDto })
  country: MovieCountryDto;

  @ApiProperty()
  createdAt: number;

  @ApiProperty()
  updatedAt: number;
}
