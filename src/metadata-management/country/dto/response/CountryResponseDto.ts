import { ApiProperty } from '@nestjs/swagger';

export class CountryResponseDto {
  @ApiProperty({ description: 'Country ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ description: 'Country name', example: 'United States' })
  name: string;

  @ApiProperty({ description: 'Country slug', example: 'united-states' })
  slug: string;

  @ApiProperty({ description: 'Country creation timestamp', example: 1619123456 })
  createdAt: number;

  @ApiProperty({ description: 'Country last update timestamp', example: 1619123456 })
  updatedAt: number;

  constructor(entity: {
    id: string;
    name: string;
    slug: string;
    createdAt: number;
    updatedAt: number;
  }) {
    this.id = entity.id;
    this.name = entity.name;
    this.slug = entity.slug;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
  }
}