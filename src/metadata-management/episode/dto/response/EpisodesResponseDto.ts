import { ApiProperty } from '@nestjs/swagger';
import { ApiDocumentResponse } from '../../../../lib/ApiDocumentResponse';
import { EpisodeResponseDto } from './EpisodeResponseDto';

class EpisodeData {
  @ApiProperty({
    description: 'Total number of episodes available',
    example: 42,
  })
  total: number;

  @ApiProperty({
    description: 'Array of episodes for the current page',
    type: [EpisodeResponseDto],
  })
  items: EpisodeResponseDto[];
}

export class EpisodesResponseDto extends ApiDocumentResponse {
  @ApiProperty({ type: EpisodeData })
  data: EpisodeData;
}
