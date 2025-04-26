import { ApiProperty } from '@nestjs/swagger';

export class EpisodeResponseDto {
  @ApiProperty({
    description: 'Episode ID',
    example: '12345abc-6789-def0-1234-56789abcdef0',
  })
  id: string;

  @ApiProperty({
    description: 'Movie ID this episode belongs to',
    example: '98765abc-4321-def0-9876-54321abcdef0',
  })
  movieId: string;

  @ApiProperty({ description: 'Episode title', example: 'The Beginning' })
  title: string;

  @ApiProperty({
    description: 'Episode description',
    example: 'The journey begins...',
  })
  description: string;

  @ApiProperty({
    description: 'Video source URL',
    example: 'https://example.com/videos/episode1.mp4',
  })
  videoSource: string;

  @ApiProperty({ description: 'Episode order in the movie', example: 1 })
  order: number;

  @ApiProperty({ description: 'Episode duration in minutes', example: 45 })
  duration: number;

  @ApiProperty({
    description: 'Episode creation date',
    example: '2023-01-01T00:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Episode last update date',
    example: '2023-01-02T00:00:00Z',
  })
  updatedAt: Date;
}
