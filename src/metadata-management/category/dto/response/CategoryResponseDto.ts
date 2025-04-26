import { ApiProperty } from '@nestjs/swagger';

export class CategoryResponseDto {
  @ApiProperty({
    description: 'Category ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({ description: 'Category name', example: 'Action' })
  name: string;

  @ApiProperty({ description: 'Category slug', example: 'action' })
  slug: string;

  @ApiProperty({
    description: 'Category creation timestamp',
    example: 1619123456,
  })
  createdAt: number;

  @ApiProperty({
    description: 'Category last update timestamp',
    example: 1619123456,
  })
  updatedAt: number;
}
