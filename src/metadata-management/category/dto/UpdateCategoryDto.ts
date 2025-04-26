import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiProperty({
    description: 'Name of the category',
    example: 'Adventure',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;
}