import { ApiProperty } from '@nestjs/swagger';
import { ApiDocumentResponse } from '../../../../lib/ApiDocumentResponse';
import { MovieResponseDto } from './MovieResponseDto';

class MovieData {
  @ApiProperty({
    description: 'Total number of movies available',
    example: 42,
  })
  total: number;

  @ApiProperty({
    description: 'Array of movies for the current page',
    type: [MovieResponseDto],
  })
  items: MovieResponseDto[];
}

export class MoviesResponseDto extends ApiDocumentResponse {
  @ApiProperty({ type: MovieData })
  data: MovieData;
}
