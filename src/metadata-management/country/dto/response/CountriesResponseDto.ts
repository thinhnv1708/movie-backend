import { ApiProperty } from '@nestjs/swagger';
import { ApiDocumentResponse } from '../../../../lib/ApiDocumentResponse';
import { CountryResponseDto } from './CountryResponseDto';

class CountriesData {
  @ApiProperty({
    description: 'Total number of contries available',
    example: 42,
  })
  total: number;

  @ApiProperty({
    description: 'Array of contries for the current page',
    type: [CountryResponseDto],
  })
  items: CountryResponseDto[];
}

export class CountriesResponseDto extends ApiDocumentResponse {
  @ApiProperty({ type: CountriesData })
  data: CountriesData;
}
