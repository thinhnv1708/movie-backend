import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCountryDto {
  @ApiProperty({
    description: 'Name of the country',
    example: 'United Kingdom',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;
}