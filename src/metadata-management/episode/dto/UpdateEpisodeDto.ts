import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEpisodeDto {
  @ApiProperty({ description: 'Name of the episode', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Episode order number', required: false })
  @IsNumber()
  @IsOptional()
  order?: number;

  @ApiProperty({ description: 'Source URL for the episode', required: false })
  @IsString()
  @IsOptional()
  source?: string;

  @ApiProperty({
    description: 'Duration of the episode in seconds',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  duration?: number;
}
