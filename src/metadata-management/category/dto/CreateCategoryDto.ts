import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Name of the category',
    example: 'Action',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;
}