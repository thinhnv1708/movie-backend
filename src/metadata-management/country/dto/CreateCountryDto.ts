import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCountryDto {
  @ApiProperty({
    description: 'Name of the country',
    example: 'United States',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;
}