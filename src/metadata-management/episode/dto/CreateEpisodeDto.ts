import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEpisodeDto {
  @ApiProperty({ description: 'ID of the movie this episode belongs to' })
  @IsString()
  movieId: string;

  @ApiProperty({ description: 'Name of the episode' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Episode order number' })
  @IsNumber()
  order: number;

  @ApiProperty({ description: 'Source URL for the episode' })
  @IsString()
  source: string;

  @ApiProperty({ description: 'Duration of the episode in seconds' })
  @IsNumber()
  duration: number;
}
