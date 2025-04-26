import { ApiProperty } from '@nestjs/swagger';
import { ApiDocumentResponse } from '../../../../lib/ApiDocumentResponse';
import { CategoryResponseDto } from './CategoryResponseDto';

class CategoriesData {
  @ApiProperty({
    description: 'Total number of categories available',
    example: 42,
  })
  total: number;

  @ApiProperty({
    description: 'Array of categories for the current page',
    type: [CategoryResponseDto],
  })
  items: CategoryResponseDto[];
}

export class CategoriesResponseDto extends ApiDocumentResponse {
  @ApiProperty({
    type: CategoriesData,
  })
  data: CategoriesData;
}
